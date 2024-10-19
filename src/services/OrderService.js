import { Sequelize, or, Op } from "sequelize";
import CartItem from "../models/CartItem.js";
import Category from "../models/Category.js";
import Order from "../models/Order.js";
import OrderDetail from "../models/OrderDetail.js";
import Product from "../models/Product.js";
import ProductDetail from "../models/ProductDetail.js";
import sequelize from "../Connection/Sequelize.js";
import OrderStatus from "../models/OrderStatus.js";
import User from "../models/User.js";
import PaymentMethodType from "../models/PaymentMethodType.js";
import ShippingAddress from "../models/ShippingAddress.js";
import Voucher from "../models/Voucher.js";
import VoucherService from "./VoucherService.js";
import pool from "../config/Connection.js";
export const OrderService = {
  //needed authn
  getOrderOfUser: async ({ userId, statusId }) => {
    if (statusId) {
      console.log("with params");
      const result = await Order.findAll({
        where: {
          userId: userId,
          statusId: statusId,
        },
        include: [
          {
            model: OrderDetail,
            include: {
              model: ProductDetail,
              attributes: ["size", "color"],
              include: {
                model: Product,
                attributes: [
                  "product_name",
                  "product_price",
                  "thumbnail",
                  "product_id",
                ],
              },
            },
          },
          OrderStatus,
        ],
      });
      return result;
    }
    console.log("without params");
    const result = await Order.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: OrderDetail,
          include: {
            model: ProductDetail,
            attributes: ["size", "color"],
            include: {
              model: Product,
              attributes: [
                "product_name",
                "product_price",
                "thumbnail",
                "product_id",
              ],
            },
          },
        },
        OrderStatus,
      ],
    });
    return result;
  },
  getAllOrder: async () => {
    const orders = await Order.findAll({
      include: [User, OrderStatus, PaymentMethodType, ShippingAddress],
    });
    // console.log(JSON.stringify(orders))
    return orders;
  },
  getOrderById: async (orderId) => {
    const orders = await Order.findByPk(orderId,
      {
      include: [User, OrderStatus, PaymentMethodType, ShippingAddress,{
        model: OrderDetail,
        include: {
          model: ProductDetail,
          include: Product
        }
      }],
    });
    // console.log(JSON.stringify(orders))
    return orders;
  },
  createOrderFromCart : async ({
    userId,
    shippingAddressId,
    paymentMethodId,
    cartsId,
    cartItems,
    freightCost,
  }) => {
    // Kết nối tới cơ sở dữ liệu
    const connection = await pool.getConnection();
  
    try {
      // Bắt đầu giao dịch
      await connection.beginTransaction();
  
      // Bước 1: Xác thực giỏ hàng thuộc về người dùng
      const [cartCheckResult] = await connection.query(`
        SELECT cart_id FROM carts WHERE cart_id = ? AND user_id = ?
      `, [cartsId, userId]);
  
      if (cartCheckResult.length === 0) {
        throw new Error(`Cart ID ${cartsId} does not belong to User ${userId}`);
      }
  
      // Bước 2: Lấy thông tin chi tiết về sản phẩm trong giỏ hàng
      const [cartItemInOrder] = await connection.query(`
        SELECT ci.item_id, ci.quantity, pd.detail_id AS product_detail_id, pd.product_id, pd.stock, p.product_price
        FROM cart_items ci
        JOIN product_details pd ON ci.product_detail_id = pd.detail_id
        JOIN products p ON pd.product_id = p.product_id
        WHERE ci.cart_id = ? AND ci.item_id IN (?)
      `, [cartsId, cartItems]);
  
      // Kiểm tra xem tất cả các item trong cartItems có nằm trong cartsId hay không
      const cartItemIdInOrder = cartItemInOrder.map((e) => e.item_id);
      if (cartItemInOrder.length !== cartItems.length) {
        const cartItem = cartItems.filter(
          (e) => !cartItemIdInOrder.includes(e)
        );
        throw new Error(`Some cart items do not belong to Cart ID ${cartsId}`);
      }
  
      // Bước 3: Tính toán tổng tiền của đơn hàng
      let totalAmount = freightCost;
      const errorItems = [];
  
      for (const item of cartItemInOrder) {
        if (item.quantity > item.stock) {
          errorItems.push(item.item_id);
        }
        totalAmount += item.quantity * item.product_price;
      }
  
      if (errorItems.length > 0) {
        throw new Error(`Cannot create order with item quantity not available for items: ${errorItems.join(', ')}`);
      }
  
      // Bước 4: Tạo đơn hàng mới
      const [orderResult] = await connection.query(`
        INSERT INTO orders (user_id, shipping_address_id, payment_method_id, status_id, freight_cost, total_amount, order_date, payment_status)
        VALUES (?, ?, ?, 1, ?, ?, NOW(), 'UNPAID')
      `, [userId, shippingAddressId, paymentMethodId, freightCost, totalAmount]);
  
      const orderId = orderResult.insertId;
  
      // Bước 5: Thêm các chi tiết đơn hàng vào bảng order_details
      const orderDetailsQuery = cartItemInOrder.map(item => `
        (${orderId}, ${item.product_detail_id}, ${item.quantity}, ${item.product_price})
      `).join(',');
  
      await connection.query(`
        INSERT INTO order_details (order_id, product_detail_id, quantity, price)
        VALUES ${orderDetailsQuery}
      `);
  
      // Bước 6: Xóa các sản phẩm khỏi giỏ hàng
      await connection.query(`
        DELETE FROM cart_items WHERE cart_id = ? AND item_id IN (?)
      `, [cartsId, cartItems]);
  
      // Bước 7: Cập nhật số lượng tồn kho
      for (const item of cartItemInOrder) {
        const newQuantity = item.stock - item.quantity;
        await connection.query(`
          UPDATE product_details SET stock = ? WHERE detail_id = ?
        `, [newQuantity, item.product_detail_id]);
      }
  
      // Commit giao dịch
      await connection.commit();
  
      return {
        status: 200,
        message: "Order created successfully",
        data: orderId,
      };
    } catch (error) {
      // Rollback giao dịch nếu có lỗi
      await connection.rollback();
      return {
        status: 500,
        message: `Server error: ${error.message}`,
      };
    } finally {
      // Giải phóng kết nối
      connection.release();
    }
  }
  ,
  
  
  //needed authn -> authn in middleware layer
  cancelOrder: async ({ userId, orderId }) => {
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: OrderDetail,
          include: ProductDetail
        }
      ]
    });
    if (!order) {
      return {
        status: 404,
        message: "not found",
      };
    }
    const orderUserId = order.userId;
    const orderStatusId = order.statusId;
    if (orderUserId !== userId) {
      return {
        status: 403,
        message: "forbidden",
      };
    }
    if (orderStatusId !== 1 && orderStatusId !== 2) {
      return {
        status: 400,
        message: `cannot cancel an order in status isn't "PENDING" or "PROCESSING"`,
      };
    }
    console.log(JSON.stringify(order))
    const orderDetails = order.OrderDetails;
    
    const transaction = await sequelize.transaction();
    let result;
    try {
      for (const orderDetail of orderDetails) {
        const productDetailId = orderDetail.productDetailId
        const stockUpdated = orderDetail.quantity + orderDetail.ProductDetail.stock
        await ProductDetail.update({
          stock: stockUpdated
        }, {
          where: {
            detail_id: productDetailId
          },
          transaction: transaction
        })
      }
      const result = await Order.update(
        { statusId: 6 },
        {
          where: {
            id: orderId,
          },
          transaction: transaction
        }
      );
      transaction.commit();
      return {
        status: 200,
        message: `canceled ${result} order`,
      };
    } catch (e) {
      transaction.rollback();
      return {
        status: 500,
        message: 'server error'
      }
    }
  },
  verifyDeliveredOrder: async ({ userId, orderId }) => {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return {
        status: 404,
        message: "not found",
      };
    }
    const orderUserId = order.userId;
    const orderStatusId = order.statusId;
    if (orderUserId !== userId) {
      return {
        status: 403,
        message: "forbidden",
      };
    }
    if (orderStatusId !== 4) {
      return {
        status: 400,
        message: `cannot verify delivered an order in status isn't "SHIPPED"`,
      };
    } else {
      const result = await Order.update(
        {
          statusId: 5,
          paymentStatus: "PAID",
        },
        {
          where: {
            id: orderId,
          },
        }
      );
      return {
        status: 200,
        message: `verify delivered ${result} order`,
      };
    }
  },
  totalOrderStatus: async (userId) => {
    const query = `
    SELECT
    os.status_id AS status_id,
    os.status_code AS status_code,
    os.status_name AS status_name,
    COALESCE(COUNT(o.order_id), 0) AS total_orders
FROM
    order_status AS os
LEFT JOIN
    orders AS o
ON
    os.status_id = o.status_id AND o.user_id = :userId
GROUP BY
    os.status_id, os.status_code, os.status_name
`;

    try {
      const result = await sequelize.query(query, {
        replacements: { userId: userId },
        type: Sequelize.QueryTypes.SELECT,
      });
      if (result.length > 0) {
        return result;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Lỗi:", error);
      throw error;
    }
  },
  //admin operation
  operateOrder: async () => {},
  //user can update order if status is pending
  isOrderCanBeUpdated: async () => {},
  getOrderProcessingOfUser: async (userId) => {},
  analysicOrderInRangeOfDate: async ({ startDate, endDate }) => {
    const orders = await Order.findAll({
      where: {
        orderDate: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
        paymentStatus: "PAID",
      },
      attributes: ["id", "orderDate", "totalAmount"],
      include: [
        {
          model: User,
          attributes: ["username", "full_name"],
        },
        {
          model: OrderDetail,
          attributes: ["price", "quantity"],
          include: {
            model: ProductDetail,
            attributes: ["size", "color"],
            include: {
              model: Product,
              attributes: ["product_name", "thumbnail"],
              include: {
                model: Category,
                attributes: ["name"],
              },
            },
          },
        },
        {
          model: OrderStatus,
          attributes: ["code", "name"],
        },
        {
          model: PaymentMethodType,
          attributes: ["paymentMethodName"],
        },
      ],
    });
    return orders;
  },
};
