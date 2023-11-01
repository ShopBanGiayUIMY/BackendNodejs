import jwt from 'jsonwebtoken';
const middwarecontroller = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token || req.headers.authorization;
        if (token) {
            // ví dụ Bearer token
            const accessToken = token.split(" ")[1];// lấy token từ header và cắt bỏ phần Bearer
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json("Token đã hết hạn hoặc không hợp lệ");
                }
                console.log(user);
                req.user = user;
                next();
            });
        }
        else {
            res.status(401).json("Bạn chưa đăng nhập");
        }
    },
    verifyAdmin: (req, res, next) => {
        middwarecontroller.verifyToken(req, res, () => {
            if (req.user.id == req.params.id || req.user.role)
            // nếu id của user trong token trùng với id trong params hoặc user là admin thì cho phép truy cập
            {
                next();
            }
            else {
                res.status(403).json("Bạn không có quyền truy cập");
            }
        });
    },
    verifyUser: (req, res, next) => {
        middwarecontroller.verifyToken(req, res, () => {
            if (req.user.id == req.params.id)
            // nếu id của user trong token trùng với id trong params thì cho phép truy cập
            {
                next();
            }
            else {
                res.status(403).json("Bạn không có quyền truy cập");
            }
        });
    },
};
export default middwarecontroller;