const layout = "layouts/layout";
const UserAdminController = {
  index: async (req, res) => {
    res.render("user/user", { layout: layout, title: "User" });
  },
};
export default UserAdminController;
