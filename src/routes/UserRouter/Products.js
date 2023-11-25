import express from "express";
import ProductController from "../../controllers/User/ProductController.js";
const router = express.Router();

router.get('',ProductController.index);
router.get('/:id',ProductController.show);
// router.get('/search/:name',ProductController.search);
// router.get('/category/:id',ProductController.category);
// router.get('/category/:id/search/:name',ProductController.categorySearch);
// router.get('/category/:id/sort/:sort',ProductController.categorySort);
// router.get('/category/:id/search/:name/sort/:sort',ProductController.categorySearchSort);
// router.get('/sort/:sort',ProductController.sort);
 router.post('/solidproduct/',ProductController.GetSolidProductById);

export default router;