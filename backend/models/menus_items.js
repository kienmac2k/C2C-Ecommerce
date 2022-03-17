"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menus_Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Menus, {
        onDelete: "cascade",
        foreignKey: "menuId",
      });
    }
  }
  Menus_Items.init(
    {
      menuId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      order: DataTypes.INTEGER,
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Menus_Items",
    }
  );
  return Menus_Items;
};
