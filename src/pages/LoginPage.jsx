import React, { useState, useEffect, useRef } from "react";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { ArrowRight, LogIn, ChevronRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomInput from "../components/Common/CustomInput";

const LoginPage = ({ onClose, onSwitchToSignUp }) => {

    const [form, setForm] = useState({ mobile: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const mobileInputRef = useRef(null);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        mobileInputRef.current?.focus();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(null);
    };

    const loginUser = async (e) => {

        e.preventDefault();
        if (!form.mobile.trim() || !form.password.trim()) {
            setError("Credentials are required.");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`${apiUrl}/api/auth/signin`, form);
            if (res.status === 200) {
                const { token, fullName, mobile, role } = res.data;
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("fullName", fullName);
                sessionStorage.setItem("mobile", mobile);
                sessionStorage.setItem("role", role);
                navigate("/dashboard");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid mobile or password.");
        } finally { setLoading(false) }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="relative max-w-[440px] w-full bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden">

                {/* Visual Branding Element */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-700 to-indigo-600"></div>

                <div className="p-10 pt-12">
                    {/* Header: Matching the Logo Group Style */}
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="w-14 h-14 bg-indigo-700 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-slate-200">
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-black tracking-tighter text-slate-900 leading-none">
                            Secure <span className="text-indigo-600">Login</span>
                        </h2>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-3">
                            T.N.S Complex Platform
                        </p>
                    </div>

                    {/* FORM */}
                    <form className="space-y-5" onSubmit={loginUser}>
                        <div className="space-y-1.5">
                            <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Mobile Number</label>
                            <CustomInput
                                ref={mobileInputRef}
                                name="mobile"
                                type="text"
                                placeholder="Enter registered mobile"
                                icon={FaUser}
                                value={form.mobile}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-50 border-slate-200 rounded-xl focus:bg-white transition-all"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
                                <button type="button" className="text-[10px] font-bold text-indigo-500 hover:text-slate-900 transition-colors uppercase tracking-tighter">Forgot?</button>
                            </div>
                            <div className="relative">
                                <CustomInput
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    icon={FaLock}
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-50 border-slate-200 rounded-xl focus:bg-white transition-all"
                                />
                                <button
                                    type="button"
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-slate-300 hover:text-indigo-600 transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl flex items-center gap-2 animate-shake">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                <p className="text-xs font-bold text-rose-600 uppercase tracking-tight">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-8 bg-indigo-700 text-white flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-sm transition-all hover:bg-indigo-600 active:scale-[0.98] shadow-xl shadow-slate-200 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span className="uppercase tracking-widest text-[10px]">Verifying...</span>
                                </div>
                            ) : (
                                <>
                                    <LogIn size={18} />
                                    SIGN IN
                                    <ChevronRight size={16} className="opacity-50" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* FOOTER */}
                    <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            New Partner?
                        </p>
                        <button
                            type="button"
                            className="mt-3 group flex items-center justify-center gap-2 mx-auto text-sm font-black text-indigo-600 hover:text-slate-900 transition-all"
                            onClick={onSwitchToSignUp}
                        >
                            CREATE ACCOUNT
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;