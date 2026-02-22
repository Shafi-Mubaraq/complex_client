import React, { useEffect, useState } from "react";
import { Users, Layout, ClipboardList, FileText, CreditCard, AlertCircle, User, Home, ChevronRight, ShieldCheck, BadgeCheck, Settings, Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Owner Pages
import UserManage from "../owner/UserManage";
import PropertyManage from "../owner/PropertyManage";
import BookingQueue from "../owner/BookingQueue";
import LeaseDetails from "../owner/LeaseDetails";

// Tenant Pages
import MyLease from "../tenant/MyLease";
import BookingRequest from "../tenant/BookingRequest";

const DashboardPage = () => {
    const [fullName, setFullName] = useState("");
    const [mobile, setMobile] = useState("");
    const [role, setRole] = useState("");
    const [dashboardTab, setDashboardTab] = useState("bookings");

    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/login", { replace: true });
    };

    useEffect(() => {
        setFullName(sessionStorage.getItem("fullName"));
        setMobile(sessionStorage.getItem("mobile"));
        setRole(sessionStorage.getItem("role"));
    }, []);

    const menuItems = [
        // Tenant Menu
        { id: "myLease", label: "My Lease", icon: Home, roles: ["tenant"] },
        { id: "bookingRequests", label: "Booking Requests", icon: FileText, roles: ["tenant"] },
        { id: "payments", label: "Payment History", icon: CreditCard, roles: ["tenant"] },
        { id: "complaints", label: "Support & Complaints", icon: AlertCircle, roles: ["tenant"] },
        { id: "profile", label: "My Profile", icon: User, roles: ["tenant"] },

        // Owner Menu
        { id: "users", label: "User Directory", icon: Users, roles: ["owner"] },
        { id: "property", label: "Property Control", icon: Home, roles: ["owner"] },
        { id: "bookingQueue", label: "Booking Queue", icon: ClipboardList, roles: ["owner"] },
        { id: "leaseDetails", label: "Lease Details", icon: FileText, roles: ["owner"] },
    ];

    return (
        <div className="grid lg:grid-cols-12 gap-6 mx-auto">
            {/* --- SIDE BAR --- */}
            <div className="lg:col-span-3 space-y-5">
                {/* Profile Card */}
                <div className="bg-white border border-slate-200/60 rounded-3xl p-4 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                    <div className="relative flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                                <span className="text-lg font-black">{fullName?.charAt(0)?.toUpperCase()}</span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-black text-slate-900 text-sm truncate">{fullName || "Partner"}</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{mobile}</p>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50/50 px-2.5 py-1 rounded-lg">{role === "owner" ? "System Admin" : "Verified Partner"}</span>
                        <button className="text-slate-300 hover:text-indigo-600 transition-colors">
                            <Settings size={16} />
                        </button>
                    </div>
                </div>

                {/* Sidebar Menu */}
                <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-3 border border-slate-200/50 flex flex-col">
                    <nav className="space-y-2 flex-1">
                        {menuItems.map((item) => {
                            if (!item.roles.includes(role)) return null;
                            const isActive = dashboardTab === item.id;
                            const Icon = item.icon;
                            return (
                                <button key={item.id} onClick={() => setDashboardTab(item.id)} className={`w-full group flex items-center justify-between p-3 rounded-2xl transition-all duration-300 ${isActive ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100" : "text-slate-500 hover:bg-white hover:text-indigo-600 hover:shadow-sm"}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`p-1.5 rounded-lg ${isActive ? "bg-white/20" : "bg-slate-100 group-hover:bg-indigo-50"}`}>
                                            <Icon size={16} />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-wider">{item.label}</span>
                                    </div>
                                    <ChevronRight size={14} className={`transition-all ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`} />
                                </button>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="pt-3 border-t mt-2 border-slate-200/60">
                        <button onClick={handleLogout} className="w-full group flex items-center justify-between p-3 rounded-2xl text-slate-500 bg-white border border-slate-200/60 hover:border-indigo-300 hover:bg-indigo-50/40 transition-all duration-300">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-indigo-100 transition-colors">
                                    <ShieldCheck size={16} />
                                </div>
                                <span className="text-xs font-black uppercase tracking-wider">Sign Out</span>
                            </div>
                            <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="lg:col-span-9 space-y-6">
                <div className="bg-white rounded-[1.0rem] border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-8 flex-1">
                        {role === "owner" && (
                            <>
                                {dashboardTab === "users" && <UserManage />}
                                {dashboardTab === "property" && <PropertyManage />}
                                {dashboardTab === "bookingQueue" && <BookingQueue />}
                                {dashboardTab === "leaseDetails" && <LeaseDetails />}
                            </>
                        )}
                        {role === "tenant" && (
                            <>
                                {dashboardTab === "myLease" && <MyLease />}
                                {dashboardTab === "bookingRequests" && <BookingRequest />}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
