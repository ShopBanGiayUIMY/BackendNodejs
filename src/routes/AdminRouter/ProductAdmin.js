import express from "express";
import ProductAdminController from "../../controllers/Admin/Product.admin.controller.js";
import middwarecontroller from "../../middleware/middwarecontroller.js";
const router = express.Router();

router.get('/',middwarecontroller.verifyAdmin,ProductAdminController.index);
router.get('/create',middwarecontroller.verifyAdmin,ProductAdminController.create);
router.post('/create',ProductAdminController.create);


export default router;