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
router.get("/edit/:id", UserAdminController.edit);

// Cập nhật thông tin người dùng sau khi sửa đổi
router.post("/update/:id", UserAdminController.update);

// Xóa người dùng
router.delete("/delete/:id", UserAdminController.delete);

export default router;
