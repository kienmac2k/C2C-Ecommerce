"use strict";
const { Model } = require("sequelize");
const slugify = require("slugify");
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsToMany(models.Products, {
        through: "Products_Categories",
        foreignKey: "categoryId",
        otherKey: "productId",
        onDelete: "cascade",
        as: "products_categories",
      });
    }
  }
  Categories.init(
    {
      parentId: DataTypes.INTEGER,
      order: DataTypes.INTEGER,
      name: DataTypes.STRING,
      img: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Categories",
      hooks: {
        beforeValidate: function (category, options) {
          category.slug = slugify(category.name, { lower: true });
        },
      },
    }
  );
  return Categories;
};
