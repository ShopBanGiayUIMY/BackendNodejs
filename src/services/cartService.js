import Cart from '../models/Cart.js';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';
import ProductDetail from '../models/ProductDetail.js';
import ProductService from './ProductService.js';

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
  },
  createCart: async (userId) => {
    try {
      const cart = await Cart.create(
        {
          user_id: userId
        }
      );
      return cart;
    } catch (e) {
      throw e.message;
    }
  },
  addProductToCart: async (
    cartId,
    productDetailId,
    quantity
  ) => {
    try {
      const cartItem = await CartItem.findAll({
        where: {
          cart_id: cartId,
          product_detail_id: productDetailId
        }
      })
      if (await ProductService.canAddToCart(productDetailId, quantity)) {
        if (cartItem.length > 0) {
          console.log(cartItem)
          if (quantity === 0) {
            await CartItem.destroy({where: {
              product_detail_id: productDetailId,
              cart_id: cartId
            }})
            return {message: "delete cart item success"}
          }
          await CartItem.update({
            quantity: quantity
          }, {
            where: {
              product_detail_id: productDetailId,
              cart_id: cartId
            }
          })
          return {message: "update quantity of cart item success"};
        } else {
          await CartItem.create({
            cart_id: cartId,
            product_detail_id: productDetailId,
            quantity: quantity
          })
          return {message: "add to cart success"};
        }
      } else {
        console.log("error");
        return {message: "stock of product is not available"};
      }
    } catch (e) {
      throw e.message;
    }
  }
}