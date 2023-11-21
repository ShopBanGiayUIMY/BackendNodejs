import VoucherService from "../../services/VoucherService.js";
const layout = "layouts/layout";
import ProductService from "../../services/ProductService.js";
import UserService from "../../services/UserService.js";
const VoucherAdminController = {
  index: async (req, res) => {
    try {
      const result = await VoucherService.getfullvoucher();
      const data = result.map((row) => {
        return {
          id: row.voucher_id,
          name: row.voucher_name,
          code: row.voucher_code,
          discount_amount: row.discount_amount,
          max_price: row.max_price,
          voucher_type: formatVoucherType(row.voucher_type),
          reward_type: formatVoucherReward(
            row.reward_type,
            row.discount_amount
          ),
          item_product_id_list: row.item_product_id_list,
          item_user_id_list: row.item_user_id_list,
          usage_quantity: row.usage_quantity,
          start_time: formatDate(row.start_time),
          end_time: formatDate(row.end_time),
          use_history : row.use_history,
        };
      });

      function formatDate(timestamp) {
        const date = new Date(timestamp * 1000);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }
      function formatVoucherType(voucherType) {
        switch (voucherType) {
          case 1:
            return "Tất cả sản phẩm";
          case 2:
            return "Sản phẩm";
          case 3:
            return "Mua Hàng";
          default:
            return "Không xác định";
        }
      }
      function formatVoucherReward(voucherReward, discount_amount) {
        switch (voucherReward) {
          case 1:
            return `Giảm giá  ${discount_amount}%`;
          case 2:
            return `Giảm giá với số tiền ${discount_amount}đ`;
          case 3:
            return "Miễn phí vận chuyển";
          default:
            return "Không xác định";
        }
      }

      res.render("voucher/voucher", {
        title: "Quản lý voucher",
        layout: layout,
        vouchers: data,
      });
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
        const item_product_id_list_arr = item_product_id_list
          .split(",")
          .map(Number);
          
        const item_user_id_list_arr = item_user_id_list.split(",").map(Number);

        const voucher = {
          voucher_name,
          voucher_code,
          discount_amount,
          max_price,
          voucher_type,
          reward_type,
          item_product_id_list: item_product_id_list != '[]' ? item_product_id_list_arr : '[]',
          item_user_id_list: item_user_id_list != '[]' ? item_user_id_list_arr : '[]',
          usage_quantity,
          start_time: start_date,
          end_time: end_date,
        };
        console.log("Creating Voucher:", voucher);
        const result = await VoucherService.createVoucher(voucher);

        if (result) {
         res.redirect("/admin/voucher");
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
  },
};
export default VoucherAdminController;
