import { DataTypes } from 'sequelize';
import sequelize from '../Conection/DbHelper.js';

const ProductImage = sequelize.define('ProductImage', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    image_url: {
        type: DataTypes.STRING(1000)
    }
}, {
    tableName: 'product_image', 
    timestamps: false 
});

ProductImage.belongsTo(Product, { foreignKey: 'product_id' }); 

export default ProductImage;
