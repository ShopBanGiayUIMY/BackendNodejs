import VoucherService from "../../services/VoucherService.js";
const layout = "layouts/layout";
import ProductService from "../../services/ProductService.js";
import UserService from "../../services/UserService.js";
const VoucherAdminController = {
  index: async (req, res) => {
    try {
      res.render("voucher/voucher", { title: "Quản lý voucher", layout: layout });
    } catch (e) {
      console.log(e.message);
     
    }
  },
  create: async (req, res) => {
    try {
      if (req.method === "POST") {
        const {
          voucher_name,
          voucher_code,
          discount_amount_phamtram,
          discount_amount_vnd,
          max_price,
          voucher_type,
          reward_type,
          item_product_id_list,
          item_user_id_list,
          usage_quantity,
          start_date,
          end_date,
        } = req.body;
  
        let discount_amount = 0;
  
        if (discount_amount_phamtram !== "") {
          discount_amount = discount_amount_phamtram;
        } else if (discount_amount_vnd !== "") {
          discount_amount = discount_amount_vnd;
        }
  
        const item_product_id_list_arr = item_product_id_list.split(',').map(Number);
        const item_user_id_list_arr = item_user_id_list.split(',').map(Number);
        const voucher = {
          voucher_name,
          voucher_code,
          discount_amount,
          max_price,
          voucher_type,
          reward_type,
          item_product_id_list: JSON.stringify(item_product_id_list_arr),
          item_user_id_list:JSON.stringify(item_user_id_list_arr),
          usage_quantity,
          start_time: start_date,
          end_time: end_date,
        };
        console.log("Creating Voucher:", voucher);
        const result = await VoucherService.createVoucher(voucher);
  
        if (result) {
          res.status(200).json({ message: "success" });
        } else {
          res.status(500).json({ message: "Error creating voucher" });
        }
      } else {
        const result = await ProductService.getListProduct();
        const dataProduct = result.map((row) => {
          return {
            id: row.product_id,
            name: row.product_name,
          };
        });
  
        const Userresult = await UserService.getListUser();
        const dataUser = Userresult.map((row) => {
          return {
            id: row.user_id,
            username: row.username,
          };
        });
  
        res.render("voucher/createvoucher", {
          layout: layout,
          title: "Create Voucher",
          products: dataProduct,
          users: dataUser,
        });
      }
    } catch (e) {
      console.error("Error in create voucher:", e.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}  
export default VoucherAdminController;
