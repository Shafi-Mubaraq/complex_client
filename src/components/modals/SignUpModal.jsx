import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import CustomInput from "../forms/CustomInput";
import {
    FaUser, FaEnvelope, FaKey, FaIdCard, FaMobileAlt,
    FaPhone, FaCity, FaGlobe
} from "react-icons/fa";

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

const SignUpModal = ({ onClose, onSwitchToSignIn }) => {
    const [form, setForm] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);  

    const resetForm = () => setForm(INITIAL_STATE); 

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const registerSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.status === 409) {
                alert("MobileNumber already registered. Please sign in.");
                return;
            }

            if (res.ok) {
                alert("Account Created Successfully!");
                resetForm();
                onClose();
            } else {
                alert(data.message || "Signup failed.");
            }

        } catch (err) {
            alert("Network error.");
        }

        setLoading(false);
    };

    return (
        <Modal title="Create Account" onClose={onClose}>
            <form className="space-y-4" autoComplete="off" onSubmit={registerSave}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="space-y-3">
                        <CustomInput name="fullName" placeholder="Full Name" icon={FaUser} value={form.fullName} onChange={handleChange} required />
                        <CustomInput name="email" autoComplete="off" type="email" placeholder="Email" icon={FaEnvelope} value={form.email} onChange={handleChange} required />
                        <CustomInput name="password" type="password" placeholder="Password" icon={FaKey} value={form.password} onChange={handleChange} required />
                        <CustomInput name="aadhar" placeholder="Aadhar Number" icon={FaIdCard} maxLength="12" value={form.aadhar} onChange={handleChange} required />
                    </div>

                    <div className="space-y-3">
                        <CustomInput name="mobile" placeholder="Mobile" icon={FaMobileAlt} maxLength="10" value={form.mobile} onChange={handleChange} required />
                        <CustomInput name="additionalNumber" placeholder="Additional Number (Optional)" icon={FaPhone} value={form.additionalNumber} onChange={handleChange} />
                        <CustomInput name="city" placeholder="City" icon={FaCity} value={form.city} onChange={handleChange} required />
                        <CustomInput name="state" placeholder="State" icon={FaGlobe} value={form.state} onChange={handleChange} required />
                    </div>
                </div>

                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg" disabled={loading}>
                    {loading ? "Creating..." : "Create Account"}
                </button>
            </form>

            <p className="text-center text-sm mt-4">
                Already have an account?{" "}
                <button className="text-indigo-600 font-bold" onClick={onSwitchToSignIn}>
                    Sign In
                </button>
            </p>
        </Modal>
    );
};

export default SignUpModal;
