import jwt from "jsonwebtoken";
let msg = "";
const middwarecontroller = {
  verifyToken: (req, res, next) => {
    if (req.headers.token) {
      // ví dụ Bearer token
      const accessToken = token.split(" ")[1]; // lấy token từ header và cắt bỏ phần Bearer
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          console.log("Token đã hết hạn hoặc không hợp lệ");
          return res.status(403).json("Token đã hết hạn hoặc không hợp lệ");
        }
        req.user = user;
        next();
      });
    } else if (req.cookies.accesstokens) {
      const accessToken = req.cookies.accesstokens;
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          console.log("Token đã hết hạn hoặc không hợp lệ");
          return res.status(403).json("Token đã hết hạn hoặc không hợp lệ");
        }
        req.user = user;
        next();
      });
    } else {
      console.log("Bạn chưa đăng nhập");
    res.status(403).json("Bạn chưa đăng nhập");
    }
  },
  verifyAdmin: (req, res, next) => {
    console.log("ưqwqw", req.method);

    middwarecontroller.verifyToken(req, res, () => {
      if (!req.user) {
        console.log("Bạn chưa đăng nhập");
        next();
      } else {
        if (req.method === "GET" && req.user.admin === "sucess") {
          next();
          return;
        } else {
          console.log("Bạn không có quyền truy cập");
          res.status(403).json("Bạn không có quyền truy cập");
        }
      }
    });
  },
  verifyUser: (req, res, next) => {
    middwarecontroller.verifyToken(req, res, () => {
      if (req.user.id == req.params.id) {
        // nếu id của user trong token trùng với id trong params thì cho phép truy cập
        next();
      } else {
        console.log("Bạn không có quyền truy cập");
        res.status(403).json("Bạn không có quyền truy cập");
      }
    });
  },
};
export default middwarecontroller;
