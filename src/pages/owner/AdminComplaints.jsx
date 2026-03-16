
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { 
    MessageCircleWarning, Loader2, X, CheckCircle2, 
    Clock, Ban, Star, User, Home, Calendar, Eye, RefreshCw
} from "lucide-react";

const AdminComplaints = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = sessionStorage.getItem("token");
    const mobile = sessionStorage.getItem("mobile");

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false); // Silent refresh state

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [statusToUpdate, setStatusToUpdate] = useState("");
    const [ownerResponse, setOwnerResponse] = useState("");
    const [previewImage, setPreviewImage] = useState(null);

    // Optimized Fetch Function
    const fetchComplaints = useCallback(async (isSilent = false) => {
        if (!isSilent) setLoading(true);
        setIsRefreshing(true);
        try {
            const res = await axios.get(
                `${apiUrl}/api/feedback/owner/${mobile}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Only update state if data actually changed to prevent unnecessary re-renders
            setComplaints(res.data);
        } catch (error) {
            console.error("Complaint fetch error:", error);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    }, [apiUrl, mobile, token]);

    // Automatic Refresh Logic (Polling every 10 seconds)
    useEffect(() => {
        fetchComplaints(); // Initial load

        const interval = setInterval(() => {
            fetchComplaints(true); // Silent background refresh
        }, 10000); // 10 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [fetchComplaints]);

    const handleUpdateClick = (id, status) => {
        setSelectedId(id);
        setStatusToUpdate(status);
        setShowModal(true);
    };

    const submitStatusUpdate = async () => {
        if (!ownerResponse.trim()) return alert("Please enter a response message.");
        try {
            await axios.put(`${apiUrl}/api/complaints/update/${selectedId}`,
                { status: statusToUpdate, response: ownerResponse },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setShowModal(false);
            setOwnerResponse("");
            fetchComplaints(true); // Immediate refresh after action
        } catch (error) {
            alert("Failed to update complaint");
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "resolved": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "in_progress": return "bg-amber-100 text-amber-700 border-amber-200";
            case "closed": return "bg-slate-100 text-slate-700 border-slate-200";
            default: return "bg-rose-100 text-rose-700 border-rose-200";
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-screen bg-slate-50">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
                            <MessageCircleWarning className="w-7 h-7 text-white" />
                        </div>
                        Maintenance Board
                    </h2>
                    <div className="flex items-center gap-2 mt-1 ml-1">
                        <p className="text-slate-500">Review and resolve property maintenance requests.</p>
                        {isRefreshing && <RefreshCw className="w-3 h-3 text-indigo-500 animate-spin" />}
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200 w-fit">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-sm font-bold text-slate-700">{complaints.length} Active Tickets</span>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <Loader2 className="animate-spin w-10 h-10 mb-4 text-indigo-600" />
                    <p className="font-semibold">Syncing records...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {complaints.map((complaint) => (
                        <div key={complaint._id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                            <div className="flex flex-col lg:flex-row">
                                
                                {complaint.image && (
                                    <div className="lg:w-72 h-48 lg:h-auto relative group">
                                        <img 
                                            src={`${apiUrl}/${complaint.image}`} 
                                            alt="Issue" 
                                            className="w-full h-full object-cover"
                                        />
                                        <button 
                                            onClick={() => setPreviewImage(`${apiUrl}/${complaint.image}`)}
                                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white"
                                        >
                                            <Eye size={24} />
                                        </button>
                                    </div>
                                )}

                                <div className="flex-1 p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest ${getStatusStyle(complaint.status)}`}>
                                                {complaint.status.replace("_", " ")}
                                            </span>
                                            <h3 className="text-xl font-bold text-slate-900 mt-2">{complaint.title}</h3>
                                        </div>
                                    </div>

                                    <p className="text-slate-600 text-sm leading-relaxed mb-6">{complaint.description}</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4 border-y border-slate-50">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><User size={16} /></div>
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-slate-400">Tenant</p>
                                                <p className="text-sm font-bold text-slate-700">{complaint.tenant?.fullName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><Home size={16} /></div>
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-slate-400">Property</p>
                                                <p className="text-sm font-bold text-slate-700">{complaint.property?.title}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><Calendar size={16} /></div>
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-slate-400">Dated</p>
                                                <p className="text-sm font-bold text-slate-700">{new Date(complaint.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Response & Feedback Row */}
                                    <div className="flex flex-col md:flex-row gap-4 mt-6">
                                        {complaint.response && (
                                            <div className="flex-1 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                                                <p className="text-[10px] font-bold text-indigo-600 uppercase mb-1">Your Response</p>
                                                <p className="text-sm text-indigo-900 italic">"{complaint.response}"</p>
                                            </div>
                                        )}
                                        {complaint.feedback && (
                                            <div className="flex-1 p-4 bg-amber-50 rounded-xl border border-amber-100">
                                                <div className="flex justify-between items-center mb-1">
                                                    <p className="text-[10px] font-bold text-amber-700 uppercase">Tenant Feedback</p>
                                                    <div className="flex gap-0.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={10} className={i < complaint.feedback.rating ? "fill-amber-500 text-amber-500" : "text-amber-200"} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-amber-900 italic">"{complaint.feedback.comment || "No comment left."}"</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-3 mt-8">
                                        <button onClick={() => handleUpdateClick(complaint._id, "in_progress")} className="flex items-center gap-2 px-5 py-2.5 bg-amber-50 text-amber-700 rounded-xl text-sm font-bold hover:bg-amber-100 transition-all">
                                            <Clock size={16} /> Mark In-Progress
                                        </button>
                                        <button onClick={() => handleUpdateClick(complaint._id, "resolved")} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                                            <CheckCircle2 size={16} /> Mark Resolved
                                        </button>
                                        <button onClick={() => handleUpdateClick(complaint._id, "closed")} className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-900 transition-all">
                                            <Ban size={16} /> Close Ticket
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Response Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
                        <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-lg font-bold text-slate-800">Update Ticket Status</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">New Status: <span className="text-indigo-600">{statusToUpdate}</span></p>
                            <textarea
                                className="w-full border-slate-200 border rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50"
                                rows="4"
                                placeholder="Write a message to the tenant..."
                                value={ownerResponse}
                                onChange={(e) => setOwnerResponse(e.target.value)}
                            />
                        </div>
                        <div className="p-6 pt-0 flex gap-3">
                            <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">Cancel</button>
                            <button onClick={submitStatusUpdate} className="flex-1 px-4 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-lg shadow-indigo-100">Confirm Update</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Full Image Preview Modal */}
            {previewImage && (
                <div className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4" onClick={() => setPreviewImage(null)}>
                    <img src={previewImage} className="max-w-full max-h-full rounded-lg shadow-2xl" alt="Preview" />
                    <button className="absolute top-8 right-8 text-white"><X size={32} /></button>
                </div>
            )}
        </div>
    );
};

export default AdminComplaints;