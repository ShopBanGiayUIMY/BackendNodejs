import { OrderService } from "../../services/OrderService.js";

export const OrderController = {
  index: async (req, res) => {
    const userId = req.user.id;
    const orderStatusQueryParam = req.query?.statusCode;
    console.log(orderStatusQueryParam);
    if (orderStatusQueryParam) {
      if (
        ![
          "PENDING",
          "PROCESSING",
          "SHIPPING",
          "DELIVERED",
          "CANCELED",
        ].includes(orderStatusQueryParam)
      ) {
        req.status(400).json({ message: "invalid query params" });
      } else if (orderStatusQueryParam === "PENDING") {
        res
          .status(200)
          .json(await OrderService.getOrderOfUser({ userId, statusId: 1 }));
      } else if (orderStatusQueryParam === "PROCESSING") {
        res
          .status(200)
          .json(await OrderService.getOrderOfUser({ userId, statusId: 2 }));
      } else if (orderStatusQueryParam === "SHIPPING") {
        res
          .status(200)
          .json(await OrderService.getOrderOfUser({ userId, statusId: 3 }));
      } else if (orderStatusQueryParam === "DELIVERED") {
        res
          .status(200)
          .json(await OrderService.getOrderOfUser({ userId, statusId: 4 }));
      } else {
        res
          .status(200)
          .json(await OrderService.getOrderOfUser({ userId, statusId: 5 }));
      }
    } else {
      res.status(200).json(await OrderService.getOrderOfUser({ userId }));
    }
  },
  show: async (req, res) => {},
  create: async (req, res) => {
    const dto = {
      userId: req.user?.id,
      shippingAddressId: req.body?.shippingAddressId,
      paymentMethodId: req.body?.paymentMethodId,
      cartsId: req.body?.cartId,
      freightCost: req.body?.freightCost,
      vouchersId: req.body?.vouchersId,
      cartItems: req.body?.cartItems,
    };
    console.log(dto);
    const result = await OrderService.createOrderFromCart(dto);
    const { status, message, data } = result;
    if (status === 200) {
      res.status(200).json(message);
    } else if (status === 400 || status === 401) {
      res.status(400).json({ message, data });
    } else if (status === 500) {
      res.status(500).json(message);
    }
  },
  update: async (req, res) => {
    const dto = {
      userId: req.user.id,
      orderId: req.params.id,
    };
    // console.log(dto);
    const result = await OrderService.cancelOrder(dto);
    const { status, message } = result;
    res.status(status).json({ message: message });
  },
  destroy: async (req, res) => {},
};
