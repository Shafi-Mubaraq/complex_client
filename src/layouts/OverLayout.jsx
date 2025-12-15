import React, { useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { LayoutDashboard, LogIn, LogOut, Menu, X } from "lucide-react";

// NOTE: You may need to configure a 'backdrop-blur' utility in your tailwind.config.js 
// if you want the glass effect on the mobile menu.

function OverLayout() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const role = sessionStorage.getItem("role"); 

    // 1. ENHANCED: Consolidated link class for cleaner code and better hover/active styles
    const linkClass = ({ isActive }) => 
        `cursor-pointer transition duration-300 px-3 py-2 rounded-lg 
         hover:text-indigo-600 hover:bg-indigo-50/50 
         ${isActive 
            ? "text-indigo-700 font-bold bg-indigo-100/70 shadow-sm" 
            : "text-gray-700 font-medium"
        }`;
    
    // 2. LOGIC FIX & ENHANCEMENT: Handle full logout process
    const handleLogout = () => {
        // Clear authentication status
        sessionStorage.removeItem("role"); 
        // Force state cleanup and redirect
        setOpen(false);
        navigate('/homepage'); 
        // NOTE: In a real app, you might want a full page reload or global state update 
        // to ensure all role-dependent content refreshes immediately.
        // window.location.reload(); 
    };

    const handleMobileLinkClick = (path) => {
        setOpen(false);
        navigate(path);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">

            {/* NAVBAR - ENHANCED: Subtle shadow and better fixed positioning */}
            <nav className="flex justify-between items-center px-4 md:px-10 py-4 bg-white/95 backdrop-blur-sm shadow-md fixed w-full top-0 left-0 z-50 border-b border-gray-100">

                {/* Logo - ENHANCED: slightly bigger logo and bolder text on hover */}
                <h1
                    className="text-xl md:text-2xl font-extrabold text-indigo-700 cursor-pointer flex items-center gap-2 transition duration-200 hover:text-indigo-900"
                    onClick={() => navigate('/homepage')}
                >
                    <LayoutDashboard className="w-5 h-5 md:w-6 md:h-6" /> My Building Site
                </h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-2 items-center">
                    <NavLink to="/homepage" className={linkClass}>Home</NavLink>
                    <NavLink to="/houses" className={linkClass}>Houses</NavLink>
                    <NavLink to="/shops" className={linkClass}>Shops</NavLink>
                    <NavLink to="/about" className={linkClass}>About</NavLink>
                    <NavLink to="/contact" className={linkClass}>Contact</NavLink>

                    {role && (
                        <NavLink to="/dashboard" className={linkClass}>
                            Dashboard
                        </NavLink>
                    )}
                </ul>

                {/* Desktop Login / Logout Button - ENHANCED: Added hover effect and shadow */}
                {!role ? (
                    <button
                        className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold 
                                hover:bg-indigo-700 transition duration-150 hidden md:flex items-center gap-2 shadow-lg hover:shadow-xl"
                        onClick={() => navigate('/login')}
                    >
                        <LogIn className="w-4 h-4" /> Login
                    </button>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold 
                                hover:bg-red-600 transition duration-150 hidden md:flex items-center gap-2 shadow-lg hover:shadow-xl"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                )}

                {/* Mobile Menu Icon - ENHANCED: Button styling and focus ring */}
                <button
                    className="md:hidden text-gray-700 p-1 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle Menu"
                >
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* MOBILE MENU - BEST DESIGN: Full-Screen Overlay/Drawer with Transition */}
            {open && (
                <div 
                    // Full screen dark overlay (for accessibility and focus)
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden"
                    onClick={() => setOpen(false)}
                >
                    {/* Drawer Content - Sliders in from the top */}
                    <div 
                        className={`absolute top-16 left-0 w-full p-6 space-y-3 bg-white shadow-2xl transition-transform duration-500 ease-out 
                                    ${open ? 'translate-y-0' : '-translate-y-full'}`}
                        // Prevent click on the menu content from closing the menu
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <div className="flex flex-col space-y-1">
                            {/* Navigation Links */}
                            <NavLink to="/homepage" className={linkClass} onClick={() => handleMobileLinkClick('/homepage')}>Home</NavLink>
                            <NavLink to="/houses" className={linkClass} onClick={() => handleMobileLinkClick('/houses')}>Houses</NavLink>
                            <NavLink to="/shops" className={linkClass} onClick={() => handleMobileLinkClick('/shops')}>Shops</NavLink>
                            <NavLink to="/about" className={linkClass} onClick={() => handleMobileLinkClick('/about')}>About</NavLink>
                            <NavLink to="/contact" className={linkClass} onClick={() => handleMobileLinkClick('/contact')}>Contact</NavLink>

                            {/* Conditional Dashboard Link */}
                            {role && (
                                <NavLink to="/dashboard" className={linkClass} onClick={() => handleMobileLinkClick('/dashboard')}>
                                    Dashboard
                                </NavLink>
                            )}
                        </div>
                        
                        <hr className="my-4 border-gray-100" /> 

                        {/* Mobile Login / Logout Button - Uses consistent logic with role */}
                        {!role ? (
                            <button
                                className="bg-indigo-600 text-white w-full py-3 rounded-lg font-bold 
                                            hover:bg-indigo-700 transition duration-150 flex justify-center items-center gap-2 shadow-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => handleMobileLinkClick('/login')}
                            >
                                <LogIn className="w-5 h-5" /> Login to Account
                            </button>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white w-full py-3 rounded-lg font-bold 
                                            hover:bg-red-600 transition duration-150 flex justify-center items-center gap-2 shadow-md focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                <LogOut className="w-5 h-5" /> Logout
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* PAGE CONTENT - Increased top padding to account for fixed navbar */}
            <div className="pt-20 md:pt-24 px-4 md:px-10 pb-10"> 
                <Outlet />
            </div>
        </div>
    );
}

export default OverLayout;