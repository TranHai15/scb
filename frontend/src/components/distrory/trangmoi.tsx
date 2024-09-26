import React from "react";
import { useLocation } from "react-router-dom";

export default function Trangmoi() {
  const location = useLocation();
  const { statusData } = location.state || {}; // Lấy dữ liệu từ state

  console.log(statusData);

  return (
    <div className="flex w-10/12 gap-40 m-auto">
      <div className="w-96">
        {statusData ? (
          <div className="relative w-[500px] h-[300px] overflow-hidden rounded-lg">
            {" "}
            {/* Khung hình 500px x 300px */}
            <img
              src={statusData} // Hiển thị hình ảnh từ statusData
              alt="Hình ảnh từ statusData"
              className="absolute inset-0 w-full h-full object-cover" // Đảm bảo hình ảnh bao phủ toàn bộ khung
            />
          </div>
        ) : (
          <p>Không có dữ liệu để hiển thị.</p>
        )}
      </div>
      <div className="w-1/2 mt-7">
        <h2 className="text-black ">Số lỗi</h2>
        <h2>Trạng Thái</h2>
      </div>
    </div>
  );
}
