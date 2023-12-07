import { Sequelize, or } from 'sequelize';
import CartItem from '../models/CartItem.js';
import Order from '../models/Order.js'
import OrderDetail from '../models/OrderDetail.js';
import Product from '../models/Product.js';
import ProductDetail from '../models/ProductDetail.js';
import sequelize from '../Connection/Sequelize.js';
import OrderStatus from '../models/OrderStatus.js';
import User from '../models/User.js';
import PaymentMethodType from '../models/PaymentMethodType.js';
import ShippingAddress from '../models/ShippingAddress.js';
export const OrderService = {
  //needed authn
  getOrderOfUser: async (userId) => {
    const result = await Order.findAll({
      where: {
        userId: userId,
      },
      include: [
        OrderDetail,
        OrderStatus,
      ]
    })
    return result
  },
  getAllOrder: async () => {
    const orders = await Order.findAll({
      include: [
        User,
        OrderStatus,
        PaymentMethodType,
        ShippingAddress
      ]
    });
    // console.log(JSON.stringify(orders))
    return orders
  },
  createOrderFromCart: async ({
    userId,
    shippingAddressId,
    paymentMethodId,
    cartId
  }, items) => {
    //TODO: should be validate data
    const cartItemInOrder = await CartItem.findAll({
      where: Sequelize.and(
        {
          cart_id: cartId
        },
        Sequelize.or(
          {
            item_id: items
          }
        )
      ),
      include: {
        model: ProductDetail,
        attributes: ["product_id", "stock"],
        include: {
          model: Product,
          attributes: ["product_price"]
        }
      }
    })
    const cartItemIdInOrder = await cartItemInOrder.map(e => e.item_id)
    if (cartItemInOrder.length !== items.length) {
      const cartItem = await items.filter(async e => ! {cartItemId: await cartItemIdInOrder.includes(e)})
      return {
        status: 400,
        message: `cart items does not belong to User ${userId}`,
        data: cartItem
      }
    }
    const error = { data: [] };
    let totalAmount = 0;
    for (const e of cartItemInOrder) {
      e.canOrder = true;
      if (e.quantity > e.ProductDetail.stock) {
        error.data.push({ cartItemId: e.item_id });
        e.canOrder = false;
      }
      e.amount = e.quantity * e.ProductDetail.Product.product_price;
      totalAmount += e.amount;
    }
    if (error.data.length > 0) {
      error.status = 401;
      error.message = 'cannot create order with item quantity not available'
      return error;
    } else {
      const transaction = await sequelize.transaction();
      try {
        const order = await Order.create({
          userId: userId,
          shippingAddressId: shippingAddressId,
          paymentMethodId: paymentMethodId,
          statusId: 1,
          totalAmount: totalAmount,
          orderDate: new Date
        }, {transaction: transaction})
        for (const e of cartItemInOrder) {
          await OrderDetail.create(
            {
              orderId: order.id,
              productDetailId: e.product_detail_id,
              quantity: e.quantity,
              price: e.ProductDetail.Product.product_price,
            },
            { transaction: transaction }
          );
          await CartItem.destroy({
            where:{
              item_id: e.item_id
            }
          })
        }
        await transaction.commit();
        return {
          status: 200,
          message: "ok"
        }
      } catch (e) {
        await transaction.rollback();
        return {
          status: 500,
          message: `server error`
        }
      }
    }
  },
  //needed authn
  cancelOrder: async ({userId, orderId}) => {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return {
        status: 404,
        message: 'not found'
      }
    }
    const orderUserId = order.userId;
    const orderStatusId = order.statusId;
    if (orderUserId !== userId) {
      return {
        status: 403,
        message: 'forbidden'
      }
    }
    if (orderStatusId !== 1 && orderStatusId !== 2) {
      return {
        status: 500,
        message: `cannot cancel an order in status isn't "PENDING" or "PROCESSING"`
      }
    }
    const result = await Order.update(
      {statusId: 5},
      {
        where: {
          id: orderId,
        }
      }
    ) 
    return {
      status: 200,
      message: `canceled ${result} order`
    }
  },
  //admin operation
  operateOrder: async () => {

  },
  //user can update order if status is pending
  isOrderCanBeUpdated: async () => {

  }
}