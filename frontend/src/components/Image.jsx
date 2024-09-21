import { useState } from "react";
import Home from "./Home";

export default function Image() {
  const [imageSrc, setImageSrc] = useState(null); // Để lưu đường dẫn ảnh

  // Hàm xử lý khi người dùng chọn ảnh
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // Lưu đường dẫn hình ảnh vào state
      };
      reader.readAsDataURL(file); // Đọc ảnh dưới dạng URL
    }
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
            onChange={handleImageChange} // Gọi hàm khi người dùng chọn ảnh
          />

          {/* Hiển thị hình ảnh khi có ảnh được chọn */}
          {imageSrc && (
            <div className="mt-6">
              <h2
                id="detecting-text"
                className="text-3xl font-semibold flex-none my-4"
                //   style={{ display: "none" }}
              >
                Detecting...
              </h2>
              <img
                src={imageSrc}
                alt="Selected"
                className="w-3/4 object-contain m-auto"
              />
            </div>
          )}

          {/* Hiển thị nút chỉ khi có ảnh được chọn */}
          {imageSrc && (
            <div className="buttons mt-6 mb-20  flex justify-center gap-5">
              <button className="bg-red-100 p-3 rounded-lg shadow-lg hover:bg-red-200 transition">
                Stop
              </button>
              <button className="bg-red-100 p-3 rounded-lg shadow-lg hover:bg-red-200 transition">
                Change Image
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
