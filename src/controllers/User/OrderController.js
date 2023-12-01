import { OrderService } from "../../services/OrderService.js"

export const OrderController = {
  index: async (req, res) => {
    const userId = req.user.id;
    res.status(200).json(await OrderService.getOrderOfUser(userId))
  },
  show: async (req, res) => {

  },
  create: async (req, res) => {
    const userId = req.user.id;
    const validatorRequest = (req ,res) => {
      const {shippingAddressId, paymentMethodId, cartId, cartItems} = req.body;
      console.log(shippingAddressId, paymentMethodId, cartId, cartItems)
      if (!(shippingAddressId
        || paymentMethodId
        || cartId
        || cartItems)) ;
        // res.status(400).json({
        //   message: 'invalid request body'
        // })
    }
    validatorRequest(req, res);
    const dto = {
      userId: userId,
      shippingAddressId: req.body.shippingAddressId,
      paymentMethodId: req.body.paymentMethodId,
      cartId: req.body.cartId
    }
    // res.json('abc')
    const cartItems = req.body.cartItems;
    const result = await OrderService.createOrderFromCart(dto, cartItems)
    const {status, message, data} = result;
    if (status === 200) {
      res.status(200).json(message)
    } else if (status === 400 || status === 401) {
      res.status(400).json({message, data})
    } else {
      res.status(500).json('error')
    }
    // res.status(200).json({
    //   message: result.message,
    //   data: result.data
    // })
  },
  update: async (req, res) => {

  },
  destroy: async (req, res) => {

  }
}