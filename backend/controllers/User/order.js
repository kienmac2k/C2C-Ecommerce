const OrderDto = require("../../dtos/responses/orders.dto");
const AppResponseDto = require("../../dtos/responses/app_response.dto");
const { Orders } = require("../../models");

exports.getOrders = function (req, res, next) {
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.page_size) || 5;
  const offset = (page - 1) * pageSize;

  return Promise.all([
    Orders.findAndCountAll({
      order: [["createdAt", "DESC"]],

      where: { userId: req.user.id },
      offset,
      limit: pageSize,
    }),
    Orders.findAndCountAll({
      where: { userId: req.user.id },
      attributes: ["id"],
    }),
  ])
    .then(function (results) {
      const ordersCount = results[1].count;
      results[0].rows.forEach(
        (order) => (order.order_items_count = order.order_items.length)
      );
      return res
        .status(200)
        .json(
          OrderDto.buildPagedList(
            results[0].rows,
            page,
            pageSize,
            ordersCount,
            req.baseUrl,
            false
          )
        );
    })
    .catch((err) => {
      return res
        .status(500)
        .json(AppResponseDto.buildSuccessWithMessages(err.message));
    });
};

exports.cancelOrder = (req, res) => {
  Orders.findOne({ where: { id: req.params.orderId, userId: req.user.id } })
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
