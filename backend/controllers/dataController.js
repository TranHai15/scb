// # Xử lý API từ AI và lưu dữ liệu vào MySQL
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MachDien = require("../models/Data");

const dataController = {
  // lay api tu al tra ve
  callApi: async (req, res) => {
    const { anh_mach, so_loi, bao_cao, ngay_them, id } = req.body.data;

    if (!anh_mach || !so_loi || !bao_cao || !id || !ngay_them) {
      return res
        .status(400)
        .json("Loi khong co du lieu gui tu frontend len api Al");
    }
    // console.log("anh mach", anh_mach);
    // console.log("so_loi", so_loi);
    // console.log("bao_cao", bao_cao);
    // console.log("id", id);
    // console.log("ngay_them", ngay_them);

    try {
      // insert vao database
      const checkInsert = await MachDien.insertMach(
        anh_mach,
        so_loi,
        bao_cao,
        ngay_them,
        id
      );
      //   console.log("Thực hiện truy vấn SQL:", insert);
      if (checkInsert) {
        res.status(200).json({
          message: "Thêm vào database thành công!",
          anh_mach,
          so_loi,
          bao_cao,
          ngay_them,
          id,
        });
      } else {
        res.status(500).json("Không thể them dữ liệu vào database");
      }
    } catch (error) {
      res.status(500).json("Đã xảy ra lỗi API.");
    }
  },
  // lấy toàn bộ dữ liệu
  getAllData: async (req, res) => {
    const id = req.params.id;
    console.log("id", id);
    if (!id) {
      return res.status(400).json("Không có id để lấy dữ liệu");
    }

    try {
      const dataApi = await MachDien.getMachByUserId(id);

      // Kiểm tra nếu dataApi là mảng trống
      if (!dataApi || dataApi.length === 0) {
        return res.status(200).json({
          message: "Không có dữ liệu nào cho người dùng này",
          data: [],
        });
      }

      // Nếu có dữ liệu, trả về dữ liệu
      return res.status(200).json({
        message: "Lấy dữ liệu thành công",
        data: dataApi,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Đã xảy ra lỗi khi lấy dữ liệu",
        error: error.message,
      });
    }
  },

  // Refresh token
  requestRefreshToken: async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res.status(401).json("Bạn chưa đăng nhập.");
    }

    try {
      const session = await MachDien.getSessionByMachDienId(req.body.id, true);
      const tokenExists = session[0]?.refresh_token === refreshToken;

      if (!tokenExists) {
        return res.status(403).json("Token này không phải là của tôi");
      }

      jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN,
        async (error, MachDien) => {
          if (error) {
            return res.status(403).json("Refresh token không hợp lệ");
          }

          const newAccessToken = authController.createAccessToken(MachDien);
          const newRefreshToken = authController.createRefreshToken(MachDien);
          await MachDien.updateRefreshToken(MachDien.id, newRefreshToken);

          res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          });
        }
      );
    } catch (error) {
      res.status(500).json("Đã xảy ra lỗi khi yêu cầu refresh token");
    }
  },

  // Logout
  MachDienLogout: async (req, res) => {
    await MachDien.deleteSession(req.body.id);
    res.clearCookie("refreshToken", { path: "/", sameSite: "none" });
    res.status(200).json("Đăng xuất thành công.");
  },
};

module.exports = dataController;
