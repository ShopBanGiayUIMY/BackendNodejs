import Order from '../models/Order.js'

export const OrderService = {
  //needed authn
  getOrderOfUser: async (userId) => {
    const result = await Order.findAll({
      where: {
        userId: userId,
      }
    })
    return result
  },
  //needed authn
  createOrder: async () => {
    
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