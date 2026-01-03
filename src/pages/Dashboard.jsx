import React, { useEffect, useState } from "react";
import {
    Users,
    ClipboardList,
    MessageCircle,
    Building,
    Store,
    Home
} from "lucide-react";

import UserManage from "../pages/UserManage";
import PropertyManage from "./PropertyManage";
import BookingRequest from "./BookingRequest";

const DashboardPage = () => {

    const [fullName, setFullName] = useState("");
    const [mobile, setMobile] = useState("");
    const [role, setRole] = useState(null); // ✅ role
    const [dashboardTab, setDashboardTab] = useState("bookings");

    useEffect(() => {
        setFullName(sessionStorage.getItem("fullName"));
        setMobile(sessionStorage.getItem("mobile"));
        setRole(Number(sessionStorage.getItem("role"))); // ✅ convert to number
    }, []);

    return (
        <div className="grid lg:grid-cols-4 gap-6">

            {/* LEFT SIDEBAR */}
            <div className="lg:col-span-1 bg-white shadow-xl rounded-xl p-6">

                {/* USER INFO */}
                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                    <div className="p-3 bg-indigo-100 rounded-full">
                        <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                        <p className="font-bold text-lg">{fullName || "User"}</p>
                        <p className="text-sm text-gray-500">{mobile || "No mobile"}</p>
                        <p className="text-xs text-indigo-600 font-semibold">
                            {role === 0 ? "Admin" : "User"}
                        </p>
                    </div>
                </div>

                {/* NAVIGATION */}
                <nav className="space-y-2">

                    {/* ✅ USER & ADMIN BOTH */}
                    <button
                        onClick={() => setDashboardTab("bookings")}
                        className={`w-full p-3 rounded-lg text-left flex gap-3 ${
                            dashboardTab === "bookings"
                                ? "bg-indigo-100 text-indigo-700"
                                : "hover:bg-gray-100"
                        }`}
                    >
                        <ClipboardList />
                        My Portal
                    </button>

                    {/* ✅ ADMIN ONLY */}
                    {role === 0 && (
                        <>
                            <button
                                onClick={() => setDashboardTab("users")}
                                className={`w-full p-3 rounded-lg text-left flex gap-3 ${
                                    dashboardTab === "users"
                                        ? "bg-indigo-100 text-indigo-700"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                <Users />
                                User Management
                            </button>

                            <button
                                onClick={() => setDashboardTab("request")}
                                className={`w-full p-3 rounded-lg text-left flex gap-3 ${
                                    dashboardTab === "request"
                                        ? "bg-indigo-100 text-indigo-700"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                <MessageCircle />
                                Raise Request
                            </button>

                            <button
                                onClick={() => setDashboardTab("houses")}
                                className={`w-full p-3 rounded-lg text-left flex gap-3 ${
                                    dashboardTab === "houses"
                                        ? "bg-indigo-100 text-indigo-700"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                <Building />
                                View Houses
                            </button>

                            <button
                                onClick={() => setDashboardTab("shops")}
                                className={`w-full p-3 rounded-lg text-left flex gap-3 ${
                                    dashboardTab === "shops"
                                        ? "bg-indigo-100 text-indigo-700"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                <Store />
                                View Shops
                            </button>

                            <button
                                onClick={() => setDashboardTab("property")}
                                className={`w-full p-3 rounded-lg text-left flex gap-3 ${
                                    dashboardTab === "property"
                                        ? "bg-indigo-100 text-indigo-700"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                <Home />
                                Property Management
                            </button>

                            <button
                                onClick={() => setDashboardTab("bookingRequest")}
                                className={`w-full p-3 rounded-lg text-left flex gap-3 ${
                                    dashboardTab === "bookingRequest"
                                        ? "bg-indigo-100 text-indigo-700"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                <MessageCircle />
                                Booking Request
                            </button>
                        </>
                    )}
                </nav>
            </div>

            {/* RIGHT CONTENT */}
            <div className="lg:col-span-3 bg-white shadow-xl rounded-xl p-6">

                {/* USER & ADMIN */}
                {dashboardTab === "bookings" && (
                    <h2 className="text-xl font-bold">My Portal</h2>
                )}

                {/* ADMIN ONLY */}
                {role === 0 && dashboardTab === "users" && <UserManage />}
                {role === 0 && dashboardTab === "request" && (
                    <h2 className="text-xl font-bold">Raise Request</h2>
                )}
                {role === 0 && dashboardTab === "houses" && (
                    <h2 className="text-xl font-bold">Houses</h2>
                )}
                {role === 0 && dashboardTab === "shops" && (
                    <h2 className="text-xl font-bold">Shops</h2>
                )}
                {role === 0 && dashboardTab === "property" && <PropertyManage />}
                {role === 0 && dashboardTab === "bookingRequest" && <BookingRequest />}
            </div>
        </div>
    );
};

export default DashboardPage;
