import VoucherService from "../../services/VoucherService.js";
const VoucherController = {
    index: async (req, res) => {
        try {
            console.log(req.user.id);
            if(req.user.id){
                const result = await VoucherService.getListVoucherUser(req.user.id);
                res.status(200).json(result);
            }
           
        } catch (e) {
            console.log(e.message);
        }
    },
}
export default VoucherController;