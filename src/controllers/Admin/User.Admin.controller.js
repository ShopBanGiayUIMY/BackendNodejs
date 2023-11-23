import UserService from "../../services/UserService.js";
const layout = "layouts/layout";

const UserAdminController = {
  index: async (req, res) => {
    // Lấy danh sách người dùng
    try {
      const userList = await UserService.getListUser();

      const data = userList.map((user) => {
        return {
          id: user.user_id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          full_name: user.full_name,
          address: user.address,
        };
      });
      res.render("User/users", { data, layout: layout, title: "User" });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
      res.status(500).send("Lỗi máy chủ nội bộ");
    }
  },
  createUserForm: async (req, res) => {
    res.render("User/addUser", {
      layout: layout,
      title: "Tạo mới người dùng",
    });
  },
  createUser: async (req, res) => {
    const { username, email, password, phone, full_name, address } = req.body;
    try {
      const result = await UserService.createUser(
        username,
        email,
        password,
        phone,
        full_name,
        address
      );
      if (result) {
        res.redirect("/admin/users"); // Chuyển hướng sau khi tạo mới thành công
      } else {
        res.status(500).send("Không thể tạo mới người dùng");
      }
    } catch (error) {
      console.error("Lỗi khi tạo mới người dùng:", error);
      res.status(500).send("Lỗi máy chủ nội bộ");
    }
  },
  edit: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await UserService.getListUser(userId);
      if (user) {
        res.render("User/editUser", {
          layout: layout,
          title: "Sửa thông tin người dùng",
          user: {
            id: user.user_id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            full_name: user.full_name,
            address: user.address,
          },
        });
      } else {
        res.status(404).send("Không tìm thấy người dùng");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      res.status(500).send("Lỗi máy chủ nội bộ");
    }
  },

  // Cập nhật thông tin người dùng sau khi sửa
  update: async (req, res) => {
    const userId = req.params.id;
    const updatedDetails = req.body; // Các thông tin người dùng được gửi từ form
    try {
      const result = await UserService.updateUserDetails(
        userId,
        updatedDetails
      );
      if (result) {
        res.redirect("/admin/users"); // Chuyển hướng sau khi cập nhật thành công
      } else {
        res.status(404).send("Không tìm thấy người dùng");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      res.status(500).send("Lỗi máy chủ nội bộ");
    }
  },

  // Xóa người dùng
  delete: async (req, res) => {
    const userId = req.params.id;
    try {
      const result = await UserService.deleteUser(userId);
      if (result) {
        res.redirect("/admin/users"); // Chuyển hướng sau khi xóa thành công
      } else {
        res.status(404).send("Không tìm thấy người dùng");
      }
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
      res.status(500).send("Lỗi máy chủ nội bộ");
    }
  },
};

export default UserAdminController;
