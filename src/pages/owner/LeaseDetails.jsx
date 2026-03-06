import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    FiHome,
    FiUser,
    FiCalendar,
    FiSearch,
    FiFilter,
    FiMoreVertical,
    FiTrendingUp,
    FiClock,
    FiCheckCircle,
    FiXCircle,
    FiDollarSign,
} from "react-icons/fi";

const LeaseDetails = () => {

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const [leases, setLeases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchLeases = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/propertyRequest/leases`);
            setLeases(res.data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeases();
    }, []);

    const totalLeases = leases.length;
    const activeLeases = leases.filter((l) => l.status?.toLowerCase() === "active").length;
    const pendingLeases = leases.filter((l) => l.status?.toLowerCase() === "pending").length;
    const expiredLeases = leases.filter((l) => l.status?.toLowerCase() === "expired").length;
    const totalMonthlyRent = leases.reduce(
        (sum, lease) => sum + (lease.monthlyRent || 0),
        0
    );

    const StatusBadge = ({ status }) => {
        const statusConfig = {
            active: {
                bg: "bg-emerald-50",
                text: "text-emerald-700",
                ring: "ring-emerald-600/20",
                icon: FiCheckCircle,
            },
            pending: {
                bg: "bg-amber-50",
                text: "text-amber-700",
                ring: "ring-amber-600/20",
                icon: FiClock,
            },
            expired: {
                bg: "bg-rose-50",
                text: "text-rose-700",
                ring: "ring-rose-600/20",
                icon: FiXCircle,
            },
        };
        const config = statusConfig[status?.toLowerCase()] || {
            bg: "bg-slate-50",
            text: "text-slate-700",
            ring: "ring-slate-600/20",
            icon: FiHome,
        };
        const Icon = config.icon;

        return (
            <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${config.bg} ${config.text} ${config.ring}`}
            >
                <Icon size={12} />
                {status}
            </span>
        );
    };

    const filteredLeases = leases.filter((lease) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            lease.property?.title?.toLowerCase().includes(searchLower) ||
            lease.tenant?.fullName?.toLowerCase().includes(searchLower) ||
            lease.owner?.fullName?.toLowerCase().includes(searchLower)
        );
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 p-6 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        {/* Header skeleton */}
                        <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/4 mb-8"></div>
                        {/* Stats skeleton */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-24 bg-slate-200 rounded-2xl"></div>
                            ))}
                        </div>
                        {/* Table skeleton */}
                        <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-4">
                            <div className="h-10 bg-slate-200 rounded-xl w-1/2"></div>
                            <div className="space-y-3">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-12 bg-slate-200 rounded-xl"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screenfont-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header with title and CTA */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                            Lease Overview
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Manage and monitor all rental contracts
                        </p>
                    </div>
                    <button className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-200/50">
                        <FiHome size={18} />
                        Add New Lease
                    </button>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-t-2xl border-x border-t border-slate-100 p-5 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search property, tenant or owner..."
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2 text-slate-600 font-medium px-5 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
                        <FiFilter size={18} />
                        Filters
                    </button>
                </div>

                {/* Leases Table */}
                <div className="bg-white rounded-b-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-y border-slate-100">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <FiHome size={14} className="text-slate-400" />
                                            Property
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <FiUser size={14} className="text-slate-400" />
                                            Tenant / Owner
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <FiCalendar size={14} className="text-slate-400" />
                                            Timeline
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <FiDollarSign size={14} className="text-slate-400" />
                                            Monthly Rent
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredLeases.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                            No leases found matching your search.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredLeases.map((lease) => (
                                        <tr key={lease._id} className="group hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-800 group-hover:text-indigo-600 transition-colors">
                                                    {lease.property?.title || "—"}
                                                </div>
                                                <div className="text-xs text-slate-400 mt-0.5">
                                                    {lease.property?.location || "—"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-700 uppercase">
                                                        {lease.tenant?.fullName?.charAt(0) || "?"}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-slate-700">
                                                            {lease.tenant?.fullName || "—"}
                                                        </div>
                                                        <div className="text-xs text-slate-400">
                                                            Owner: {lease.owner?.fullName || "—"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <FiCalendar className="text-indigo-400" size={14} />
                                                    <span>
                                                        {lease.startDate
                                                            ? new Date(lease.startDate).toLocaleDateString("en-US", {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            })
                                                            : "—"}
                                                    </span>
                                                    <span className="text-slate-300">→</span>
                                                    <span>
                                                        {lease.endDate
                                                            ? new Date(lease.endDate).toLocaleDateString("en-US", {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            })
                                                            : "—"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-semibold text-slate-800">
                                                    ₹{lease.monthlyRent?.toLocaleString() || 0}
                                                    <span className="text-xs text-slate-400 font-normal ml-1">/mo</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={lease.status} />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-slate-300 hover:text-slate-600 transition-colors">
                                                    <FiMoreVertical size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaseDetails;