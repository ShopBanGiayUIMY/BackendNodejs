import VoucherService from "../../services/VoucherService.js";
import AuthUser from "../../models/auth.model.js";
const VoucherController = {
  index: async (req, res) => {
    try {
      console.log(req.user.id);
      if (req.user.id) {
        const result = await VoucherService.getListVoucher(req.user.id);
        const kq = result.map((item) => {
          return {
            voucher_id: item.voucher_id,
            voucher_name: item.voucher_name,
            voucher_code: item.voucher_code,
            start_time: item.start_time,
            end_time: item.end_time,
            voucher_type: item.voucher_type,
            reward_type: item.reward_type,
            usage_quantity: item.usage_quantity,
            discount_amount: item.discount_amount,
            max_price: item.max_price,
            voucher_purpose: item.voucher_purpose,
          };
        });
        res.status(200).json(kq);
      }
    } catch (e) {
      console.log(e.message);
    }
  },
  findandaddvoucherformuser: async (req, res) => {
    try {
      const user_item = await AuthUser.findOne({
        where: {
          user_id: req.user.id,
        },
        attributes: ["role"],
      });
      req.getConnection(function (err, conn) {
        if (err) return next("Cannot Connect");
        var query = conn.query(
          "SELECT * FROM vouchers WHERE voucher_code = ?",
          req.body.voucher_code,
          (err, rows) => {
            if (err) {
              console.log(err);
              return next("Mysql error, check your query");
            }
            if (rows.length > 0) {
              const userIdList = JSON.parse(rows[0].use_history);
              const usage_quantity = JSON.parse(rows[0].usage_quantity);
              if (userIdList != null && userIdList.length > 0) {
                if (userIdList.includes(req.user.id)) {
                  res.status(200).json({
                    message: "Bạn đã sử dụng voucher này rồi",success: true
                  });
                } else if (
                  rows[0].voucher_purpose == 0 &&
                  user_item.role == 0 &&
                  !userIdList.includes(req.user.id)
                ) {
                  console.log("usage_quantity");
                  if (usage_quantity == userIdList.length) {
                    res.status(200).json({
                      message: "Số lượng voucher đã hết hoặc đã hết hạn",success: true
                    });
                  } else {
                    conn.query(
                      `UPDATE vouchers
                    SET item_user_id_list = JSON_ARRAY_APPEND(item_user_id_list, '$', ?)
                    WHERE voucher_code = ?;`,
                      [req.user.id, req.body.voucher_code],
                      (err, rows) => {
                        if (err) {
                          console.log(err);
                          return next("Mysql error, check your query");
                        }
                        res.status(200).json({
                          message: "Đã thêm voucher vào giỏ của bạn ",success: true
                        });
                      }
                    );
                  }
                }
              } else if (userIdList == null || userIdList.length == 0) {
                if (rows[0].voucher_purpose == user_item.role) {
                  const result = conn.query(
                    `UPDATE vouchers
                    SET item_user_id_list = JSON_ARRAY_APPEND(
                      COALESCE(item_user_id_list, JSON_ARRAY()),
                      '$',
                      ?
                    )
                    WHERE voucher_code = ?;
                    `,
                    [req.user.id, req.body.voucher_code],
                    (err, rows) => {
                      if (err) {
                        console.log(err);
                        return next("Mysql error, check your query");
                      }
                      res.status(200).json({
                        message:
                          "Đã thêm voucher vào giỏ của bạn khi list null",success:true
                      });
                    }
                  );
                }
              }
            } else {
              res.status(200).json({
                message: "Voucher không tồn tại",success: true
              });
            }
          }
        );
      });
    } catch (e) {
      console.log(e.message);
    }
  },
};
export default VoucherController;
