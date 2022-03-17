const { Products } = require("../../models");
const ProductRequestDto = require("../../dtos/requests/products.dto");
const ProductResponseDto = require("../../dtos/responses/products.dto");
const AppResponseDto = require("../../dtos/responses/app_response.dto");
const _ = require("lodash");

//CREATE PRODUCT
exports.createProduct = (req, res) => {
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
exports.updateProduct = (req, res) => {
  // Check if this is admin
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }

  const price = parseFloat((Math.round(req.body.price * 100) / 100).toFixed(2));

  if (typeof price !== "number") {
    return res.status(400).send({ error: "price must be number." });
  }

  Products.findOne({ where: { id: req.params.productId } })
    .then((product) => {
      const projectData = {
        name: req.body.name || product.name,
        price: price < 0 ? product.price : price,
        description: req.body.description || product.description,
      };

      product
        .update(projectData)
        .then((data) => res.json(data))
        .catch((error) => {
          console.error("Error on update: ", error);
          return res.status(400).send({ error: err.message });
        });
    })
    .catch((err) => {
      console.error("Error on finding a product: ", err);
      return res.status(400).send({ error: err.message });
    });
};

// DELETE PRODUCT
exports.deleteProduct = (req, res) => {
  // Check if this is admin
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }

  Products.findOne({ where: { id: req.params.productId } })
    .then((product) => {
      product
        .destroy()
        .then((data) => res.status(200).json(data))
        .catch((error) => {
          console.error("Error on delete: ", error);
          return res.status(400).send({ error: err.message });
        });
    })
    .catch((err) => {
      console.error("Error on finding a product: ", err);
      return res.status(400).send({ error: err.message });
    });
};
