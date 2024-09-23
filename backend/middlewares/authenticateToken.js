// # Middleware xác thực người dùng với JWT
const jwt = require("jsonwebtoken");

const middlewares = {
  // Kiểm tra trạng thái đăng nhập
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1]; // Đổi assetToken thành accessToken
      jwt.verify(accessToken, process.env.JWT_ASSECT_TOKEN, (error, user) => {
        if (error) {
          console.log("Token đã hết hạn");
          return res.status(403).json("Token đã hết hạn."); // Sử dụng return để dừng hàm
        }
        req.user = user;
        next(); // Chỉ gọi next() nếu không có lỗi
      });
    } else {
      console.log("Bạn chưa đăng nhập");
      return res.status(401).json("Bạn chưa đăng nhập."); // Sử dụng return để dừng hàm
    }
  },

  // Kiểm tra xem người dùng có phải là admin hay không
  verifyTokenAdmin: (req, res, next) => {
    middlewares.verifyToken(req, res, () => {
      console.log("Thông tin user:", req.user); // Kiểm tra dữ liệu user
      if (req.user && req.user.admin === 1) {
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
