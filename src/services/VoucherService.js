import Discount from "../models/Voucher.js";
import AuthUser from "../models/auth.model.js";
import { Op } from "sequelize";
import sequelize from "../Connection/Sequelize.js";
const VoucherService = {
  createVoucher: async (voucher) => {
    try {
      const result = await Discount.create(voucher);
      return result;
    } catch (e) {
      throw e.message;
    }
  },
  updateVoucher: async (voucher) => {
    try {
      const result = await Discount.update(voucher, {
        where: {
          voucher_id: voucher.voucher_id,
        },
      });
      return result;
    } catch (e) {
      throw e.message;
    }
  },
  deleteVoucher: async (voucher) => {
    try {
      const result = await Discount.destroy({
        where: {
          voucher_id: voucher.voucher_id,
        },
      });
      return result;
    } catch (e) {
      throw e.message;
    }
  },

  Getvoucherbyid: async (voucher) => {
    try {
      const result = await Discount.findOne({
        where: {
          voucher_id: voucher.voucher_id,
        },
      });
      return result;
    } catch (e) {
      throw e.message;
    }
  },
  getListVoucherAdmin: async () => {
    try {
      const result = await Discount.findAll( );
      return result;
    } catch (e) {
      throw e.message;
    }
  },

  getListVoucher: async (value) => {
    try {
      const [user, vouchers] = await Promise.all([
        AuthUser.findOne({
          where: {
            user_id: value,
          },
          attributes: ["role"],
        }),
        Discount.findAll(),
      ]);
      if (user.dataValues.role == 1) {
        return vouchers;
        // 0 là bình thường, 1 là chào mừng
      } else if (user.dataValues.role == 0) {
        const result = vouchers.filter((voucher) => {
          const userIdList = JSON.parse(voucher.item_user_id_list);
          const use_history = JSON.parse(voucher.use_history);
          const voucher_purpose = JSON.parse(voucher.voucher_purpose);
          const usage_quantity = JSON.parse(voucher.usage_quantity);
          const item_user_id_list = JSON.parse(voucher.item_user_id_list);
          // console.log("userIdList", userIdList);
          // console.log("use_history", use_history);
          // console.log("voucher_purpose", voucher_purpose);
          // console.log("usage_quantity", usage_quantity);
          // console.log("item_user_id_list", item_user_id_list);
          // console.log("value", value);
          if (use_history == null) {
            if (userIdList.includes(value)) {
              if (voucher_purpose == 0) {
                return voucher;
              }
              if (voucher_purpose == 1) {
                return voucher;
              }
              if (
                voucher_purpose == 2 &&
                usage_quantity > item_user_id_list.length
              ) {
                return voucher;
              }
            }
          } else {
            if (userIdList.includes(value) || !use_history.includes(value)) {
              if (voucher_purpose == 0 && usage_quantity > use_history.length) {
                return voucher;
              }
              if (voucher_purpose == 2) {
                return voucher;
              }
            }
          }
        });

        return result;
      }
    } catch (e) {
      throw e.message;
    }
  },
};
export default VoucherService;
