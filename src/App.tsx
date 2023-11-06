import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import LoginPage from "./LoginPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
