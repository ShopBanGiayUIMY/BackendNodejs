import Cart from './Cart.js';
import CartItem from './CartItem.js';
import Product from './Product.js';
import ProductDetail from './ProductDetail.js';
import ProductImage from './ProductImage.js';
import Category from './Category.js';
import User from './User.js';

export default () => {
  console.log('associate model');
  User.hasMany(Cart, { foreignKey: 'user_id' });
  Cart.belongsTo(User, { foreignKey: 'user_id' });

  CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });
  Cart.hasMany(CartItem, { foreignKey: 'cart_id' });
  CartItem.belongsTo(ProductDetail, { foreignKey: 'product_detail_id'})

  Product.hasMany(ProductDetail, { foreignKey: 'product_id' });
  ProductDetail.belongsTo(Product, { foreignKey: 'product_id' });
  
  Product.hasMany(ProductImage, { foreignKey: 'product_id' });
  ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

  Product.belongsTo(Category, { foreignKey: 'category_id' });
  Category.hasMany(Product, { foreignKey: 'category_id'})
}

