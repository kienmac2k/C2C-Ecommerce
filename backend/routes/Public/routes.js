const express = require("express");
const router = express.Router();

const CategoryController = require("../../controllers/Public/category");
const ProductController = require("../../controllers/Public/product");
const VendorController = require("../../controllers/Public/vendor");
const OrderController = require("../../controllers/Public/order");
const CommentController = require("../../controllers/Public/comment");
const UserAuthController = require("../../controllers/Public/auth");

// authentication
router.post("/auth/signin", UserAuthController.signin);
router.post("/auth/signup", UserAuthController.signup);
// reset password

// router.post("/auth/forgot-password", UserAuthController.forgotPassword);
// router.post("/auth/reset-password", UserAuthController.resetPassword);

// Category
router.get("/category/:id/detail", CategoryController.getCategoryById);
router.get("/category/list", CategoryController.getCategories);
router.get("/category/listByOrder", CategoryController.getCategoriesByOrder);
router.get("/category/:id/list", CategoryController.getSubCategory);
// Product
router.get("/product/list", ProductController.getAll);
router.get("/product/:id/detail", ProductController.getById); // <= Have to check
// router.get("/product/:id/related", ProductController.related);
router.get("/product/vendor/:id/list", ProductController.getByShop);
router.get("/product/category/:id/list", ProductController.getByCategory);

// Product search
router.get("/product/search", ProductController.searchProduct);

// Featured products
// router.get("/product/latest/list", ProductController.listLatest);
// router.get("/product/most-viewed/list", ProductController.listMostViewed);
// router.get("/product/flash-deal/list", ProductController.listFlashDeal);

//Vendor
router.get("/vendor/list", VendorController.getShops);
router.get("/vendor/:id/detail", VendorController.getById);

// Order
router.post("/order", OrderController.createOrder);
router.get("/order/trackOrder", OrderController.getOrderDetails);

//Comments
router.get("/comment/:productId", CommentController.getCommentsFromProduct);

module.exports = router;
