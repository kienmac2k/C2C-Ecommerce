const { Categories, Category_Images, sequelize } = require("../../models");

// const TagDto = require("../dtos/responses/tags.dto");
const CategoryDto = require("../../dtos/responses/categories.dto");
const AppResponseDto = require("../../dtos/responses/app_response.dto");

exports.getTags = function (req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.page_size) || 5;
  const offset = (page - 1) * pageSize;

  Tag.findAndCountAll({
    offset,
    limit: pageSize,
  })
    .then(function (tags) {
      return res.json(
        TagDto.buildPagedList(
          tags.rows,
          page,
          pageSize,
          tags.count,
          req.baseUrl
        )
      );
    })
    .catch((err) => {
      return res.json(AppResponseDto.buildWithErrorMessages(err));
    });
};

exports.getCategories = function (req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.page_size) || 5;
  const offset = (page - 1) * pageSize;

  Categories.findAndCountAll({
    offset,
    limit: pageSize,
  })
    .then(function (categories) {
      return res
        .status(200)
        .json(
          CategoryDto.buildPagedList(
            categories.rows,
            page,
            pageSize,
            categories.count,
            req.baseUrl
          )
        );
    })
    .catch((err) => {
      return res.status(500).json(AppResponseDto.buildWithErrorMessages(err));
    });
};

exports.getCategoriesByOrder = function (req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.page_size) || 5;
  const offset = (page - 1) * pageSize;
  const order = parseInt(req.query.order);

  Categories.findAndCountAll({
    where: {
      order,
    },
    offset,
    limit: pageSize,
  })
    .then(function (categories) {
      return res
        .status(200)
        .json(
          CategoryDto.buildPagedList(
            categories.rows,
            page,
            pageSize,
            categories.count,
            req.baseUrl
          )
        );
    })
    .catch((err) => {
      return res.status(500).json(AppResponseDto.buildWithErrorMessages(err));
    });
};

exports.getSubCategory = function (req, res) {
  const id = req.params.id;
  Categories.findAll({
    where: { parentId: id },
  })
    .then(function (categories) {
      return res.status(200).json(CategoryDto.buildDtos(categories));
    })
    .catch((err) => {
      return res.status(500).json(AppResponseDto.buildWithErrorMessages(err));
    });
};
exports.getCategoryById = function (req, res) {
  const id = req.params.id;
  Categories.findOne({
    where: { id },
  })
    .then(function (category) {
      return res.status(200).json(CategoryDto.buildDto(category));
    })
    .catch((err) => {
      return res.status(500).json(AppResponseDto.buildWithErrorMessages(err));
    });
};
