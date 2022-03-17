const { Categories, sequelize } = require("../../models");
const slugify = require("slugify");

// const Tag = require("./../config/sequelize.config").Tag;

// const TagImage = require("./../config/sequelize.config").TagImage;

const TagDto = require("../../dtos/responses/tags.dto");
const CategoryDto = require("../../dtos/responses/categories.dto");
const AppResponseDto = require("../../dtos/responses/app_response.dto");

// CREATE TAG
exports.createTag = function (req, res, next) {
  const tagObj = {};
  const promises = [];
  if (req.body.name) {
    tagObj.name = req.body.name;
  }

  if (req.body.description) {
    tagObj.description = req.body.description;
  }

  if (tagObj.name == null) {
    return res.json(
      AppResponseDto.buildWithErrorMessages(
        "You must provide the name for the category"
      )
    );
  }
  let transac = undefined;
  sequelize
    .transaction({ autocommit: false })
    .then(function (transaction) {
      transac = transaction;
      Tag.create(tagObj, { transaction })
        .then(async (tag) => {
          for (let i = 0; req.files != null && i < req.files.length; i++) {
            let file = req.files[i];
            let filePath = file.path.replace(new RegExp("\\\\", "g"), "/");
            filePath = filePath.replace("public", "");
            promises.push(
              TagImage.create(
                {
                  fileName: file.filename,
                  filePath: filePath,
                  originalName: file.originalname,
                  fileSize: file.size,
                  tagId: tag.id,
                },
                { transaction: transaction }
              )
            );
          }

          Promise.all(promises)
            .then((results) => {
              tag.images = results;
              transaction.commit();
              return res.json(
                AppResponseDto.buildWithDtoAndMessages(
                  TagDto.buildDto(tag, true),
                  "Tag created successfully"
                )
              );
            })
            .catch((err) => {
              throw err;
            });
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      transac.rollback();
      return res.json(AppResponseDto.buildWithErrorMessages(err.message));
    });
};

// CREATE CATEGORY

exports.createCategory = function (req, res, next) {
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }
  const categoryObj = {};
  if (req.body.name) {
    categoryObj.name = req.body.name;
    categoryObj.slug = slugify(req.body.name);
  }

  if (req.body.description) {
    categoryObj.description = req.body.description;
  }

  if (categoryObj.name === null) {
    return res.json(
      AppResponseDto.buildWithErrorMessages(
        "You must provide the name for the category"
      )
    );
  }
  let transac = undefined;
  sequelize
    .transaction({ autocommit: false })
    .then(function (transaction) {
      transac = transaction;
      Categories.create(categoryObj, { transaction })
        .then((category) => {
          transaction.commit();
          return res
            .status(200)
            .json(
              AppResponseDto.buildWithDtoAndMessages(
                CategoryDto.buildDto(category, true),
                "Category created successfully"
              )
            );
        })
        .catch((err) => {
          return res
            .status(500)
            .json(AppResponseDto.buildWithErrorMessages(err.message));
        });
    })
    .catch((err) => {
      transac.rollback();
      return res
        .status(500)
        .json(AppResponseDto.buildWithErrorMessages(err.message));
    });
};

exports.createSubCategory = async function (req, res) {
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }
  const categoryObj = {};
  if (req.body.name) {
    categoryObj.name = req.body.name;
    categoryObj.slug = slugify(req.body.name);
    categoryObj.order = 2;
  }

  if (req.body.description) {
    categoryObj.description = req.body.description;
  }

  if (categoryObj.name === null) {
    return res.json(
      AppResponseDto.buildWithErrorMessages(
        "You must provide the name for the category"
      )
    );
  }

  try {
    if (!req.body.parentId) {
      return res.json(
        AppResponseDto.buildWithErrorMessages(
          "You must provide the parent Id for the category"
        )
      );
    }
    const parentCategory = await Categories.findOne({
      where: { id: req.body.parentId },
    });
    if (!parentCategory) {
      return res.json(
        AppResponseDto.buildWithErrorMessages("Cannot find category")
      );
    }
    categoryObj.parentId = req.body.parentId;
  } catch (err) {
    return res
      .status(500)
      .json(AppResponseDto.buildWithErrorMessages(err.message));
  }

  let transac = undefined;
  sequelize
    .transaction({ autocommit: false })
    .then(function (transaction) {
      transac = transaction;
      Categories.create(categoryObj, { transaction })
        .then((category) => {
          transaction.commit();
          return res
            .status(200)
            .json(
              AppResponseDto.buildWithDtoAndMessages(
                CategoryDto.buildDto(category, true),
                "Category created successfully"
              )
            );
        })
        .catch((err) => {
          return res
            .status(500)
            .json(AppResponseDto.buildWithErrorMessages(err.message));
        });
    })
    .catch((err) => {
      transac.rollback();
      return res
        .status(500)
        .json(AppResponseDto.buildWithErrorMessages(err.message));
    });
};
// UPDATE CATEGORY

exports.updateCategory = (req, res) => {
  // Check if this is admin
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }

  Categories.findOne({ where: { id: req.params.categoryId } })
    .then((category) => {
      const projectData = {
        name: req.body.name || category.name,
        description: req.body.description || category.description,
      };

      category
        .update(projectData)
        .then((data) =>
          res
            .status(200)
            .json(
              AppResponseDto.buildWithDtoAndMessages(
                data,
                "Category updated successfully"
              )
            )
        )
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

// DELETE CATEGORY
exports.deleteCategory = (req, res) => {
  // Check if this is admin
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }

  Categories.findOne({ where: { id: req.params.categoryId } })
    .then((category) => {
      category
        .destroy()
        .then(() => res.status(200).json({ message: "Delete successfully" }))
        .catch((error) => {
          console.error("Error on delete: ", error);
          return res.status(400).json({ error: err.message });
        });
    })
    .catch((err) => {
      console.error("Error on finding a category: ", err);
      return res.status(400).json({ error: err.message });
    });
};
