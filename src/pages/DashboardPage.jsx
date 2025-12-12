import React from 'react'
import { Home, Users, Briefcase, Phone, LogIn, LogOut, LayoutDashboard, ThumbsUp, MessageCircle, Building, Store, ClipboardList } from "lucide-react";
const fullName = sessionStorage.getItem("fullName");
const mobile =sessionStorage.getItem("mobile")
console.log(fullName)


const DashboardPage = () => {
  return (  
        <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1 p-6 bg-white shadow-xl rounded-xl h-fit">
                <div className="flex items-center space-x-3 mb-6 pb-4 border-b">
                    <div className="p-3 bg-indigo-100 rounded-full">
                        <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                        <p className="font-bold text-lg">{fullName}</p>
                        <p className="text-sm text-gray-500">{mobile}

                        </p>
                    </div>
                </div>

                <nav className="space-y-2">
                    <button
                        className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-colors `}
                    >
                        <ClipboardList className="w-5 h-5" /> My Bookings
                    </button>
                    <button
                        // onClick={() => setDashboardSubTab("complaint")}
                        className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-colors `}
                    >
                        <MessageCircle className="w-5 h-5" /> Raise a Request
                    </button>
                    <button
                        // onClick={() => setActiveTab("houses")}
                        className={`w-full text-left flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors`}
                    >
                        <Building className="w-5 h-5" /> View Houses
                    </button>
                    <button
                        // onClick={() => setActiveTab("shops")}
                        className={`w-full text-left flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors`}
                    >
                        <Store className="w-5 h-5" /> View Shops
                    </button>
                </nav>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3 p-6 bg-white shadow-xl rounded-xl">
                {/* {dashboardSubTab === "bookings" && <BookingManager properties={properties} />}
                {dashboardSubTab === "complaint" && <ComplaintForm />} */}
            </div>
        </div>
    );

}

export default DashboardPage


