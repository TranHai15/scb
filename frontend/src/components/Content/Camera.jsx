import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCurrentDateTime } from "../../api";

export default function Camera() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null); // State mới để lưu Base64 đã tách
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Bật camera và hiển thị video
  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.log("Lỗi khi truy cập webcam: " + err);
      });
  };

  // Chụp ảnh từ camera
  const handleTakePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Chuyển đổi canvas thành URL hình ảnh (base64)
    const dataUrl = canvas.toDataURL("image/png");
    const base64String = dataUrl.split(",")[1]; // Tách để lấy phần sau dấu phẩy
    setCapturedImage(dataUrl); // Lưu ảnh chụp vào state
    setImageBase64(base64String); // Lưu chuỗi base64 vào state mới
  };

  // Gửi ảnh chụp lên server (sử dụng base64)
  const handleUpload = async () => {
    console.log("fromdata", imageBase64);
    try {
      // Tạo đối tượng chứa base64
      const formData = {
        file: capturedImage, // base64 string
      };

      // Gửi base64 tới API xử lý AI
      const response = await axios.post(
        "http://localhost:5050/process",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("AI Response:", response.data);

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
    }
  };

  useEffect(() => {
    startCamera();
  }, []);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-5xl font-semibold text-center mt-4 text-red-300">
        Detecting...
      </h1>

      <div className="flex gap-16 items-center">
        <div className="w-123">
          <div className="flex mt-10 w-full max-w-lg rounded-lg overflow-hidden shadow-lg">
            <video ref={videoRef} autoPlay className="w-full h-auto"></video>
          </div>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          <div className="flex justify-center gap-11 mt-5">
            <div className="mt-4 space-x-4">
              <button
                onClick={handleTakePhoto}
                className="bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition duration-300"
              >
                Chụp ảnh
              </button>
            </div>
            <div className="mt-4">
              <button
                onClick={() => navigate("/")}
                className="bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 transition duration-300"
              >
                Dừng
              </button>
            </div>
          </div>
        </div>
        {capturedImage && (
          <div className="mt-6 w-123 max-w-lg">
            <div className="flex flex-col items-center">
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={handleUpload}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 mt-8"
              >
                Gửi ảnh lên
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
