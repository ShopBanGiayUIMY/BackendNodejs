import middwarecontroller from '../controllers/middwarecontroller.js';
import authController from '../controllers/authcontroller.js';
import express from 'express';
const router = express.Router();

router.post('/register',authController.registerUser);
router.post('/login',authController.loginUser);
router.post('/refresh_token',authController.refreshToken);
router.post('/logout',middwarecontroller.verifyToken, authController.logoutUser);
router.get('/verify/:token',authController.verifyUser);
router.get('/infouser/:id',middwarecontroller.verifyUser, authController.GetEmailOrPhone);
router.post('/verify-user/:id',middwarecontroller.verifyUser, authController.ResetPassword);
router.post('/authentication-otp/:id',middwarecontroller.verifyUser,authController.authenticationOTP, authController.UpdatePassword);

export default router;