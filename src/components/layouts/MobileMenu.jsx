import React from 'react';
import { FaHome, FaBuilding, FaStore, FaEnvelope, FaUser, FaUserPlus, FaTimes } from "react-icons/fa";
import Brand from '../Brand';

const navItems = [
    { id: "home", label: "Home", icon: FaHome },
    { id: "houses", label: "Houses", icon: FaBuilding },
    { id: "shops", label: "Shops", icon: FaStore },
    { id: "contact", label: "Contact", icon: FaEnvelope },
];

const MobileMenu = ({ setIsMenuOpen, scrollToSection, setShowSignIn, setShowSignUp }) => {
    const handleNavigation = (id) => {
        scrollToSection(id);
        setIsMenuOpen(false);
    };

    const handleAuth = (authFunction) => {
        authFunction(true);
        setIsMenuOpen(false);
    };

    return (
        <div className="fixed inset-0 z-[60] flex justify-start md:hidden" id="mobile-menu-drawer">
            {/* Dark Overlay */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setIsMenuOpen(false)}
                tabIndex="-1"
            ></div>

            {/* Slide-in Menu */}
            <nav className="w-64 h-full bg-indigo-50 shadow-2xl p-6 relative z-10 animate-slide-in-left overflow-y-auto" aria-label="Mobile Navigation">
                <div className="flex justify-between items-center mb-6 pb-2 border-b border-indigo-200">
                    <Brand />
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="text-gray-700 text-2xl hover:text-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"
                        aria-label="Close navigation menu"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="flex flex-col space-y-2">
                    {/* Navigation Links */}
                    {navItems.map(item => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavigation(item.id);
                            }}
                            className="flex items-center space-x-3 text-lg text-gray-700 px-3 py-3 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition w-full text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <item.icon className="text-xl" /> <span>{item.label}</span>
                        </a>
                    ))}
                    {/* Auth Buttons */}
                    <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                        <button
                            onClick={() => handleAuth(setShowSignIn)}
                            className="flex items-center space-x-3 text-lg text-indigo-600 font-medium px-3 py-3 rounded-lg hover:bg-indigo-100 transition w-full text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <FaUser className="text-xl" /> <span>Sign In</span>
                        </button>
                        <button
                            onClick={() => handleAuth(setShowSignUp)}
                            className="flex items-center space-x-3 text-lg text-indigo-600 font-medium px-3 py-3 rounded-lg hover:bg-indigo-100 transition w-full text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <FaUserPlus className="text-xl" /> <span>Sign Up</span>
                        </button>
                    </div>
                </div>
            </nav>
            {/* Tailwind Keyframe CSS for mobile menu animation */}
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