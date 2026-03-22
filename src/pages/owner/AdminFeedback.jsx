import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import {
    Star, Loader2, MessageCircleWarning, RefreshCw,
    User, Home, Calendar, Inbox, ChevronRight, Quote,
    TrendingUp, Award, CheckCircle2
} from "lucide-react";

const AdminFeedback = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = sessionStorage.getItem("token");
    const mobile = sessionStorage.getItem("mobile");

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const stats = useMemo(() => {
        if (!complaints.length) return { avg: 0, total: 0, top: 0 };
        const total = complaints.length;
        const sum = complaints.reduce((acc, c) => acc + (c.feedback?.rating || 0), 0);
        const top = complaints.filter(c => c.feedback?.rating === 5).length;
        return { avg: (sum / total).toFixed(1), total, top };
    }, [complaints]);

    const fetchFeedbacks = useCallback(async (silent = false) => {
        if (!silent) setLoading(true);
        setIsRefreshing(true);

        try {
            const res = await axios.get(
                `${apiUrl}/api/feedback/owner/${mobile}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const onlyFeedback = (res.data || []).filter(c => c.feedback);
            setComplaints(onlyFeedback);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    }, [apiUrl, mobile, token]);

    useEffect(() => {
        fetchFeedbacks();
        const interval = setInterval(() => fetchFeedbacks(true), 15000);
        return () => clearInterval(interval);
    }, [fetchFeedbacks]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-20">
            {/* Ultra-Modern Sticky Header */}
            <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-slate-200/60">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="bg-amber-500 p-2.5 rounded-2xl text-white shadow-xl shadow-amber-200 ring-4 ring-amber-50">
                            <MessageCircleWarning size={22} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-800">Feedback Intelligence</h2>
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Monitoring</span>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => fetchFeedbacks()}
                        disabled={isRefreshing}
                        className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-amber-300 transition-all group"
                    >
                        <RefreshCw size={18} className={`text-slate-500 group-hover:text-amber-600 ${isRefreshing ? "animate-spin" : ""}`} />
                    </button>
                </div>
            </div>

            <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
                
                {/* Analytics Snapshot */}
                {!loading && complaints.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-5 rounded-[2rem] border border-slate-200/60 shadow-sm flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase">Avg Satisfaction</p>
                                <p className="text-2xl font-black text-slate-800">{stats.avg}<span className="text-slate-300 text-sm"> / 5.0</span></p>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-[2rem] border border-slate-200/60 shadow-sm flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                <Award size={24} />
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase">Perfect Ratings</p>
                                <p className="text-2xl font-black text-slate-800">{stats.top}</p>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-[2rem] border border-slate-200/60 shadow-sm flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase">Total Reviews</p>
                                <p className="text-2xl font-black text-slate-800">{stats.total}</p>
                            </div>
                        </div>
                    </div>
                )}

                {loading && !isRefreshing ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-amber-200 blur-xl opacity-50 animate-pulse"></div>
                            <Loader2 className="animate-spin text-amber-500 relative" size={48} />
                        </div>
                        <p className="text-slate-400 font-bold tracking-widest text-xs uppercase">Analyzing Reports...</p>
                    </div>
                ) : complaints.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-[3rem] p-16 text-center shadow-sm">
                        <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Inbox className="text-slate-300" size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800">Quiet for now</h3>
                        <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto font-medium">When tenants leave feedback on resolved maintenance, it will appear here in real-time.</p>
                    </div>
                ) : (
                    <div className="grid gap-8">
                        {complaints.map((c) => (
                            <div key={c._id} className="group relative bg-white rounded-[2.5rem] border border-slate-200 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 overflow-hidden">
                                {/* Side Accent */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${c.feedback.rating >= 4 ? 'bg-amber-400' : 'bg-slate-300'}`} />
                                
                                <div className="p-6 md:p-10">
                                    {/* Row 1: Status & Rating */}
                                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                                                ID: {c._id.slice(-6).toUpperCase()}
                                            </span>
                                            {c.feedback.rating === 5 && (
                                                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black uppercase flex items-center gap-1">
                                                    <Award size={10} /> Perfect Service
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={18}
                                                        fill={i < c.feedback.rating ? "#f59e0b" : "#E2E8F0"}
                                                        stroke="none"
                                                    />
                                                ))}
                                            </div>
                                            <div className="h-8 w-[1px] bg-slate-200 mx-2" />
                                            <span className="text-2xl font-black text-slate-800">{c.feedback.rating}.0</span>
                                        </div>
                                    </div>

                                    {/* Row 2: Title & Details */}
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">{c.title}</h3>
                                        <p className="text-slate-500 leading-relaxed font-medium">{c.description}</p>
                                    </div>

                                    {/* Row 3: Meta Info Pill */}
                                    <div className="inline-flex flex-wrap items-center gap-6 px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl mb-8">
                                        <div className="flex items-center gap-2">
                                            <User size={14} className="text-slate-400" />
                                            <span className="text-xs font-bold text-slate-600">{c.tenant?.fullName}</span>
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                                        <div className="flex items-center gap-2">
                                            <Home size={14} className="text-slate-400" />
                                            <span className="text-xs font-bold text-slate-600">{c.property?.title}</span>
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-slate-400" />
                                            <span className="text-xs font-bold text-slate-600">{new Date(c.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                    </div>

                                    {/* Row 4: The Feedback Message */}
                                    <div className="relative">
                                        <Quote className="absolute -top-4 -left-2 text-slate-100 group-hover:text-amber-100 transition-colors" size={60} />
                                        <div className="relative z-10 pl-4 border-l-2 border-slate-100 group-hover:border-amber-200 transition-all">
                                            <p className="text-slate-700 font-semibold italic text-lg leading-relaxed">
                                                {c.feedback.comment ? `"${c.feedback.comment}"` : "The tenant provided a rating without a written statement."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminFeedback;