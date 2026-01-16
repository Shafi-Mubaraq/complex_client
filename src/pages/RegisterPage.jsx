import React, { useState, useRef, useEffect } from "react";
import { 
    FaUser, FaEnvelope, FaKey, FaIdCard, FaMobileAlt, 
    FaPhone, FaCity, FaGlobe, FaArrowLeft 
} from "react-icons/fa";
import { ChevronRight, ShieldCheck, UserPlus } from "lucide-react";
import CustomInput from "../components/Common/CustomInput";

const INITIAL_STATE = {
    fullName: "",
    email: "",
    password: "",
    aadhar: "",
    mobile: "",
    additionalNumber: "",
    city: "",
    state: ""
};

const RegisterPage = ({ onClose, onSwitchToSignIn }) => {
    const [form, setForm] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const firstInputRef = useRef(null);

    // Auto-focus the first input on mount
    useEffect(() => {
        firstInputRef.current?.focus();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // 1. Numeric-only restriction for phone and ID fields
        if (["mobile", "aadhar", "additionalNumber"].includes(name)) {
            const numericValue = value.replace(/\D/g, ""); // Remove non-digits
            
            // 2. Prevent typing beyond character limits
            if ((name === "mobile" || name === "additionalNumber") && numericValue.length > 10) return;
            if (name === "aadhar" && numericValue.length > 12) return;

            setForm({ ...form, [name]: numericValue });
        } else {
            setForm({ ...form, [name]: value });
        }
        
        // Clear error when user starts typing
        setError(null);
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (form.fullName.trim().length < 3) return "Full Name must be at least 3 characters.";
        if (!emailRegex.test(form.email)) return "Please enter a valid email address.";
        if (form.password.length < 6) return "Password must be at least 6 characters.";
        if (form.aadhar.length !== 12) return "Aadhar Number must be exactly 12 digits.";
        
        // Primary Mobile: Mandatory 10 digits
        if (form.mobile.length !== 10) return "Primary Mobile must be exactly 10 digits.";
        
        // Optional Phone: Only validate if the user has typed something
        if (form.additionalNumber.length > 0 && form.additionalNumber.length !== 10) {
            return "Secondary Phone must be 10 digits if provided.";
        }
        
        if (form.city.trim() === "") return "City is required.";
        if (form.state.trim() === "") return "State is required.";
        
        return null;
    };

    const registerSave = async (e) => {
        e.preventDefault();
        
        // Run internal validation
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.status === 409) {
                setError("Mobile number already registered.");
                return;
            }

            if (res.ok) {
                alert("Account Created Successfully!");
                onSwitchToSignIn();
            } else {
                setError(data.message || "Signup failed.");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-10 px-4 min-h-screen bg-slate-50/50">
            <div className="relative max-w-[750px] w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden">
                
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-700 to-indigo-600"></div>

                <div className="p-8 md:p-12">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center mb-10">
                        <div className="w-16 h-16 bg-indigo-700 rounded-2xl flex items-center justify-center mb-5 shadow-xl shadow-indigo-100">
                            <ShieldCheck className="w-9 h-9 text-white" />
                        </div>
                        <h2 className="text-3xl font-black tracking-tighter text-slate-900 uppercase leading-none">
                            Create <span className="text-indigo-600">Account</span>
                        </h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-4">
                            Join T.N.S Complex Partner Network
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={registerSave} noValidate>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                            
                            {/* Identity Section */}
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                                    <CustomInput ref={firstInputRef} name="fullName" placeholder="Full Name" icon={FaUser} value={form.fullName} onChange={handleChange} required />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                                    <CustomInput name="email" type="email" placeholder="email@example.com" icon={FaEnvelope} value={form.email} onChange={handleChange} required />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
                                    <CustomInput name="password" type="password" placeholder="Min 6 characters" icon={FaKey} value={form.password} onChange={handleChange} required />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Aadhar Number</label>
                                    <CustomInput name="aadhar" placeholder="12 Digit Aadhar" icon={FaIdCard} value={form.aadhar} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* Contact/Location Section */}
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Mobile</label>
                                    <CustomInput name="mobile" placeholder="10 Digit Mobile" icon={FaMobileAlt} value={form.mobile} onChange={handleChange} required />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Optional Phone</label>
                                    <CustomInput name="additionalNumber" placeholder="10 Digit (Optional)" icon={FaPhone} value={form.additionalNumber} onChange={handleChange} />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400">City</label>
                                    <CustomInput name="city" placeholder="Current City" icon={FaCity} value={form.city} onChange={handleChange} required />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400">State</label>
                                    <CustomInput name="state" placeholder="Current State" icon={FaGlobe} value={form.state} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>

                        {/* Error Handling UI */}
                        {error && (
                            <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3 animate-shake">
                                <div className="w-2 h-2 rounded-full bg-rose-500 shadow-sm" />
                                <p className="text-[11px] font-bold text-rose-600 uppercase tracking-tight leading-none">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 bg-indigo-700 text-white flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-sm transition-all hover:bg-indigo-600 active:scale-[0.98] shadow-xl shadow-indigo-100 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span className="uppercase tracking-widest text-[10px]">Processing...</span>
                                </div>
                            ) : (
                                <>
                                    <UserPlus size={18} />
                                    CREATE ACCOUNT
                                    <ChevronRight size={16} className="opacity-50" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <button 
                            type="button" 
                            className="group flex items-center justify-center gap-2 mx-auto text-[11px] font-black text-indigo-600 hover:text-slate-900 transition-all uppercase tracking-widest" 
                            onClick={onSwitchToSignIn}
                        >
                            <FaArrowLeft className="w-2.5 h-2.5 group-hover:-translate-x-1 transition-transform" />
                            Return to Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;