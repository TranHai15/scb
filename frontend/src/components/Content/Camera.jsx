import { useEffect } from "react";

export default function Camera() {
  // Khoir chay camera
  const startCamera = () => {
    const video = document.getElementById("video");
    const detectingText = document.getElementById("detecting-text"); // Tham chiếu chính xác
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
        detectingText.style.display = "block"; // Hiển thị "Detecting..." khi camera bắt đầu
      })
      .catch(function (err) {
        console.log("Lỗi khi truy cập webcam: " + err);
        alert("Lỗi truy cập webcam. Vui lòng kiểm tra quyền truy cập camera.");
      });
  };
  // Luu anh khi nhan nut Save
  const SaveImage = () => {
    const canvas = document.createElement("canvas");
    const video = document.getElementById("video");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Image Data URL (can be saved or sent to a server)
    const imageUrl = canvas.toDataURL("image/png");
    console.log("Captured Image:", imageUrl);

    // Save the image
    const link = document.createElement("a");
    link.href = imageUrl;
    link.setAttribute("download", "captured_image.png");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert("Image saved successfully!");
  };
  // ket thuc camera
  const RipCamera = () => {
    alert("Detection Stopped");
    location.reload();
    location.href = "/";
  };

  useEffect(() => {
    startCamera();
  }, []); // Sử dụng useEffect để đảm bảo startCamera được gọi sau khi component đã tải xong

  return (
    <div>
      <section className="bg-red-100 p-5 mt-10 rounded-lg">
        <h1
          id="detecting-text"
          className="text-3xl font-semibold flex-none"
          //   style={{ display: "none" }}
        >
          Detecting...
        </h1>
        <div className="video flex justify-center mt-6">
          <video
            id="video"
            autoPlay
            className="w-1/2 rounded-lg shadow-lg"
          ></video>
        </div>
        <div id="action-buttons" className="mt-6 flex justify-center gap-5">
          <button
            className="bg-white p-3 w-40 rounded-lg shadow-lg hover:scale-105 transition"
            onClick={SaveImage}
          >
            Save
          </button>
          <button className="bg-white p-3 w-40 rounded-lg shadow-lg hover:scale-105 transition">
            Continue
          </button>
          <button
            className="bg-red-500 p-3 w-40 rounded-lg text-white shadow-lg hover:scale-105 transition"
            onClick={RipCamera}
          >
            Stop
          </button>
        </div>
      </section>
    </div>
  );
}
