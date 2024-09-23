import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiRequest } from "../../api"; // Import hàm refreshToken đã tạo trước đó

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true); // Nếu có accessToken thì coi như đã đăng nhập
    }
  }, []);

  const logoutUser = async () => {
    try {
      // Gửi yêu cầu đăng xuất qua apiRequest
      const response = await apiRequest(); // Gọi hàm apiRequest trước

      // Tiến hành đăng xuất
      const logoutResponse = await axios.post(
        "http://localhost:3000/auth/logout", // Địa chỉ API logout
        {},
        {
          headers: { authorization: `Bearer ${response.accessToken}` }, // Sử dụng access token mới
          withCredentials: true,
        }
      );

      console.log("Đăng xuất thành công:", logoutResponse.data);

      // Xóa token khỏi localStorage và cập nhật trạng thái đăng nhập
      localStorage.removeItem("accessToken");
      setIsLoggedIn(false);
      navigate("/"); // Điều hướng về trang chính
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  const handleLogout = () => {
    logoutUser(); // Gọi hàm logoutUser khi nhấn nút logout
  };

  return (
    <div>
      <header className="bg-red-200 p-5 text-center m-5">
        <h1 className="text-9xl font-extrabold p-5 text-gray-700 transition-all hover:text-red-400 hover:scale-105">
          PCB Checking
        </h1>
        <nav className="flex justify-between items-center mt-8">
          <ul className="flex gap-20 ml-8">
            <li>
              <a
                href="/"
                className="text-xl font-medium text-gray-800 hover:text-red-400"
              >
                Home Page
              </a>
            </li>
            <li>
              <a
                href="/userguide"
                target="_blank"
                className="text-xl font-medium text-gray-800 hover:text-red-400"
              >
                User Guide
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-xl font-medium text-gray-800 hover:text-red-400"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-xl font-medium text-gray-800 hover:text-red-400"
              >
                History Detection
              </a>
            </li>
          </ul>
          <div className="flex gap-5">
            {isLoggedIn ? (
              <button
                className="bg-red-100 py-2 px-4 text-lg rounded hover:bg-red-200 transition"
                onClick={handleLogout}
              >
                Log out
              </button>
            ) : (
              <>
                <button
                  className="bg-red-100 py-2 px-4 text-lg rounded hover:bg-red-200 transition"
                  onClick={() => navigate(`/signup`)}
                >
                  Sign up
                </button>
                <button
                  className="bg-red-100 py-2 px-4 text-lg rounded hover:bg-red-200 transition"
                  onClick={() => navigate(`/login`)}
                >
                  Log in
                </button>
              </>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}
