import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Modal from './Modal';
import CustomInput from '../forms/CustomInput';

const SignInModal = ({ onClose, onSwitchToSignUp }) => (
    <Modal title="Welcome Back" onClose={onClose}>
        <form className="space-y-4">
            <CustomInput type="email" placeholder="Email Address" icon={FaEnvelope} required />
            <CustomInput type="password" placeholder="Password" icon={FaLock} required />
            <button
                type="submit"
                className="w-full mt-2 px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Sign In
            </button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-500">
            Don't have an account? <button type="button" className="text-indigo-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-sm" onClick={onSwitchToSignUp}>Sign Up</button>
        </p>
    </Modal>
);

export default SignInModal;