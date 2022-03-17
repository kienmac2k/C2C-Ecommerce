'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Coupons.init({
    key: DataTypes.STRING,
    display_name: DataTypes.STRING,
    value: DataTypes.TEXT,
    detail: DataTypes.TEXT,
    type: DataTypes.STRING,
    order: DataTypes.INTEGER,
    group: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Coupons',
  });
  return Coupons;
};