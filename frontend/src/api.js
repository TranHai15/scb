import axios from "axios";

// Kiểm tra và refresh token khi access token hết hạn
const refreshToken = async () => {
  console.log("Refreshing token...");
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/refresh",
      {}, // Không cần gửi body
      {
        withCredentials: false, // Không cần gửi cookie
      }
    );
    const { accessToken, refreshToken } = response.data;

    // Lưu accessToken và refreshToken mới vào localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return accessToken;
  } catch (error) {
    console.error("Không thể làm mới token", error);
    throw error; // Thêm throw để xử lý lỗi ở bên ngoài
  }
};

// Tạo hàm để gửi request có token
const apiRequest = async () => {
  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken");
  let id = localStorage.getItem("id");

  try {
    const response = await axios.post(
      "http://localhost:3000/auth/refresh",
      {
        accessToken,
        refreshToken,
        id,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Token hết hạn, lấy token mới
      console.log("Token expired. Refreshing...");
      accessToken = await refreshToken(); // Gọi hàm refreshToken
      // Gửi lại request với token mới
      const response = await axios.post(
        "http://localhost:3000/auth/refresh",
        {
          accessToken,
          refreshToken,
          id,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    }
    throw error;
  }
};

export { apiRequest, refreshToken };
