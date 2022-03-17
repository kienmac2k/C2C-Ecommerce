const express = require("express");
const router = express.Router();

const ProductController = require("../../controllers/Vendor/product");
const OrderController = require("../../controllers/Vendor/order");
const AuthMiddleware = require("../../middleware/auth.middleware");

router.post(
  "/product/",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isVendor,
  ProductController.createProduct
);
router.put(
  "/product/:productId",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isVendor,
  ProductController.updateProduct
);
router.delete(
  "/product/:productId",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isVendor,
  ProductController.deleteProduct
);
//Orders
router.get(
  "/order/:shopId/list",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isVendor,
  OrderController.getOrdersIncluded
);
router.put(
  "/order/:orderId",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isVendor,
  OrderController.updateOrder
);

module.exports = router;
