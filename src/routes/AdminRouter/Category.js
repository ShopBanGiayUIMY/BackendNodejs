import middwarecontroller from "../../middleware/middwarecontroller.js";
import CategoriesController from "../../controllers/Admin/Category.admin.controller.js";
import express from "express";
const router = express.Router();
router.get("/", CategoriesController.getAllCategories);

export default router;
