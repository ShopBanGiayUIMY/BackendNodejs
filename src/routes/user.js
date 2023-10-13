import express from "express";
import UserController from "../controllers/Usercontroller.js";
const router = express.Router();
router.get('/:id', UserController.getInfoUser);


export default router;