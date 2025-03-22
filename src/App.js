import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/NavBar";
import Home from "./pages/Home";
import Credit from "./pages/Credit";
import Insurance from "./pages/Insurance";
import Statistics from "./pages/Statistics";
import Education from "./pages/Education";
import Profile from "./pages/Profile";
import "./styles/navbar.css";
import "./styles/tabs.css";
import "./styles/layout.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/credit" element={<Credit />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/education" element={<Education />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
