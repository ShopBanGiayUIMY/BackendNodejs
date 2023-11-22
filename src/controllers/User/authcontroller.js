import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Queryuser from "../../Querydb/Userdb.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
// generate token
let refreshTokens = [];
const authController = {
  sendVerificationEmail: async (username, email, verificationToken) => {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Configure the email service or SMTP details here
      service: "gmail",
      auth: {
        user: "huynvph20687@fpt.edu.vn",
        pass: "mosklpvfiuqhlrij",
      },
    });
    const HOST_NAME = process.env.HOST_NAME;
    const PORT = process.env.SERVER_PORT;

    // Compose the email message
    const mailOptions = {
      from: "amazon.com",
      to: email,
      subject: "Xác thực tài khoản",
      html: `
      <div style=" text-align: center;  max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <div style="">
        <img src="https://iili.io/Jo3RUns.png" alt="Mô tả của ảnh" style="width: 50px; height: 55px; border-radius: 10px;">
      </div>
      <div style="text-align: center;">
        <h2 style="color: #007bff; font-size: 24px;">Xác thực tài khoản</h2>
      </div>
      <div style="font-style: initial; font-family: 'Times New Roman', Times, serif; font-weight: bold  ">
        <p style="color: #333; font-size: 16px; text-align: center;">Xin chào <span style="color: rgb(0, 104, 216); font-weight: bold; font-size: 20px;">'${username}'</span>,</p>
        <p style="color: #333; font-size: 16px; text-align: center;">Nhấn vào liên kết dưới đây để xác nhận tài khoản của bạn!</p>
        <p style="text-align: center;">
          <a href="http://${HOST_NAME}:${PORT}/api/v1/auth/verify/${verificationToken}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Xác nhận tài khoản</a>
        </p>
      </div>
    </div>
      `,
      text: `Xin chào '${username}', Bạn hãy ấn vào link để xác nhận nhé: http://${HOST_NAME}:${PORT}/api/v1/auth/verify/${verificationToken}`,
    };

    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully");
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  },
  sendVerificationOTP: async (username, email, OTP) => {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Configure the email service or SMTP details here
      service: "gmail",
      auth: {
        user: "huynvph20687@fpt.edu.vn",
        pass: "mosklpvfiuqhlrij",
      },
    });

    // Compose the email message
    const mailOptions = {
      from: "amazon.com",
      to: email,
      subject: "Xác thực tài khoản",
      text: `Xin chào '${username}', Mã OTP của bạn là: ${OTP} , Bạn không được chia sẻ cho bất kì ai!`,
    };
    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      console.log("Đã gửi otp đến email", email);
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  },
  verifyUser: async (req, res) => {
    try {
      // Lấy verificationToken từ url
      const verificationToken = req.params.token;
      // Kiểm tra xem verificationToken có tồn tại trong database hay không
      req.getConnection((err, conn) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error connecting to database" });
        }
        conn.query(
          "SELECT * FROM auth_users WHERE verificationToken = ?",
          [verificationToken],
          async (err, result) => {
            if (err) {
              return res.status(500).json({ error: "Error verifying user" });
            }
            if (result.length === 0) {
              return res.status(404).json({ error: "User not found" });
            }
            const auth = result[0];
            // Cập nhật trường verified trong bảng Users thành true
            conn.query(
              'UPDATE auth_users SET verified = "true", verificationToken = "đã xác nhận" WHERE auth_id = ?;',
              [auth.auth_id],
              (err, result) => {
                if (err) {
                  return res
                    .status(500)
                    .json({ error: "Lỗi xác thực tài khoản" });
                }
                res
                  .status(200)
                  .json({ message: "Tài khoản đã được xác thực thành công" });
              }
            );
          }
        );
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error verifying user" });
    }
  },
  // random 6 số
  generateRandomSixDigits() {
    const min = 0;
    const max = 999999; // Số lớn nhất có thể tạo ra với 6 chữ số
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomSixDigits = randomNumber.toString().padStart(6, "0"); // Chuyển số thành chuỗi và thêm số 0 nếu có ít hơn 6 chữ số
    return randomSixDigits;
  },
  // register
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const verificationToken = crypto.randomBytes(20).toString("hex");
      const auth_code = authController.generateRandomSixDigits();
      // create user
      const username = req.body.username;
      const email = req.body.email;
      req.getConnection((err, conn) => {
        const kq = conn.query(
          "SELECT COUNT(*) as count FROM users WHERE username = ?",
          [username],
          (err, usernameResult) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .json({ error: "Error checking username existence" });
            }

            if (usernameResult[0].count > 0) {
              return res.status(200).json({
                message: "Tên đăng nhập đã tồn tại trong hệ thống!",
                success: false,
              });
            }

            // Kiểm tra xem email đã tồn tại hay chưa
            conn.query(
              "SELECT COUNT(*) as count FROM users WHERE email = ?",
              [email],
              (err, emailResult) => {
                if (err) {
                  console.log(err);
                  return res
                    .status(500)
                    .json({ error: "Error checking email existence" });
                }

                if (emailResult[0].count > 0) {
                  return res.status(200).json({
                    message: "Email đã tồn tại trong hệ thống!",
                    success: false,
                  });
                }

                // Nếu cả username và email đều không tồn tại, thực hiện đăng ký
                const kq = conn.query(
                  Queryuser.registerUser,
                  {
                    username: username,
                    password: hashedPassword,
                    email: email,
                    full_name: req.body.fullname,
                  },
                  async (err, result) => {
                    if (err) {
                      console.log(err);
                      return res
                        .status(500)
                        .json({ error: "Error registering the user" });
                    }

                    const user_id = result.insertId;
                    console.log(user_id);

                    // Thêm dữ liệu vào bảng auth_users với user_id và verificationToken
                    conn.query(
                      "INSERT INTO auth_users (user_id, verificationToken) VALUES (?, ?)",
                      [user_id, verificationToken, auth_code],
                      (err, authUserResult) => {
                        if (err) {
                          console.log(err);
                          return res
                            .status(500)
                            .json({ error: "Error adding verification token" });
                        } else {
                          res.status(200).json({
                            message: "Đăng ký thành công!",
                            success: true,
                          });
                          // Gửi email xác thực
                          authController.sendVerificationEmail(
                            username,
                            email,
                            verificationToken
                          );
                          console.log(
                            "Đăng ký thành công tài khoản: " + username
                          );
                        }
                      }
                    );
                  }
                );
              }
            );
          }
        );
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error registering the user" });
    }
  },
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.user_id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30d" }
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.user_id,
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
      const { username, email } = req.body;
      console.log(req.body);
      req.getConnection((err, conn) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error connecting to database" });
        }
        conn.query(
          Queryuser.loginUser,
          [username, email],
          async (err, result) => {
            if (err) {
              return res.status(500).json({ error: "Error logging in" });
            }
            if (result.length === 0) {
              return res.status(200).json({ message: "Tài khoản không tồn tại!" ,success: false });
            }
            const user = result[0];
            console.log(user);
            // So sánh password nhập vào và password trong database
            const validPassword = await bcrypt.compare(
              req.body.password,
              user.password
            );
            if (!validPassword) {
              return res.status(200).json({ message: "Sai mật khẩu!" ,success: false });
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
              res.status(200).json({ ...info, accesstoken , message: "Đăng nhập thành công",success: true });
              console.log("đăng nhập thành công tài khoản " + user.username);
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
    if (!refreshTokens.includes(rf_token)) {
      return res.status(403).json("Refresh token không hợp lệ");
    }
    // kiểm tra refreshtoken có trong mảng refreshTokens hay không
    jwt.verify(rf_token, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      } else {
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
    });
  },

  GetEmailOrPhone: async (req, res) => {
    try {
      const userid = req.params.id;
      req.getConnection((err, conn) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error connecting to database" });
        }
        conn.query(Queryuser.GetEmailOrPhone, userid, async (err, result) => {
          if (err) {
            return res.status(500).json({ error: "Error logging in" });
          }
          if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
          }
          const user = result[0];
          res.status(200).json(user);
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error logging in" });
    }
  },
  // change password
  ResetPassword: async (req, res) => {
    try {
      const { email, username, phone } = req.body;
      req.getConnection((err, conn) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error connecting to database" });
        }
        conn.query(
          Queryuser.GetUserResetPassword,
          [username, email, phone],
          async (err, result) => {
            if (err) {
              return res.status(500).json({ error: "Error logging in" });
            }
            if (result.length === 0) {
              return res.status(404).json({ error: "User not found" });
            }
            const user = result[0];
            const auth_code = authController.generateRandomSixDigits();
            console.log("mã otp là", auth_code);
            conn.query(
              "UPDATE auth_users SET auth_code = ? WHERE user_id = ?;",
              [auth_code, user.user_id],
              (err, result) => {
                if (err) {
                  console.log(err);
                  return res
                    .status(500)
                    .json({ error: "Error adding verification token" });
                }
                res.status(200).json(result);
                // Gửi email xác thực
                authController.sendVerificationOTP(
                  user.username,
                  user.email,
                  auth_code
                );
                console.log(
                  "Reset tài khoản thành công: " + JSON.stringify(result)
                );
              }
            );
          }
        );
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error logging in" });
    }
  },
  // xác thực otp
  authenticationOTP: async (req, res, next) => {
    const { password, auth_code } = req.body;
    const id = req.params.id;
    console.log(id);
    try {
      req.getConnection((err, conn) => {
        const kq = conn.query(Queryuser.GetOtp, id, async (err, result) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ error: "Error registering the user" });
          }
          if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
          }
          const user = result[0];
          if (user.auth_code == auth_code) {
            if (password == undefined) {
              res.status(200).json({ message: true });
              console.log("mã otp đúng");
            } else {
              next();
            }
          } else {
            res.status(400).json({ message: "Mã OTP không đúng" });
          }
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error registering the user" });
    }
  },
  UpdatePassword: async (req, res) => {
    const { password } = req.body;
    const id = req.params.id;
    console.log(id);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      req.getConnection((err, conn) => {
        const kq = conn.query(
          Queryuser.UpdatePassword,
          [hashedPassword, id],
          (err, result) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .json({ error: "Error adding verification token" });
            }
            res.status(200).json({ message: "Đổi mật khẩu thành công" });
          }
        );
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error registering the user" });
    }
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

export default authController;
