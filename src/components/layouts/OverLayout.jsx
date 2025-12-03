import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogIn, LogOut } from "lucide-react";

function OverLayout() {

    const [activeTab, setActiveTab] = useState("home");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleTabClick = () => {
        console.log('Clicked')
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">

            <nav className="flex justify-between items-center px-4 md:px-10 py-4 bg-white shadow-lg fixed w-full top-0 left-0 z-20">

                <h1
                    className="text-2xl font-extrabold text-indigo-600 cursor-pointer flex items-center gap-2"
                    onClick={() => handleTabClick("home", "/")}
                >
                    <LayoutDashboard className="w-6 h-6" /> My Building Site
                </h1>

                <ul className="hidden md:flex gap-8 font-medium text-gray-600">
                    <li
                        className={`cursor-pointer transition hover:text-indigo-600 ${activeTab === "home" ? "text-indigo-600 font-semibold" : ""}`}
                        onClick={() => navigate('/homepage')}
                    >
                        Home
                    </li>

                    <li
                        className={`cursor-pointer transition hover:text-indigo-600 ${activeTab === "houses" ? "text-indigo-600 font-semibold" : ""}`}
                        onClick={() => navigate( "/houses")}
                    >
                        Houses
                    </li>

                    <li
                        className={`cursor-pointer transition hover:text-indigo-600 ${activeTab === "shops" ? "text-indigo-600 font-semibold" : ""}`}
                        onClick={() => navigate("/shops")}
                    >
                        Shops
                    </li>

                    <li
                        className={`cursor-pointer transition hover:text-indigo-600 ${activeTab === "about" ? "text-indigo-600 font-semibold" : ""}`}
                        onClick={() => handleTabClick("about", "/about")}
                    >
                        About
                    </li>

                    <li
                        className={`cursor-pointer transition hover:text-indigo-600 ${activeTab === "contact" ? "text-indigo-600 font-semibold" : ""}`}
                        onClick={() => navigate("/contact")}
                    >
                        Contact
                    </li>

                    {user && (
                        <li
                            className={`cursor-pointer transition hover:text-indigo-600 ${activeTab === "dashboard" ? "text-indigo-600 font-semibold" : ""}`}
                            onClick={() => handleTabClick("dashboard", "/dashboard")}
                        >
                            Dashboard
                        </li>
                    )}
                </ul>

                {!user ? (
                    <button
                        onClick={() => handleTabClick("login", "/login")}
                        className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-150 flex items-center gap-1"
                    >
                        <LogIn className="w-4 h-4" /> Login
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            setUser(null);
                            handleTabClick("home", "/");
                        }}
                        className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-150 flex items-center gap-1"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                )}
            </nav>

            <div className="pt-24 px-4 md:px-10">
                <Outlet />
            </div>
        </div>
    );
}

export default OverLayout;