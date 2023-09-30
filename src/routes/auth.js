// const authController = require('../controllers/authcontroller');
import middwarecontroller from '../controllers/middwarecontroller.js';
import authController from '../controllers/authcontroller.js';
// const middwarecontroller = require('../controllers/middwarecontroller');
// const router = require('express').Router();
import express from 'express';
const router = express.Router();
// register
router.post('/register',authController.registerUser);
// login
router.post('/login',authController.loginUser);
// refresh token
router.post('/refresh_token',authController.refreshToken);
// logout
router.post('/logout',middwarecontroller.verifyToken, authController.logoutUser);

// module.exports = router;
export default router;