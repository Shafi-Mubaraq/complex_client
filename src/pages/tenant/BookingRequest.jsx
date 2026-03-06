import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    CheckCircle2,
    XCircle,
    Clock,
    MapPin,
    IndianRupee,
    Calendar,
    ChevronRight,
    Inbox,
    Building2
} from "lucide-react";

const BookingRequest = () => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("all");

    const mobile = sessionStorage.getItem("mobile");

    useEffect(() => {
        if (!mobile) {
            setError("Please log in to view your requests.");
            setLoading(false);
            return;
        }

        const fetchRequests = async () => {
            try {
                const res = await axios.get(`${apiUrl}/api/propertyRequest/user/${mobile}`);
                if (res.data.success) {
                    setRequests(res.data.data);
                }
            } catch (err) {
                setError("Unable to load your requests. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [mobile, apiUrl]);

    const filteredRequests = requests.filter(req =>
        filter === "all" ? true : req.status === filter
    );

    const getStatusColor = (status) => {
        switch (status) {
            case "approved": return "emerald";
            case "rejected": return "rose";
            default: return "amber";
        }
    };

    const StatusBadge = ({ status }) => {
        const color = getStatusColor(status);
        const Icon = status === "approved" ? CheckCircle2 : status === "rejected" ? XCircle : Clock;
        return (
            <span className={`
                inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                ${color === 'emerald' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20' : ''}
                ${color === 'rose' ? 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20' : ''}
                ${color === 'amber' ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20' : ''}
            `}>
                <Icon size={14} />
                <span className="capitalize">{status}</span>
            </span>
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
                    </div>
                    <p className="mt-4 text-sm text-slate-500">Loading your bookings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="">
            {/* Header */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto pb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                            <Building2 className="text-indigo-600" size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-slate-900">My Booking Requests</h1>
                            <p className="text-sm text-slate-500 mt-0.5">Track and manage your property inquiries</p>
                        </div>
                    </div>

                    {/* Filter Tabs - Segmented Control Style */}
                    <div className="flex gap-2 mt-6">
                        {["all", "pending", "approved", "rejected"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`
                                    px-4 py-2 rounded-lg text-sm font-medium transition-all
                                    ${filter === tab
                                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                                        : 'text-slate-600 hover:bg-slate-100'
                                    }
                                `}
                            >
                                <span className="capitalize">{tab}</span>
                                {tab !== 'all' && (
                                    <span className="ml-2 text-xs opacity-75">
                                        ({requests.filter(r => r.status === tab).length})
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-8">
                {error ? (
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 text-center max-w-md mx-auto">
                        <XCircle className="text-rose-400 mx-auto mb-3" size={32} />
                        <h3 className="text-lg font-medium text-rose-800">Error Loading Requests</h3>
                        <p className="text-sm text-rose-600 mt-1">{error}</p>
                    </div>
                ) : filteredRequests.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center mx-auto shadow-sm">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Inbox className="text-slate-400" size={28} />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">No requests found</h3>
                        <p className="text-sm text-slate-500 mt-1">
                            {filter === 'all'
                                ? "You haven't made any booking requests yet."
                                : `You have no ${filter} requests.`}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredRequests.map((req, index) => (
                            <div
                                key={req._id}
                                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    {/* Left side: Property info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start gap-4">
                                            {/* Icon / placeholder */}
                                            <div className="hidden sm:flex w-12 h-12 bg-slate-100 rounded-lg items-center justify-center text-slate-400">
                                                <MapPin size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <h2 className="text-lg font-medium text-slate-900 truncate">
                                                    {req.property?.title || "Unnamed Property"}
                                                </h2>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm">
                                                    <span className="flex items-center gap-1 text-slate-500">
                                                        <MapPin size={14} className="text-slate-400" />
                                                        {req.property?.location || "Location not specified"}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-slate-700 font-medium">
                                                        <IndianRupee size={14} className="text-slate-400" />
                                                        {req.property?.rent?.toLocaleString() || "N/A"}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-slate-500">
                                                        <Calendar size={14} className="text-slate-400" />
                                                        {formatDate(req.createdAt)}
                                                    </span>
                                                </div>
                                                {req.message && (
                                                    <p className="text-sm text-slate-500 mt-2 line-clamp-1">
                                                        <span className="text-slate-400">Note:</span> {req.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right side: Status and action */}
                                    <div className="flex items-center justify-between sm:justify-end gap-4 pl-0 sm:pl-4">
                                        <StatusBadge status={req.status} />
                                        <button className="p-2 -mr-2 text-slate-400 hover:text-indigo-600 rounded-full hover:bg-slate-100 transition-colors">
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Optional: Add subtle background pattern */}
            <div className="fixed inset-0 pointer-events-none -z-10 opacity-5" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0)`,
                backgroundSize: '40px 40px'
            }} />
        </div>
    );
};

export default BookingRequest;