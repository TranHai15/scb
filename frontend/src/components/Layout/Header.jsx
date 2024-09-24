import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    const id = localStorage.getItem("id");
    if (!id) {
      console.error("Không tìm thấy id .");
      return;
    }

    try {
      const logoutResponse = await axios.post(
        "http://localhost:3000/auth/logout",
        { id }
      );

      console.log("Đăng xuất thành công:", logoutResponse.data);

      // Xóa token khỏi localStorage và cập nhật trạng thái đăng nhập
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("id");
      setIsLoggedIn(false);
      navigate("/"); // Điều hướng về trang chính

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
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
                href="/lichsu"
                className="text-xl font-medium text-gray-800 hover:text-red-400"
              >
                History Detection
              </a>
            </li>
          </ul>
          <div>
            {isLoggedIn ? (
              <button
                onClick={logoutUser}
                className="bg-red-300 text-xl p-2 rounded-lg font-medium hover:bg-red-500 transition-all"
              >
                Đăng xuất
              </button>
            ) : (
              <div>
                <a
                  href="/login"
                  className="bg-red-300 text-xl p-2 rounded-lg font-medium hover:bg-red-500 transition-all"
                >
                  Đăng nhập
                </a>
                <a
                  href="/signup"
                  className="bg-red-300 text-xl p-2 rounded-lg font-medium hover:bg-red-500 transition-all ml-3"
                >
                  Đăng ký
                </a>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}
