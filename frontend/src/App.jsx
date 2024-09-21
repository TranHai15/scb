import "./index.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Camera from "./components/Camera";
import Image from "./components/Image";
import UserGuide from "./components/User-guide";
import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/camera" element={<Camera />} />
        <Route path="/fileImage" element={<Image />} />
        <Route path="/userguide" element={<UserGuide />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
