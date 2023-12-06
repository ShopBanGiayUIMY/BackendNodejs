import express from "express";
const router = express.Router();
import authRouter from "./AuthAdmin.js";
import ProductAdmin from "./ProductAdmin.js";
import Dashboard from "./Dashboard.js";
import VoucherAdmin from "./VoucherAdmin.js";
import User from "./UserAdmin.js";

router.use("/", Dashboard);
router.use("/admin/auth", authRouter);
router.use("/admin/products", ProductAdmin);
router.use("/admin/voucher", VoucherAdmin);
router.use("/admin/users", User);



// khi nào làm thì ae nhớ tách lẻ file ra như ở RouterUser nhé 
export default router;
