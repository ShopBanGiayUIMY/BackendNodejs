// import express from "express";
// import UserAdminController from "../../controllers/Admin/User.Admin.controller.js";
// const router = express.Router();
// router.get("", UserAdminController.index);

// export default router;
import express from "express";
import UserAdminController from "../../controllers/Admin/User.Admin.controller.js";

const router = express.Router();

// Hiển thị danh sách người dùng và sản phẩm của họ
router.get("", UserAdminController.index);

// Hiển thị form sửa thông tin người dùng
router.get("/:id/edit", UserAdminController.edit);

// Cập nhật thông tin người dùng sau khi sửa đổi
router.post("/:id/update", UserAdminController.update);

// Xóa người dùng
router.delete("/:id/delete", UserAdminController.delete);

export default router;
