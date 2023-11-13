import express from "express";
import UserController from "../../controllers/User/Usercontroller.js";
const router = express.Router();
router.get('/:id', UserController.getInfoUser);


export default router;