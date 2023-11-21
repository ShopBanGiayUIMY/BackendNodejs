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
  getfullvoucher: async () => {
    try {
      const result = await Discount.findAll();
      return result;
    } catch (e) {
      throw e.message;
    }
  },
  getListVoucher: async (value) => {
    const user = await AuthUser.findOne({
      where: {
        user_id: value,
      },
      attributes: ["role"],
    });
    try {
      if (user.dataValues.role == 1) {
        const result = await Discount.findAll();
        return result;
      } else if (user.dataValues.role == 2) {
        const result = await Discount.findAll({
          where: {
            [Op.or]: [
              {
                [Op.and]: [
                  sequelize.literal(
                    `JSON_CONTAINS(Voucher.item_user_id_list, '[${value}]')`
                  ),
                  { voucher_purpose: user.dataValues.role },
                  { usage_quantity: { [Op.gt]: 0 } },
                ],
              },
              {
                [Op.and]: [
                  sequelize.literal(
                    `JSON_LENGTH(Voucher.item_user_id_list) = 0`
                  ),
                  { voucher_purpose: user.dataValues.role },
                  { usage_quantity: { [Op.gt]: 0 } },
                ],
              },
            ],
          },
        });
        return result;
      } else {
        const result = await Discount.findAll({
          where: {
            [Op.or]: [
              {
                [Op.and]: [
                  sequelize.literal(
                    `JSON_CONTAINS(Voucher.item_user_id_list, '[${value}]')`
                  ),
                  { voucher_purpose: user.dataValues.role },
                  { usage_quantity: { [Op.gt]: 0 } },
                ],
              },
              {
                [Op.and]: [
                  sequelize.literal(
                    `JSON_LENGTH(Voucher.item_user_id_list) = 0`
                  ),
                  { voucher_purpose: user.dataValues.role },
                  { usage_quantity: { [Op.gt]: 0 } },
                ],
              },
            ],
          },
        });
        return result;
      }
    } catch (e) {
      throw e.message;
    }
  },
};
export default VoucherService;
