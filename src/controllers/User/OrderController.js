import { OrderService } from "../../services/OrderService.js"

export const OrderController = {
  index: async (req, res) => {
    const userId = req.user.id;
    res.status(200).json(await OrderService.getOrderOfUser(userId))
  },
  show: async (req, res) => {

  },
  create: async (req, res) => {
    const dto = {
      userId: req.user.id,
      shippingAddressId: req.body.shippingAddressId,
      paymentMethodId: req.body.paymentMethodId,
      cartId: req.body.cartId
    }
    const cartItems = req.body.cartItems;
    const result = await OrderService.createOrderFromCart(dto, cartItems)
    const {status, message, data} = result;
    if (status === 200) {
      res.status(200).json(message)
    } else if (status === 400 || status === 401) {
      res.status(400).json({message, data})
    } else if (status === 500){
      res.status(500).json(message)
    }
  },
  update: async (req, res) => {
    const dto = {
      userId: req.user.id,
      orderId: req.params.id
    }
    console.log(dto);
    const result = await OrderService.cancelOrder(dto)
    const {status, message} = result;
    res.status(status).json(message)
  },
  destroy: async (req, res) => {
  }
}