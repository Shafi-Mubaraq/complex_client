import React from 'react';
import Brand from '../Brand';
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; 

const navItems = [
    { id: "home", label: "Home" },
    { id: "houses", label: "Houses" },
    { id: "shops", label: "Shops" },
    { id: "contact", label: "Contact" },
];

const Footer = ({ scrollToSection }) => (
    <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start border-b border-gray-700 pb-8 mb-8">
                {/* Branding and Mission */}
                <div className="mb-8 lg:mb-0 lg:w-1/3">
                    <Brand />
                    <p className="text-sm text-gray-400 mt-4 max-w-sm">
                        Committed to providing premium residential and commercial real estate in the TNS Complex. Your future space starts here.
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col sm:flex-row sm:space-x-12 lg:space-x-20">
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {navItems.map(item => (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(item.id);
                                        }}
                                        className="text-gray-400 hover:text-indigo-400 transition text-base focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-sm"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4 mt-6 sm:mt-0">Legal</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-indigo-400 transition text-base focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-sm">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-indigo-400 transition text-base focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-sm">Terms of Service</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-indigo-400 transition text-base focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-sm">Sitemap</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright Row */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-4">
                <p className="text-sm text-gray-500 order-2 md:order-1 mt-4 md:mt-0">
                    © {new Date().getFullYear()} TNS Complex. All rights reserved.
                </p>
                <div className="flex space-x-6 order-1 md:order-2">
                    {/* Social icons */}
                    <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-indigo-400 transition"><FaFacebook size={20} /></a>
                    <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-indigo-400 transition"><FaTwitter size={20} /></a>
                    <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-indigo-400 transition"><FaInstagram size={20} /></a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;