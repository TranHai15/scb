// Home
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [showUpload, setShowUpload] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <main className="text-center">
        <h2 className="text-5xl font-bold text-red-400 mt-10">
          Choose resource for detecting
        </h2>
        <div className="flex justify-center gap-10 mt-10">
          <button
            className="bg-red-100 p-5 w-40 h-40 rounded-lg shadow-lg flex flex-col items-center justify-center transition hover:scale-105"
            onClick={() => {
              if (setShowWebcam) {
                setShowUpload(false);
              }
              return setShowWebcam(true);
            }}
          >
            <img
              src="../public/camera-icon-png-8.jpg"
              alt="Camera"
              className="w-12 h-12 mb-2"
            />
            Camera
          </button>
          <button
            className="bg-red-100 p-5 w-40 h-40 rounded-lg shadow-lg flex flex-col items-center justify-center transition hover:scale-105"
            onClick={() => {
              if (setShowUpload) {
                setShowWebcam(false);
              }
              return setShowUpload(true);
            }}
          >
            <img
              src="  ../public/1297930.png"
              alt="Upload Image"
              className="w-12 h-12 mb-2"
            />
            Image
          </button>
        </div>
        {showUpload && navigate(`/fileImage`)}

        {/* Webcam Detection Section */}
        {showWebcam && navigate(`/camera`)}
      </main>
    </div>
  );
}
