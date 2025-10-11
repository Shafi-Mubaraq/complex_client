import React, { useState } from "react";
import { FaHome, FaBuilding, FaShopify, FaUser, FaSignInAlt } from "react-icons/fa";

function HomePage() {
  // This variable will track if mobile menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to open menu
  function openMenu() {
    setIsMenuOpen(true);
  }

  // Function to close menu
  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between relative">
        {/* Title always centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
          TNS Complex
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden ml-auto">
          <button onClick={openMenu} className="text-gray-700 text-2xl focus:outline-none">
            ☰
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 ml-auto">
          <button className="px-3 py-2 rounded hover:bg-gray-200 flex items-center space-x-1">
            <FaHome /> <span>Home</span>
          </button>
          <button className="px-3 py-2 rounded hover:bg-gray-200 flex items-center space-x-1">
            <FaBuilding /> <span>Houses</span>
          </button>
          <button className="px-3 py-2 rounded hover:bg-gray-200 flex items-center space-x-1">
            <FaShopify /> <span>Shops</span>
          </button>
          <button className="px-3 py-2 rounded hover:bg-gray-200 flex items-center space-x-1">
            <FaUser /> <span>SignIn</span>
          </button>
          <button className="px-3 py-2 rounded hover:bg-gray-200 flex items-center space-x-1">
            <FaSignInAlt /> <span>SignUp</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen ? (
        <div>
          {/* Black overlay behind menu */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={closeMenu} // Clicking outside closes menu
          ></div>

          {/* Slide-in menu from right */}
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-6 animate-slide-in">
            <button
              className="flex items-center space-x-3 text-lg px-3 py-2 rounded hover:bg-gray-100"
              onClick={closeMenu}
            >
              <FaHome /> <span>Home</span>
            </button>
            <button
              className="flex items-center space-x-3 text-lg px-3 py-2 rounded hover:bg-gray-100"
              onClick={closeMenu}
            >
              <FaBuilding /> <span>Houses</span>
            </button>
            <button
              className="flex items-center space-x-3 text-lg px-3 py-2 rounded hover:bg-gray-100"
              onClick={closeMenu}
            >
              <FaShopify /> <span>Shops</span>
            </button>
            <button
              className="flex items-center space-x-3 text-lg px-3 py-2 rounded hover:bg-gray-100"
              onClick={closeMenu}
            >
              <FaUser /> <span>SignIn</span>
            </button>
            <button
              className="flex items-center space-x-3 text-lg px-3 py-2 rounded hover:bg-gray-100"
              onClick={closeMenu}
            >
              <FaSignInAlt /> <span>SignUp</span>
            </button>
          </div>
        </div>
      ) : null}

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
