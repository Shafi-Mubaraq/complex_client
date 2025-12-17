import React, { useState } from "react";
import {
    Users,
    ClipboardList,
    MessageCircle,
    Building,
    Store,
    Home
} from "lucide-react";

import UserManage from "../components/Common/UserManage";
import PropertyManagePage from"./PropertyManagePage"

const fullName = sessionStorage.getItem("fullName");
const mobile = sessionStorage.getItem("mobile");

const DashboardPage = () => {
    const [dashboardTab, setDashboardTab] = useState("bookings");

    return (
        <div className="grid lg:grid-cols-4 gap-8 p-6">

            {/* ================= Sidebar ================= */}
            <div className="lg:col-span-1 bg-white shadow-xl rounded-xl p-6">

                {/* User Info */}
                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                    <div className="p-3 bg-indigo-100 rounded-full">
                        <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                        <p className="font-bold text-lg">{fullName || "User"}</p>
                        <p className="text-sm text-gray-500">{mobile || "No mobile"}</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">

                    <button
                        onClick={() => setDashboardTab("bookings")}
                        className={`w-full p-3 rounded-lg text-left flex gap-3 ${
                            dashboardTab === "bookings"
                                ? "bg-indigo-100 text-indigo-700"
                                : "hover:bg-gray-100"
                        }`}
                    >
                        <ClipboardList />
                        My Bookings
                    </button>

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

                    {/* ✅ Property Management */}
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

                </nav>
            </div>

            {/* ================= Content ================= */}
            <div className="lg:col-span-3 bg-white shadow-xl rounded-xl p-6">

                {dashboardTab === "bookings" && <h2 className="text-xl font-bold">My Bookings</h2>}

                {dashboardTab === "users" && <UserManage />}

                {dashboardTab === "request" && <h2 className="text-xl font-bold">Raise Request</h2>}

                {dashboardTab === "houses" && <h2 className="text-xl font-bold">Houses</h2>}

                {dashboardTab === "shops" && <h2 className="text-xl font-bold">Shops</h2>}

                {dashboardTab === "property" && <PropertyManagePage/>}

            </div>
        </div>
    );
};

export default DashboardPage;
