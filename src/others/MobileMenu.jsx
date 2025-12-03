import React from 'react';
import Brand from '../Brand';
import { FaHome, FaBuilding, FaStore, FaEnvelope, FaUser, FaUserPlus, FaTimes, FaRegObjectGroup } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const navItems = [
    { id: "home", label: "Home", icon: FaHome },
    { id: "houses", label: "Houses", icon: FaBuilding },
    { id: "shops", label: "Shops", icon: FaStore },
    { id: "contact", label: "Contact", icon: FaEnvelope },
];

const MobileMenu = ({ setIsMenuOpen, scrollToSection, setShowSignIn, setShowSignUp }) => {
    const navigate = useNavigate();

    const handleNavigation = (id) => {
        scrollToSection(id);
        setIsMenuOpen(false);
    };

    const handleAuth = (authFunction) => {
        authFunction(true);
        setIsMenuOpen(false);
    };

    const handleAdminNavigation = () => {
        navigate('/adminLayout/dashboard');
        setIsMenuOpen(false);
    }

    return (
        <div className="fixed inset-0 z-[100] flex md:hidden" id="mobile-menu-drawer">
            {/* Dark Overlay - Click to close */}
            <div
                className="absolute inset-0 bg-black bg-opacity-70"
                onClick={() => setIsMenuOpen(false)}
                tabIndex="-1"
            ></div>

            {/* Slide-in Menu - Increased size for better touch usability */}
            <nav className="w-64 xs:w-72 h-full bg-white shadow-2xl p-6 relative z-10 animate-slide-in-left overflow-y-auto" aria-label="Mobile Navigation">
                <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-200">
                    {/* Brand text color adjusted for white background */}
                    <span className="text-2xl font-extrabold text-indigo-800 tracking-wider">TNS <span className="text-indigo-600">Complex</span></span>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="text-gray-700 text-2xl p-1 hover:text-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
                        aria-label="Close navigation menu"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="flex flex-col space-y-1">
                    {/* Navigation Links */}
                    {navItems.map(item => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavigation(item.id);
                            }}
                            className="flex items-center space-x-3 text-lg text-gray-700 px-4 py-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition w-full text-left font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <item.icon className="text-xl text-indigo-500" /> <span>{item.label}</span>
                        </a>
                    ))}
                    
                    {/* Admin Navigation */}
                    <button
                        onClick={handleAdminNavigation}
                        className="flex items-center space-x-3 text-lg text-gray-700 px-4 py-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition w-full text-left font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <FaRegObjectGroup className="text-xl text-indigo-500" /> <span>Admin Dashboard</span>
                    </button>


                    {/* Auth Buttons */}
                    <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                        <button
                            onClick={() => handleAuth(setShowSignIn)}
                            className="flex items-center space-x-3 text-lg text-indigo-600 font-semibold px-4 py-3 rounded-lg bg-indigo-100 hover:bg-indigo-200 transition w-full text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <FaUser className="text-xl" /> <span>Sign In</span>
                        </button>
                        <button
                            onClick={() => handleAuth(setShowSignUp)}
                            className="flex items-center space-x-3 text-lg text-white font-semibold px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition w-full text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <FaUserPlus className="text-xl" /> <span>Sign Up</span>
                        </button>
                    </div>
                </div>
            </nav>
            {/* Tailwind Keyframe CSS - It is highly recommended to move this to your main CSS file (e.g., index.css) */}
             <style>{`
                 @keyframes slide-in-left {
                     0% { transform: translateX(-100%); }
                     100% { transform: translateX(0); }
                 }
                 .animate-slide-in-left {
                     animation: slide-in-left 0.3s ease-out forwards;
                 }
             `}</style>
        </div>
    );
};

export default MobileMenu;