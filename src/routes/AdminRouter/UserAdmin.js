import express from "express";
import UserAdminController from "../../controllers/Admin/User.Admin.controller.js";
const router = express.Router();
router.get("", UserAdminController.index);

export default router;
