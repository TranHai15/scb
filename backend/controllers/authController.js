const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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
      { id: user.id, is_admin: user.is_admin },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: "120s" }
    );
  },

  // Tạo refresh token
  createRefreshToken: (user) => {
    return jwt.sign(
      { id: user.id, is_admin: user.is_admin },
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

      // Lưu refresh token vào cơ sở dữ liệu
      const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // Thời gian hết hạn 365 ngày
      await User.insertSession(
        dataUser.id,
        accessToken,
        refreshToken,
        expiresAt
      );

      // Lưu refresh token vào cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
      });

      const { password: pwd, ...data } = dataUser;
      // console.log("data", { data });
      res.status(200).json({ data, accessToken });
    } catch (error) {
      res.status(500).json("Đã xảy ra lỗi khi đăng nhập");
    }
  },

  // Refresh token
  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    // console.log("refresh", refreshToken);
    if (!refreshToken) {
      return res.status(401).json("Bạn chưa đăng nhập, chưa có cookie");
    }

    try {
      // console.log("id", req.user.id);
      // Kiểm tra refresh token trong cơ sở dữ liệu
      const session = await User.getSessionByUserId(4);

      console.log("session", session[0].refresh_token);
      const tokenExists = session[0].refresh_token === refreshToken;

      // console.log("mes", tokenExists);

      if (!tokenExists) {
        return res.status(403).json("Token này không phải là của tôi");
      }

      jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN,
        async (error, user) => {
          if (error) {
            return res.status(403).json("Refresh token không hợp lệ");
          }

          // Xóa refresh token cũ và thêm token mới vào cơ sở dữ liệu
          await User.updateRefreshToken(user.id, refreshToken);
          const newAccessToken = authController.createAccessToken(user);
          const newRefreshToken = authController.createRefreshToken(user);

          await User.updateRefreshToken(user.id, newRefreshToken); // Cập nhật refresh token mới

          res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            path: "/",
            sameSite: "strict",
          });

          return res.status(200).json({ accessToken: newAccessToken });
        }
      );
    } catch (error) {
      res.status(500).json("Đã xảy ra lỗi khi yêu cầu refresh token");
    }
  },

  // Logout
  userLogout: async (req, res) => {
    const refreshToken = req.cookies.refreshToken; // Lấy token từ cookie
    if (!refreshToken) {
      return res.status(403).json("Không tìm thấy token để đăng xuất.");
    }

    // Xóa token trong cơ sở dữ liệu
    await User.deleteSession(req.user.id);

    // Xóa cookie
    res.clearCookie("refreshToken", { path: "/", sameSite: "strict" });

    return res.status(200).json("Đăng xuất thành công.");
  },
};

module.exports = authController;
