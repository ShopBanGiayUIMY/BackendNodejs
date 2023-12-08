import { or } from "sequelize";
import { OrderService } from "../../services/OrderService.js";
import OrderStatus from "../../models/OrderStatus.js";
import Order from "../../models/Order.js";

const layout = "layouts/layout";

const OrderController = {
  index: async (req, res) => {
    try {
      const orders = await OrderService.getAllOrder();
      console.log(JSON.stringify(orders));
      const orderStatus = await OrderStatus.findAll();
      const mapOrderToPayload = (order) => {
        return {
          id: order.id,
          user: {
            userId: order.userId,
            username: order.User.username,
            phone: order.User.phone,
            fullName: order.User.full_name,
            email: order.User.email,
          },
          orderDate: parseOrderDate(order.orderDate),
          shippingAddress: {
            id: order.ShippingAddress.id,
            userId: order.ShippingAddress.userId,
            fullContact: `
            ${order.ShippingAddress.state},
             ${order.ShippingAddress.city},
              ${order.ShippingAddress.recipientPhoneNumber}`,
          },
          deliveredAddress: order.deliveredAddressId,
          paymentStatus: order.paymentStatus,
          paymentMethod: {
            id: order.PaymentMethodType.id,
            paymentMethodName: order.PaymentMethodType.paymentMethodName,
          },
          transactionCode: order.transactionCode,
          orderStatus: {
            id: order.OrderStatus.id,
            code: order.OrderStatus.code,
            status: order.OrderStatus.name,
          },
          totalAmount: order.totalAmount,
        };
      };
      const parseOrderDate = (orderDate) => {
        const date = new Date(orderDate);

        const options = {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        };
        const formattedDate = date.toLocaleString("vi-VN", options);
        return formattedDate;
      };
      const ordersPayload = [];
      await orders.map((order) => {
        ordersPayload.push(mapOrderToPayload(order));
      });
      console.log(ordersPayload);
      res.render("order/order", {
        title: "Quản lý đơn hàng",
        layout: layout,
        data: { orders: ordersPayload, orderStatus: orderStatus },
      });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    let dto = req.body;
    dto = {...dto, orderId: + req.params.id}
    try {
      const { orderId, statusId } = dto;
      if (
        !(orderId || statusId) ||
        isNaN(orderId) ||
        isNaN(statusId) ||
        orderId <= 0 ||
        statusId <= 0
      ) {
        console.log('400 1')
        res.status(400).json({ message: "invalid payload" });
        return;
      }
      await Order.update({
        statusId: statusId
      }, {
        where: {
          id: orderId
        }
      })
      res.status(200).json({message: 'ok'})
      return;
    } catch (e) {
      console.log(e)
      console.log('400 2')
      res.status(400).json({message: 'invalid payload'})
      return;
    }
    
  },
};
export default OrderController;
