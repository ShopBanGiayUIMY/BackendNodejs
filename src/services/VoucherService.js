import Discount from "../models/Voucher.js";
import AuthUser from "../models/auth.model.js";

import connection from "../config/Connection.js";
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
      const result = await Discount.findAll();
      return result;
    } catch (e) {
      throw e.message;
    }
  },

  getListVoucher: async (user_id) => {
    const db = connection();
    db.connect();
    try {
      const user = await AuthUser.findOne({
        where: {
          user_id: user_id,
        },
        attributes: ["role"],
      });
      const voucher = await Discount.findAll();
      console.log("user.dataValues.role", user.dataValues.role);

      if (user.dataValues.role == 0) {
        return new Promise((resolve, reject) => {
          db.query(
            `
            SELECT *
FROM vouchers
WHERE (voucher_purpose = 0 OR voucher_purpose = 1)
  AND (
    JSON_SEARCH(item_user_id_list, 'one', ?) IS NOT NULL
    AND (
      use_history IS NULL
      OR JSON_SEARCH(use_history, 'one', ?) IS NULL
    )
  );`,
            [user_id, user_id],
            (err, rows) => {
              if (err) {
                console.log(err);
                reject(err);
              } else if (rows.length > 0) {
                resolve(rows);
              } else {
                resolve([]);
              }
            }
          );
        });
      } else {
        return {
          status: false,
        };
      }
    } catch (e) {
      throw e.message;
    }
  },
};
export default VoucherService;
