import { DataTypes } from 'sequelize';
import sequelize from '../Conection/DbHelper.js';

const ProductDetail = sequelize.define('ProductDetail', {
    detail_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    color: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    size: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'product_details', 
    timestamps: false 
});

ProductDetail.belongsTo(Product, { foreignKey: 'product_id' }); // Thiết lập quan hệ với Product model

export default ProductDetail;
