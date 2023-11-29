import VoucherService from "../../services/VoucherService.js";
import AuthUser from "../../models/auth.model.js";
const VoucherController = {
  index: async (req, res) => {
    try {
      if (req.user.id) {
        const result = await VoucherService.getListVoucher(req.user.id);
        
        const kq = result.map((item) => {
          let usage_remaining1;
          if (item.use_history == null){
            usage_remaining1 = item.usage_quantity;
          }else if(item.usage_quantity == 0){

            usage_remaining1 = 1- (JSON.parse(item.use_history).length);
          }
          else{
            usage_remaining1 = item.usage_quantity - (JSON.parse(item.use_history).length);
          }
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
            usage_remaining:usage_remaining1,
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
              const use_history_user = JSON.parse(rows[0].use_history);
              const userIdList = JSON.parse(rows[0].item_user_id_list);
              const usage_quantity = JSON.parse(rows[0].usage_quantity);

              if (use_history_user == null) {
                if (userIdList == null) {
                  if (rows[0].voucher_purpose == 0 && user_item.role == 0) {
                    const result = conn.query(
                      `UPDATE vouchers
                      SET item_user_id_list = JSON_ARRAY_APPEND(
                        COALESCE(item_user_id_list, JSON_ARRAY()),
                        '$',?
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
                          message: "Đã thêm voucher vào giỏ của bạn",
                          success: true,
                        });
                      }
                    );
                  }
                } else {
                  if (rows[0].voucher_purpose == 0 && user_item.role == 0) {
                    if (!userIdList.includes(req.user.id)) {
                      const result = conn.query(
                        `UPDATE vouchers
                        SET item_user_id_list = JSON_ARRAY_APPEND(
                          COALESCE(item_user_id_list, JSON_ARRAY()),
                          '$',?
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
                            message: "Đã thêm voucher vào giỏ của bạn",
                            success: true,
                          });
                        }
                      );
                    }else{
                      res.status(200).json({
                        message: "Voucher đã tồn tại trong giỏ của bạn",
                        success: true,
                      });
                    }
                  }
                }
              } else if (use_history_user != null) {
                if (rows[0].voucher_purpose == 0 && user_item.role == 0) {
                  if (use_history_user.includes(req.user.id)) {
                    res.status(200).json({
                      message: "Bạn đã sử dụng voucher này rồi",
                      success: true,
                    });
                  } else if (userIdList.includes(req.user.id)) {
                    res.status(200).json({
                      message: "Voucher đã tồn tại trong giỏ của bạn",
                      success: true,
                    });
                  } else if (usage_quantity == use_history_user.length) {
                    res.status(200).json({
                      message: "Số lượng voucher đã hết hoặc đã hết hạn",
                      success: true,
                    });
                  } else if (
                    !use_history_user.includes(req.user.id) &&
                    !userIdList.includes(req.user.id)
                  ) {
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
                          message: "Đã thêm voucher vào giỏ của bạn ",
                          success: true,
                        });
                      }
                    );
                  }
                }
              }
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
