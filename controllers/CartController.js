import { where } from 'sequelize';
import Cart from '../models/Cart.js';
import User from '../models/User.js';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';
import ProductDetail from '../models/ProductDetail.js';

export const CartsController = {
  index: async (req, res) => {
    await Cart.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: CartItem,
          attributes: [
            "item_id",
            "quantity"
          ],
          include: [{
            model: ProductDetail,
            attributes: [
              "detail_id",
              "product_id",
              "color",
              "size",
              "stock",
            ],
            include: {
              model: Product,
              attributes: [
                "product_name",
                "product_description",
                "product_price",
                "category_id",
                "thumbnail"
              ]
            }
          }]
        }
      ]
    }).then((carts) => {
      res.status(200).json(carts);
    }).catch((err) => {
      res.status(500).json({ message: err.message });
    });
  },

  show: async (req, res) => {
    console.log(req.params.id)
    console.log(req.user.id)
    await Cart.findByPk(req.params.id, {
      include: [
        {
          model: CartItem,
          attributes: [
            "item_id",
            "quantity"
          ],
          include: [{
            model: ProductDetail,
            attributes: [
              "detail_id",
              "product_id",
              "color",
              "size",
              "stock",
            ],
            include: {
              model: Product,
              attributes: [
                "product_name",
                "product_description",
                "product_price",
                "category_id",
                "thumbnail"
              ]
            }
          }]
        }
      ]
    }).then((carts) => {
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
      res.status(500).json({ message: err.message });
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
        // console.log(cartItem)
        // cartItem.quantity = 3;
        // cartItem.save();
        // cartItem.update();
        // cartItem.save();
        // CartItem.findOne({
        //   where: {
        //     cart_id: cart.cart_id,
        //     product_detail_id: req.body.product_detail_id
        //   }
        // }).then(cartItem => console.log(cartItem))
        
        // })
        // const cartItemJson = cartItems.filter(item => {
        //    const tmp = item.get();
        //    if (tmp.product_detail_id === req.body.product_detail_id) {
        //     return true;
        //    }
        //    return false;
        // })
        // cartItemJson.update(
        //   {
        //     quantity: req.body.quantity
        //   }
        // )
        // console.log(cartItemJson)
        //   ?.dataValues
        //   ?.ProductDetail)
        res.status(200).json()
      } else {
        res.status(403).json()
      }
    } else {
      res.status(404).json()
    }
    // console.log(cart);
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
