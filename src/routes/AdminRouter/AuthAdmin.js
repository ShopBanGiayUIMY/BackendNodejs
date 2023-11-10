import middwarecontroller from '../../middleware/middwarecontroller.js';
import authAdminController from '../../controllers/Admin/auth.Admin.controller.js';
import express from 'express';
const router = express.Router();

router.get('/login', authAdminController.loginAdmin);
router.post('/login',authAdminController.loginAdmin,middwarecontroller.verifyToken,middwarecontroller.verifyAdmin,(req,res)=>{
    res.redirect('/admin/dashboard');
});
router.get('/logout',authAdminController.logoutAdmin);
export default router;  