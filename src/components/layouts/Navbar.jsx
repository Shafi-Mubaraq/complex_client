// import React from 'react';
// import { FaHome, FaBuilding, FaStore, FaEnvelope, FaUser, FaUserPlus, FaBars } from "react-icons/fa";
// import Brand from '../Brand';

// const navItems = [
//     { id: "home", label: "Home", icon: FaHome },
//     { id: "houses", label: "Houses", icon: FaBuilding },
//     { id: "shops", label: "Shops", icon: FaStore },
//     { id: "contact", label: "Contact", icon: FaEnvelope },
// ];

// const Navbar = ({ scrollToSection, setIsMenuOpen, setShowSignIn, setShowSignUp }) => (
//     <header className="bg-indigo-800 shadow-xl px-6 py-4 flex items-center justify-between text-white fixed top-0 left-0 w-full z-50">
//         <Brand />

//         {/* Desktop Menu */}
//         <nav className="hidden md:flex flex-grow justify-center space-x-6" aria-label="Main Navigation">
//             {navItems.map(item => (
//                 <a
//                     key={item.id}
//                     href={`#${item.id}`}
//                     onClick={(e) => {
//                         e.preventDefault();
//                         scrollToSection(item.id);
//                     }}
//                     className="text-indigo-200 hover:text-white transition duration-200 font-medium flex items-center space-x-2 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                 >
//                     <item.icon className="text-base" /> <span>{item.label}</span>
//                 </a>
//             ))}
//         </nav>

//         {/* Desktop Auth Buttons */}
//         <div className="hidden md:flex space-x-3">
//             <button
//                 onClick={() => setShowSignIn(true)}
//                 className="text-white border border-indigo-500 hover:bg-indigo-700 px-4 py-1.5 rounded-full text-sm transition duration-200 flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-indigo-300"
//             >
//                 <FaUser size={12} /> <span>Sign In</span>
//             </button>
//             <button
//                 onClick={() => setShowSignUp(true)}
//                 className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-1.5 rounded-full text-sm transition duration-200 flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-indigo-300"
//             >
//                 <FaUserPlus size={12} /> <span>Sign Up</span>
//             </button>
//         </div>

//         {/* Mobile Hamburger */}
//         <div className="md:hidden">
//             <button
//                 onClick={() => setIsMenuOpen(true)}
//                 className="text-white text-2xl focus:outline-none p-1 focus:ring-2 focus:ring-indigo-300 rounded"
//                 aria-label="Toggle navigation menu"
//             >
//                 <FaBars />
//             </button>
//         </div>
//     </header>
// );

// export default Navbar;