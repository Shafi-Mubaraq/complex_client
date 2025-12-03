import React from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        
        {/* Background */}
        <div
            className="absolute inset-0 bg-black bg-opacity-70"
            onClick={onClose}
        ></div>

        {/* Modal Box */}
        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative z-20">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>

            <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                onClick={onClose}
            >
                <FaTimes size={20} />
            </button>

            {children}
        </div>
    </div>
);

export default Modal;
