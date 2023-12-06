import Cart from "../../models/Cart.js";
import { CartService } from "../../services/CartService.js";
import connection from "../../config/Connection.js";
import Cartdb from "../../Querydb/Cartdb.js";

export const CartsController = {
  index: async (req, res) => {
    await CartService.getCartOfUser(req.user.id)
      .then((carts) => {
        // console.log(carts);
        res.status(200).json(carts);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  },

  show: async (req, res) => {
    // console.log(req.params.id);
    // console.log(req.user.id);
    await CartService.getCartById(req.params.id)
      .then((carts) => {
        if (carts) {
          if (carts.user_id === req.user.id) {
            res.status(200).json(carts);
          } else {
            res.status(403).json();
          }
        } else {
          res.status(404).json();
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  },

  create: async (req, res) => {
    try {
      const cart = await CartService.createCart(req.user.id);
      res.status(201).json(cart);
    } catch (e) {
      res.status(500).json("server error");
    }
  },

  update: async (req, res) => {
    // console.log(req.params.id, "updateiddcart");
    // console.log(req.user.id, "updateiuser");
    // console.log(req.body.product_detail_id, "updatebody");
    //TODO validate request body
    const cart = await Cart.findByPk(req.params.id);
    if (cart) {
      if (cart.user_id === req.user.id) {
        // console.log("is cart of user");
        const result = await CartService.operateItemFromCart(
          req.params.id,
          req.body.product_detail_id,
          req.body.quantity
        );
        if (result.status < 0) {
          res.status(400).json(result);
        } else {
          res.status(200).json(result);
        }
      } else {
        res.status(403).json();
      }
    } else {
      res.status(404).json();
    }
  },

  delete: async (req, res) => {
    try {
      const result = await CartService.destroyCart();
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getTotalCart: async (req, res) => {
    try {
      const db = connection();
      db.connect();
      db.query(
        Cartdb.GetTotalCart,
        [req.user.id],
        async (err, rows, fields) => {
          if (err) {
            res.status(500).send({ error: err });
            return;
          }
          if (rows.length > 0) {
            const data = rows.map((row) => {
              return {
                total_cart_items: row.total_items,
              };
            });
            res.send(data);
          } else {
            res.status(404).send({ message: "Not found", status: 0 });
          }
        }
      );
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
