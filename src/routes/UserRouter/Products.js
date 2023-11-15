import express from "express";
import ProductController from "../../controllers/User/ProductController.js";
const router = express.Router();

router.get('',ProductController.index);
router.get('/:id',ProductController.show);

export default router;