const express = require("express");
const router = express.Router();

const VendorController = require("../../controllers/User/vendor");
const OrderController = require("../../controllers/User/order");
const AddressController = require("../../controllers/User/address");
const CommentController = require("../../controllers/User/comment");
const AccountController = require("../../controllers/User/account");
const AuthMiddleware = require("../../middleware/auth.middleware");

// Profile
router.get(
  "/profile",
  AuthMiddleware.mustBeAuthenticated,
  AccountController.getProfile
);

// Shop
router.get(
  "/shop",
  AuthMiddleware.mustBeAuthenticated,
  VendorController.getShopList
);
router.post(
  "/shop",
  AuthMiddleware.mustBeAuthenticated,
  VendorController.createShop
);
router.put(
  "/shop/:shopId",
  AuthMiddleware.mustBeAuthenticated,
  VendorController.updateShop
);
router.delete(
  "/shop/:shopId",
  AuthMiddleware.mustBeAuthenticated,
  VendorController.deleteShop
);

//Order
router.get(
  "/order/list",
  AuthMiddleware.mustBeAuthenticated,
  OrderController.getOrders
);
router.put(
  "/order/:orderId",
  AuthMiddleware.mustBeAuthenticated,
  OrderController.cancelOrder
);
//Address
router.get(
  "/address/list",
  AuthMiddleware.mustBeAuthenticated,
  AddressController.getAddresses
);
router.get(
  "/address/:addressId",
  AuthMiddleware.mustBeAuthenticated,
  AddressController.getAddressById
);
router.post(
  "/address/",
  AuthMiddleware.mustBeAuthenticated,
  AddressController.createAddress
);
router.put(
  "/address/:addressId",
  AuthMiddleware.mustBeAuthenticated,
  AddressController.updateAddress
);
router.delete(
  "/address/:addressId",
  AuthMiddleware.mustBeAuthenticated,
  AddressController.deleteAddress
);
//Comments
router.post(
  "/comment",
  AuthMiddleware.mustBeAuthenticated,
  CommentController.createComment
);
router.delete(
  "/comment/:commentId",
  AuthMiddleware.mustBeAuthenticated,
  CommentController.deleteComment
);

module.exports = router;
