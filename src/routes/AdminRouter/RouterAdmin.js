import express from "express";

const router = express.Router();
import authRouter from "./AuthAdmin.js";
const layout = "layouts/layout";
import middwarecontroller from '../../middleware/middwarecontroller.js';
import authAdminController from '../../controllers/auth.Admin.controller.js';
router.get("/dashboard",middwarecontroller.verifyAdmin, (req, res) => {
  res.render("Screen/index", { title: "Dashboard", layout: layout });
});
router.use("", authRouter);


// khi nào làm thì ae nhớ tách lẻ file ra như ở RouterUser nhé 
export default router;
