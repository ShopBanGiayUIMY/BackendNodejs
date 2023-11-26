import Cart from '../../models/Cart.js';
import { CartService } from '../../services/cartService.js';

export const CartsController = {
  index: async (req, res) => {
    await CartService.getListCart(req.user.id)
    .then((carts) => {
      res.status(200).json(carts);
    }).catch((err) => {
      res.status(500).json({ message: err.message });
    });
  },

  show: async (req, res) => {
    console.log(req.params.id)
    console.log(req.user.id)
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
    }).catch((err) => {
      res
      .status(500)
      .json({ message: err.message });
    });
  },


  create: async (req, res) => {
    try {
      const cart = await CartService.createCart(req.user.id)
      res.status(201).json(cart);
    } catch (e) {
      res.status(500).json("server error")
    }
  },

  update: async (req, res) => {
    console.log(req.params.id)
    console.log(req.user.id)
    const cart = await Cart.findByPk(req.params.id);
    if (cart) {
      if (cart.user_id === req.user.id) {
        console.log("is cart of user")
        const result = await CartService.addProductToCart(
          req.params.id,
          req.body.product_detail_id,
          req.body.quantity
        )
        res.status(200).json(result)
      } else {
        console.log("403")
        res.status(403).json()
      }
    } else {
      res.status(404).json()
    }
  },

  delete: async (req, res) => {
    try {
      const result = await CartService.destroyCart()
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
