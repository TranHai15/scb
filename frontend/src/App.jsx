import { useState } from "react";
import "./index.css"; // Import your styles if needed

function App() {
  const [showUpload, setShowUpload] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);

  return (
    <div className="container mx-auto p-5 bg-gray-100">
      <header className="bg-red-200 p-5 text-center">
        <h1 className="text-6xl font-bold text-gray-800 transition-all hover:text-red-400 hover:scale-105">
          PCB Checking
        </h1>
        <nav className="flex justify-between items-center mt-8">
          <ul className="flex gap-20 ml-8">
            <li>
              <a
                href="home.html"
                className="text-xl font-medium text-gray-800 hover:text-red-400"
              >
                Home Page
              </a>
            </li>
            <li>
              <a
                href="user_guide.html"
                target="_blank"
                className="text-xl font-medium text-gray-800 hover:text-red-400"
              >
                User Guide
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-xl font-medium text-gray-800 hover:text-red-400"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-xl font-medium text-gray-800 hover:text-red-400"
              >
                History Detection
              </a>
            </li>
          </ul>
          <div className="flex gap-5">
            <button className="bg-red-100 py-2 px-4 text-lg rounded hover:bg-red-200 transition">
              Sign up
            </button>
            <button className="bg-red-100 py-2 px-4 text-lg rounded hover:bg-red-200 transition">
              Log in
            </button>
          </div>
        </nav>
      </header>

      <main className="text-center">
        <h2 className="text-5xl font-bold text-red-400 mt-10">
          Choose resource for detecting
        </h2>
        <div className="flex justify-center gap-10 mt-10">
          <button
            className="bg-red-100 p-5 w-40 h-40 rounded-lg shadow-lg flex flex-col items-center justify-center transition hover:scale-105"
            onClick={() => setShowWebcam(true)}
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
            onClick={() => setShowUpload(true)}
          >
            <img
              src="  ../public/1297930.png"
              alt="Upload Image"
              className="w-12 h-12 mb-2"
            />
            Image
          </button>
        </div>
        {showUpload && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold">
              Upload an image from your device
            </h3>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="text-lg mt-4"
            />
            <div className="buttons mt-6 flex justify-center gap-5">
              <button className="bg-red-100 p-3 rounded-lg shadow-lg hover:bg-red-200 transition">
                Stop
              </button>
              <button className="bg-red-100 p-3 rounded-lg shadow-lg hover:bg-red-200 transition">
                Change Image
              </button>
            </div>
          </div>
        )}

        {/* Webcam Detection Section */}
        {showWebcam && (
          <section className="bg-red-100 p-5 mt-10 rounded-lg">
            <h2 className="text-3xl font-semibold">Detecting...</h2>
            <div className="video flex justify-center mt-6">
              <video
                id="video"
                autoPlay
                className="w-1/2 rounded-lg shadow-lg"
              ></video>
            </div>
            <div id="action-buttons" className="mt-6 flex justify-center gap-5">
              <button className="bg-white p-3 w-40 rounded-lg shadow-lg hover:scale-105 transition">
                Save
              </button>
              <button className="bg-white p-3 w-40 rounded-lg shadow-lg hover:scale-105 transition">
                Continue
              </button>
              <button className="bg-red-500 p-3 w-40 rounded-lg text-white shadow-lg hover:scale-105 transition">
                Stop
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
