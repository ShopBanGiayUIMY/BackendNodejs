import Cart from '../models/Cart.js';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';
import ProductDetail from '../models/ProductDetail.js';

export const CartService = {
  getListCart: async (userId) => {
    try {
      const result = await Cart.findAll({
        where: { user_id: userId },
        include: [
          {
            model: CartItem,
            attributes: [
              "item_id",
              "quantity"
            ],
            include: [{
              model: ProductDetail,
              attributes: [
                "detail_id",
                "product_id",
                "color",
                "size",
                "stock",
              ],
              include: {
                model: Product,
                attributes: [
                  "product_name",
                  "product_description",
                  "product_price",
                  "category_id",
                  "thumbnail"
                ]
              }
            }]
          }
        ]
      })
      return result;
    } catch (e) {
      throw e.message;
    }
  },
  getCartById: async (cartId) => {
    try {
      const cart = await Cart.findByPk(cartId, {
        include: [
          {
            model: CartItem,
            attributes: [
              "item_id",
              "quantity"
            ],
            include: [{
              model: ProductDetail,
              attributes: [
                "detail_id",
                "product_id",
                "color",
                "size",
                "stock",
              ],
              include: {
                model: Product,
                attributes: [
                  "product_name",
                  "product_description",
                  "product_price",
                  "category_id",
                  "thumbnail"
                ]
              }
            }]
          }
        ]
      })
      return cart;
    } catch (e) {
      throw e.message;
    }
    
  }
}