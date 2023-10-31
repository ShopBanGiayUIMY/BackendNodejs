import Cart from '../models/Cart.js';
import User from '../models/User.js';

export const CartsController = {
  index: async (req, res) => {
    try {
      const carts = await Cart.findAll();
      const users = await User.findAll();
      res.status(200).json(carts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  show: async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.id);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createCart: async (req, res) => {
    const cart = new Cart({
      items: req.body.items,
      total: req.body.total,
    });

    try {
      const newCart = await cart.save();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateCart: async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteCart: async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
