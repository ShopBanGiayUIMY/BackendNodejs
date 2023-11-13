import express from 'express';
import { CartsController } from '../../controllers/User/CartController.js';
import middwarecontroller from '../../middleware/middwarecontroller.js';
const router = express.Router();

// GET /carts
router.get('/',middwarecontroller.verifyToken, CartsController.index);

// GET /carts/:id
router.get('/:id', middwarecontroller.verifyToken, CartsController.show);

// POST /carts
router.post('/', middwarecontroller.verifyToken, CartsController.create);

// PUT /carts/:id
router.patch('/:id', middwarecontroller.verifyToken, CartsController.update);

// DELETE /carts/:id
router.delete('/:id', (req, res) => {
  res.send('DELETE /carts/:id')
  // Delete a specific cart by ID
});

export default router;
