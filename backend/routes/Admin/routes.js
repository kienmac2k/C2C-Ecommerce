const express = require("express");
const router = express.Router();

const CategoryController = require("../../controllers/admin/category");
const UserController = require("../../controllers/admin/account");
const ProductController = require("../../controllers/Admin/product");
const OrderController = require("../../controllers/Admin/order");
const ShopController = require("../../controllers/Admin/shop");
const AuthMiddleware = require("../../middleware/auth.middleware");

// User
router.get(
  "/user/list",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isAdmin,
  UserController.getAll
);
router.delete(
  "/user/:userId",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isAdmin,
  UserController.deleteUser
);
router.put(
  "/users/roles/:userId",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isAdmin,
  UserController.setRoleForUser
);

// Categories
router.post(
  "/category",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isAdmin,
  CategoryController.createCategory
);

router.post(
  "/category/subCategory",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isAdmin,
  CategoryController.createSubCategory
);
router.put(
  "/category/:categoryId",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isAdmin,
  CategoryController.updateCategory
);
router.delete(
  "/category/:categoryId",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isAdmin,
  CategoryController.deleteCategory
);

// Shops
router.put(
  "/shop/:shopId",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isAdmin,
  ShopController.updateShop
);
router.delete(
  "/shop/:shopId",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isAdmin,
  ShopController.deleteShop
);

//Orders
router.get(
  "/order/list",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isAdmin,
  OrderController.getOrders
);
router.put(
  "/order/:orderId",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isAdmin,
  OrderController.updateOrder
);
router.delete(
  "/order/:orderId",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isAdmin,
  OrderController.deleteOrder
);

// Products
router.post(
  "/product",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isAdmin,
  ProductController.createProduct
);
router.put(
  "/product/:productId",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isAdmin,
  ProductController.updateProduct
);
router.delete(
  "/product/:productId",
  AuthMiddleware.mustBeAuthenticated,
  AuthMiddleware.isAdmin,
  ProductController.deleteProduct
);

module.exports = router;
