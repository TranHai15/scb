const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoter");
dotenv.config(); // Đọc biến môi trường từ file .env

const app = express();

// Sử dụng cors
app.use(
  cors({
    origin: "http://localhost:5173", // Địa chỉ frontend của bạn
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json()); // Cho phép backend xử lý JSON
app.use(cookieParser()); // cookie
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Sử dụng authRouter cho các route bắt đầu bằng /auth
app.use("/auth", authRouter);
// Sử dụng userRouter cho các route bắt đầu bằng /user
app.use("/user", userRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
