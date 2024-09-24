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

const Bin = () => {
  const navigate = useNavigate();

  const henldoview = (id) => {
    navigate(`/lichsuchitiet/${id}`); // Điều hướng đến trang chi tiết với ID
  };

  return (
    <div className="p-4">
      <div className="">
        <h1 className="text-2xl font-bold mb-4">Thung Rac</h1>
      </div>
      <h1
        className="font-bold mb-4"
        onClick={() => {
          navigate(`/lichsu`);
        }}
      >
        Quay lai trang lich su
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportsData.map((report) => (
          <div key={report.id} className="border p-4 rounded">
            <img
              src={report.imageUrl}
              alt="Report"
              className="w-full h-auto mb-2"
            />
            <p
              onClick={() => henldoview(report.id)}
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

export default Bin;
