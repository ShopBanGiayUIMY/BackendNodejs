import express from "express";
import ProductAdminController from "../../controllers/Admin/Product.admin.controller.js";
const router = express.Router();

router.get('/',ProductAdminController.index);
router.get('/create',ProductAdminController.create);
router.post('/create',ProductAdminController.create);


export default router;