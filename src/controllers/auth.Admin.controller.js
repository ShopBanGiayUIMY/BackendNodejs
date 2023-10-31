import Users from "../models/user.model.js";
import AuthAdmin from "../models/auth.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let msg = "";
const layout = "layouts/layout";
const authAdminController = {
  generateAccessToken: (user) => {
    
    return jwt.sign(
      {
        id: user.user_id,
        admin: "sucess",
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30d" }
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.user_id,
        admin: "sucess",
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },
  dashboard: async (req, res) => {
    return res.redirect('/v1/admin/dashboard')
  },
  loginAdmin: async (req, res, next) => {
    const { username, password } = req.body;
    if (req.method == "POST") {
      try {
        const user = await Users.findOne({ where: { username: username } });
        if (user) {
          const validPassword = await bcrypt.compare(password, user.password);
          if (validPassword) {
            const authAdmin = await AuthAdmin.findOne({
              where: { user_id: user.user_id },
            });
        
            if (authAdmin && authAdmin.role == 1) {
              const accesstokens = authAdminController.generateAccessToken(authAdmin);
              console.log(accesstokens);
              res.cookie("accesstokens", accesstokens, {
                httpOnly: true,
                path: "/",
                sameSite: "strict",
                secure: false,
              });
              await AuthAdmin.update(
                { refreshtoken: authAdminController.generateRefreshToken(authAdmin) },
                { where: { user_id: user.user_id } }
              );
              msg = "Đăng nhập thành công !";
              next();
            }
            else{
              msg = "Bạn không có quyền truy cập !";
            }
          } 
        } else {
          msg = "Tài khoản hoặc mật khẩu không đúng !";
        }
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }
    return res.render("Login/login", { msg, layout: layout,title: "Đăng nhập" });
  },

  refreshToken: async (req, res) => {},
  logoutAdmin: async (req, res) => {
    res.clearCookie("accesstokens");
    res.status(200).json("Đăng xuất thành công");
  },
};

export default authAdminController;
