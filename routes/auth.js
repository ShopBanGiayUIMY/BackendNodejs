import middwarecontroller from '../controllers/middwarecontroller.js';
import authController from '../controllers/authcontroller.js';
import express from 'express';
const router = express.Router();

router.post('/register',authController.registerUser);
router.post('/login',authController.loginUser);
router.post('/refresh_token',authController.refreshToken);
router.post('/logout',middwarecontroller.verifyToken, authController.logoutUser);

export default router;