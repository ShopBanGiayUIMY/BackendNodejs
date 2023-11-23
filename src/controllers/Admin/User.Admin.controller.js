// const layout = "layouts/layout";
// const UserAdminController = {
//   index: async (req, res) => {
//     res.render("user/user", { layout: layout, title: "User" });
//   },
// };
// export default UserAdminController;
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

      res.render("User/user", { data, layout: layout, title: "Người dùng" });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
      res.status(500).send("Lỗi máy chủ nội bộ");
    }
  },
  // Thêm các phương thức khác như create, edit, update tương tự như ProductController
};

export default UserAdminController;
