const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { request } = require("express");
const { verifyToken } = require("../middlewares/authenticateToken");

let refreshTokens = [];

const authController = {
  // Phương thức tạo tài khoản
  registerUser: async (req, res) => {
    const { username, email, password } = req.body.data;

    if (!username || !email || !password) {
      return res.status(400).json("Tên, email và mật khẩu là bắt buộc.");
    }

    try {
      const emailExists = await User.checkEmailExists(email);
      if (emailExists) {
        return res.status(400).json("Email đã được sử dụng.");
      }

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const userId = await User.insertUser(
        username,
        email,
        hashedPassword,
        "email",
        false
      );
      if (userId) {
        res
          .status(200)
          .json({ message: "Người dùng đã được thêm thành công!", userId });
      } else {
        res.status(500).json("Không thể thêm người dùng.");
      }
    } catch (error) {
      res.status(500).json("Đã xảy ra lỗi.");
    }
  },

  // Tạo access token
  createAccessToken: (user) => {
    return jwt.sign(
      { id: user.id, admin: user.is_admin },
      process.env.JWT_ASSECT_TOKEN,
      { expiresIn: "30s" }
    );
  },

  // Tạo refresh token
  createRefreshToken: (user) => {
    return jwt.sign(
      { id: user.id, admin: user.is_admin },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: "365d" }
    );
  },

  // Phương thức đăng nhập
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Email và mật khẩu là bắt buộc.");
    }

    try {
      const emailExists = await User.checkEmailExists(email);
      if (!emailExists) {
        return res.status(400).json("Email không tồn tại.");
      }

      const dataUser = await User.checkEmailExists(email, true);
      const checkpass = await bcryptjs.compare(password, dataUser.password);

      if (!checkpass) {
        return res.status(401).json("Mật khẩu sai");
      }

      const accessToken = authController.createAccessToken(dataUser);
      const refreshToken = authController.createRefreshToken(dataUser);
      refreshTokens.push(refreshToken); // Sửa thành refreshTokens
      // Lưu refresh token vào cookie
      res.cookies("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
      });

      const { password: pwd, ...data } = dataUser;
      res.status(200).json({ data, accessToken });
    } catch (error) {
      res.status(500).json("Đã xảy ra lỗi khi đăng nhập");
    }
  },

  // Refresh token
  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json("Bạn chưa đăng nhập, chưa có cookie");
    }
    if (!refreshTokens.includes(refreshToken)) {
      // Sửa thành refreshTokens
      return res.status(403).json("Token nay khong phai la cua toi");
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (error, user) => {
      if (error) {
        return res.status(403).json("Refresh token không hợp lệ");
      }

      refreshTokens = refreshTokens.filter((token) => token !== refreshToken); // Sửa lại logic lọc
      const newAccessToken = authController.createAccessToken(user);
      const newRefreshToken = authController.createRefreshToken(user);
      refreshTokens.push(newRefreshToken); // Thêm token mới vào danh sách

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
      });

      res.status(200).json({ accessToken: newAccessToken });
    });
  },
};

module.exports = authController;
