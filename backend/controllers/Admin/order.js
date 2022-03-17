const OrderDto = require("../../dtos/responses/orders.dto");
const AppResponseDto = require("../../dtos/responses/app_response.dto");
const { Orders, Addresses } = require("../../models");

exports.getOrders = function (req, res, next) {
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.page_size) || 5;
  const offset = (page - 1) * pageSize;

  return Promise.all([
    Orders.findAll({
      order: [["createdAt", "DESC"]],
      include: [{ model: Addresses, as: "address" }],
      offset,
      limit: pageSize,
    }),
    Orders.findAndCountAll({
      attributes: ["id"],
    }),
  ])
    .then(function (results) {
      const ordersCount = results[1].count;
      // results[0].rows.forEach(
      //   (order) => (order.order_items_count = order.order_items.length)
      // );
      const orders = results[0];
      return res
        .status(200)
        .json(
          OrderDto.buildPagedList(
            orders,
            page,
            pageSize,
            ordersCount,
            req.baseUrl,
            false,
            true
          )
        );
    })
    .catch((err) => {
      return res
        .status(500)
        .json(AppResponseDto.buildSuccessWithMessages(err.message));
    });
};

// TODO
exports.updateOrder = function (req, res, next) {
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }
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
      console.error("Error on finding a product: ", err);
      return res.status(400).send({ error: err.message });
    });
};

// TODO
exports.deleteOrder = (req, res, next) => {
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }
  Orders.findOne({ where: { id: req.params.orderId } })
    .then((order) => {
      order
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
      console.error("Error on finding a order: ", err);
      return res.status(400).json({ error: err.message });
    });
};
