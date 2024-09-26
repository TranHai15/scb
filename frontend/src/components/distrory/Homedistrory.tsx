import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Overview = () => {
  const [reportsData, setReportsData] = useState([]); // Khai báo state để lưu trữ dữ liệu báo cáo
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  // Hàm để gọi API và lấy dữ liệu báo cáo
  const fetchReports = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/takeApi/${id}`
      );

      // Lưu mảng báo cáo vào state từ thuộc tính "data"
      if (response.data && Array.isArray(response.data.data)) {
        setReportsData(response.data.data); // Lưu dữ liệu vào state
      } else {
        console.error("Dữ liệu trả về không hợp lệ:", response.data);
      }

      setLoading(false); // Tắt trạng thái loading
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu báo cáo:", error);
      setLoading(false);
    }
  };

  // Dùng useEffect để gọi API khi component được render
  useEffect(() => {
    fetchReports();
  }, []);

  // Hàm điều hướng tới trang chi tiết
  const handleView = (id_mach) => {
    navigate(`/lichsuchitiet/${id_mach}`);
  };

  // Hàm điều hướng tới trang "thungrac"
  const handleBin = () => {
    navigate(`/thungrac`);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Tổng quan báo cáo</h1>
        <button
          className="font-bold mb-4 text-blue-500 hover:underline"
          onClick={handleBin}
        >
          Thùng rác
        </button>
      </div>

      {/* Hiển thị trạng thái loading trong khi chờ dữ liệu */}
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Hiển thị các báo cáo khi có dữ liệu */}
          {reportsData.map((report) => (
            <div key={report.id_mach} className="border p-4 rounded">
              <img
                src={report.anh_mach} // Lấy URL hình ảnh từ dữ liệu API
                alt="Report"
                className="w-full h-auto mb-2"
              />
              <p
                onClick={() => handleView(report.id_mach)}
                className="cursor-pointer text-blue-500 hover:underline"
              >
                {report.so_loi}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Overview;
