import express from "express";
import AddressController from "../../controllers/User/addresscontroller.js";
const router = express.Router();
import middwarecontroller from '../../middleware/middwarecontroller.js';
router.get('/info/',middwarecontroller.verifyUser, AddressController.index);
router.post('/create/',middwarecontroller.verifyUser, AddressController.create);


export default router;