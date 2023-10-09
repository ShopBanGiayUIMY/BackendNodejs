import express from 'express';
import authRouter from "./auth.js";
import categoriesRouter from "../routes/categoriesRouter.js"
const router = express.Router();

// Import các routes từ các tệp riêng lẻ
router.use('/auth', authRouter);
router.use('/categories', categoriesRouter);
export default router;
