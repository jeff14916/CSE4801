import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/LoginPage";
import CameraInfo from "./Pages/CameraInfo";
import CameraRecommend from "./Pages/CameraRecommend";
import PhotoGuide from "./Pages/PhotoGuide";
import PhotoGallery from "./Pages/PhotoGallery";
import NotFoundPage from "./Pages/NotFoundPage"; // Assuming you have a 404 page
import NavBar from './NavBar';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/camerainfo" element={<CameraInfo />} />
        <Route path="/camerarecommend" element={<CameraRecommend />} />
        <Route path="/photoguide" element={<PhotoGuide />} />
        <Route path="/photogallery" element={<PhotoGallery />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
