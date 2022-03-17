const { Shops, sequelize } = require("../../models");
const ShopDto = require("../../dtos/responses/shops.dto");
const AppResponseDto = require("../../dtos/responses/app_response.dto");

exports.getShopList = function (req, res, next) {
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.page_size) || 5;
  const offset = (page - 1) * pageSize;

  Shops.findAndCountAll({
    offset,
    limit: pageSize,
    where: { userId },
  })
    .then(function (shops) {
      return res
        .status(200)
        .json(ShopDto.buildPagedList(shops.rows, page, pageSize, shops.count));
    })
    .catch((err) => {
      return res.status(500).json(AppResponseDto.buildWithErrorMessages(err));
    });
};

exports.createShop = function (req, res, next) {
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }
  const shopObj = {};

  if (req.user) {
    shopObj.userId = req.user.id;
  }
  if (req.body.name) {
    shopObj.name = req.body.name;
    shopObj.mobile = req.body.mobile;
    shopObj.email = req.body.email;
    shopObj.address = req.body.address;
  }

  if (req.body.description) {
    shopObj.description = req.body.description;
  }

  if (shopObj.name === null) {
    return res.json(
      AppResponseDto.buildWithErrorMessages(
        "You must provide the name for the shop"
      )
    );
  }
  let transac = undefined;
  sequelize
    .transaction({ autocommit: false })
    .then(function (transaction) {
      transac = transaction;
      Shops.findOne({ where: { name: shopObj.name } })
        .then((user) => {
          if (user) {
            return res
              .status(500)
              .json(
                AppResponseDto.buildWithErrorMessages(
                  "Shop with this name already exists"
                )
              );
          }
          Shops.create(shopObj, { transaction })
            .then((shop) => {
              transaction.commit();
              return res
                .status(200)
                .json(
                  AppResponseDto.buildWithDtoAndMessages(
                    ShopDto.buildDto(shop),
                    "Shop created successfully"
                  )
                );
            })
            .catch((err) => {
              return res
                .status(500)
                .json(
                  AppResponseDto.buildWithErrorMessages(
                    "Error in creating shop"
                  )
                );
            });
        })
        .catch((err) => {
          return res
            .status(500)
            .json(
              AppResponseDto.buildWithErrorMessages("Error in finding shopp")
            );
        });
    })
    .catch((err) => {
      transac.rollback();
      return res
        .status(400)
        .json(AppResponseDto.buildWithErrorMessages(err.message));
    });
};

// UPDATE SHOP

exports.updateShop = (req, res) => {
  // Check if this is admin
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }

  Shops.findOne({ where: { id: req.params.shopId, userId: req.user.id } })
    .then((shop) => {
      const shopData = {
        name: req.body.name || shop.name,
        description: req.body.description || shop.description,
        isActive: req.body.isActive || shop.isActive,
      };

      shop
        .update(shopData)
        .then((data) =>
          res
            .status(200)
            .json(
              AppResponseDto.buildWithDtoAndMessages(
                data,
                "Update successfully"
              )
            )
        )
        .catch((error) => {
          console.error("Error on update: ", error);
          return res.status(400).send({ error: err.message });
        });
    })
    .catch((err) => {
      return res
        .status(500)
        .json(AppResponseDto.buildWithErrorMessages("Can not find your shop"));
    });
};

// DELETE SHOP
exports.deleteShop = (req, res) => {
  // Check if this is admin
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }

  Shops.findOne({ where: { id: req.params.shopId, userId: req.user.id } })
    .then((shop) => {
      shop
        .destroy()
        .then(() =>
          res
            .status(200)
            .json(
              AppResponseDto.buildSuccessWithMessages("Delete successfully")
            )
        )
        .catch((error) => {
          console.error("Error on delete: ", error);
          return res.status(400).json({ error: err.message });
        });
    })
    .catch((err) => {
      console.error("Error on finding a shop: ", err);
      return res
        .status(500)
        .json(AppResponseDto.buildWithErrorMessages("Can not find your shop"));
    });
};
