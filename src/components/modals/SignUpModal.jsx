import React from 'react';
import { FaUser, FaEnvelope, FaKey, FaIdCard, FaMobileAlt, FaPhone, FaCity, FaGlobe } from 'react-icons/fa';
import Modal from './Modal';
import CustomInput from '../forms/CustomInput';

const SignUpModal = ({ onClose, onSwitchToSignIn }) => (
    <Modal title="Create Account" onClose={onClose}>
        <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="space-y-4">
                    <CustomInput type="text" placeholder="Full Name" icon={FaUser} required />
                    <CustomInput type="email" placeholder="Email Address" icon={FaEnvelope} required />
                    <CustomInput
                        type="password"
                        placeholder="Create Password"
                        icon={FaKey}
                        required
                    />
                    <CustomInput
                        type="number"
                        placeholder="Aadhar Number"
                        icon={FaIdCard}
                        required
                        minLength="12"
                        maxLength="12"
                    />
                </div>

                <div className="space-y-4">
                    <CustomInput
                        type="number"
                        placeholder="Mobile Number"
                        icon={FaMobileAlt}
                        required
                        minLength="10"
                        maxLength="10"
                    />
                    <CustomInput
                        type="number"
                        placeholder="Additional Number (Optional)"
                        icon={FaPhone}
                    />
                    <CustomInput type="text" placeholder="City" icon={FaCity} required />
                    <CustomInput type="text" placeholder="State" icon={FaGlobe} required />
                </div>
            </div>

            <button
                type="submit"
                className="w-full mt-4 px-4 py-3.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-200 shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2"
            >
                Create Account Now
            </button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-500">
            Already have an account? <button type="button" className="text-indigo-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-sm" onClick={onSwitchToSignIn}>Sign In</button>
        </p>
    </Modal>
);

export default SignUpModal;