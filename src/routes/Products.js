
import express from "express";
import ProductController from "../controllers/ProductController.js";
const router = express.Router();
// register
router.get('',ProductController.index);
router.get('/:id',ProductController.show);

export default router;