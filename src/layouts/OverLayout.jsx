import React, { useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { LayoutDashboard, LogIn, LogOut, Menu, X } from "lucide-react";

function OverLayout() {

    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const linkClass = ({ isActive }) => `cursor-pointer transition font-medium ${isActive ? "text-indigo-600 font-semibold" : "text-gray-600"}`;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">

            {/* NAVBAR */}
            <nav className="flex justify-between items-center px-4 md:px-10 py-4 bg-white shadow-lg fixed w-full top-0 left-0 z-20">

                {/* Logo */}
                <h1
                    className="text-2xl font-extrabold text-indigo-600 cursor-pointer flex items-center gap-2"
                    onClick={() => navigate('/homepage')}
                >
                    <LayoutDashboard className="w-6 h-6" /> My Building Site
                </h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 items-center">
                    <NavLink to="/homepage" className={linkClass}>Home</NavLink>
                    <NavLink to="/houses" className={linkClass}>Houses</NavLink>
                    <NavLink to="/shops" className={linkClass}>Shops</NavLink>
                    <NavLink to="/about" className={linkClass}>About</NavLink>
                    <NavLink to="/contact" className={linkClass}>Contact</NavLink>

                    {user && (
                        <NavLink to="/dashboard" className={linkClass}>
                            Dashboard
                        </NavLink>
                    )}
                </ul>

                {/* Login / Logout */}
                {!user ? (
                    <button
                        className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold 
                                   hover:bg-indigo-700 transition duration-150 hidden md:flex items-center gap-1"
                        onClick={() => navigate('/login')}
                    >
                        <LogIn className="w-4 h-4" /> Login
                    </button>
                ) : (
                    <button
                        onClick={() => setUser(null)}
                        className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold 
                                   hover:bg-red-600 transition duration-150 hidden md:flex items-center gap-1"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                )}

                {/* Mobile Menu Icon */}
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* MOBILE MENU */}
            {open && (
                <div className="md:hidden bg-white shadow-xl fixed top-16 left-0 w-full z-20 p-6 space-y-6">

                    <NavLink
                        to="/homepage"
                        className={linkClass}
                        onClick={() => setOpen(false)}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/houses"
                        className={linkClass}
                        onClick={() => setOpen(false)}
                    >
                        Houses
                    </NavLink>

                    <NavLink
                        to="/shops"
                        className={linkClass}
                        onClick={() => setOpen(false)}
                    >
                        Shops
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={linkClass}
                        onClick={() => setOpen(false)}
                    >
                        About
                    </NavLink>

                    <NavLink
                        to="/contact"
                        className={linkClass}
                        onClick={() => setOpen(false)}
                    >
                        Contact
                    </NavLink>

                    {user && (
                        <NavLink
                            to="/dashboard"
                            className={linkClass}
                            onClick={() => setOpen(false)}
                        >
                            Dashboard
                        </NavLink>
                    )}

                    {!user ? (
                        <button
                            className="bg-indigo-600 text-white w-full py-2 rounded-lg font-semibold 
                                       hover:bg-indigo-700 transition duration-150 flex justify-center gap-2"
                            onClick={() => {
                                navigate('/login');
                                setOpen(false);
                            }}
                        >
                            <LogIn className="w-4 h-4" /> Login
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setUser(null);
                                setOpen(false);
                            }}
                            className="bg-red-500 text-white w-full py-2 rounded-lg font-semibold 
                                       hover:bg-red-600 transition duration-150 flex justify-center gap-2"
                        >
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    )}
                </div>
            )}

            {/* PAGE CONTENT */}
            <div className="pt-24 px-4 md:px-10 pb-10">
                <Outlet />
            </div>
        </div>
    );
}

export default OverLayout;
