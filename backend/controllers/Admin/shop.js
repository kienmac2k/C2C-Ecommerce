const { Shops, sequelize } = require("../../models");
const ShopDto = require("../../dtos/responses/shops.dto");
const AppResponseDto = require("../../dtos/responses/app_response.dto");

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
      return res
        .status(500)
        .json(AppResponseDto.buildWithErrorMessages("Can not find your shop"));
    });
};
