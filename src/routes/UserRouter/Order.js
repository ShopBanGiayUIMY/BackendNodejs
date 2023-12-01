import exxpress from 'express';
import middwarecontroller from '../../middleware/middwarecontroller.js';
import { OrderController } from '../../controllers/User/OrderController.js';

const router = exxpress.Router();

router.get('/', middwarecontroller.verifyUser, OrderController.index)
router.post('/', middwarecontroller.verifyUser, OrderController.create)
export default router;