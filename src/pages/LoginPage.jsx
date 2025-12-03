import React, { useState, useEffect, useRef } from "react";
import CustomInput from "../components/Common/CustomInput";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { ArrowRight, LogIn } from "lucide-react";

const THEME = {
    ACCENT: "bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/40 text-white",
    LINK: "text-blue-600 hover:text-blue-800 font-bold",
};

const LoadingSpinner = () => (
    <>
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
        Signing In...
    </>
);

const SignInModal = ({ onClose, onSwitchToSignUp }) => {

    const [form, setForm] = useState({ mobile: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const mobileInputRef = useRef(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (mobileInputRef.current) {
            mobileInputRef.current.focus();
        }
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(null);
    };

    const loginUser = async (e) => {
        e.preventDefault();
        if (!form.mobile.trim() || !form.password.trim()) {
            setError("Mobile/Email and Password are required.");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post(`${apiUrl}/api/auth/signin`, form);
            if (res.status === 200) {
                alert(res.data.message || "Sign in successful!");
                onClose();
            }
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || "Invalid mobile/email or password.";
            setError(errorMessage);
        }

        setLoading(false);
    };

    return (
        <div className="flex justify-center mt-8" role="dialog" aria-modal="true" aria-labelledby="login-title">
            <div className="relative max-w-md w-full p-6 bg-white rounded-xl shadow-2xl border border-gray-100">

                <div className="text-center mb-5">
                    <h2 id="login-title" className="text-3xl mt-3 font-extrabold text-gray-900 tracking-tight mb-3">
                        Secure Login
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Access your dashboard.</p>
                </div>

                <form className="space-y-6" onSubmit={loginUser}>
                    <CustomInput
                        ref={mobileInputRef}
                        name="mobile"
                        type="text"
                        placeholder="Mobile Number or Email"
                        icon={FaUser}
                        value={form.mobile}
                        onChange={handleChange}
                        required
                    />

                    <div className="relative">
                        <CustomInput
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            icon={FaLock}
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                        </button>
                    </div>

                    {error && <p className="text-sm text-red-500 font-medium -mt-2">{error}</p>}

                    <div className="text-right -mt-2">
                        <a href="#" className="text-xs text-gray-500 hover:text-blue-600 transition">
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full ${THEME.ACCENT} flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-base transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                        {loading ? <LoadingSpinner /> : <>
                            <LogIn className="w-4 h-4" />
                            Sign In
                        </>}
                    </button>
                </form>

                <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                    <p className="text-xs text-gray-600">Not registered yet?</p>
                    <button
                        type="button"
                        className={`${THEME.LINK} flex items-center justify-center gap-1 mx-auto mt-1 text-sm`}
                        onClick={onSwitchToSignUp}
                    >
                        Create Account
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <button
                    type="button"
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition p-1 rounded-full hover:bg-gray-100"
                    onClick={onClose}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

            </div>
        </div>
    );
};

export default SignInModal;