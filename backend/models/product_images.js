"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Products, { onDelete: "cascade" });
    }
  }
  Product_Images.init(
    {
      productId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "productId",
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "file_name",
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "file_path",
      },
      originalName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "original_name",
      },
      fileSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "file_size",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
        field: "created_at",
      },
    },
    {
      sequelize,
      modelName: "Product_Images",
    }
  );
  return Product_Images;
};
