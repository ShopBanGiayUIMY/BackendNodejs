import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Queryuser from '../Querydb/Userdb.js';
import crypto from "crypto";
import nodemailer from "nodemailer";
// generate token
let refreshTokens = [];
const authController = {
  sendVerificationEmail : async (username,email, verificationToken) => {
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
    html: `<p style="color: #007bff; font-size: 18px;">Xin chào '${username}', Bạn hãy ấn vào link để xác nhận nhé:</p>
           <p><a href="http://192.168.137.193:8080/api/v1/auth/verify/${verificationToken}" style="text-decoration: none; color: #007bff; font-weight: bold;">Xác nhận tài khoản</a></p>
           <img src="URL_ẢNH_CỦA_BẠN" alt="Mô tả của ảnh" style="width: 300px; height: 200px;">`,
    text: `Xin chào '${username}', Bạn hãy ấn vào link để xác nhận nhé: http://192.168.2.106:8080/api/v1/auth/verify/${verificationToken}`,
};

  
    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully");
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  },
  sendVerificationOTP : async (username,email, OTP) => {
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
          'SELECT * FROM auth_users WHERE verificationToken = ?',
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
                  return res.status(500).json({ error: "Lỗi xác thực tài khoản" });
                }
                res.status(200).json({ message: "Tài khoản đã được xác thực thành công" });
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
    const randomSixDigits = randomNumber.toString().padStart(6, '0'); // Chuyển số thành chuỗi và thêm số 0 nếu có ít hơn 6 chữ số
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
      req.getConnection((err, conn) => {
        const kq = conn.query(
            Queryuser.registerUser,
            {
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
            },
            async (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Error registering the user" });
                }

                const user_id = result.insertId;
                console.log(user_id);
    
                // Thêm dữ liệu vào bảng auth_users với user_id và verificationToken
                conn.query(
                    'INSERT INTO auth_users (user_id, verificationToken) VALUES (?, ?)',
                    [user_id, verificationToken, auth_code],
                    (err, authUserResult) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ error: "Error adding verification token" });
                        }
                        res.status(200).json(result);
                        // Gửi email xác thực
                        authController.sendVerificationEmail(req.body.username,req.body.email, verificationToken);
                        console.log("Đăng ký thành công tài khoản: " + req.body.username);
                    }
                );
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
              console.log("đăng nhập thành công tài khoản "+user.username)
              console.log(result);
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
        conn.query(
          Queryuser.GetEmailOrPhone,
          userid,
          async (err, result) => {
            if (err) {
              return res.status(500).json({ error: "Error logging in" });
            }
            if (result.length === 0) {
              return res.status(404).json({ error: "User not found" });
            }
            const user = result[0];
            res.status(200).json(user);
          }
        );
      }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error logging in" });
      
    }
  },
  // change password
  ResetPassword: async (req, res) => {
    try {
      const {email,username,phone} = req.body;
      req.getConnection((err, conn) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error connecting to database" });
        }
        conn.query(
          Queryuser.GetUserResetPassword,
          [username,email,phone],
          async (err, result) => {
            if (err) {
              return res.status(500).json({ error: "Error logging in" });
            }
            if (result.length === 0) {
              return res.status(404).json({ error: "User not found" });
            }
            const user = result[0];
            const auth_code = authController.generateRandomSixDigits();
            console.log("mã otp là",auth_code);
            conn.query(
                'UPDATE auth_users SET auth_code = ? WHERE user_id = ?;',
                [auth_code,user.user_id],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ error: "Error adding verification token" });
                    }
                    res.status(200).json(result);
                    // Gửi email xác thực
                    authController.sendVerificationOTP(user.username,user.email, auth_code);
                    console.log("Reset tài khoản thành công: " +JSON.stringify(result));
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
  authenticationOTP: async (req, res,next) => {
    const { password,auth_code} = req.body;
    const id=req.params.id;
    console.log(id);
    try {
      req.getConnection((err, conn) => {
        const kq = conn.query(
            Queryuser.GetOtp,
            id,
            async (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Error registering the user" });
                }
                if (result.length === 0) {
                    return res.status(404).json({ error: "User not found" });
                }
                const user = result[0];
                if (user.auth_code == auth_code)
                {
                if(password==undefined){
                    res.status(200).json({ message:true });
                    console.log("mã otp đúng"); 
                }else{
                  next();
                }
                }
                else{
                    res.status(400).json({ message: "Mã OTP không đúng" });
                }
            }
        );


    });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error registering the user" });
    }
  }
  ,
  UpdatePassword: async (req, res) => {
    const { password} = req.body;
    const id=req.params.id;
    console.log(id);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      req.getConnection((err, conn) => {
        const kq = conn.query(
                    Queryuser.UpdatePassword,
                    [hashedPassword,id],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ error: "Error adding verification token" });
                        }
                        res.status(200).json({ message: "Đổi mật khẩu thành công" });
                        
                    }

                    );
                }
      )
            
    }
    catch (error) {
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
