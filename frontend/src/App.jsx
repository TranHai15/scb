import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "./components";
import { Home } from "./components";
import { Camera } from "./components";
import { Image } from "./components";
import { UserGuide } from "./components";
import { LoginPage } from "./components";
import { SignupPage } from "./components";
// import { apiRequest } from "./api";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // apiRequest()
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err));
    const token = localStorage.getItem("accessToken");
    // localStorage.clear();
    setIsAuthenticated(!!token); // Kiểm tra xem người dùng đã đăng nhập hay chưa
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/camera"
          element={isAuthenticated ? <Camera /> : <Navigate to="/login" />}
        />
        <Route
          path="/fileImage"
          element={isAuthenticated ? <Image /> : <Navigate to="/login" />}
        />
        <Route
          path="/userguide"
          element={isAuthenticated ? <UserGuide /> : <UserGuide />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
