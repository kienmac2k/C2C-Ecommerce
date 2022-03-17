"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Products, {
        foreignKey: "productId",
        onDelete: "cascade",
        as: "product",
      });

      this.belongsTo(models.Users, {
        foreignKey: "userId",
        onDelete: "cascade",
        as: "user",
      });
    }
  }
  Comments.init(
    {
      content: DataTypes.STRING,
      productId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
