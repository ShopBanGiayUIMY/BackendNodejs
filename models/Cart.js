import { DataTypes } from 'sequelize';
import sequelize from '../config/Sequelize.js';

const Cart = sequelize.define('Cart', {
  cart_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'carts',
  createdAt: false,
  updatedAt: false,
});
Cart.belongsTo(sequelize.models.Cart, { foreignKey: 'user_id' })

export default Cart;