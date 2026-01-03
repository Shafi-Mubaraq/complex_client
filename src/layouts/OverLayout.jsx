import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, NavLink, useLocation } from "react-router-dom";
import {
    LayoutDashboard, LogIn, LogOut, Menu, X,
    ChevronRight, Globe, User, Bell, Settings, HelpCircle
} from "lucide-react";

function OverLayout() {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const role = sessionStorage.getItem("role");

    useEffect(() => setOpen(false), [location]);

    const navLinks = [
        { name: "Home", path: "/homepage" },
        { name: "Houses", path: "/houses" },
        { name: "Shops", path: "/shops" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    const handleLogout = () => {
        sessionStorage.removeItem("role");
        navigate("/homepage");
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans antialiased">

            {/* 1. Professional Glass Header */}
            <nav className={`sticky top-0 z-[100] w-full transition-all duration-500 bg-white/90 backdrop-blur-md py-5 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)]`}>
                <div className="mx-auto px-6 md:px-12 flex justify-between items-center">

                    {/* Logo Group */}
                    <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate("/homepage")}>
                        <div className="relative">
                            <div className="w-11 h-11 bg-slate-900 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                                <LayoutDashboard className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-indigo-500 border-2 border-white rounded-full" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-tighter text-slate-900 leading-none">
                                T. N. <span className="text-indigo-600"> S</span>
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Complex</span>
                        </div>
                    </div>

                    {/* Desktop Nav - Modern Tab Style */}
                    <div className="hidden lg:flex items-center gap-1 bg-slate-100/50 p-2 rounded-xl border border-slate-200/60">
                        {[
                            { name: "Home", path: "/homepage" },
                            { name: "Houses", path: "/houses" },
                            { name: "Shops", path: "/shops" },
                            { name: "About", path: "/about" },
                            { name: "Contact", path: "/contact" },
                            ...(role ? [{ name: "Dashboard", path: "/dashboard", isSpecial: true }] : []),
                        ].map((link) => (
                            <React.Fragment key={link.path}>
                                {(link.path === "/houses" || link.isSpecial) && (
                                    <div className="h-4 w-[1px] bg-slate-200 mx-2" />
                                )}
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) => `
                                        flex items-center gap-4 px-5 py-2 text-sm font-semibold transition-all duration-300 rounded-lg
                                        ${isActive
                                            ? "bg-white text-indigo-600 shadow-sm"
                                            : "text-slate-500 hover:text-slate-900 hover:bg-white/50"}
                                        `}
                                >
                                    {link.isSpecial && (
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    )}
                                    {link.name}
                                </NavLink>
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Action Area */}
                    <div className="flex items-center gap-4">
                        {!role ? (
                            <div className="hidden md:flex items-center gap-3">
                                <button
                                    onClick={() => navigate("/login")}
                                    className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => navigate("/signup")}
                                    className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-full hover:bg-slate-900 transition-all active:scale-95 shadow-lg shadow-indigo-100"
                                >
                                    Join Now
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">

                                {/* Notification Bell */}
                                <button className="relative p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-xl transition-all group">
                                    <Bell size={20} strokeWidth={2.2} />
                                    <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600 border-2 border-white"></span>
                                    </span>
                                </button>

                                {/* Profile Action Capsule */}
                                <div
                                    className="group flex items-center gap-3 p-1 pr-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer"
                                    onClick={() => navigate("/profile")}
                                >
                                    <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center text-white shadow-inner border border-white/20">
                                        <span className="text-sm font-black tracking-tighter">
                                            {sessionStorage.getItem("fullName")?.charAt(0).toUpperCase() || "U"}
                                        </span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-slate-900 leading-tight tracking-tight">
                                            {sessionStorage.getItem("fullName") || "Anonymous User"}
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[10px] mt-1 font-bold text-indigo-500 uppercase tracking-[0.1em]">
                                                {sessionStorage.getItem("mobile")}
                                            </span>
                                        </div>
                                    </div>

                                    <ChevronRight size={14} className="ml-1 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                                </div>

                                {/* Logout Icon */}
                                <button
                                    onClick={handleLogout}
                                    className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all group"
                                    title="Sign Out"
                                >
                                    <LogOut size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        )}

                        {/* Mobile Toggle */}
                        <button
                            className="lg:hidden p-2.5 rounded-xl bg-slate-900 text-white shadow-lg"
                            onClick={() => setOpen(true)}
                        >
                            <Menu size={22} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* 2. Refined Mobile Menu */}
            <div className={`fixed inset-0 z-[200] ${open ? "visible" : "invisible"}`}>
                <div className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setOpen(false)} />
                <aside className={`absolute top-0 right-0 w-80 h-full bg-white transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${open ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="flex flex-col h-full p-8">
                        <div className="flex justify-between items-center mb-12">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-indigo-600 rounded-lg" />
                                <span className="font-bold text-slate-800">Menu</span>
                            </div>
                            <button onClick={() => setOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition"><X size={20} /></button>
                        </div>

                        <nav className="space-y-2">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) => `flex items-center justify-between p-4 rounded-xl font-semibold transition-all ${isActive ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"}`}
                                >
                                    {link.name} <ChevronRight size={16} className="opacity-40" />
                                </NavLink>
                            ))}
                            {role && (
                                <NavLink to="/dashboard" className="flex items-center gap-3 p-4 text-emerald-600 font-bold bg-emerald-50 rounded-xl mt-4">
                                    <LayoutDashboard size={20} /> Dashboard
                                </NavLink>
                            )}
                        </nav>

                        <div className="mt-auto space-y-4">
                            {!role ? (
                                <button onClick={() => navigate("/login")} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl">Partner Login</button>
                            ) : (
                                <button onClick={handleLogout} className="w-full py-4 border-2 border-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition">Sign Out</button>
                            )}
                            <p className="text-center text-[10px] text-slate-400 font-medium">BUILD SITE PLATFORM v4.2.0</p>
                        </div>
                    </div>
                </aside>
            </div>

            {/* 3. Content Area with Layout Grid */}
            <main className="relative pt-6">
                <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-slate-50 to-white -z-10" />
                <div className="mx-auto px-6 md:px-10 pb-10">
                    <div className="mb-8 flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span>Main</span>
                        <ChevronRight size={12} />
                        <span className="text-indigo-600">{location.pathname.replace("/", "") || "Home"}</span>
                    </div>

                    <div className="rounded-3xl min-h-[60vh]">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default OverLayout;