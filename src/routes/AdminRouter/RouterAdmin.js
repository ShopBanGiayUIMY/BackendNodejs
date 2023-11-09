import express from "express";

const router = express.Router();
import authRouter from "./AuthAdmin.js";
const layout = "layouts/layout";
import middwarecontroller from '../../middleware/middwarecontroller.js';
import authAdminController from '../../controllers/auth.Admin.controller.js';
import { ProductService } from "../../services/ProductService.js";
router.get("/dashboard",middwarecontroller.verifyAdmin, (req, res) => {
  res.render("Screen/index", { title: "Dashboard", layout: layout });
});
router.get('/a', async (req, res) => {
  const products = await ProductService.getListProduct();
  res.render("Screen/temp", {title: "a", layout: layout, products: products})
})
router.use("", authRouter);


// khi nào làm thì ae nhớ tách lẻ file ra như ở RouterUser nhé 
export default router;
