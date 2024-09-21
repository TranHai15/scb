import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate
import Home from "./Home";

export default function Image() {
  const [imageSrc, setImageSrc] = useState(null);
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // ham xoa anh hien tai them anh moi
  const handleChangeImage = () => {
    let fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  // Hàm xử lý khi nhấn nút "Stop"
  const handleStop = () => {
    alert("BAn Muon THE U");
    navigate(`/`); // Điều hướng về trang Home
  };

  return (
    <div>
      <Home />
      <div className="flex justify-center ">
        <div className=" mt-4 w-1/2 text-center">
          <h3 className="text-2xl font-semibold">
            Upload an image from your device
          </h3>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="text-lg mt-4"
            onChange={handleImageChange}
          />
          {imageSrc && (
            <div className="mt-6">
              <h2 className="text-3xl font-semibold flex-none my-4">
                Detecting...
              </h2>
              <img
                src={imageSrc}
                alt="Selected"
                className="w-3/4 object-contain m-auto"
              />
            </div>
          )}
          {imageSrc && (
            <div className="buttons mt-6 mb-20 flex justify-center gap-5">
              <button
                className="bg-red-100 p-3 rounded-lg shadow-lg hover:bg-red-200 transition"
                onClick={handleStop} // Gọi hàm khi nhấn "Stop"
              >
                Stop
              </button>
              <button
                className="bg-red-100 p-3 rounded-lg shadow-lg hover:bg-red-200 transition"
                onClick={handleChangeImage}
              >
                Change Image
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
