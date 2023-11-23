// import User from '../models/User.js';
// const UserService = {
//     getListUser: async () => {
//         try {
//             const result = await User.findAll();
//             return result;
//         } catch (e) {
//             throw e.message;
//         }
//     },
// }
// export default UserService;
import User from "../models/User.js";

const UserService = {
  getListUser: async () => {
    try {
      const result = await User.findAll();
      return result;
    } catch (e) {
      throw e.message;
    }
  },

  // Thêm chức năng lấy danh sách sản phẩm của người dùng
  getUserProducts: async (userId) => {
    try {
      const user = await User.findByPk(userId, { include: "products" });
      return user.products;
    } catch (e) {
      throw e.message;
    }
  },

  // Thêm chức năng sửa thông tin người dùng
  updateUserDetails: async (userId, updatedDetails) => {
    try {
      const user = await User.findByPk(userId);
      if (user) {
        await user.update(updatedDetails);
        return true;
      }
      return false;
    } catch (e) {
      throw e.message;
    }
  },

  // Thêm chức năng xóa người dùng
  deleteUser: async (userId) => {
    try {
      const user = await User.findByPk(userId);
      if (user) {
        await user.destroy();
        return true;
      }
      return false;
    } catch (e) {
      throw e.message;
    }
  },
};

export default UserService;
