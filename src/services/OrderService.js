import { Sequelize } from 'sequelize';
import CartItem from '../models/CartItem.js';
import Order from '../models/Order.js'
import OrderDetail from '../models/OrderDetail.js';
import Product from '../models/Product.js';
import ProductDetail from '../models/ProductDetail.js';

export const OrderService = {
  //needed authn
  getOrderOfUser: async (userId) => {
    const result = await Order.findAll({
      where: {
        userId: userId,
      },
      include: [
      ]
    })
    return result
  },
  //needed authn
  createOrder: async ({
    userId,
    shippingAddressId,
    paymentMethodId
  }, items) => {
    //TODO: should be validate data
    const productDetails = await CartItem.findAll({
      where: Sequelize.and(
        {
          cart_id: 206
        },
        Sequelize.or(
          {
            product_detail_id: [60, 61]
          }
        )
      ),
      include: {
        model: ProductDetail,
        attributes: null,
        include: {
          model: Product,
          attributes: ["product_price"]
        }
      }
    })
    console.log(JSON.stringify(productDetails))
    CartItem.findAll()
    items.forEach(element => {
      console.log(element.itemId)
      console.log(element.cartId)
    });
  },
  //needed authn
  cancelOrder: async () => {

  },
  //admin operation
  operateOrder: async () => {

  },
  //user can update order if status is pending
  isOrderCanBeUpdated: async () => {

  }
}