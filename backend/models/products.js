"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Categories, {
        through: "Products_Categories",
        foreignKey: "productId",
        otherKey: "categoryId",
        as: "categories",
      });

      this.belongsToMany(models.Orders, {
        through: "Orders_Products",
        foreignKey: "productId",
        otherKey: "orderId",
        as: "orders",
      });

      this.hasMany(models.Comments, {
        foreignKey: "productId",
        as: "comments",
      });
      this.hasMany(models.Product_Images, { as: "images" });
      this.belongsTo(models.Shops, { foreignKey: "shopId", as: "shop" });
    }
  }
  Products.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      coverImg: DataTypes.STRING,
      shopId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
