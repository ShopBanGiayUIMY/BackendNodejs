import { DataTypes } from 'sequelize';
import sequelize from '../config/Sequelize.js';
import Product from './Product.js';

const ProductImage = sequelize.define('ProductImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'product_image',
  createdAt: false,
  updatedAt: false,
});

// ProductImage.associate = function(model) {
//   ProductImage.belongsTo(model.product, { foreignKey: 'product_id' });
// };


export default ProductImage;