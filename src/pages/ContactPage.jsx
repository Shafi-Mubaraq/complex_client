import React from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import CustomInput from "../components/Common/CustomInput";
import { Clock, Globe } from "lucide-react";

const ContactPage = () => {

    const theme = {
        bg: 'bg-white',
        textPrimary: 'text-gray-900',
        textSecondary: 'text-gray-600',
        brandAccent: 'text-blue-700',
        ctaPrimary: 'bg-blue-700 hover:bg-blue-800 shadow-lg shadow-blue-500/40 text-white',
    };

    return (
        <section id="contact" className={`${theme.bg} py-20 px-4 sm:py-16`}>
            <div className="max-w-7xl mx-auto">
                <h2 className={`text-4xl sm:text-5xl font-extrabold ${theme.textPrimary} mb-4 text-center tracking-tight`}>
                    Connect With Our <span className={`${theme.brandAccent}`}>Team</span>
                </h2>

                <p className={`text-xl ${theme.textSecondary} mb-16 text-center max-w-3xl mx-auto`}>
                    Whether you're inquiring about residential or commercial opportunities, our experts are ready to assist.
                </p>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    <div className="lg:w-1/2 space-y-10 order-2 lg:order-1">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-2">
                            Direct Contact Channels
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-4 p-5 bg-white rounded-xl shadow-md border-t-4 border-blue-600">
                                <FaMapMarkerAlt className="text-blue-600 text-3xl flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900">Corporate Address</h4>
                                    <p className="text-gray-700">
                                        TNS Complex Head Office, 123 Prime Street, Cityville, State 10001, Country
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-start space-x-4 p-5 bg-white rounded-xl shadow-md border-t-4 border-blue-600">
                                    <FaPhone className="text-blue-600 text-xl flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900">Sales Hotline</h4>
                                        <a
                                            href="tel:+15551234567"
                                            className="text-gray-700 hover:text-blue-800 transition block"
                                        >
                                            +1 (555) 123-4567
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 p-5 bg-white rounded-xl shadow-md border-t-4 border-blue-600">
                                    <FaEnvelope className="text-blue-600 text-xl flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900">General Inquiry</h4>
                                        <a
                                            href="mailto:info@tnscomplex.com"
                                            className="text-gray-700 hover:text-blue-800 transition block"
                                        >
                                            info@tnscomplex.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 p-5 bg-white rounded-xl shadow-md border-t-4 border-blue-600">
                                <Clock className="text-blue-600 w-6 h-6 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900">Operating Hours</h4>
                                    <p className="text-gray-700">
                                        Mon - Fri: 9:00 AM - 5:00 PM (Local Time)
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-80 bg-gray-200 rounded-xl overflow-hidden shadow-inner flex items-center justify-center border border-gray-300">
                            <Globe className="w-12 h-12 text-gray-500" />
                            <p className="ml-4 text-gray-500 font-semibold">Interactive Map Placeholder</p>
                        </div>
                    </div>

                    <div className="lg:w-1/2 bg-gray-50 p-8 sm:p-10 rounded-xl shadow-2xl border border-gray-100 order-1 lg:order-2">
                        <h3 className="text-3xl font-extrabold mb-8 text-gray-900">Submit Your Inquiry</h3>

                        <form className="space-y-6">
                            <CustomInput
                                type="text"
                                placeholder="Your Full Name"
                                icon={FaUser}
                                required
                            />

                            <CustomInput
                                type="email"
                                placeholder="Your Business Email"
                                icon={FaEnvelope}
                                required
                            />

                            <CustomInput
                                type="tel"
                                placeholder="Your Phone Number (Optional)"
                                icon={FaPhone}
                            />

                            <div className="relative">
                                <textarea
                                    placeholder="Tell us about your requirement (Residential, Commercial, General)"
                                    rows="5"
                                    required
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm resize-none text-gray-800"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className={`w-full px-4 py-3 font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 ${theme.ctaPrimary}`}
                            >
                                Submit Private Inquiry
                            </button>

                            <div className="pt-4 border-t border-gray-200">
                                <h4 className="text-base font-semibold text-gray-800 mb-3">Connect Professionally :</h4>
                                <div className="flex space-x-6 justify-center mt-6">
                                    <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-blue-600 transition">
                                        <FaFacebookF size={24} />
                                    </a>
                                    <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-blue-600 transition">
                                        <FaTwitter size={24} />
                                    </a>
                                    <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-blue-600 transition">
                                        <FaInstagram size={24} />
                                    </a>
                                    <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-600 transition">
                                        <FaLinkedinIn size={24} />
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;