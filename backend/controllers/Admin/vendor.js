const { Shops } = require("../../models");
const ShopDto = require("../../dtos/responses/shops.dto");
const AppResponseDto = require("../../dtos/responses/app_response.dto");

exports.createShop = function (req, res, next) {
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }
  const shopObj = {};
  if (req.body.name) {
    shopObj.name = req.body.name;
    shopObj.mobile = req.body.mobile;
    shopObj.email = req.body.email;
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
  if (shopObj.address === null) {
    return res.json(
      AppResponseDto.buildWithErrorMessages(
        "You must provide the address for the shop"
      )
    );
  }

  let transac = undefined;
  sequelize
    .transaction({ autocommit: false })
    .then(function (transaction) {
      transac = transaction;
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
          throw err;
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

  Shops.findOne({ where: { id: req.params.shopId } })
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
      console.error("Error on finding a shop: ", err);
      return res.status(400).send({ error: err.message });
    });
};

// DELETE SHOP
exports.deleteShop = (req, res) => {
  // Check if this is admin
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }

  Shops.findOne({ where: { id: req.params.shopId } })
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
      return res.status(400).json({ error: err.message });
    });
};
