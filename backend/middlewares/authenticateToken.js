// # Middleware xác thực người dùng với JWT
const jwt = require("jsonwebtoken");

const middlewares = {
  // Kiểm tra trạng thái đăng nhập
  verifyToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("aaaaaaa", authHeader);
    if (authHeader) {
      const accessToken = authHeader.split(" ")[1];
      console.log("Access Token:", accessToken); // Ghi log token

      jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (error, user) => {
        if (error) {
          return res.status(403).json("Token đã hết hạn.");
        }
        req.user = user; // Lưu thông tin user vào request
        next();
      });
    } else {
      return res.status(401).json("Bạn chưa đăng nhập.");
    }
  },

  // Kiểm tra xem người dùng có phải là admin hay không
  verifyTokenAdmin: (req, res, next) => {
    middlewares.verifyToken(req, res, () => {
      console.log("Thông tin user:", req.user); // Kiểm tra dữ liệu user
      if (req.user && req.user.is_admin == 1) {
        // Sử dụng === để so sánh chính xác
        next(); // Chỉ gọi next() nếu là admin
      } else {
        return res
          .status(403)
          .json("Bạn không phải là admin nên không có quyền truy cập."); // Sử dụng return để dừng hàm
      }
    });
  },
};

module.exports = middlewares;
