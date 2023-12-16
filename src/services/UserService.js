import User from "../models/User.js";
import connection from "../config/Connection.js";

const UserService = {
  getListUser: async () => {
    try {
      const result = await User.findAll();
      return result;
    } catch (e) {
      throw e.message;
    }
  },
  getListUserAuthbyid: async (userId) => {
    return new Promise((resolve, reject) => {
      const db = connection();
      db.connect();
      db.query(
        "SELECT * FROM auth_users WHERE user_id = ?",
        userId,
        (err, rows) => {
          db.end(); // Close the database connection

          if (err) {
            console.log(err);
            reject("server error");
          } else if (rows.length === 0) {
            reject(`Not found product with id = ${userId}`);
          } else {
            const user_auth = rows[0];
            const { verificationToken, refreshtoken, ...info } = user_auth;
            resolve(info);
          }
        }
      );
    });
  },
  getListUserAddressbyid: async (userId) => {
    return new Promise((resolve, reject) => {
      const db = connection();
      db.connect();
      db.query(
        "SELECT * FROM shipping_addresses WHERE user_id = ?",
        userId,
        (err, rows) => {
          db.end(); // Close the database connection

          if (err) {
            console.log(err);
            reject("server error");
          } else if (rows.length === 0) {
            resolve({});
          } else {
            const user_address = rows[0];
            const {address_id,user_id, ...info } = user_address;
            resolve(info);
          }
        }
      );
    });
  },
  getListUserbyid: async (userId) => {
    try {
      const result = await User.findByPk(userId);
      return result;
    } catch (e) {
      throw e.message;
    }
  },
  addUserProduct: async (userId, productId) => {
    try {
      const user = await User.findByPk(userId);
      if (user) {
        await user.addProduct(productId);
        return true;
      }
      return false;
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

  // Thêm chức năng lấy danh sách sản phẩm của người dùng
  getUserProducts: async (userId) => {
    try {
      const user = await User.findByPk(userId, { include: "products" });
      return user.products;
    } catch (e) {
      throw e.message;
    }
  },

  // Thêm chức năng thêm sản phẩm cho người dùng
  addUserProduct: async (userId, productId) => {
    try {
      const user = await User.findByPk(userId);
      if (user) {
        await user.addProduct(productId);
        return true;
      }
      return false;
    } catch (e) {
      throw e.message;
    }
  },

  // Thêm chức năng xóa sản phẩm của người dùng
  removeUserProduct: async (userId, productId) => {
    try {
      const user = await User.findByPk(userId);
      if (user) {
        await user.removeProduct(productId);
        return true;
      }
      return false;
    } catch (e) {
      throw e.message;
    }
  },
  getUserDetails: async (userId) => {
    try {
      const user = await User.findByPk(userId); // Lấy thông tin người dùng bằng id
      return user; // Return thông tin chi tiết của người dùng
    } catch (error) {
      throw new Error(
        "Lỗi khi lấy thông tin chi tiết người dùng: " + error.message
      );
    }
  },
};

export default UserService;
