import exxpress from 'express';
import middwarecontroller from '../../middleware/middwarecontroller.js';
import { OrderController } from '../../controllers/User/OrderController.js';

const router = exxpress.Router();

router.get('/', middwarecontroller.verifyUser, OrderController.index)
router.post('/', middwarecontroller.verifyUser, OrderController.create)
router.patch('/:id/cancel', middwarecontroller.verifyUser, OrderController.cancel)
router.patch('/:id/verify-delivered', middwarecontroller.verifyUser, OrderController.verifyDelivered)
export default router;