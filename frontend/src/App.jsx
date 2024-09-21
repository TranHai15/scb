import "./index.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home } from "./components";
import { Camera } from "./components";
import { Image } from "./components";
import { UserGuide } from "./components";
import { LoginPage } from "./components";
import { SignupPage } from "./components";

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
