const {
  Users,
  Products,
  sequelize,
  Categories,
  Shops,
} = require("../../models");
const ProductRequestDto = require("../../dtos/requests/products.dto");
const ProductResponseDto = require("../../dtos/responses/products.dto");
const AppResponseDto = require("../../dtos/responses/app_response.dto");
const _ = require("lodash");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { id: req.user.id },
      include: [{ model: Shops, as: "shops", where: { id: req.body.shopId } }],
    });
    if (!user) {
      return res
        .status(403)
        .json(
          AppResponseDto.buildWithErrorMessages("You do not own this shop.")
        );
    }
  } catch (err) {
    console.error("Error on finding a user: ", err);
    return res.status(500).json(AppResponseDto.buildWithErrorMessages(err));
  }

  const bindingResult = ProductRequestDto.createProductResponseDto(req);
  const promises = [];
  if (!_.isEmpty(bindingResult.errors)) {
    return res.json(
      AppResponseDto.buildWithErrorMessages(bindingResult.errors)
    );
  }
  let transac = undefined;
  sequelize
    .transaction({ autocommit: false })
    .then(async function (transaction) {
      transac = transaction;
      const categories = req.body.categories || [];

      // another way of doing it without lodash
      categories.forEach((id) => {
        promises.push(
          Categories.findOne({
            where: { id },
          })
        );
      });
      promises.push(
        Products.create(bindingResult.validatedData, { transaction })
      );
      await Promise.all(promises)
        .then(async (results) => {
          promises.length = 0;
          const product = results.pop();
          const categories = [];
          results.forEach((result) => {
            categories.push(result);
          });

          product
            .setCategories(categories, { transaction })
            .then(() => {
              transaction.commit();
              return res.json(
                AppResponseDto.buildWithDtoAndMessages(
                  ProductResponseDto.buildDto(product),
                  "product created successfully"
                )
              );
            })
            .catch((err) => {
              transaction.rollback();
              console.log("Error", err);
              return res
                .status(500)
                .json(AppResponseDto.buildWithErrorMessages(err));
            });

          // for (let i = 0; req.files != null && i < req.files.length; i++) {
          //   let file = req.files[i];
          //   let filePath = file.path.replace(new RegExp("\\\\", "g"), "/");
          //   filePath = filePath.replace("public", "");
          //   promises.push(
          //     ProductImage.create(
          //       {
          //         fileName: file.filename,
          //         filePath: filePath,
          //         originalName: file.originalname,
          //         fileSize: file.size,
          //         productId: product.id,
          //       },
          //       { transaction: transaction }
          //     )
          //   );
          // }

          // await Promise.all(promises)
          //   .then((results) => {
          //     const images = _.takeRightWhile(results, (result) => {
          //       return (
          //         result.constructor.getTableName &&
          //         result.constructor.getTableName() === "file_uploads"
          //       );
          //     });
          //     product.images = images;
          //     product.tags = tags;
          //     product.categories = categories;
          //     transaction.commit();
          //     return res.json(
          //       AppResponseDto.buildWithDtoAndMessages(
          //         ProductResponseDto.buildDto(product),
          //         "product created successfully"
          //       )
          //     );
          //   })
          //   .catch((err) => {
          //     throw err;
          //   });
        })
        .catch((err) => {
          console.log("Error", err);
          return res
            .status(500)
            .json(
              AppResponseDto.buildWithErrorMessages("Can not create product")
            );
        });
    })
    .catch((err) => {
      transac.rollback();
      return res.status(500).json(AppResponseDto.buildWithErrorMessages(err));
    });
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  // Check if this is admin
  try {
    const user = await Users.findOne({
      where: { id: req.user.id },
      include: [{ model: Shops, as: "shops", where: { id: req.body.shopId } }],
    });
    if (!user) {
      return res
        .status(403)
        .json(
          AppResponseDto.buildWithErrorMessages("You do not own this shop.")
        );
    }
  } catch (err) {
    console.error("Error on finding a user: ", err);
    return res.status(500).json(AppResponseDto.buildWithErrorMessages(err));
  }

  Products.findOne({
    where: { id: req.params.productId, shopId: req.body.shopId },
  })
    .then(async (product) => {
      const oldCategories = await product.getCategories();
      const categories = req.body.categories || oldCategories;
      const projectData = {
        name: req.body.name || product.name,
        price: req.body.price || product.price,
        description: req.body.description || product.description,
        stock: req.body.stock || product.stock,
      };

      let transac = undefined;
      sequelize
        .transaction({ autocommit: false })
        .then(async function (transaction) {
          transac = transaction;
          const promises = [];
          // another way of doing it without lodash
          categories.forEach((id) => {
            promises.push(
              Categories.findOne({
                where: { id },
              })
            );
          });
          promises.push(product.update(projectData, { transaction }));
          await Promise.all(promises)
            .then(async (results) => {
              promises.length = 0;
              const product = results.pop();
              const categories = [];
              results.forEach((result) => {
                categories.push(result);
              });
              product
                .setCategories(categories, { transaction })
                .then(() => {
                  transaction.commit();
                  return res.json(
                    AppResponseDto.buildSuccessWithMessages(
                      "product update successfully"
                    )
                  );
                })
                .catch((err) => {
                  transaction.rollback();
                  console.log("Error", err);
                  return res
                    .status(500)
                    .json(AppResponseDto.buildWithErrorMessages(err));
                });

              // for (let i = 0; req.files != null && i < req.files.length; i++) {
              //   let file = req.files[i];
              //   let filePath = file.path.replace(new RegExp("\\\\", "g"), "/");
              //   filePath = filePath.replace("public", "");
              //   promises.push(
              //     ProductImage.create(
              //       {
              //         fileName: file.filename,
              //         filePath: filePath,
              //         originalName: file.originalname,
              //         fileSize: file.size,
              //         productId: product.id,
              //       },
              //       { transaction: transaction }
              //     )
              //   );
              // }

              // await Promise.all(promises)
              //   .then((results) => {
              //     const images = _.takeRightWhile(results, (result) => {
              //       return (
              //         result.constructor.getTableName &&
              //         result.constructor.getTableName() === "file_uploads"
              //       );
              //     });
              //     product.images = images;
              //     product.tags = tags;
              //     product.categories = categories;
              //     transaction.commit();
              //     return res.json(
              //       AppResponseDto.buildWithDtoAndMessages(
              //         ProductResponseDto.buildDto(product),
              //         "product created successfully"
              //       )
              //     );
              //   })
              //   .catch((err) => {
              //     throw err;
              //   });
            })
            .catch((err) => {
              console.log("Error", err);
              return res
                .status(500)
                .json(
                  AppResponseDto.buildWithErrorMessages(
                    "Can not create product"
                  )
                );
            });
        })
        .catch((err) => {
          transac.rollback();
          return res
            .status(500)
            .json(AppResponseDto.buildWithErrorMessages(err));
        });
    })
    .catch((err) => {
      console.error("Error on finding a product: ", err);
      return res.status(400).json(AppResponseDto.buildWithErrorMessages(err));
    });
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { id: req.user.id },
      include: [{ model: Shops, as: "shops", where: { id: req.query.shopId } }],
    });
    if (!user) {
      return res
        .status(403)
        .json(
          AppResponseDto.buildWithErrorMessages("You do not own this shop.")
        );
    }
  } catch (err) {
    console.error("Error on finding a user: ", err);
    return res.status(500).json(AppResponseDto.buildWithErrorMessages(err));
  }
  Products.findOne({
    where: { id: req.params.productId, shopId: req.query.shopId },
  })
    .then((product) => {
      product
        .destroy()
        .then(() =>
          res
            .status(200)
            .json(
              AppResponseDto.buildSuccessWithMessages(
                "product deleted successfully"
              )
            )
        )
        .catch((err) => {
          console.error("Error on delete: ", error);
          return res
            .status(400)
            .json(AppResponseDto.buildWithErrorMessages(err));
        });
    })
    .catch((err) => {
      console.error("Error on finding a product: ", err);
      return res.status(400).json(AppResponseDto.buildWithErrorMessages(err));
    });
};
