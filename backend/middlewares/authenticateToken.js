const jwt = require("jsonwebtoken");

const middlewares = {
  // Kiểm tra trạng thái đăng nhập
  verifyToken: (req, res, next) => {
    const token = req.body.accessToken;
    console.log("sdfgs", token);
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (error, user) => {
        if (error) {
          return res.status(401).json("Token đã hết hạn.");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("Bạn chưa đăng nhập.");
    }
  },

  // Kiểm tra xem người dùng có phải là admin hay không
  verifyTokenAdmin: (req, res, next) => {
    middlewares.verifyToken(req, res, () => {
      if (req.user && req.user.is_admin) {
        next();
      } else {
        return res
          .status(403)
          .json("Bạn không phải là admin nên không có quyền truy cập.");
      }
    });
  },
};

module.exports = middlewares;
