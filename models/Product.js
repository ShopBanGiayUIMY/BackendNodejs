import { DataTypes } from 'sequelize';
import sequelize from '../config/Sequelize.js';

const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  product_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  product_description: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
  },
  product_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  thumbnail: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null,
  },
}, {
  sequelize,
  tableName: 'products',
  createdAt: false,
  updatedAt: false,
});
// Product.associate = function(models) {
//   Product.hasMany(models.ProductDetail, { foreignKey: 'product_id' })
//   Product.hasMany(models.ProductImage, { foreignKey: 'product_id' })
//   // Product.belongsTo(models.Category, { foreignKey: 'category_id' })
// }
// Cart.belongsTo(sequelize.models.Cart, { foreignKey: 'user_id' })

export default Product;