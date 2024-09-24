import React from "react";
import { Link, useNavigate } from "react-router-dom";

const reportsData = [
  {
    id: 1,
    imageUrl: "https://via.placeholder.com/150",
    description: "Mạch điện bị hỏng.",
  },
  {
    id: 2,
    imageUrl: "https://via.placeholder.com/150",
    description: "Mạch điện có dấu hiệu nóng chảy.",
  },
  {
    id: 3,
    imageUrl: "https://via.placeholder.com/150",
    description: "Mạch điện bị ngắn mạch.",
  },
];

const Overview = () => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/lichsuchitiet/${id}`); // Điều hướng đến trang chi tiết với ID
  };

  const handleBin = () => {
    navigate(`/thungrac`); // Điều hướng đến trang "thungrac"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportsData.map((report) => (
          <div key={report.id} className="border p-4 rounded">
            <img
              src={report.imageUrl}
              alt="Report"
              className="w-full h-auto mb-2"
            />
            <p
              onClick={() => handleView(report.id)}
              className="cursor-pointer text-blue-500 hover:underline"
            >
              {report.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
