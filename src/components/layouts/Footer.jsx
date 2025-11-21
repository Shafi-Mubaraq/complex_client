// import React from 'react';
// import Brand from '../Brand';
// import { FaHome, FaBuilding, FaStore, FaEnvelope } from "react-icons/fa"; // Imported icons for nav items if needed

// const navItems = [
//     { id: "home", label: "Home", icon: FaHome },
//     { id: "houses", label: "Houses", icon: FaBuilding },
//     { id: "shops", label: "Shops", icon: FaStore },
//     { id: "contact", label: "Contact", icon: FaEnvelope },
// ];

// const Footer = ({ scrollToSection }) => (
//     <footer className="bg-gray-800 text-white py-8 px-4">
//         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
//             <div className="mb-4 md:mb-0">
//                 <Brand />
//                 <p className="text-sm text-gray-400 mt-2">© {new Date().getFullYear()} TNS Complex. All rights reserved.</p>
//             </div>

//             <div className="flex flex-wrap justify-center md:justify-end space-x-6">
//                 {navItems.map(item => (
//                     <a
//                         key={item.id}
//                         href={`#${item.id}`}
//                         onClick={(e) => {
//                             e.preventDefault();
//                             scrollToSection(item.id);
//                         }}
//                         className="text-gray-400 hover:text-indigo-300 transition text-sm py-1 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-sm"
//                     >
//                         {item.label}
//                     </a>
//                 ))}
//                 <a href="#" className="text-gray-400 hover:text-indigo-300 transition text-sm py-1 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-sm">Privacy Policy</a>
//                 <a href="#" className="text-gray-400 hover:text-indigo-300 transition text-sm py-1 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-sm">Terms of Service</a>
//             </div>
//         </div>
//     </footer>
// );

// export default Footer;