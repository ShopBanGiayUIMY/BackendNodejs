import express from "express";
import DashboardController from "../../controllers/Admin/Dashboard.controller.js";
const router = express.Router();

router.get("", (req, res) => {
  res.redirect("/admin/dashboard");
});

router.get("/admin/dashboard", DashboardController.index);
router.get("/admin/alert", DashboardController.alert);

export default router;
