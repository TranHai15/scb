import React from "react";
import { useParams, Link } from "react-router-dom";

const ReportDetail = () => {
  const { id } = useParams();

  const reportDetails = {
    1: {
      title: "Chi tiết báo cáo 1",
      content: "Mạch điện bị hỏng ở khu vực A.",
    },
    2: {
      title: "Chi tiết báo cáo 2",
      content: "Mạch điện có dấu hiệu nóng chảy ở khu vực B.",
    },
    3: {
      title: "Chi tiết báo cáo 3",
      content: "Mạch điện bị ngắn mạch ở khu vực C.",
    },
  };

  const report = reportDetails[id]; // Lấy báo cáo dựa trên ID từ URL

  if (!report) {
    return <div>Báo cáo không tồn tại.</div>; // Hiển thị thông báo nếu báo cáo không tồn tại
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{report.title}</h1>
      <p className="mt-2">{report.content}</p>
      <Link to="/lichsu" className="text-blue-500 hover:underline mt-4 block">
        Trở lại trang tổng quan
      </Link>
    </div>
  );
};

export default ReportDetail;
