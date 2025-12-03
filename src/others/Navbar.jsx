import React from "react";
import Brand from "../Brand";
import { FaBars, FaUser, FaUserPlus, FaBuilding, FaStore, FaHome, FaEnvelope, FaRegObjectGroup } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

const navItems = [
    { id: "home", label: "Home", icon: FaHome },
    { id: "houses", label: "Houses", icon: FaBuilding },
    { id: "shops", label: "Shops", icon: FaStore },
    { id: "contact", label: "Contact", icon: FaEnvelope },
];

// Prop change: Replaced 'scrollToSection' with 'setCurrentPage'
const Navbar = ({ setCurrentPage, setIsMenuOpen, setShowSignIn, setShowSignUp }) => {

    const navigate = useNavigate();

    const handleNavigation = (id) => {
        // Now, we set the active page state in the parent component
        setCurrentPage(id); 
    };


    return (
        <header className="bg-indigo-800 h-16 text-white px-4 md:px-8 flex justify-between items-center fixed w-full top-0 z-50 shadow-xl">
            <Brand />

            {/* Desktop Navigation Links (Visible on large screens) */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8">
                {navItems.map(item => (
                    <a
                        key={item.id}
                        href="#" // No longer linking to a section ID, just an anchor
                        onClick={(e) => {
                            e.preventDefault(); 
                            handleNavigation(item.id); // Triggers state change
                        }}
                        className="text-white text-sm xl:text-base font-medium hover:text-indigo-300 transition duration-200 relative group py-2"
                    >
                        {item.label}
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                    </a>
                ))}
            </nav>


            {/* Auth/Admin Buttons - (Visible on medium screens and up) */}
            <div className="hidden md:flex space-x-3 lg:space-x-4 items-center">
                {/* Sign In Button */}
                <button 
                    className="border border-indigo-500 bg-indigo-700 hover:bg-indigo-600 transition duration-200 px-4 py-1.5 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-300" 
                    onClick={() => setShowSignIn(true)}
                >
                    <FaUser className="inline mr-1 text-xs" /> Sign In
                </button>

                {/* Sign Up Button - Primary Call to Action */}
                <button 
                    className="bg-indigo-500 hover:bg-indigo-400 transition duration-200 px-4 py-1.5 rounded-lg text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300" 
                    onClick={() => setShowSignUp(true)}
                >
                    <FaUserPlus className="inline mr-1 text-xs" /> Sign Up
                </button>
                
                {/* Admin Button */}
                <button
                    className="hidden lg:block bg-indigo-900 border border-indigo-700 hover:bg-indigo-700 transition duration-200 px-4 py-1.5 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    onClick={() => navigate('/adminLayout/dashboard')}    
                >
                    <FaRegObjectGroup className="inline mr-1 text-xs" /> Admin
                </button>
            </div>

            {/* Mobile Menu Toggle Button (Hidden on large screens) */}
            <button 
                className="lg:hidden text-2xl p-1 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded" 
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open navigation menu"
            >
                <FaBars />
            </button>
        </header>
    );
};

export default Navbar;