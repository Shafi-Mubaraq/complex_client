import React, { useState } from "react";
import axios from "axios";
import { X, MapPin, Send, CheckCircle2, AlertCircle, User, Home, ShieldCheck, Database, Info, UserPlus } from "lucide-react";

const HouseModal = ({ house, onClose }) => {
    const apiUrl = import.meta.env.VITE_API_URL?.trim() || "http://localhost:5000";

    const [form, setForm] = useState({
        familyType: "",
        numberOfMembers: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    if (!house) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
    };

    const submitRequest = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const mobile = sessionStorage.getItem("mobile");
            const payload = {
                property: house._id,
                applicantUser: mobile,
                propertyType: "house",
                houseDetails: {
                    familyType: form.familyType,
                    numberOfMembers: Number(form.numberOfMembers),
                },
                message: form.message,
            };
            const response = await axios.post(`${apiUrl}/api/propertyRequest/create`, payload);
            if (response.data.success) {
                setStatus("success");
                onClose();
            }
        } catch (err) {
            console.error("Submission error:", err);
            setStatus("error");
            if (err.response?.data?.message) {
                setErrors({ ...errors, form: err.response.data.message });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white w-full max-w-5xl max-h-[80vh] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col lg:flex-row animate-in fade-in zoom-in duration-200">
                {/* LEFT SIDE: Media (Asset View) */}
                <div className="lg:w-5/12 bg-slate-50 overflow-y-auto border-r border-slate-100 p-8 hide-scrollbar">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-indigo-600 mb-2">
                            <Home size={16} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Asset Inventory</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{house.title}</h2>
                        <div className="flex items-center gap-1.5 text-slate-500 mt-2">
                            <MapPin size={14} />
                            <span className="text-xs font-semibold">{house.location}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {house.images?.map((img, i) => (
                            <div key={i} className="rounded-xl overflow-hidden border border-slate-200 bg-white p-1">
                                <img src={`${apiUrl}${img}`} className="w-full h-64 object-cover rounded-lg" alt="Asset" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE: Form */}
                <div className="lg:w-7/12 flex flex-col bg-white">
                    {/* Header */}
                    <div className="px-10 py-6 border-b border-slate-100 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                                <UserPlus size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 tracking-tight uppercase">Lease Application</h3>
                                <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">Asset Management Division</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-all">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-10 hide-scrollbar">
                        <div className="grid grid-cols-3 gap-4 mb-10">
                            <QuickStat label="Rent / Month" value={`₹${house.rent}`} />
                            <QuickStat label="Deposit" value={`₹${house.deposit}`} />
                            <QuickStat label="Area" value={`${house.area} sq.ft`} />
                            <QuickStat label="Floor" value={house.floor || "—"} />
                            <QuickStat label="Door No" value={house.doorNumber || "—"} />
                            <QuickStat label="Status" value={house.isAvailable ? "Available" : "Occupied"} />
                        </div>

                        <div className="space-y-8">
                            <SectionHeader title="Application Details" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide ml-1">
                                        Family Type : <span className="text-rose-500">*</span>
                                    </label>
                                    <select name="familyType" value={form.familyType} onChange={handleChange} className={`w-full bg-slate-50 border rounded-xl px-4 py-3.5 text-sm font-medium transition-all outline-none appearance-none ${errors.familyType ? "border-rose-300 ring-4 ring-rose-500/5" : "border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5"}`}>
                                        <option value="">Select Category</option>
                                        <option value="nuclear">Nuclear Family</option>
                                        <option value="joint">Joint Family</option>
                                        <option value="bachelor">Bachelor/Group</option>
                                    </select>
                                    {errors.familyType && <p className="text-[11px] font-medium text-rose-500 ml-1 animate-in slide-in-from-top-1">{errors.familyType}</p>}
                                </div>

                                <InputField label="Member Count" type="number" name="numberOfMembers" value={form.numberOfMembers} onChange={handleChange} error={errors.numberOfMembers} required />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide ml-1">Additional Message (Optional) :</label>
                                <textarea name="message" value={form.message} onChange={handleChange} rows="3" className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium transition-all outline-none resize-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5" placeholder="Any specific requirements or questions..." />
                            </div>
                        </div>

                        {status === "error" && (
                            <div className="mt-6 flex items-center gap-2 text-rose-500 text-[11px] font-bold uppercase tracking-wider bg-rose-50 p-3 rounded-lg border border-rose-100">
                                <AlertCircle size={14} />
                                {errors.form || "Please correct the highlighted fields"}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-10 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <div className="hidden sm:flex items-center gap-6">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Database size={14} />
                                <span className="text-[9px] font-bold uppercase tracking-widest">Cloud Sync</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                                <ShieldCheck size={14} />
                                <span className="text-[9px] font-bold uppercase tracking-widest">Encrypted</span>
                            </div>
                        </div>
                        <button onClick={submitRequest} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-indigo-100 active:scale-95 disabled:bg-slate-300">
                            {loading ? (
                                "Processing..."
                            ) : (
                                <>
                                    <Send size={16} /> Submit Application
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* --- MINI COMPONENTS --- */

const QuickStat = ({ label, value }) => (
    <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-sm font-bold text-slate-800 tracking-tight">{value}</p>
    </div>
);

const SectionHeader = ({ title }) => (
    <div className="flex items-center gap-4">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">{title}</span>
        <div className="h-px w-full bg-slate-100" />
    </div>
);

const InputField = ({ label, error, fullWidth, ...props }) => (
    <div className={fullWidth ? "md:col-span-2 space-y-3" : "space-y-3"}>
        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide ml-1">
            {label} <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
            <input
                {...props}
                className={`w-full bg-slate-50 border rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 outline-none
                    ${error ? "border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5" : "border-slate-200 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/5"}`}
            />
            {error && <p className="mt-2 ml-1 text-[11px] font-medium text-rose-500 animate-in slide-in-from-top-1">{error}</p>}
        </div>
    </div>
);

export default HouseModal;
