const OrderDto = require("../../dtos/responses/orders.dto");
const AppResponseDto = require("../../dtos/responses/app_response.dto");
const { Orders, Products, Shops, Users, Addresses } = require("../../models");

exports.getOrdersIncluded = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: { id: req.user.id },
      include: [
        { model: Shops, as: "shops", where: { id: req.params.shopId } },
      ],
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

  Orders.findAll({
    include: [
      {
        model: Products,
        as: "products",
        attributes: ["id", "name", "price"],
        through: { as: "orders_products" },
        where: { shopId: req.params.shopId },
      },
      { model: Addresses, as: "address" },
    ],
  })
    .then((orders) => {
      return res.status(200).json({ data: orders });
    })
    .catch((err) => {
      console.error("Error on finding order: ", err);
      return res.status(500).json(AppResponseDto.buildWithErrorMessages(err));
    });
};

exports.updateOrder = (req, res) => {
  Orders.findOne({ where: { id: req.params.orderId } })
    .then((order) => {
      const orderData = {
        status: req.body.status || order.status,
      };

      order
        .update(orderData)
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
      console.error("This order is not yours", err);
      return res.status(400).send({ error: err.message });
    });
};
