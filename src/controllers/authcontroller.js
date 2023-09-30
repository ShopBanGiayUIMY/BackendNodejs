// const bcrypt = require("bcrypt"); // hash password
// const jwt = require("jsonwebtoken"); // tạo token
// const Queryuser = require("../Querydb/Queryuser");
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Queryuser from '../Querydb/Queryuser.js';
// generate token
let refreshTokens = [];
const authController = {
  // register
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      // create user
      req.getConnection((err, conn) => {
        const kq = conn.query(
          Queryuser.registerUser,
          {
            username: req.body.username,
            password: hashedPassword,
          },
          (err, result) => {
            if (err) {
              console.log(err)
              return res
                .status(500)
                .json({ error: "Error registering the user" });
            }
            res.status(200).json(result);
          }
        );
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error registering the user" });
    }
  },
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "200s" }
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },

  // login
  loginUser: async (req, res) => {
    try {
      // Kiểm tra username có tồn tại trong database hay không
      req.getConnection((err, conn) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error connecting to database" });
        }
        conn.query(
          Queryuser.loginUser,
          req.body.username,
          async (err, result) => {
            if (err) {
              return res.status(500).json({ error: "Error logging in" });
            }
            if (result.length === 0) {
              return res.status(404).json({ error: "User not found" });
            }
            const user = result[0];

            // So sánh password nhập vào và password trong database
            const validPassword = await bcrypt.compare(
              req.body.password,
              user.password
            );
            if (!validPassword) {
              return res.status(400).json({ error: "Wrong password" });
            }
            if (user && validPassword) {
              // tạo accesstoken
              const accesstoken = authController.generateAccessToken(user);
              // tạo refreshtoken
              const refreshtoken = authController.generateRefreshToken(user);
              // lưu refreshtoken vào mảng
              refreshTokens.push(refreshtoken);
              res.cookie("refreshToken", refreshtoken, {
                httpOnly: true,
                path: "/",
                sameSite: "strict",
                secure: false,
              });
              const { password, ...info } = user; // lấy hết các trường trong user._doc trừ password
              res.status(200).json({ ...info, accesstoken });
            }
          }
        );
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error logging in" });
    }
  },

  // tạo accesstoken mới từ refreshtoken
  refreshToken: async (req, res) => {
    const rf_token = req.cookies.refreshToken;
    if (!rf_token) return res.status(401).json("Bạn chưa đăng nhập");
    if (!refreshTokens.includes(rf_token))
    {
        return res.status(403).json("Refresh token không hợp lệ");
    }
      // kiểm tra refreshtoken có trong mảng refreshTokens hay không
      jwt.verify(rf_token, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err) {
          console.log(err);
        }
        else{
            refreshTokens = refreshTokens.filter((token) => token !== rf_token);
            // tạo accesstoken mới và refreshtoken mới
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken); // thêm refreshtoken mới vào mảng refreshTokens
            res.cookie("refreshToken", newRefreshToken, {
              httpOnly: true,
              path: "/",
              sameSite: "strict",
              secure: false,
            });
            res.status(200).json({ accesstoken: newAccessToken });
            console.log(refreshTokens);
        }
        // xóa refreshtoken cũ trong mảng refreshTokens
        
      });
  },
  // logout
  logoutUser: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.RefreshToken
    );
    res.status(200).json("Đăng xuất thành công");
  },
};

// module.exports = authController;
export default authController;
