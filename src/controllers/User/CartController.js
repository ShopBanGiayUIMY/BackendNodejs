import Cart from "../../models/Cart.js";
import { CartService } from "../../services/CartService.js";
import pool from "../../config/Connection.js";
import Cartdb from "../../Querydb/Cartdb.js";

export const CartsController = {
  index: async (req, res) => {
    try {
      const skip = parseInt(req.query.skip, 10) || 0;
      const limit = parseInt(req.query.limit, 10) || 10;

      if (isNaN(skip) || isNaN(limit) || skip < 0 || limit <= 0) {
        return res.status(400).json({ error: 'Invalid skip or limit parameters' });
      }

      const db = await pool.getConnection();

      // Truy vấn dữ liệu từ cơ sở dữ liệu
      const [rows] = await db.query(Cartdb.getCartUsers, [req.user.user_id, limit, skip]);
      db.release();

      if (rows.length === 0) {
        return res.status(200).json({ message: 'Cart is empty', carts: [], total: 0, skip, limit });
      }

      // Xử lý dữ liệu sản phẩm từ cơ sở dữ liệu
      const products = rows.map(row => ({
        id: row.id,
        itemId: row.itemId,
        productDetailId: row.productDetailId,
        title: row.title,
        price: parseFloat(row.price).toFixed(2),
        quantity: row.quantity,
        color: row.color,
        size: row.size,
        stock: row.stock,
        total: parseFloat(row.total).toFixed(2),
        discountPercentage: parseFloat(row.discountPercentage).toFixed(2),
        discountedTotal: parseFloat(row.discountedTotal).toFixed(2),
        thumbnail: row.thumbnail
      }));

      // Tính toán tổng giá trị giỏ hàng và tổng giá trị giảm giá
      const cartTotal = products.reduce((acc, product) => acc + parseFloat(product.total), 0).toFixed(2);
      const cartDiscountedTotal = products.reduce((acc, product) => acc + parseFloat(product.discountedTotal), 0).toFixed(2);

      const totalProducts = products.length;
      const totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);

      // Kết quả trả về
      const result = {
        carts: [{
          cartId: rows[0].cartId, // Sử dụng cartId từ bản ghi đầu tiên
          products,
          userId: req.user.user_id,
          cartTotal,
          cartDiscountedTotal,
          totalProducts,
          totalQuantity
        }],
        total: rows.length,
        skip,
        limit
      };

      res.status(200).json(result);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  },
  update: async (req, res) => {
    let db;
    try {
      const { cartId, productDetailId, quantity } = req.body;
  
      // Kiểm tra đầu vào
      if (!cartId || !productDetailId || isNaN(quantity) || quantity < 1) {
        return res.status(400).json({ message: "Invalid cartId, productDetailId, or quantity" });
      }
  
      // Kết nối cơ sở dữ liệu
      db = await pool.getConnection();
  
      // Kiểm tra tồn kho
      const [rows] = await db.query('SELECT stock FROM product_details WHERE detail_id = ?', [productDetailId]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      const stock = rows[0].stock;
  
      if (quantity > stock) {
        return res.status(400).json({ message: `Requested quantity (${quantity}) exceeds stock (${stock})` });
      }
  
      // Cập nhật số lượng sản phẩm trong giỏ hàng
      const [result] = await db.query(Cartdb.updateCartItemQuantity, [quantity, cartId, productDetailId, req.user.user_id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Cart item not found or not updated" });
      }
  
      res.status(200).json({ message: "Cart item updated successfully" });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      if (db) db.release();
    }
  }
  

  ,
  addtocart: async (req, res) => { 
    await CartService.operateItemFromCart(req.body.cartId, req.body.productDetailId, req.body.quantity)
    .then((result) => {
      res.status(200).json(result);
    });

  },
  show: async (req, res) => {
    try {
      const cart = await CartService.getCartById(req.params.id);
      if (cart) {
        if (cart.user_id === req.user.user_id) {
          res.status(200).json(cart);
        } else {
          res.status(403).json({ message: "Forbidden" });
        }
      } else {
        res.status(404).json({ message: "Cart not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const cart = await CartService.createCart(req.user.user_id);
      res.status(201).json(cart);
    } catch (e) {
      res.status(500).json({ message: "Server error" });
    }
  },




  delete: async (req, res) => {
    const db = await pool.getConnection();
    try {
      const [result] = await db.query('DELETE FROM cart_items WHERE item_id = ?', [req.params.id]);

      // Kiểm tra xem có xóa được mục nào không
      if (result.affectedRows > 0) {
        // Kiểm tra lại giỏ hàng sau khi xóa
        const [cartItems] = await db.query('SELECT * FROM cart_items WHERE cart_id = ?', [req.params.cartId]);

        if (cartItems.length === 0) {
          res.status(200).json({ message: "Deleted successfully, cart is now empty" });
        } else {
          res.status(200).json({ message: "Deleted successfully" });
        }
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      db.release();
    }
  }


  ,

  getTotalCart: async (req, res) => {
    const db = await pool.getConnection();
    try {
      const [rows] = await db.query(Cartdb.GetTotalCart, [req.user.user_id]);
      db.release();

      if (rows.length > 0) {
        const totalItems = rows[0].total_items;
        res.status(200).json({ total_cart_items: totalItems });
      } else {
        res.status(404).json({ message: "Not found", status: 0 });
      }
    } catch (error) {
      db.release();
      res.status(500).json({ message: error.message });
    }
  },
};
