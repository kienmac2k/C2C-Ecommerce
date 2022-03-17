"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
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
      this.hasMany(models.Orders, {
        onDelete: "cascade",
        foreignKey: "addressId",
      });
    }
    getFullAddress() {
      return this.address + " " + this.city;
    }
    getPurchaser() {
      return this.firstName + " " + this.lastName;
    }
  }
  Addresses.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      mobile: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Addresses",
    }
  );
  return Addresses;
};
