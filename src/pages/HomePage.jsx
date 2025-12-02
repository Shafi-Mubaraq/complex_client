import React, { useState, useEffect } from "react";
// FIX: Imported all required icons used in the body (Contact Section, Social Links)
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; 

// Imported components
import Navbar from '../components/layouts/Navbar';
import Footer from '../components/layouts/Footer';
import MobileMenu from '../components/layouts/MobileMenu';
import PropertyCard from '../components/PropertyCard';
import CustomInput from '../components/forms/CustomInput';
import SignInModal from '../components/modals/SignInModal';
import SignUpModal from '../components/modals/SignUpModal';

// Image Imports
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import shops1 from "../assets/shops1.jpg";
import shops2 from "../assets/img2.jpg"; 
import shops3 from "../assets/shops3.jpg";

const houseImages = [img1, img2, img3, img1, img2, img3];
const shopImages = [shops1, shops2, shops3, shops1, shops2, shops3];

function HomePage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false); // Retained for compatibility

    useEffect(() => {
        // Disable scrolling when any modal or menu is open
        document.body.style.overflow = (isMenuOpen || showSignIn || showSignUp || showAdmin) ? "hidden" : "auto";
    }, [isMenuOpen, showSignIn, showSignUp, showAdmin]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            // A fixed Navbar height of 64px (h-16) is assumed
            const headerOffset = 64; 
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setIsMenuOpen(false); // Close menu on navigation
    };

    const handleSwitchToSignUp = () => {
        setShowSignIn(false);
        setShowSignUp(true);
    };

    const handleSwitchToSignIn = () => {
        setShowSignUp(false);
        setShowSignIn(true);
    };

    const registerSave = () => {
        console.log('User registration initiated.')
        // Add actual registration logic here
    }

    return (
        <div className="min-h-screen pt-16 bg-gray-50"> 

            <Navbar
                scrollToSection={scrollToSection}
                setIsMenuOpen={setIsMenuOpen}
                setShowSignIn={setShowSignIn}
                setShowSignUp={setShowSignUp}
            />

            {/* --- 1. Hero Section --- */}
            <section
                id="home"
                className="bg-indigo-800 text-white flex flex-col justify-center items-center min-h-[90vh] sm:min-h-[85vh] px-4 py-20 text-center relative overflow-hidden"
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-tight">
                        Find Your Perfect <span className="text-indigo-300">Property</span>
                    </h2>
                    <p className="text-md sm:text-xl max-w-4xl mx-auto mb-10 opacity-90 font-light">
                        Discover modern homes and prime commercial spaces in our prestigious TNS Complex. Quality living and strategic business location, all in one place.
                    </p>
                    <button
                        onClick={() => scrollToSection("houses")}
                        className="bg-white text-indigo-800 font-bold px-10 py-3 rounded-full text-lg shadow-2xl hover:bg-gray-200 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                    >
                        Explore Listings
                    </button>
                </div>
            </section>

            {/* --- 2. Residential Listings Section --- */}
            <section id="houses" className="bg-white py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-14 text-center">
                        Residential Listings <span className="text-indigo-600">🏘️</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 sm:gap-10">
                        {houseImages.map((img, index) => (
                            <PropertyCard
                                key={`house-${index}`}
                                src={img}
                                alt={`Modern House ${index + 1}`}
                                title={`House Model ${index + 1} - 3BHK`}
                                description="Spacious and modern design perfect for family living."
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 3. Commercial Spaces Section --- */}
            <section id="shops" className="bg-gray-50 py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-14 text-center">
                        Commercial Spaces <span className="text-indigo-600">🛍️</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 sm:gap-10">
                        {shopImages.map((img, index) => (
                            <PropertyCard
                                key={`shop-${index}`}
                                src={img}
                                alt={`Commercial Shop ${index + 1}`}
                                title={`Shop Unit ${index + 1} - Prime Location`}
                                description="High foot traffic area, ideal for retail or office space."
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 4. Contact Section --- */}
            <section id="contact" className="bg-white py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-14 text-center">
                        Get In Touch <span className="text-indigo-600">📞</span>
                    </h2>
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                        {/* Contact Form */}
                        <div className="lg:w-1/2 bg-gray-50 p-6 sm:p-10 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h3>
                            <form className="space-y-6">
                                <CustomInput type="text" placeholder="Your Full Name" icon={FaUser} required />
                                <CustomInput type="email" placeholder="Your Email Address" icon={FaEnvelope} required />
                                <CustomInput type="tel" placeholder="Your Phone Number" icon={FaPhone} />
                                <div className="relative">
                                    <textarea
                                        placeholder="Your Message / Inquiry"
                                        rows="5"
                                        required
                                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Submit Inquiry
                                </button>
                            </form>
                        </div>

                        {/* Contact Info & Socials */}
                        <div className="lg:w-1/2 space-y-8">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Information</h3>
                            <div className="space-y-4 text-lg text-gray-700">
                                {/* Address */}
                                <div className="flex items-start space-x-4 p-4 bg-indigo-50 rounded-xl shadow-sm border border-indigo-100">
                                    <FaMapMarkerAlt className="text-indigo-600 text-2xl flex-shrink-0 mt-1" />
                                    <p className="font-medium">TNS Complex, 123 Main Street, Cityville, State 10001, Country</p>
                                </div>
                                {/* Phone */}
                                <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-xl shadow-sm border border-indigo-100">
                                    <FaPhone className="text-indigo-600 text-xl flex-shrink-0" />
                                    <a href="tel:+15551234567" className="hover:text-indigo-800 transition font-medium">+1 (555) 123-4567</a>
                                </div>
                                {/* Email */}
                                <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-xl shadow-sm border border-indigo-100">
                                    <FaEnvelope className="text-indigo-600 text-xl flex-shrink-0" />
                                    <a href="mailto:info@tnscomplex.com" className="hover:text-indigo-800 transition font-medium">info@tnscomplex.com</a>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold pt-4 text-gray-800">Connect With Us</h3>
                            <div className="flex space-x-6">
                                {/* Social Icons with larger size and focus rings */}
                                <a href="#" aria-label="Follow us on Facebook" className="text-indigo-600 hover:text-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"><FaFacebook size={32} /></a>
                                <a href="#" aria-label="Follow us on Twitter" className="text-indigo-600 hover:text-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"><FaTwitter size={32} /></a>
                                <a href="#" aria-label="Follow us on Instagram" className="text-indigo-600 hover:text-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"><FaInstagram size={32} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer scrollToSection={scrollToSection} />

            {/* Modals and Mobile Menu (Conditional Rendering) */}
            {isMenuOpen && (
                <MobileMenu
                    setIsMenuOpen={setIsMenuOpen}
                    scrollToSection={scrollToSection}
                    setShowSignIn={setShowSignIn}
                    setShowSignUp={setShowSignUp}
                    setShowAdmin={setShowAdmin} // Ensure this prop is passed even if not strictly used in MobileMenu
                />
            )}

            {showSignIn && (
                <SignInModal
                    onClose={() => setShowSignIn(false)}
                    onSwitchToSignUp={handleSwitchToSignUp}
                />
            )}

            {showSignUp && (
                <SignUpModal
                    registerSave={registerSave}
                    onClose={() => setShowSignUp(false)}
                    onSwitchToSignIn={handleSwitchToSignIn}
                />
            )}
        </div>
    );
}

export default HomePage;