const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Product = require('./Product');

const ProductDetail = sequelize.define('ProductDetail', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING(50), // changed data type to VARCHAR(50)
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING(50), // changed data type to VARCHAR(50)
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

ProductDetail.belongsTo(Product);

module.exports = ProductDetail;
