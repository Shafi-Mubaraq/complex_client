import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Home, Calendar, Banknote, User, MapPin,
    ChevronRight, ArrowUpRight, ShieldCheck,
    Download, Clock, Building2, Tag, ArrowRight
} from "lucide-react";

const MyLease = () => {

    const [leases, setLeases] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const mobile = sessionStorage.getItem("mobile");
    const role = sessionStorage.getItem("role");

    useEffect(() => {
        if (role !== "tenant") return;
        const fetchLease = async () => {
            try {
                const res = await axios.get(`${apiUrl}/api/propertyRequest/lease/tenant/${mobile}`);
                setLeases(res.data.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLease();
    }, [apiUrl, mobile, role]);

    if (loading) return <LoadingSkeleton />;
    if (leases.length === 0) return <EmptyState />;

    return (
        <div className="font-sans text-slate-900">
            {/* 2. STATS OVERVIEW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <SummaryCard title="Active Agreements" value={leases.length} icon={<Home />} color="blue" />
                <SummaryCard title="Monthly Commitment" value={`₹${leases.reduce((acc, l) => acc + l.monthlyRent, 0).toLocaleString()}`} icon={<Banknote />} color="emerald" />
                <SummaryCard title="Verification Status" value="Verified" icon={<ShieldCheck />} color="indigo" />
            </div>

            {/* 3. LEASE CARDS */}
            <div className="space-y-10">
                {leases.map((lease) => (
                    <div key={lease._id} className="bg-white rounded-[1rem] shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-500">
                        <div className="flex flex-col lg:flex-row">

                            {/* Left Side: Property Identity (Now Light Mode) */}
                            <div className="lg:w-80 bg-slate-50 p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100">
                                <div>
                                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 border border-slate-100 text-indigo-600">
                                        <Building2 size={28} />
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 border border-emerald-200 mb-4">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        {lease.status}
                                    </span>
                                    <h2 className="text-2xl font-black text-slate-900 leading-tight mb-2 tracking-tight">
                                        {lease.property?.title}
                                    </h2>
                                    <p className="flex items-start gap-2 text-slate-500 text-sm font-medium">
                                        <MapPin size={16} className="mt-0.5 shrink-0 text-slate-400" />
                                        {lease.property?.location}
                                    </p>
                                </div>

                                <div className="mt-10 pt-6 border-t border-slate-200">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Lease Reference</p>
                                    <p className="text-sm font-mono text-slate-600 font-semibold">#LS-{lease._id.slice(-6).toUpperCase()}</p>
                                </div>
                            </div>

                            {/* Right Side: Detailed Info */}
                            <div className="flex-1 p-10 lg:p-12 bg-white">
                                <div className="flex justify-between items-center mb-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Contract Overview</h3>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 text-sm font-bold transition-all group">
                                            Help <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-12">
                                    <DetailBlock label="Commencement" value={new Date(lease.startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })} icon={<Calendar size={14} />} />
                                    <DetailBlock label="Expiry Date" value={lease.endDate ? new Date(lease.endDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : "Flexible Term"} icon={<Clock size={14} />} />
                                    <DetailBlock label="Primary Owner" value={lease.owner?.fullName} icon={<User size={14} />} />

                                    <DetailBlock label="Security Deposit" value={`₹${(lease.depositAmount || 0).toLocaleString()}`} />
                                    <DetailBlock label="Monthly Rental" value={`₹${lease.monthlyRent.toLocaleString()}`} highlight />
                                    <DetailBlock label="Utilities" value="Inclusive" icon={<Tag size={14} />} />
                                </div>

                                <div className="mt-12 flex flex-wrap gap-4 pt-8 border-t border-slate-100">
                                    <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 flex items-center gap-2">
                                        Pay Rent Now <ArrowRight size={18} />
                                    </button>
                                    <button className="bg-white text-slate-600 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                                        <Download size={18} /> Download Agreement
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* --- SUB-COMPONENTS --- */

const SummaryCard = ({ title, value, icon, color }) => {
    const colors = {
        blue: "text-blue-600 bg-blue-50",
        emerald: "text-emerald-600 bg-emerald-50",
        indigo: "text-indigo-600 bg-indigo-50"
    };
    return (
        <div className="bg-white p-7 rounded-[1rem] shadow-sm border border-slate-200 flex items-center gap-5">
            <div className={`p-4 rounded-2xl ${colors[color]}`}>
                {React.cloneElement(icon, { size: 24 })}
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{title}</p>
                <p className="text-2xl font-black text-slate-900">{value}</p>
            </div>
        </div>
    );
};

const DetailBlock = ({ label, value, highlight, icon }) => (
    <div className="group">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-indigo-500 transition-colors">{label}</p>
        <div className={`flex items-center gap-2 font-bold ${highlight ? 'text-indigo-600 text-2xl' : 'text-slate-800 text-base'}`}>
            {icon && <span className="text-slate-300">{icon}</span>}
            {value}
        </div>
    </div>
);

const LoadingSkeleton = () => (
    <div className="min-h-screen bg-[#F8FAFC] p-12 space-y-8 animate-pulse max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
            <div className="h-8 bg-slate-200 rounded-lg w-48"></div>
            <div className="h-10 bg-slate-200 rounded-lg w-32"></div>
        </div>
        <div className="grid grid-cols-3 gap-6">
            <div className="h-32 bg-slate-200 rounded-[2rem]"></div>
            <div className="h-32 bg-slate-200 rounded-[2rem]"></div>
            <div className="h-32 bg-slate-200 rounded-[2rem]"></div>
        </div>
        <div className="h-[400px] bg-white rounded-[2.5rem] border border-slate-100"></div>
    </div>
);

const EmptyState = () => (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-6">
        <div className="text-center max-w-md bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100">
            <div className="bg-indigo-50 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-indigo-600">
                <Home size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">No Active Leases</h2>
            <p className="text-slate-500 font-medium leading-relaxed mb-10 text-lg">Your rental dashboard is currently empty. Once you sign a lease, all details will be managed here.</p>
            <button className="w-full bg-slate-900 text-white px-8 py-5 rounded-2xl font-black hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">Find Your Next Home</button>
        </div>
    </div>
)

export default MyLease;