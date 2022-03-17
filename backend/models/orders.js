"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsToMany(models.Products, {
        through: "Orders_Products",
        foreignKey: "orderId",
        otherKey: "productId",
        as: "products",
      });
      this.belongsTo(models.Users, { foreignKey: "userId", as: "user" });
      this.belongsTo(models.Addresses, {
        foreignKey: "addressId",
        as: "address",
      });
    }
  }
  Orders.init(
    {
      orderNumber: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      grandTotal: DataTypes.INTEGER,
      itemCount: DataTypes.INTEGER,
      isPaid: DataTypes.BOOLEAN,
      paymentMethod: DataTypes.STRING,
      addressId: DataTypes.INTEGER,
      notes: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};
