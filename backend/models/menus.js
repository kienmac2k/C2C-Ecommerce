"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Menus_Items);
    }
  }
  Menus.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Menus",
    }
  );
  return Menus;
};
