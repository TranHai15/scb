// # Route liên quan đến xác thực người dùng
// import express và sử dụng Router
const express = require("express");

const router = express.Router(); // Tạo đối tượng router
const middlewares = require("../middlewares/authenticateToken");
// import file controller/authController
const authController = require("../controllers/authController");

// Định nghĩa route đăng ký người dùng
router.post("/register", authController.registerUser);

// dinh nghia route dang nhap
router.post("/login", authController.loginUser);

// dinh nghia route de refresh token
router.post("/refresh", authController.requestRefreshToken);

// dinh nghia route de logout
router.post("/logout", middlewares.verifyToken, authController.userLogout);
// Export router để sử dụng trong app.js
module.exports = router;
