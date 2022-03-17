const OrderDto = require("../../dtos/responses/orders.dto");
const AppResponseDto = require("../../dtos/responses/app_response.dto");
const {
  Orders,
  Users,
  Products,
  Addresses,
  sequelize,
  Sequelize,
  Orders_Products,
} = require("../../models");

async function createOrderNewAddress(req, res, transaction) {
  const mobile = req.body.mobile;
  const city = req.body.city;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const address = req.body.address;
  const zipCode = req.body.zipCode;
  const country = req.body.country;

  const addr = new Addresses({
    country,
    city,
    firstName,
    lastName,
    address,
    zipCode,
    mobile,
  });

  if (req.user != null) {
    addr.userId = req.userId;
  }

  await addr
    .save({ transaction })
    .then(async (address) => {
      if (req.user != null) await address.setUser(req.user);
      await _createOrderFromAddress(req, res, address, transaction);
    })
    .catch((err) => {
      throw err;
    });
}

exports.createOrder = async function (req, res, next) {
  const addressId = req.body.address_id;
  let transac = undefined;
  sequelize
    .transaction({ autocommit: false })
    .then(async function (transaction) {
      transac = transaction;
      if (req.user != null && addressId != null) {
        await _createOrderReuseAddress(req, res, addressId, transaction);
      } else if (addressId == null) {
        await createOrderNewAddress(req, res, transaction);
      }
      transaction.commit();
    })
    .catch((err) => {
      transac.rollback();
      return res.json(AppResponseDto.buildWithErrorMessages(err.message));
    });
};

async function _createOrderReuseAddress(req, res, addressId, transaction) {
  await Addresses.findOne({
    where: { id: addressId },
    attributes: [
      "id",
      "userId",
      "firstName",
      "lastName",
      "zipCode",
      "address",
      "country",
    ],
  })
    .then(async (address) => {
      if (address.userId !== req.user.id) {
        transaction.rollback();
        return res
          .status(403)
          .json(
            AppResponseDto.buildWithErrorMessages("You do not own this address")
          );
      } else {
        await _createOrderFromAddress(req, res, address, transaction);
      }
    })
    .catch((err) => {
      throw err;
    });
}

async function _createOrderFromAddress(req, res, address, transaction) {
  await Orders.create(
    {
      addressId: address.id,
      paymentMethod: req.body.paymentMethod,
      notes: req.body.notes,
    },
    { transaction }
  )
    .then(async (order) => {
      const cartItems = req.body.cartItems;
      await Products.findAll({
        where: {
          id: {
            [Sequelize.Op.in]: cartItems?.map((product) => product.id),
          },
        },
      })
        .then(async (products) => {
          console.log(
            "🚀 ~ file: order.js ~ line 116 ~ .then ~ products",
            products
          );
          // if a cartItem has a productId which no longer exists(or the user has tampered with that param) then error
          if (products.length !== cartItems.length) {
            transaction.rollback();
            return res
              .status(500)
              .json(
                AppResponseDto.buildWithErrorMessages(
                  "Make sure the products still exist"
                )
              );
          }

          const promises = products?.map((product, index) => {
            return new Orders_Products({
              price: product.price,
              quantity: cartItems[index].quantity,
              productId: product.id,
              orderId: order.id,
            }).save({ transaction });
          });

          Promise.all(promises)
            .then(async (orderItems) => {
              let itemCount = 0;
              let grandTotal = 0;

              orderItems.forEach((item) => {
                itemCount += item.quantity;
                grandTotal += item.price * item.quantity;
              });

              await order.setUser(req.user);
              await order.setAddress(address);
              await order.update({
                itemCount,
                grandTotal,
                orderNumber: `No.${order.id}`,
              });
              const result = await Orders.findOne({
                where: { id: order.id },
                attributes: [
                  "id",
                  "userId",
                  "orderNumber",
                  "status",
                  "grandTotal",
                  "itemCount",
                  "isPaid",
                  "paymentMethod",
                  "notes",
                ],
                include: [
                  {
                    model: Addresses,
                    as: "address",
                    where: { mobile: address.mobile },
                    // this is just to show how to load nested relations, normally I would not do this, I would load user from Order for readability
                    // include: [{ model: Users, as: "user" }],
                  },
                  {
                    model: Products,
                    as: "products",
                    attributes: ["id", "name", "price"],
                    through: { as: "orders_products" },
                  },
                  { model: Users, as: "user" },
                ],
              });
              return res
                .status(200)
                .json(OrderDto.buildDto(result, true, true, true));
            })
            .catch((err) => {
              console.log("🚀 ~ file: order.js ~ line 158 ~ .then ~ err", err);
              return res
                .status(500)
                .json(AppResponseDto.buildWithErrorMessages(err));
            });
        })
        .catch((err) => {
          transaction.rollback();
          console.log("🚀 ~ file: order.js ~ line 163 ~ .then ~ err", err);
          return res
            .status(500)
            .json(AppResponseDto.buildWithErrorMessages(err));
        });
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: order.js ~ line 167 ~ _createOrderFromAddress ~ err",
        err
      );
      transaction.rollback();
      return res.status(500).json(AppResponseDto.buildWithErrorMessages(err));
    });
}

exports.getOrderDetails = function (req, res, next) {
  Orders.findOne({
    where: { id: req.query.id },
    attributes: [
      "id",
      "userId",
      "orderNumber",
      "status",
      "grandTotal",
      "itemCount",
      "isPaid",
      "paymentMethod",
      "notes",
    ],
    include: [
      {
        model: Addresses,
        as: "address",
        where: { mobile: req.query.mobile },
        // this is just to show how to load nested relations, normally I would not do this, I would load user from Order for readability
        // include: [{ model: Users, as: "user" }],
      },
      {
        model: Products,
        as: "products",
        attributes: ["id", "name", "price"],
        through: { as: "orders_products" },
      },
      { model: Users, as: "user" },
    ],
  })
    .then((order) => {
      if (order.status === null) {
        return res
          .status(400)
          .json(AppResponseDto.buildWithErrorMessages("Order not found"));
      }
      // order.User = order.Address.User;
      return res.status(200).json(OrderDto.buildDto(order, true, true, true));
    })
    .catch((err) => {
      return res.status(500).json(AppResponseDto.buildWithErrorMessages(err));
    });
};
