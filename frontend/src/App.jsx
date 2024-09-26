import React, { useEffect, useState } from "react"; // Thêm useState ở đây
import { Routes, Route, Navigate } from "react-router-dom";

import {
  Header,
  Home,
  Camera,
  Image,
  UserGuide,
  LoginPage,
  SignupPage,
  Overview,
  ReportDetail,
  NOTFOUND,
  Bin,
  Trangmoi,
} from "./components"; // Import các component cần thiết

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
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
          path="/lichsu"
          element={isAuthenticated ? <Overview /> : <NOTFOUND />}
        />
        <Route
          path="/thungrac"
          element={isAuthenticated ? <Bin /> : <NOTFOUND />}
        />
        <Route
          path="/lichsuchitiet/:id"
          element={
            isAuthenticated ? <ReportDetail /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/trangmoi"
          element={isAuthenticated ? <Trangmoi /> : <Navigate to="/login" />}
        />
        <Route
          path="/fileImage"
          element={isAuthenticated ? <Image /> : <Navigate to="/login" />}
        />
        <Route
          path="/userguide"
          element={isAuthenticated ? <UserGuide /> : <Navigate to="/login" />}
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
