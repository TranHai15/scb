const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoter"); // Sửa lỗi chính tả ở đây
const dataRouter = require("./routes/dataRoutes");

dotenv.config(); // Đọc biến môi trường từ file .env

const app = express();
// Phục vụ các tệp tĩnh trong thư mục img
app.use("/img", express.static(path.join(__dirname, "../img")));
// Sử dụng cors
app.use(
  cors({
    origin: "http://localhost:5173", // Địa chỉ frontend của bạn
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
  })
);

// Sử dụng middleware cho JSON và URL-encoded
app.use(express.json({ limit: "10mb" })); // Giới hạn là 10MB
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser()); // cookie

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Sử dụng authRouter cho các route bắt đầu bằng /auth
app.use("/auth", authRouter);
// Sử dụng userRouter cho các route bắt đầu bằng /user
app.use("/user", userRouter);
// Sử dụng dataRouter cho các route bắt đầu bằng /api
app.use("/api", dataRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
