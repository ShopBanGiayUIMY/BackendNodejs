import { DataTypes } from 'sequelize';
import sequelize from '../config/Sequelize.js';

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(100),
  },
  full_name: {
    type: DataTypes.STRING(100),
  },
  address: {
    type: DataTypes.STRING(255),
  }
}, {
  sequelize,
  tableName: 'Users',
  createdAt: false,
  updatedAt: false,
});

User.hasMany(sequelize.models.Cart, { foreignKey: 'user_id' })

export default User;
