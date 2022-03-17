const router = require("express").Router();
const adminRoutes = require("./Admin/routes");
const vendorRoutes = require("./Vendor/routes");
const userRoutes = require("./User/routes");
const publicRoutes = require("./Public/routes");

const config = require("../config/config.json");

// Admin
router.use("/admin", adminRoutes);

// Vendor
router.use("/vendor", vendorRoutes);

// User
router.use("/user", userRoutes);

// Public
router.use("/public", publicRoutes);

module.exports = router;
