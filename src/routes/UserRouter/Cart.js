import express from 'express';
import { CartsController } from '../../controllers/User/CartController.js';
import middwarecontroller from '../../middleware/middwarecontroller.js';
const router = express.Router();

// GET /carts
router.get('/',middwarecontroller.verifyUser, CartsController.index);

// GET /carts/:id
// router.get('/:id', middwarecontroller.verifyUser, CartsController.show);

// POST /carts
 router.post('/create', middwarecontroller.verifyUser, CartsController.create);

// add product to cart
router.post('/add-product-cart', middwarecontroller.verifyUser, CartsController.addtocart);
// PUT /carts/:id
router.put('/update', middwarecontroller.verifyUser, CartsController.update);
router.get('/total-cart', middwarecontroller.verifyUser, CartsController.getTotalCart);

// DELETE /carts/:id
router.delete('/delete-cart-user/:id', middwarecontroller.verifyUser, CartsController.delete);

export default router;
