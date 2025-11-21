import React, { useState, useEffect } from "react";
import { FaHome, FaBuilding, FaStore, FaUser, FaUserPlus, FaBars, FaTimes, FaArrowRight, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLock, FaGlobe, FaCity, FaIdCard, FaMobileAlt, FaKey } from "react-icons/fa"; // Import all necessary icons

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import shops1 from "../assets/shops1.jpg";
import shops2 from "../assets/img2.jpg";
import shops3 from "../assets/shops3.jpg";

const houseImages = [img1, img2, img3, img1, img2, img3];
const shopImages = [shops1, shops2, shops3, shops1, shops2, shops3];


// 1. Brand Component
const Brand = () => (
    <a href="#home" className="text-2xl font-extrabold text-white tracking-wider cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-sm">
        TNS <span className="text-indigo-300">Complex</span>
    </a>
);

// 2. Card Component (for property listings)
const PropertyCard = ({ src, alt, title }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden group">
        <img
            src={src}
            alt={alt}
            className="w-full h-48 object-cover object-center group-hover:scale-[1.03] transition duration-500"
            loading="lazy"
        />
        <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <button className="mt-2 text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-sm">
                <span>View Details</span> <FaArrowRight className="text-xs group-hover:translate-x-1 transition duration-200" />
            </button>
        </div>
    </div>
);

// 3. Modal Component (for Sign In/Up)
// Increased max-w-sm to max-w-lg to accommodate two columns comfortably
const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop (Clicking outside closes modal) - Added tabIndex="-1" for A11Y */}
        <div
            className="absolute inset-0 bg-black bg-opacity-70 transition-opacity"
            onClick={onClose}
            tabIndex="-1"
        ></div>

        {/* Modal Container - Changed max-w-sm to max-w-lg */}
        <div
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative z-20 transform transition-transform duration-300 scale-100"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <h2 id="modal-title" className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">{title}</h2>
            <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-1"
                onClick={onClose}
                aria-label={`Close ${title} modal`}
            >
                <FaTimes size={20} />
            </button>
            {children}
        </div>
    </div>
);

// 4. Custom Input Component for consistent styling
const CustomInput = ({ type, placeholder, icon: Icon, required = false, ...props }) => (
    <div className="relative group">
        {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition" />}
        <input
            type={type}
            placeholder={placeholder}
            required={required}
            className={`w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm ${Icon ? 'pl-10' : ''}`}
            {...props} // Allows passing other attributes like min/max length
        />
    </div>
);

// --- Main Component ---
function HomePage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    // Disable scroll when menu or modal is open
    useEffect(() => {
        if (isMenuOpen || showSignIn || showSignUp) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMenuOpen, showSignIn, showSignUp]);

    // Scroll to section function
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            // Adjust scroll to compensate for fixed header height
            const headerOffset = 64;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setIsMenuOpen(false);
        }
    };

    const navItems = [
        { id: "home", label: "Home", icon: FaHome },
        { id: "houses", label: "Houses", icon: FaBuilding },
        { id: "shops", label: "Shops", icon: FaStore },
        { id: "contact", label: "Contact", icon: FaEnvelope },
    ];

    return (
        <div className="min-h-screen pt-16">

            {/* Navbar (Fixed Header) */}
            <header className="bg-indigo-800 shadow-xl px-6 py-4 flex items-center justify-between text-white fixed top-0 left-0 w-full z-50">
                <Brand />

                {/* Desktop Menu */}
                <nav className="hidden md:flex flex-grow justify-center space-x-6" aria-label="Main Navigation">
                    {navItems.map(item => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(item.id);
                            }}
                            className="text-indigo-200 hover:text-white transition duration-200 font-medium flex items-center space-x-2 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        >
                            <item.icon className="text-base" /> <span>{item.label}</span>
                        </a>
                    ))}
                </nav>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex space-x-3">
                    <button
                        onClick={() => setShowSignIn(true)}
                        className="text-white border border-indigo-500 hover:bg-indigo-700 px-4 py-1.5 rounded-full text-sm transition duration-200 flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                        <FaUser size={12} /> <span>Sign In</span>
                    </button>
                    <button
                        onClick={() => setShowSignUp(true)}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-1.5 rounded-full text-sm transition duration-200 flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                        <FaUserPlus size={12} /> <span>Sign Up</span>
                    </button>
                </div>

                {/* Mobile Hamburger - Added A11Y attributes */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="text-white text-2xl focus:outline-none p-1 focus:ring-2 focus:ring-indigo-300 rounded"
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu-drawer"
                    >
                        <FaBars />
                    </button>
                </div>
            </header>

            {/* --- SECTIONS --- */}

            {/* Home Section (Hero) */}
            <section
                id="home"
                className="bg-indigo-700 bg-opacity-95 text-white flex flex-col justify-center items-center min-h-[90vh] px-4 text-center relative overflow-hidden"
            >
                {/* Replaced pt-16 with dynamic padding for better centering */}
                <div className="max-w-4xl py-20">
                    <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-tight">
                        Find Your Perfect <span className="text-indigo-300">Property</span>
                    </h2>
                    <p className="text-lg sm:text-xl max-w-3xl mb-10 opacity-90 font-light">
                        Discover modern homes and prime commercial spaces in our prestigious TNS Complex. Quality living and strategic business location, all in one place.
                    </p>
                    <button
                        onClick={() => scrollToSection("houses")}
                        className="bg-white text-indigo-800 font-bold px-8 py-3 rounded-full text-lg shadow-2xl hover:bg-gray-200 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                    >
                        Explore Listings
                    </button>
                </div>
            </section>

            {/* Houses Section (Property Grid) */}
            <section id="houses" className="bg-gray-50 py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center border-b-4 border-indigo-500 inline-block px-4 pb-2">
                        Residential Listings 🏘️
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {houseImages.map((img, index) => (
                            <PropertyCard
                                key={index}
                                src={img}
                                alt={`Modern House ${index + 1}`}
                                title={`House Model ${index + 1} - 3BHK`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Shops Section (Property Grid) */}
            <section id="shops" className="bg-white py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center border-b-4 border-indigo-500 inline-block px-4 pb-2">
                        Commercial Spaces 🛍️
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {shopImages.map((img, index) => (
                            <PropertyCard
                                key={index}
                                src={img}
                                alt={`Commercial Shop ${index + 1}`}
                                title={`Shop Unit ${index + 1} - Prime Location`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="bg-indigo-50 py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center border-b-4 border-indigo-500 inline-block px-4 pb-2">
                        Get In Touch 📞
                    </h2>
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Contact Form */}
                        <div className="lg:w-1/2 bg-white p-8 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-6 text-gray-700">Send Us a Message</h3>
                            <form className="space-y-4">
                                <CustomInput type="text" placeholder="Your Name" icon={FaUser} required />
                                <CustomInput type="email" placeholder="Your Email" icon={FaEnvelope} required />
                                <div className="relative group">
                                    <textarea
                                        placeholder="Your Message"
                                        rows="4"
                                        required
                                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Submit Inquiry
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="lg:w-1/2 space-y-6">
                            <h3 className="text-2xl font-bold mb-4 text-gray-700">Contact Information</h3>
                            <div className="space-y-4 text-lg text-gray-600">
                                <div className="flex items-start space-x-3 p-3 bg-indigo-100 rounded-lg">
                                    <FaMapMarkerAlt className="text-indigo-600 text-2xl flex-shrink-0 mt-1" />
                                    <span>TNS Complex, 123 Main Street, Cityville, State 10001, Country</span>
                                </div>
                                <div className="flex items-center space-x-3 p-3 bg-indigo-100 rounded-lg">
                                    <FaPhone className="text-indigo-600 text-xl flex-shrink-0" />
                                    <a href="tel:+15551234567" className="hover:text-indigo-800 transition">+1 (555) 123-4567</a>
                                </div>
                                <div className="flex items-center space-x-3 p-3 bg-indigo-100 rounded-lg">
                                    <FaEnvelope className="text-indigo-600 text-xl flex-shrink-0" />
                                    <a href="mailto:info@tnscomplex.com" className="hover:text-indigo-800 transition">info@tnscomplex.com</a>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold pt-4 text-gray-700">Follow Us</h3>
                            <div className="flex space-x-4">
                                <a href="#" aria-label="Follow us on Facebook" className="text-indigo-600 hover:text-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"><FaFacebook size={30} /></a>
                                <a href="#" aria-label="Follow us on Twitter" className="text-indigo-600 hover:text-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"><FaTwitter size={30} /></a>
                                <a href="#" aria-label="Follow us on Instagram" className="text-indigo-600 hover:text-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"><FaInstagram size={30} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 px-4">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <div className="mb-4 md:mb-0">
                        <Brand />
                        <p className="text-sm text-gray-400 mt-2">© {new Date().getFullYear()} TNS Complex. All rights reserved.</p>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-end space-x-6">
                        {/* Converted buttons to anchor tags for semantic links */}
                        {navItems.map(item => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(item.id);
                                }}
                                className="text-gray-400 hover:text-indigo-300 transition text-sm py-1 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-sm"
                            >
                                {item.label}
                            </a>
                        ))}
                        <a href="#" className="text-gray-400 hover:text-indigo-300 transition text-sm py-1 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-sm">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-indigo-300 transition text-sm py-1 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-sm">Terms of Service</a>
                    </div>
                </div>
            </footer>

            {/* --- OVERLAYS & MODALS --- */}

            {/* Mobile Menu Drawer (Now from left with light background) */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[60] flex justify-start md:hidden" id="mobile-menu-drawer">
                    {/* Dark Overlay */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsMenuOpen(false)}
                        tabIndex="-1"
                    ></div>

                    {/* Slide-in Menu */}
                    <nav className="w-64 h-full bg-indigo-50 shadow-2xl p-6 relative z-10 animate-slide-in-left overflow-y-auto" aria-label="Mobile Navigation">
                        <div className="flex justify-between items-center mb-6 pb-2 border-b border-indigo-200">
                            <Brand />
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="text-gray-700 text-2xl hover:text-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"
                                aria-label="Close navigation menu"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div className="flex flex-col space-y-2">
                            {/* Converted buttons to anchor tags for semantic links */}
                            {navItems.map(item => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(item.id);
                                    }}
                                    className="flex items-center space-x-3 text-lg text-gray-700 px-3 py-3 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition w-full text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <item.icon className="text-xl" /> <span>{item.label}</span>
                                </a>
                            ))}
                            <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                                <button
                                    onClick={() => { setShowSignIn(true); setIsMenuOpen(false); }}
                                    className="flex items-center space-x-3 text-lg text-indigo-600 font-medium px-3 py-3 rounded-lg hover:bg-indigo-100 transition w-full text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <FaUser className="text-xl" /> <span>Sign In</span>
                                </button>
                                <button
                                    onClick={() => { setShowSignUp(true); setIsMenuOpen(false); }}
                                    className="flex items-center space-x-3 text-lg text-indigo-600 font-medium px-3 py-3 rounded-lg hover:bg-indigo-100 transition w-full text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <FaUserPlus className="text-xl" /> <span>Sign Up</span>
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
            )}

            {/* SignIn Modal - Using CustomInput */}
            {showSignIn && (
                <Modal title="Welcome Back" onClose={() => setShowSignIn(false)}>
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
                        Don't have an account? <button type="button" className="text-indigo-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-sm" onClick={() => { setShowSignIn(false); setShowSignUp(true); }}>Sign Up</button>
                    </p>
                </Modal>
            )}

            {showSignUp && (
                <Modal title="Create Account" onClose={() => setShowSignUp(false)}>
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
                        Already have an account? <button type="button" className="text-indigo-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-sm" onClick={() => { setShowSignUp(false); setShowSignIn(true); }}>Sign In</button>
                    </p>
                </Modal>
            )}

            <style>{`
                @keyframes slide-in-left {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(0); }
                }
                .animate-slide-in-left {
                    animation: slide-in-left 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

export default HomePage;




// import React, { useState, useEffect } from "react";
// import { FaHome, FaBuilding, FaStore, FaEnvelope, FaUser, FaUserPlus, FaMapMarkerAlt, FaPhone, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";


// import Navbar from '../components/layouts/Navbar';
// import Footer from '../components/layouts/Footer';
// import MobileMenu from '../components/layouts/MobileMenu';
// import PropertyCard from '../components/PropertyCard';
// import CustomInput from '../components/forms/CustomInput';
// import SignInModal from '../components/modals/SignInModal';
// import SignUpModal from '../components/modals/SignUpModal';

// import img1 from "../assets/img1.jpg";
// import img2 from "../assets/img2.jpg";
// import img3 from "../assets/img3.jpg";
// import shops1 from "../assets/shops1.jpg";
// import shops2 from "../assets/img2.jpg";
// import shops3 from "../assets/shops3.jpg";

// const houseImages = [img1, img2, img3, img1, img2, img3];
// const shopImages = [shops1, shops2, shops3, shops1, shops2, shops3];

// function HomePage() {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [showSignIn, setShowSignIn] = useState(false);
//     const [showSignUp, setShowSignUp] = useState(false);

//     useEffect(() => {
//         document.body.style.overflow = (isMenuOpen || showSignIn || showSignUp) ? "hidden" : "auto";
//     }, [isMenuOpen, showSignIn, showSignUp]);

//     const scrollToSection = (id) => {
//         const element = document.getElementById(id);
//         if (element) {
//             const headerOffset = 64;
//             const elementPosition = element.getBoundingClientRect().top;
//             const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

//             window.scrollTo({
//                 top: offsetPosition,
//                 behavior: "smooth"
//             });
//         }
//     };
    
//     const handleSwitchToSignUp = () => {
//         setShowSignIn(false);
//         setShowSignUp(true);
//     };

//     const handleSwitchToSignIn = () => {
//         setShowSignUp(false);
//         setShowSignIn(true);
//     };

//     return (
//         <div className="min-h-screen pt-16">

//             <Navbar
//                 scrollToSection={scrollToSection}
//                 setIsMenuOpen={setIsMenuOpen}
//                 setShowSignIn={setShowSignIn}
//                 setShowSignUp={setShowSignUp}
//             />
//             <section
//                 id="home"
//                 className="bg-indigo-700 bg-opacity-95 text-white flex flex-col justify-center items-center min-h-[90vh] px-4 text-center relative overflow-hidden"
//             >
//                 <div className="max-w-4xl py-20">
//                     <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-tight">
//                         Find Your Perfect <span className="text-indigo-300">Property</span>
//                     </h2>
//                     <p className="text-lg sm:text-xl max-w-3xl mb-10 opacity-90 font-light">
//                         Discover modern homes and prime commercial spaces in our prestigious TNS Complex. Quality living and strategic business location, all in one place.
//                     </p>
//                     <button
//                         onClick={() => scrollToSection("houses")}
//                         className="bg-white text-indigo-800 font-bold px-8 py-3 rounded-full text-lg shadow-2xl hover:bg-gray-200 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
//                     >
//                         Explore Listings
//                     </button>
//                 </div>
//             </section>

//             <section id="houses" className="bg-gray-50 py-16 px-4">
//                 <div className="max-w-6xl mx-auto">
//                     <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center border-b-4 border-indigo-500 inline-block px-4 pb-2">
//                         Residential Listings 🏘️
//                     </h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {houseImages.map((img, index) => (
//                             <PropertyCard
//                                 key={index}
//                                 src={img}
//                                 alt={`Modern House ${index + 1}`}
//                                 title={`House Model ${index + 1} - 3BHK`}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             <section id="shops" className="bg-white py-16 px-4">
//                 <div className="max-w-6xl mx-auto">
//                     <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center border-b-4 border-indigo-500 inline-block px-4 pb-2">
//                         Commercial Spaces 🛍️
//                     </h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {shopImages.map((img, index) => (
//                             <PropertyCard
//                                 key={index}
//                                 src={img}
//                                 alt={`Commercial Shop ${index + 1}`}
//                                 title={`Shop Unit ${index + 1} - Prime Location`}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             <section id="contact" className="bg-indigo-50 py-16 px-4">
//                 <div className="max-w-6xl mx-auto">
//                     <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center border-b-4 border-indigo-500 inline-block px-4 pb-2">
//                         Get In Touch 📞
//                     </h2>
//                     <div className="flex flex-col lg:flex-row gap-12">
//                         <div className="lg:w-1/2 bg-white p-8 rounded-xl shadow-lg">
//                             <h3 className="text-2xl font-bold mb-6 text-gray-700">Send Us a Message</h3>
//                             <form className="space-y-4">
//                                 <CustomInput type="text" placeholder="Your Name" icon={FaUser} required />
//                                 <CustomInput type="email" placeholder="Your Email" icon={FaEnvelope} required />
//                                 <div className="relative group">
//                                     <textarea
//                                         placeholder="Your Message"
//                                         rows="4"
//                                         required
//                                         className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
//                                     ></textarea>
//                                 </div>
//                                 <button
//                                     type="submit"
//                                     className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                                 >
//                                     Submit Inquiry
//                                 </button>
//                             </form>
//                         </div>

//                         <div className="lg:w-1/2 space-y-6">
//                             <h3 className="text-2xl font-bold mb-4 text-gray-700">Contact Information</h3>
//                             <div className="space-y-4 text-lg text-gray-600">
//                                 <div className="flex items-start space-x-3 p-3 bg-indigo-100 rounded-lg">
//                                     <FaMapMarkerAlt className="text-indigo-600 text-2xl flex-shrink-0 mt-1" />
//                                     <span>TNS Complex, 123 Main Street, Cityville, State 10001, Country</span>
//                                 </div>
//                                 <div className="flex items-center space-x-3 p-3 bg-indigo-100 rounded-lg">
//                                     <FaPhone className="text-indigo-600 text-xl flex-shrink-0" />
//                                     <a href="tel:+15551234567" className="hover:text-indigo-800 transition">+1 (555) 123-4567</a>
//                                 </div>
//                                 <div className="flex items-center space-x-3 p-3 bg-indigo-100 rounded-lg">
//                                     <FaEnvelope className="text-indigo-600 text-xl flex-shrink-0" />
//                                     <a href="mailto:info@tnscomplex.com" className="hover:text-indigo-800 transition">info@tnscomplex.com</a>
//                                 </div>
//                             </div>

//                             <h3 className="text-2xl font-bold pt-4 text-gray-700">Follow Us</h3>
//                             <div className="flex space-x-4">
//                                 <a href="#" aria-label="Follow us on Facebook" className="text-indigo-600 hover:text-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"><FaFacebook size={30} /></a>
//                                 <a href="#" aria-label="Follow us on Twitter" className="text-indigo-600 hover:text-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"><FaTwitter size={30} /></a>
//                                 <a href="#" aria-label="Follow us on Instagram" className="text-indigo-600 hover:text-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"><FaInstagram size={30} /></a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <Footer scrollToSection={scrollToSection} />


//             {isMenuOpen && (
//                 <MobileMenu
//                     setIsMenuOpen={setIsMenuOpen}
//                     scrollToSection={scrollToSection}
//                     setShowSignIn={setShowSignIn}
//                     setShowSignUp={setShowSignUp}
//                 />
//             )}

//             {showSignIn && (
//                 <SignInModal
//                     onClose={() => setShowSignIn(false)}
//                     onSwitchToSignUp={handleSwitchToSignUp}
//                 />
//             )}

//             {showSignUp && (
//                 <SignUpModal
//                     onClose={() => setShowSignUp(false)}
//                     onSwitchToSignIn={handleSwitchToSignIn}
//                 />
//             )}
//         </div>
//     );
// }

// export default HomePage;