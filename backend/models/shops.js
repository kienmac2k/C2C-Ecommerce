"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shops extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        onDelete: "cascade",
        foreignKey: "userId",
        as: "user",
      });
      this.hasMany(models.Products, { foreignKey: "shopId" });
    }
  }
  Shops.init(
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
      description: DataTypes.STRING,
      mobile: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Shops",
    }
  );
  return Shops;
};
