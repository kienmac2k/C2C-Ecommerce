"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders_Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Orders_Products.init(
    {
      orderId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Orders_Products",
    }
  );
  return Orders_Products;
};
