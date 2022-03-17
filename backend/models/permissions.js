"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsToMany(models.Roles, {
        through: "Permissions_Roles",
        foreignKey: "permissionId",
        otherKey: "roleId",
        as: "roles",
      });
    }
  }
  Permissions.init(
    {
      key: DataTypes.STRING,
      tableName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Permissions",
    }
  );
  return Permissions;
};
