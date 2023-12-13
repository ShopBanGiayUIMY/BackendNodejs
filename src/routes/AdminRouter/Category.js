import middwarecontroller from "../../middleware/middwarecontroller.js";
import CategoriesController from "../../controllers/Admin/Category.admin.controller.js";
import express from "express";
const router = express.Router();
router.get("/", CategoriesController.getAllCategories);

router.get("/create", CategoriesController.createCategory);
router.post("/create", CategoriesController.createCategory);
export default router;
