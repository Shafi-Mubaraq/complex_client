import React, { useState } from "react";
import Modal from "./Modal";
import CustomInput from "../components/Common/CustomInput";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from 'axios'

const SignInModal = ({ onClose, onSwitchToSignUp }) => {
    const [form, setForm] = useState({ mobile: "", password: "" });
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL
    // console.log(apiUrl)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const loginUser = async (e) => {
        setLoading(true);

        try {
            const res = await axios.post(`${apiUrl}/api/auth/signin`, form);

            if (res.status === 200) {
                alert(res.data.message);
            }

        } catch (err) {
            console.log("ERROR", err);

            if (err.response) {
                // Server responded with a status
                if (err.response.status === 404) {
                    alert(err.response.data.message);
                }
                else if (err.response.status === 400) {
                    alert(err.response.data.message);
                }
                else {
                    alert("Server error");
                }
            } else {
                // No response at all (network error)
                alert("Network error");
            }
        }

        setLoading(false);
    };


    return (
        <Modal title="Welcome Back" onClose={onClose}>
            <form className="space-y-4" onSubmit={loginUser}>
                <CustomInput name="mobile" type="text" placeholder="Mobile" icon={FaEnvelope} value={form.mobile} onChange={handleChange} required />
                <CustomInput name="password" type="password" placeholder="Password" icon={FaLock} value={form.password} onChange={handleChange} required />

                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
                    {loading ? "Signing In..." : "Sign In"}
                </button>
            </form>

            <p className="text-center text-sm mt-4">
                Don't have an account?{" "}
                <button className="text-indigo-600 font-bold" onClick={onSwitchToSignUp}>
                    Sign Up
                </button>
            </p>
        </Modal>
    );
};

export default SignInModal;
