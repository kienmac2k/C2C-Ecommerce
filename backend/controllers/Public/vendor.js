const { Shops } = require("../../models");
const ShopDto = require("../../dtos/responses/shops.dto");
const AppResponseDto = require("../../dtos/responses/app_response.dto");

// Get all products
exports.getShops = function (req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.page_size) || 5;
  const offset = (page - 1) * pageSize;

  Shops.findAndCountAll({
    offset,
    limit: pageSize,
  })
    .then(function (shops) {
      return res
        .status(200)
        .json(
          ShopDto.buildPagedList(
            shops.rows,
            page,
            pageSize,
            shops.count,
            req.baseUrl
          )
        );
    })
    .catch((err) => {
      return res.status(500).json(AppResponseDto.buildWithErrorMessages(err));
    });
};
//Get by ID
exports.getById = (req, res, next) => {
  const id = req.params.id;
  Shops.findOne({ where: { id } })
    .then((shop) => {
      return res
        .status(200)
        .json(AppResponseDto.buildSuccessWithDto(ShopDto.buildDto(shop)));
    })
    .catch((err) => {
      return res.status(500).json(AppResponseDto.buildWithErrorMessages(err));
    });
};
