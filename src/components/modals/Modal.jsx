// import React from 'react';
// import { FaTimes } from "react-icons/fa";

// const Modal = ({ title, children, onClose }) => (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//         {/* Backdrop */}
//         <div
//             className="absolute inset-0 bg-black bg-opacity-70 transition-opacity"
//             onClick={onClose}
//             tabIndex="-1"
//         ></div>

//         {/* Modal Container - max-w-lg allows for Sign Up 2-column layout */}
//         <div
//             className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative z-20 transform transition-transform duration-300 scale-100"
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="modal-title"
//         >
//             <h2 id="modal-title" className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">{title}</h2>
//             <button
//                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-1"
//                 onClick={onClose}
//                 aria-label={`Close ${title} modal`}
//             >
//                 <FaTimes size={20} />
//             </button>
//             {children}
//         </div>
//     </div>
// );

// export default Modal;