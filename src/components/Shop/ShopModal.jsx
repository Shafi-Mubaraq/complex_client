import React, { useState } from "react";
import axios from "axios";
import { X, MapPin, Send, AlertCircle, Store, ShieldCheck, Database, Briefcase } from "lucide-react";

const ShopModal = ({ shop, onClose }) => {
    
    const apiUrl = import.meta.env.VITE_API_URL?.trim() || "http://localhost:5000";

    // --- KEEPING YOUR ORIGINAL STATE ---
    const [form, setForm] = useState({
        fullName: "",
        businessName: "",
        businessType: "",
        numberOfEmployees: "",
        phoneNumber: "",
        address: "",
        aadharNumber: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    if (!shop) return null;

    const validate = () => {
        let newErrors = {};
        if (!form.fullName.trim()) newErrors.fullName = "Full name is required";

        // Shop Specific Validation
        if (!form.businessName.trim()) newErrors.businessName = "Business name required";
        if (!form.businessType.trim()) newErrors.businessType = "Business type required";
        if (!form.numberOfEmployees || form.numberOfEmployees <= 0) newErrors.numberOfEmployees = "Invalid count";

        if (!/^[6-9]\d{9}$/.test(form.phoneNumber)) newErrors.phoneNumber = "Valid 10-digit number required";
        if (!form.address.trim()) newErrors.address = "Address required";
        if (!/^\d{12}$/.test(form.aadharNumber)) newErrors.aadharNumber = "12-digit Aadhar number required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
    };

    const submitRequest = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            setLoading(true);

            // First, create/update user in database
            const userPayload = {
                fullName: form.fullName,
                mobile: form.phoneNumber,
                aadhar: form.aadharNumber,
                email: `${form.phoneNumber}@temp.com`, // Temporary email since not in form
                password: "temporary-password", // This should be handled better in production
                role: "tenant",
            };

            let userId;
            try {
                // Try to find existing user by phone or create new one
                const userResponse = await axios.post(`${apiUrl}/api/users/find-or-create`, userPayload);
                userId = userResponse.data.user._id;
            } catch (userError) {
                console.error("User creation error:", userError);
                setStatus("error");
                setErrors({ ...errors, form: "Failed to create user account" });
                setLoading(false);
                return;
            }

            // --- PAYLOAD FOR SHOPS (keeping your structure but with userId) ---
            const payload = {
                property: shop._id,
                applicantUser: userId, // Using the user ID from database
                propertyType: "shop",

                // Shop Details specifically
                shopDetails: {
                    businessName: form.businessName,
                    businessType: form.businessType,
                    numberOfEmployees: Number(form.numberOfEmployees),
                },

                message: form.message,
            };

            const response = await axios.post(`${apiUrl}/api/propertyRequest/create`, payload);

            setStatus("success");
            setTimeout(() => onClose(), 1200);
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
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white w-full max-w-5xl max-h-[80vh] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col lg:flex-row animate-in fade-in zoom-in duration-200">
                {/* LEFT SIDE: Image/Details - KEEPING YOUR DESIGN */}
                <div className="lg:w-5/12 bg-slate-50 overflow-y-auto border-r border-slate-100 p-8 hide-scrollbar">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-indigo-600 mb-2">
                            <Store size={16} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Retail Unit</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{shop.title}</h2>
                        <div className="flex items-center gap-1.5 text-slate-500 mt-2">
                            <MapPin size={14} />
                            <span className="text-xs font-semibold">{shop.location}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {shop.images?.map((img, i) => (
                            <div key={i} className="rounded-xl overflow-hidden border border-slate-200 bg-white p-1">
                                <img src={`${apiUrl}${img}`} className="w-full h-64 object-cover rounded-lg" alt="Shop" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE: Application Form - KEEPING YOUR DESIGN */}
                <div className="lg:w-7/12 flex flex-col bg-white">
                    <div className="px-10 py-6 border-b border-slate-100 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                                <Briefcase size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 tracking-tight uppercase">Commercial Application</h3>
                                <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">Leasing Division</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-all">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={submitRequest} noValidate className="flex-1 overflow-y-auto p-10 hide-scrollbar">
                        <div className="grid grid-cols-3 gap-4 mb-10">
                            <QuickStat label="Rent" value={`₹${shop.rent}`} />
                            <QuickStat label="Deposit" value={`₹${shop.deposit}`} />
                            <QuickStat label="Area" value={`${shop.area} sq.ft`} />
                            <QuickStat label="Floor" value={shop.floor || "—"} />
                            <QuickStat label="Door" value={shop.doorNumber || "—"} />
                            <QuickStat label="Status" value={shop.isAvailable ? "Open" : "Booked"} />
                        </div>

                        <div className="space-y-8">
                            <SectionHeader title="Business Profile" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Applicant Name" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} />
                                <InputField label="Business Name" name="businessName" value={form.businessName} onChange={handleChange} error={errors.businessName} />

                                <InputField label="Business Type" name="businessType" value={form.businessType} onChange={handleChange} error={errors.businessType} placeholder="e.g. Cafe, Retail, Office" />
                                <InputField label="Employee Count" type="number" name="numberOfEmployees" value={form.numberOfEmployees} onChange={handleChange} error={errors.numberOfEmployees} />
                            </div>

                            <SectionHeader title="Verification Details" />
                            <div className="grid grid-cols-1 gap-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <InputField label="Contact Number" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} error={errors.phoneNumber} />
                                    <InputField label="Aadhar/Govt ID" name="aadharNumber" value={form.aadharNumber} onChange={handleChange} error={errors.aadharNumber} />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide ml-1">Current Address :</label>
                                    <textarea name="address" value={form.address} onChange={handleChange} rows="2" className={`w-full mt-1 bg-slate-50 border rounded-xl px-4 py-3.5 text-sm font-medium transition-all outline-none resize-none ${errors.address ? "border-rose-300 ring-4 ring-rose-500/5" : "border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5"}`} />
                                    {errors.address && <p className="text-[11px] font-medium text-rose-500 ml-1 animate-in slide-in-from-top-1">{errors.address}</p>}
                                </div>
                            </div>
                        </div>

                        {status === "error" && (
                            <div className="mt-6 flex items-center gap-2 text-rose-500 text-[11px] font-bold uppercase tracking-wider bg-rose-50 p-3 rounded-lg border border-rose-100">
                                <AlertCircle size={14} /> {errors.form || "Application failed. Please check inputs."}
                            </div>
                        )}
                        {status === "success" && (
                            <div className="mt-6 flex items-center gap-2 text-emerald-600 text-[11px] font-bold uppercase tracking-wider bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                                <ShieldCheck size={14} /> Application Submitted Successfully!
                            </div>
                        )}
                    </form>

                    {/* Footer - KEEPING YOUR DESIGN */}
                    <div className="px-10 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <div className="hidden sm:flex items-center gap-6">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Database size={14} />
                                <span className="text-[9px] font-bold uppercase tracking-widest">Secure</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                                <ShieldCheck size={14} />
                                <span className="text-[9px] font-bold uppercase tracking-widest">Encrypted</span>
                            </div>
                        </div>
                        <button onClick={submitRequest} disabled={loading} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-indigo-100 active:scale-95 disabled:bg-slate-300">
                            {loading ? (
                                "Processing..."
                            ) : (
                                <>
                                    <Send size={16} /> Submit Proposal
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* --- YOUR ORIGINAL MINI COMPONENTS --- */
const QuickStat = ({ label, value }) => (
    <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-sm font-bold text-slate-800 tracking-tight truncate">{value}</p>
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

export default ShopModal;
