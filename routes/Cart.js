import express from 'express';
import { CartsController } from '../controllers/CartController.js';
import middwarecontroller from '../controllers/middwarecontroller.js';
const router = express.Router();

// GET /carts
router.get('/',middwarecontroller.verifyToken, CartsController.index);

// GET /carts/:id
router.get('/:id', (req, res) => {
  res.send('GET /carts/:id')
  // Return a specific cart by ID
});

// POST /carts
router.post('/', (req, res) => {
  res.send('POST /carts')
  // Create a new cart
});

// PUT /carts/:id
router.put('/:id', (req, res) => {
  res.send('PUT /carts/:id')
  // Update a specific cart by ID
});

// DELETE /carts/:id
router.delete('/:id', (req, res) => {
  res.send('DELETE /carts/:id')
  // Delete a specific cart by ID
});

export default router;
