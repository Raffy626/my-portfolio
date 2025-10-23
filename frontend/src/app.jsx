import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import PortfolioList from "./pages/PortfolioList";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Admin from "./pages/admin";
import Login from "./pages/Login";
import AOS from "aos";
import "aos/dist/aos.css";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);
  return (
    <Router>
      <div className="bg-gray-950 text-gray-100 font-sans">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
                <About />
                <Skills />
                <PortfolioList />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <img
  src="/animation-unscreen.gif"
  alt="Animated Sticker"
  className="fixed bottom-6 right-6 w-20 h-20 object-contain z-50 select-none pointer-events-none"
/>
    </Router>
  );
}

export default App;