import React, { useState, useEffect } from "react";
import { FaHome, FaBuilding, FaShopify, FaUser, FaSignInAlt } from "react-icons/fa";

// Import your images
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img1.jpg";
import img5 from "../assets/img2.jpg";
import img6 from "../assets/img3.jpg";

import shops1 from "../assets/shops1.jpg";
import shops2 from "../assets/shops2.jpg";
import shops3 from "../assets/shops3.jpg";
import shops4 from "../assets/shops4.jpg";
import shops5 from "../assets/shops2.jpg";
import shops6 from "../assets/shops1.jpg";

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  // Disable scroll when menu or modal is open
  useEffect(() => {
    if (isMenuOpen || showSignIn || showSignUp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen, showSignIn, showSignUp]);

  // Scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen">
{/* Navbar */}
<nav className="bg-indigo-700 shadow-md px-6 py-4 flex items-center justify-between text-white fixed top-0 left-0 w-full z-50">
  <div className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
    TNS Complex
  </div>

  {/* Mobile Hamburger */}
  <div className="md:hidden ml-auto">
    <button
      onClick={() => setIsMenuOpen(true)}
      className="text-white text-2xl focus:outline-none"
    >
      ☰
    </button>
  </div>

  {/* Desktop Menu */}
  <div className="hidden md:flex space-x-4 ml-auto">
    <button
      onClick={() => scrollToSection("home")}
      className="px-3 py-2 rounded hover:bg-indigo-600 flex items-center space-x-1"
    >
      <FaHome /> <span>Home</span>
    </button>
    <button
      onClick={() => scrollToSection("houses")}
      className="px-3 py-2 rounded hover:bg-indigo-600 flex items-center space-x-1"
    >
      <FaBuilding /> <span>Houses</span>
    </button>
    <button
      onClick={() => scrollToSection("shops")}
      className="px-3 py-2 rounded hover:bg-indigo-600 flex items-center space-x-1"
    >
      <FaShopify /> <span>Shops</span>
    </button>
    <button
      onClick={() => setShowSignIn(true)}
      className="px-3 py-2 rounded hover:bg-indigo-600 flex items-center space-x-1"
    >
      <FaUser /> <span>SignIn</span>
    </button>
    <button
      onClick={() => setShowSignUp(true)}
      className="px-3 py-2 rounded hover:bg-indigo-600 flex items-center space-x-1"
    >
      <FaSignInAlt /> <span>SignUp</span>
    </button>
  </div>
</nav>

      {/* Home Section */}
      <section
        id="home"
        className="bg-indigo-400 text-white flex flex-col justify-center items-center min-h-screen px-4 text-center"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 pt-6">
          Welcome to T.N.S Buildings
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl mb-6">
          Discover your dream home or shop in our modern complex. Comfortable
          living, beautiful surroundings, and all the facilities you need in one
          place.
        </p>
      </section>

      {/* Houses Section */}
      <section id="houses" className="bg-gray-100 py-10 text-center">
        <h2 className="text-3xl font-bold mb-6">Houses</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 px-4">
          {[img1, img2, img3, img4, img5, img6].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`House ${index + 1}`}
              className="w-full h-48 object-cover rounded"
            />
          ))}
        </div>
      </section>

      {/* Shops Section */}
      <section id="shops" className="bg-gray-200 py-10 text-center">
        <h2 className="text-3xl font-bold mb-6">Shops</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 px-4">
          {[shops1, shops2, shops3, shops4, shops5, shops6].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Shop ${index + 1}`}
              className="w-full h-48 object-cover rounded"
            />
          ))}
        </div>
      </section>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div>
          {/* No black background overlay */}
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-6 animate-slide-in overflow-y-auto">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-right w-full text-2xl font-bold mb-6"
            >
              ✕
            </button>
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center space-x-3 text-lg px-3 py-2 rounded hover:bg-gray-100"
            >
              <FaHome /> <span>Home</span>
            </button>
            <button
              onClick={() => scrollToSection("houses")}
              className="flex items-center space-x-3 text-lg px-3 py-2 rounded hover:bg-gray-100"
            >
              <FaBuilding /> <span>Houses</span>
            </button>
            <button
              onClick={() => scrollToSection("shops")}
              className="flex items-center space-x-3 text-lg px-3 py-2 rounded hover:bg-gray-100"
            >
              <FaShopify /> <span>Shops</span>
            </button>
            <button
              onClick={() => {
                setShowSignIn(true);
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-3 text-lg px-3 py-2 rounded hover:bg-gray-100"
            >
              <FaUser /> <span>SignIn</span>
            </button>
            <button
              onClick={() => {
                setShowSignUp(true);
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-3 text-lg px-3 py-2 rounded hover:bg-gray-100"
            >
              <FaSignInAlt /> <span>SignUp</span>
            </button>
          </div>
        </div>
      )}

      {/* SignIn Modal */}
      {showSignIn && (
        <div className="fixed inset-0 z-50 flex justify-center items-center pointer-events-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4">SignIn Form</h2>
            <p>SignIn form content here.</p>
            <button
              className="mt-4 px-4 py-2 bg-indigo-700 text-white rounded"
              onClick={() => setShowSignIn(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* SignUp Modal */}
      {showSignUp && (
        <div className="fixed inset-0 z-50 flex justify-center items-center pointer-events-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4">SignUp Form</h2>
            <p>SignUp form content here.</p>
            <button
              className="mt-4 px-4 py-2 bg-indigo-700 text-white rounded"
              onClick={() => setShowSignUp(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Slide-in animation */}
      <style>{`
        @keyframes slide-in {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default HomePage;
