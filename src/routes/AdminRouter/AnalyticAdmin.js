import middwarecontroller from "../../middleware/middwarecontroller.js";
import AnalyticController from "../../controllers/Admin/Analytic.admin.controller.js";
import express from "express";
const router = express.Router();
router.get("/",  AnalyticController.index);

export default router;
