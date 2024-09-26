import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCurrentDateTime } from "../../api";
export default function ImageUpload() {
  // Ví dụ sử dụng

  const [imageSrc, setImageSrc] = useState(null);
  const [imageBase64, setImageBase64] = useState(null); // Biến để lưu chuỗi base64
  const navigate = useNavigate();

  // Xử lý khi người dùng chọn ảnh từ máy tính
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1]; // Lấy chuỗi Base64 từ file
        setImageSrc(reader.result); // Hiển thị ảnh cho người dùng xem trước
        setImageBase64(base64String); // Lưu chuỗi base64 vào state
      };
      reader.readAsDataURL(file); // Đọc file ảnh dưới dạng Base64
    }
  };

  // Gửi ảnh đã chuyển sang base64 lên server
  const handleUpload = async () => {
    if (!imageBase64) {
      alert("Vui lòng chọn một ảnh trước khi gửi!");
      return;
    }
    console.log("img", imageBase64);

    try {
      // Tạo đối tượng dữ liệu để gửi
      const payload = {
        file: imageBase64, // Chuỗi Base64 của ảnh
      };

      // console.log("Sending payload:", payload); // In payload để kiểm tra

      // Gửi chuỗi base64 tới API
      const response = await axios.post(
        "http://localhost:5050/process",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("AI Response:", response.data); // In phản hồi từ server

      // Chờ để lấy task_id và sau đó gọi getstatus
      if (response.data.task_id) {
        const statusResponse = await axios.get(
          `http://localhost:5050/getstatus/${response.data.task_id}`
        );

        const upload = await axios.post("http://localhost:3000/api/upload", {
          file: statusResponse.data,
        });
        const data = await upload.data.filePath;
        // lay id nguoi dung
        const id = localStorage.getItem("id");
        console.log(id);
        let dayTime = getCurrentDateTime();

        // tao doi tuong de them database
        const datauser = {
          anh_mach: data,
          so_loi: 9,
          bao_cao: "chua co gi",
          ngay_them: dayTime,
          id: id,
        };
        const insserData = await axios.post(
          "http://localhost:3000/api/callApi",
          {
            data: datauser,
          }
        );
        // console.log("Status Response:", upload.data.filePath); // In phản hồi từ getstatus
        // Điều hướng đến trang lichsuchitiet với dữ liệu nhận được
        navigate("/trangmoi", {
          state: { statusData: data },
        });
      } else {
        console.error("Không tìm thấy task_id trong phản hồi.");
        alert("Đã xảy ra lỗi khi lấy thông tin trạng thái!");
      }
    } catch (error) {
      console.error("Có lỗi khi gửi ảnh:", error);
      alert("Đã xảy ra lỗi khi gửi ảnh!"); // Hiển thị thông báo lỗi
    }
  };

  // Chọn ảnh mới
  const handleChooseNewImage = () => {
    setImageSrc(null); // Reset ảnh đã chọn
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-center mt-4">
        Tải lên ảnh từ máy tính
      </h1>

      <div className="flex justify-center mt-6">
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />
      </div>

      {imageSrc && (
        <div className="flex flex-col items-center">
          <img
            src={imageSrc}
            alt="Selected"
            className="w-1/2 rounded-lg mb-4"
          />
          <div className="flex space-x-4">
            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white p-3 rounded-lg"
            >
              Gửi ảnh lên
            </button>
            <button
              onClick={handleChooseNewImage}
              className="bg-orange-500 text-white p-3 rounded-lg"
            >
              Chọn ảnh mới
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-red-500 text-white p-3 rounded-lg"
            >
              Dừng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
