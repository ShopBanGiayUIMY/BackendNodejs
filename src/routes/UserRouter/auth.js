import middwarecontroller from '../../middleware/middwarecontroller.js';
import authController from '../../controllers/auth.User.controller.js';
import indexController from '../../controllers/indexcontroller.js';
import express from 'express';
const router = express.Router();

router.get('/', indexController.index);
router.post('/register',authController.registerUser);
router.post('/login',authController.loginUser);
router.post('/refresh_token',authController.refreshToken);
router.post('/logout',middwarecontroller.verifyToken, authController.logoutUser);
router.get('/verify/:token',authController.verifyUser);
router.get('/infouser/:id',middwarecontroller.verifyUser, authController.GetEmailOrPhone);
router.post('/verify-user/:id',middwarecontroller.verifyUser, authController.ResetPassword);
router.post('/authentication-otp/:id',middwarecontroller.verifyUser,authController.authenticationOTP, authController.UpdatePassword);

export default router;