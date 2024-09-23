import axios from "axios";

// Kiểm tra và refresh token khi access token hết hạn: Mỗi khi gửi request tới API, bạn cần kiểm tra
// nếu accessToken hết hạn thì sẽ sử dụng refreshToken để lấy token mới từ backend.

const refreshToken = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/refresh",
      null,
      {
        withCredentials: true, // Để gửi cookie chứa refresh token
      }
    );
    const { accessToken } = response.data;

    // Lưu accessToken mới vào localStorage
    localStorage.setItem("accessToken", accessToken);

    return accessToken;
  } catch (error) {
    console.error("Không thể làm mới token", error);
  }
};

// Tạo hàm để gửi request có token: Khi gửi các request khác lên server,
//  bạn cần kiểm tra nếu token đã hết hạn thì lấy token mới bằng cách sử dụng refreshToken.
const apiRequest = async () => {
  let accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.post("http://localhost:3000/auth/refresh", {
      headers: { authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      // Token hết hạn, lấy token mới
      accessToken = await refreshToken();

      // Gửi lại request với token mới
      const response = await axios.post("http://localhost:3000/auth/refresh", {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    }
    throw error;
  }
};

export { apiRequest, refreshToken };
