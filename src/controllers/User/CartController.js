import Cart from '../../models/Cart.js';
import User from '../../models/User.js';
import CartItem from '../../models/CartItem.js';
import Product from '../../models/Product.js';
import ProductDetail from '../../models/ProductDetail.js';
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
    //have not verify product_detail
    const { product_detail_id, quantity } = req.body;
    try {
      const cart = await Cart.create(
        {
          user_id: req.user.id,
        }
      );
      if (product_detail_id && quantity) {
        const cartItem = await CartItem.create(
          {
            cart_id: cart.cart_id,
            product_detail_id: product_detail_id,
            quantity: quantity,
          }
        )
      }
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
        console.log(req.body)
        const cartItem = await CartItem.update(
          {
            quantity: req.body.quantity
          },
          {
            where: {
              cart_id: cart.cart_id,
              product_detail_id: req.body.product_detail_id
            }
          }
        ).then(a => {
          console.log(a)
        })
        res.status(200).json()
      } else {
        res.status(403).json()
      }
    } else {
      res.status(404).json()
    }
  },

  delete: async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
