import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        userData
      );
      const { id, accessToken, refreshToken } = response.data;

      // Lưu accessToken vào localStorage
      localStorage.setItem("accessToken", accessToken);
      // luu refreshtoken vao localStorage
      localStorage.setItem("refreshToken", refreshToken);
      // luu data vao localstroage
      localStorage.setItem("id", id);
      console.log("Đăng ký thành công:", response.data);
      // Tải lại trang hoặc chuyển đến trang chủ
      setTimeout(() => {
        // Cách 1: Tải lại trang
        window.location.reload();
      }, 500); // 1 giây để người dùng có thời gian đọc thông báo
    } catch (error) {
      setError(
        error.response ? error.response.data : "Khong co phan hoi tu may chu"
      );
    }
  };

  const onSubmit = (data) => {
    loginUser(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <div className="text-center my-4">or</div>
        <button
          type="button"
          className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
