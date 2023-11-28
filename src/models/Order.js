import { DataTypes } from 'sequelize';
import sequelize from '../Connection/Sequelize.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: "order_id"
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "order_date"
  },
  totalAmount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    field: "total_amount"
  },
  statusId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "status_id"
  },
}, {
  tableName: 'orders',
  timestamps: false
});

export default Order;
