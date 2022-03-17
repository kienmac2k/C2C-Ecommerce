"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Settings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Settings.init(
    {
      key: DataTypes.STRING,
      displayName: DataTypes.STRING,
      order: DataTypes.INTEGER,
      value: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Settings",
    }
  );
  return Settings;
};
