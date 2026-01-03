import React, { useEffect, useState } from "react";
import {
    Users, Layout, ClipboardList, MessageCircle, Building,
    Store, Home, ChevronRight, ShieldCheck, BadgeCheck, Settings, Bell, Search
} from "lucide-react";

import UserManage from "../pages/UserManage";
import PropertyManage from "./PropertyManage";
import BookingRequest from "./BookingRequest";

const DashboardPage = () => {

    const [fullName, setFullName] = useState("");
    const [mobile, setMobile] = useState("");
    const [role, setRole] = useState(null);
    const [dashboardTab, setDashboardTab] = useState("bookings");

    useEffect(() => {
        setFullName(sessionStorage.getItem("fullName"));
        setMobile(sessionStorage.getItem("mobile"));
        setRole(Number(sessionStorage.getItem("role")));
    }, []);

    const menuItems = [
        { id: "bookings", label: "Overview", icon: Layout, adminOnly: false },
        { id: "users", label: "User Directory", icon: Users, adminOnly: true },
        { id: "property", label: "Property Control", icon: Home, adminOnly: true },
        { id: "bookingRequest", label: "Booking Queue", icon: ClipboardList, adminOnly: true },
        { id: "houses", label: "Residential Unit", icon: Building, adminOnly: true },
        { id: "shops", label: "Commercial Space", icon: Store, adminOnly: true },
        { id: "request", label: "Support Tickets", icon: MessageCircle, adminOnly: true },
    ];

    return (
        <div className="grid lg:grid-cols-12 gap-6 mx-auto">

            {/* --- SIDE BAR --- */}
            <div className="lg:col-span-3 space-y-5">

                {/* Profile Card: Architectural Style */}
                <div className="bg-white border border-slate-200/60 rounded-3xl p-4 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                    <div className="relative flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                                <span className="text-lg font-black">{fullName?.charAt(0).toUpperCase()}</span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-black text-slate-900 text-sm truncate">{fullName || "Partner"}</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{mobile}</p>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50/50 px-2.5 py-1 rounded-lg">
                            {role === 0 ? "System Admin" : "Verified Partner"}
                        </span>
                        <button className="text-slate-300 hover:text-indigo-600 transition-colors">
                            <Settings size={16} />
                        </button>
                    </div>
                </div>

                {/* Navigation: Sidebar Menu */}
                <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-3 border border-slate-200/50">
                    <nav className="space-y-2">
                        {menuItems.map((item) => {
                            if (item.adminOnly && role !== 0) return null;
                            const isActive = dashboardTab === item.id;
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setDashboardTab(item.id)}
                                    className={`w-full group flex items-center justify-between p-3 rounded-2xl transition-all duration-300 ${isActive
                                        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100"
                                        : "text-slate-500 hover:bg-white hover:text-indigo-600 hover:shadow-sm"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-1.5 rounded-lg ${isActive ? "bg-white/20" : "bg-slate-100 group-hover:bg-indigo-50"}`}>
                                            <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-wider">
                                            {item.label}
                                        </span>
                                    </div>
                                    <ChevronRight size={14} className={`transition-all ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`} />
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="lg:col-span-9 space-y-6">

                {/* Content Container */}
                <div className="bg-white rounded-[1.0rem] border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">

                    {/* Module Header */}
                    <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-gradient-to-r from-white to-slate-50/50">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="w-8 h-[2px] bg-indigo-600 rounded-full" />
                                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">Module</span>
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">
                                {menuItems.find(i => i.id === dashboardTab)?.label}
                            </h2>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Instance Status</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md uppercase">Live</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-8 flex-1">
                        {dashboardTab === "bookings" && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { label: "Houses", val: "12", color: "indigo" },
                                    { label: "Shops", val: "04", color: "violet" },
                                    { label: "Requests", val: "09", color: "emerald" }
                                ].map((stat, i) => (
                                    <div key={i} className="p-6 rounded-3xl border border-slate-100 bg-white hover:shadow-xl hover:shadow-slate-100 transition-all cursor-pointer group">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                                        <div className="flex items-center justify-between mt-4">
                                            <h4 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.val}</h4>
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-all">
                                                <ChevronRight size={20} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {role === 0 && (
                            <div className="animate-in fade-in zoom-in-95 duration-500">
                                {dashboardTab === "users" && <UserManage />}
                                {dashboardTab === "property" && <PropertyManage />}
                                {dashboardTab === "bookingRequest" && <BookingRequest />}
                                {["request", "houses", "shops"].includes(dashboardTab) && (
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="relative mb-6">
                                            <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] rotate-12 absolute inset-0" />
                                            <div className="w-20 h-20 bg-white border border-indigo-100 rounded-[2rem] flex items-center justify-center relative shadow-sm">
                                                <Layout className="text-indigo-600" size={32} />
                                            </div>
                                        </div>
                                        <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">Initializing Module</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Fetching secure data streams...</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;