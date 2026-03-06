import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
    CheckCircle2,
    XCircle,
    Users,
    Clock,
    Loader2,
    Search,
    Home,
    Phone,
    Calendar,
    Banknote,
    X,
    MapPin,
    TrendingUp,
    UserCheck,
    UserX,
} from "lucide-react";

const BookingQueue = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);
    const [searchContact, setSearchContact] = useState("");
    const [showLeaseModal, setShowLeaseModal] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [leaseData, setLeaseData] = useState({
        startDate: "",
        endDate: "",
        monthlyRent: "",
        depositAmount: "",
    });

    const fetchRequests = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/propertyRequest/all`);
            setRequests(res.data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // Calculate stats
    const totalRequests = requests.length;
    const pendingRequests = requests.filter((r) => r.status === "pending").length;
    const acceptedRequests = requests.filter((r) => r.status === "accepted").length;
    const rejectedRequests = requests.filter((r) => r.status === "rejected").length;

    const filteredRequests = useMemo(() => {
        return requests.filter((req) => {
            const name = req.applicantUser?.fullName?.toLowerCase() || "";
            const phone = req.applicantUser?.mobile || "";
            return name.includes(searchContact.toLowerCase()) || phone.includes(searchContact);
        });
    }, [searchContact, requests]);

    const handleAction = async (id, action) => {
        if (action === "accept") {
            setSelectedRequestId(id);
            setShowLeaseModal(true);
            return;
        }

        if (action === "reject") {
            try {
                setProcessingId(id);
                await axios.put(`${apiUrl}/api/propertyRequest/reject/${id}`);
                await fetchRequests();
            } catch (err) {
                alert(err.response?.data?.message || "Operation failed");
            } finally {
                setProcessingId(null);
            }
        }
    };

    const createLease = async () => {

        if (!leaseData.startDate || !leaseData.monthlyRent) {
            alert("Start Date and Monthly Rent are required");
            return;
        }

        try {
            setProcessingId(selectedRequestId);

            // 1️⃣ First Accept Request
            await axios.put(`${apiUrl}/api/propertyRequest/accept/${selectedRequestId}`);

            // 2️⃣ Then Create Lease
            await axios.post(`${apiUrl}/api/propertyRequest/create-lease/${selectedRequestId}`, {
                startDate: leaseData.startDate,
                endDate: leaseData.endDate,
                monthlyRent: Number(leaseData.monthlyRent),
                depositAmount: Number(leaseData.depositAmount),
            });

            alert("Lease Created Successfully");

            setShowLeaseModal(false);
            setLeaseData({
                startDate: "",
                endDate: "",
                monthlyRent: "",
                depositAmount: "",
            });

            await fetchRequests();
        } catch (err) {
            alert(err.response?.data?.message || "Lease creation failed");
        } finally {
            setProcessingId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 p-6 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        {/* Header skeleton */}
                        <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/4 mb-8"></div>
                        {/* Stats skeleton */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-24 bg-slate-200 rounded-2xl"></div>
                            ))}
                        </div>
                        {/* Table skeleton */}
                        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
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
        <div className="font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                            <Users className="text-indigo-600" size={32} />
                            Booking Requests
                        </h1>
                        <p className="text-slate-500 mt-1">Review and manage tenant applications</p>
                    </div>
                    <div className="relative w-full md:w-80">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Search by name or mobile..."
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                            value={searchContact}
                            onChange={(e) => setSearchContact(e.target.value)}
                        />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Total Requests</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{totalRequests}</p>
                            </div>
                            <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                <TrendingUp size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Pending</p>
                                <p className="text-2xl font-bold text-amber-600 mt-1">{pendingRequests}</p>
                            </div>
                            <div className="h-10 w-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                                <Clock size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Accepted</p>
                                <p className="text-2xl font-bold text-emerald-600 mt-1">{acceptedRequests}</p>
                            </div>
                            <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                                <UserCheck size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Rejected</p>
                                <p className="text-2xl font-bold text-rose-600 mt-1">{rejectedRequests}</p>
                            </div>
                            <div className="h-10 w-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                                <UserX size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Requests Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-y border-slate-100">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <Home size={14} className="text-slate-400" />
                                            Property Details
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <Users size={14} className="text-slate-400" />
                                            Applicant
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <Phone size={14} className="text-slate-400" />
                                            Phone No
                                        </div>
                                    </th>
                                    <th className="px-8 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} className="text-slate-400" />
                                            Status
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-xs text-center font-semibold text-slate-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredRequests.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                                            No matching requests found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredRequests.map((req) => (
                                        <tr key={req._id} className="group hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                                        <Home size={20} />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-slate-800 group-hover:text-indigo-600 transition-colors">
                                                            {req.property?.title || "—"}
                                                        </div>
                                                        <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                                                            <MapPin size={12} />
                                                            {req.property?.location || "—"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-800">
                                                    {req.applicantUser?.fullName || "—"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                                                    <Phone size={12} />
                                                    {req.applicantUser?.mobile || "—"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-left">
                                                <span
                                                    className={`inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${req.status === "accepted"
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                                        : req.status === "rejected"
                                                            ? "bg-rose-50 text-rose-700 border-rose-100"
                                                            : "bg-amber-50 text-amber-700 border-amber-100"
                                                        }`}
                                                >
                                                    {req.status === "pending" && <Clock size={12} />}
                                                    {req.status === "accepted" && <CheckCircle2 size={12} />}
                                                    {req.status === "rejected" && <XCircle size={12} />}
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {req.status === "pending" ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            disabled={processingId === req._id}
                                                            onClick={() => handleAction(req._id, "reject")}
                                                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100 disabled:opacity-50"
                                                            title="Reject Application"
                                                        >
                                                            <XCircle size={20} />
                                                        </button>
                                                        <button
                                                            disabled={processingId === req._id}
                                                            onClick={() => handleAction(req._id, "accept")}
                                                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm disabled:opacity-50"
                                                        >
                                                            {processingId === req._id ? (
                                                                <Loader2 className="animate-spin" size={16} />
                                                            ) : (
                                                                <CheckCircle2 size={16} />
                                                            )}
                                                            Approve
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-slate-400 font-medium">
                                                        Processed
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Lease Modal */}
            {showLeaseModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setShowLeaseModal(false)}
                    ></div>
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setShowLeaseModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-slate-900">Finalize Lease Agreement</h2>
                            <p className="text-sm text-slate-500 mt-1">
                                Enter the contract details to complete approval.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                                        Start Date
                                    </label>
                                    <div className="relative">
                                        <Calendar
                                            size={16}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />
                                        <input
                                            type="date"
                                            className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                            value={leaseData.startDate}
                                            onChange={(e) =>
                                                setLeaseData({ ...leaseData, startDate: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                                        End Date
                                    </label>
                                    <div className="relative">
                                        <Calendar
                                            size={16}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />
                                        <input
                                            type="date"
                                            className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                            value={leaseData.endDate}
                                            onChange={(e) =>
                                                setLeaseData({ ...leaseData, endDate: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                                    Monthly Rent (₹)
                                </label>
                                <div className="relative">
                                    <Banknote
                                        size={16}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                        value={leaseData.monthlyRent}
                                        onChange={(e) =>
                                            setLeaseData({ ...leaseData, monthlyRent: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                                    Security Deposit (₹)
                                </label>
                                <div className="relative">
                                    <Banknote
                                        size={16}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                        value={leaseData.depositAmount}
                                        onChange={(e) =>
                                            setLeaseData({ ...leaseData, depositAmount: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all"
                                    onClick={() => setShowLeaseModal(false)}
                                >
                                    Later
                                </button>
                                <button
                                    className="flex-1 px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                                    onClick={createLease}
                                >
                                    Generate Lease
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingQueue;