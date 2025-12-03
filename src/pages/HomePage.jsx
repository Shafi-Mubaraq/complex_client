// import React, { useState, useEffect } from "react";
// // FIX: Imported all required icons used in the body (Contact Section, Social Links)
// import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; 

// // Imported components
// import Navbar from '../components/layouts/Navbar';
// import Footer from '../components/layouts/Footer';
// import MobileMenu from '../components/layouts/MobileMenu';
// import PropertyCard from '../components/PropertyCard';
// import CustomInput from '../components/forms/CustomInput';
// import SignInModal from '../components/modals/SignInModal';
// import SignUpModal from '../components/modals/SignUpModal';

// // Image Imports
// import img1 from "../assets/img1.jpg";
// import img2 from "../assets/img2.jpg";
// import img3 from "../assets/img3.jpg";
// import shops1 from "../assets/shops1.jpg";
// import shops2 from "../assets/img2.jpg"; 
// import shops3 from "../assets/shops3.jpg";

// const houseImages = [img1, img2, img3, img1, img2, img3];
// const shopImages = [shops1, shops2, shops3, shops1, shops2, shops3];

// // =================================================================
// // 1. Component for the Home Section (Hero)
// // =================================================================
// // Assume the HomePage component manages the 'theme' state (e.g., 'light' or 'dark')
// // and passes it down as a prop.

// const HomeSection = ({ scrollToHouses, theme }) => {

//     // Theme-specific Classes
//     const isDark = theme === 'dark';

//     // Background & Text Colors
//     const sectionBg = isDark ? 'bg-gray-950' : 'bg-gray-50';
//     const sectionText = isDark ? 'text-gray-100' : 'text-gray-800';

//     // Headline Gradient Colors
//     const headlineGradient = isDark 
//         ? 'from-white via-indigo-300 to-indigo-400'
//         : 'from-gray-800 via-indigo-700 to-indigo-900';

//     // Card Colors
//     const cardBg = isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/70 border border-gray-200';
//     const cardHoverBorder = isDark ? 'hover:border-indigo-500' : 'hover:border-indigo-600';
//     const cardDetailText = isDark ? 'text-gray-400' : 'text-gray-500';

//     // CTA Colors
//     const ctaBg = isDark ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-indigo-700 hover:bg-indigo-600';
//     const ctaShadow = isDark ? 'shadow-indigo-600/30' : 'shadow-indigo-700/30';
//     const ctaFocus = isDark ? 'focus:ring-indigo-400/80' : 'focus:ring-indigo-500/80';

//     return (
//         <section
//             id="home"
//             className={`${sectionBg} ${sectionText} flex flex-col justify-center items-center min-h-[90vh] sm:min-h-[90vh] px-4 py-24 relative overflow-hidden`}
//         >
//             <div className="max-w-7xl mx-auto z-10 text-center">

//                 {/* BRAND NAME: Controlled size, visually separated */}
//                 <p className="text-sm sm:text-base font-semibold mb-2 tracking-widest uppercase text-indigo-500 border-b border-indigo-500 pb-1 inline-block">
//                     T.N.S Complex
//                 </p>

//                 {/* FOCUSED HEADLINE: Dynamic Gradient based on theme */}
//                 <h2 className={`text-4xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight 
//                                 text-transparent bg-clip-text bg-gradient-to-r ${headlineGradient} drop-shadow-lg`}>
//                     The Definitive Standard in **Integrated Living**.
//                 </h2>

//                 {/* SUBTITLE/VALUE PROPOSITION: Controlled text size */}
//                 <p className="text-lg sm:text-xl max-w-4xl mx-auto mb-12 font-light text-gray-500 dark:text-gray-400">
//                     A prestigious development offering the **highest standards of security, infrastructure, and location**. Your definitive choice for refined living and business distinction.
//                 </p>

//                 {/* FEATURE CARDS: Dynamic styling */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

//                     {/* Card 1: Distinction */}
//                     <div className={`${cardBg} p-5 rounded-lg shadow-lg ${cardHoverBorder} transition duration-300`}>
//                         <span className="text-3xl block mb-2 text-indigo-500">🏙️</span>
//                         <h4 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">Central Hub Distinction</h4>
//                         <p className={`text-xs font-normal ${cardDetailText}`}>The prime address for both lifestyle and commerce, positioned for optimal connectivity and growth.</p>
//                     </div>

//                     {/* Card 2: Resilience */}
//                     <div className={`${cardBg} p-5 rounded-lg shadow-lg ${cardHoverBorder} transition duration-300`}>
//                         <span className="text-3xl block mb-2 text-green-500">⚡</span>
//                         <h4 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">Uninterrupted Excellence</h4>
//                         <p className={`text-xs font-normal ${cardDetailText}`}>Guaranteed zero-downtime infrastructure: full power backup and high-speed fiber services.</p>
//                     </div>

//                     {/* Card 3: Lifestyle */}
//                     <div className={`${cardBg} p-5 rounded-lg shadow-lg ${cardHoverBorder} transition duration-300`}>
//                         <span className="text-3xl block mb-2 text-yellow-500">🛡️</span>
//                         <h4 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">Advanced Security Posture</h4>
//                         <p className={`text-xs font-normal ${cardDetailText}`}>Layered security protocols including 24/7 monitoring and controlled access points for safety.</p>
//                     </div>
//                 </div>

//                 {/* CTA Button: Dynamic styling */}
//                 <button
//                     onClick={scrollToHouses} 
//                     className={`${ctaBg} text-white font-semibold px-14 py-4 rounded-md text-base uppercase tracking-wider 
//                                 shadow-lg ${ctaShadow} transition duration-300 transform hover:scale-[1.03] 
//                                 focus:outline-none focus:ring-4 ${ctaFocus}`}
//                 >
//                     Request a Private Viewing
//                 </button>
//             </div>
//         </section>
//     );
// };

// // =================================================================
// // 2. Component for Residential Listings (Houses)
// // =================================================================
// const HousesSection = () => (
//     <section id="houses" className="bg-white py-20 px-4 min-h-[90vh]">
//         <div className="max-w-7xl mx-auto">
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-14 text-center">
//                 Residential Listings <span className="text-indigo-600">🏘️</span>
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 sm:gap-10">
//                 {houseImages.map((img, index) => (
//                     <PropertyCard
//                         key={`house-${index}`}
//                         src={img}
//                         alt={`Modern House ${index + 1}`}
//                         title={`House Model ${index + 1} - 3BHK`}
//                         description="Spacious and modern design perfect for family living."
//                     />
//                 ))}
//             </div>
//         </div>
//     </section>
// );

// // =================================================================
// // 3. Component for Commercial Spaces (Shops)
// // =================================================================
// const ShopsSection = () => (
//     <section id="shops" className="bg-gray-50 py-20 px-4 min-h-[90vh]">
//         <div className="max-w-7xl mx-auto">
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-14 text-center">
//                 Commercial Spaces <span className="text-indigo-600">🛍️</span>
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 sm:gap-10">
//                 {shopImages.map((img, index) => (
//                     <PropertyCard
//                         key={`shop-${index}`}
//                         src={img}
//                         alt={`Commercial Shop ${index + 1}`}
//                         title={`Shop Unit ${index + 1} - Prime Location`}
//                         description="High foot traffic area, ideal for retail or office space."
//                     />
//                 ))}
//             </div>
//         </div>
//     </section>
// );


// // =================================================================
// // 4. Component for Contact Section
// // =================================================================
// const ContactSection = () => (
//     <section id="contact" className="bg-white py-20 px-4 min-h-[90vh]">
//         <div className="max-w-7xl mx-auto">
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-14 text-center">
//                 Get In Touch <span className="text-indigo-600">📞</span>
//             </h2>
//             <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
//                 {/* Contact Form */}
//                 <div className="lg:w-1/2 bg-gray-50 p-6 sm:p-10 rounded-xl shadow-lg border border-gray-100">
//                     <h3 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h3>
//                     <form className="space-y-6">
//                         <CustomInput type="text" placeholder="Your Full Name" icon={FaUser} required />
//                         <CustomInput type="email" placeholder="Your Email Address" icon={FaEnvelope} required />
//                         <CustomInput type="tel" placeholder="Your Phone Number" icon={FaPhone} />
//                         <div className="relative">
//                             <textarea
//                                 placeholder="Your Message / Inquiry"
//                                 rows="5"
//                                 required
//                                 className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
//                             ></textarea>
//                         </div>
//                         <button
//                             type="submit"
//                             className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2"
//                         >
//                             Submit Inquiry
//                         </button>
//                     </form>
//                 </div>

//                 {/* Contact Info & Socials */}
//                 <div className="lg:w-1/2 space-y-8">
//                     <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Information</h3>
//                     <div className="space-y-4 text-lg text-gray-700">
//                         {/* Address */}
//                         <div className="flex items-start space-x-4 p-4 bg-indigo-50 rounded-xl shadow-sm border border-indigo-100">
//                             <FaMapMarkerAlt className="text-indigo-600 text-2xl flex-shrink-0 mt-1" />
//                             <p className="font-medium">TNS Complex, 123 Main Street, Cityville, State 10001, Country</p>
//                         </div>
//                         {/* Phone */}
//                         <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-xl shadow-sm border border-indigo-100">
//                             <FaPhone className="text-indigo-600 text-xl flex-shrink-0" />
//                             <a href="tel:+15551234567" className="hover:text-indigo-800 transition font-medium">+1 (555) 123-4567</a>
//                         </div>
//                         {/* Email */}
//                         <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-xl shadow-sm border border-indigo-100">
//                             <FaEnvelope className="text-indigo-600 text-xl flex-shrink-0" />
//                             <a href="mailto:info@tnscomplex.com" className="hover:text-indigo-800 transition font-medium">info@tnscomplex.com</a>
//                         </div>
//                     </div>

//                     <h3 className="text-2xl font-bold pt-4 text-gray-800">Connect With Us</h3>
//                     <div className="flex space-x-6">
//                         {/* Social Icons with larger size and focus rings */}
//                         <a href="#" aria-label="Follow us on Facebook" className="text-indigo-600 hover:text-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"><FaFacebook size={32} /></a>
//                         <a href="#" aria-label="Follow us on Twitter" className="text-indigo-600 hover:text-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"><FaTwitter size={32} /></a>
//                         <a href="#" aria-label="Follow us on Instagram" className="text-indigo-600 hover:text-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"><FaInstagram size={32} /></a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>
// );


// // =================================================================
// // HomePage Main Component
// // =================================================================
// function HomePage() {
//     // New state to track which "page" is currently displayed. Default is 'home'.
//     const [currentPage, setCurrentPage] = useState("home"); 

//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [showSignIn, setShowSignIn] = useState(false);
//     const [showSignUp, setShowSignUp] = useState(false);
//     const [showAdmin, setShowAdmin] = useState(false);

//     // Effect to disable scrolling is still relevant for modals/menu
//     useEffect(() => {
//         document.body.style.overflow = (isMenuOpen || showSignIn || showSignUp || showAdmin) ? "hidden" : "auto";
//         // When the page changes, ensure we scroll to the top of the new content
//         window.scrollTo(0, 0); 
//     }, [isMenuOpen, showSignIn, showSignUp, showAdmin, currentPage]);


//     // Modal switch handlers (unchanged)
//     const handleSwitchToSignUp = () => {
//         setShowSignIn(false);
//         setShowSignUp(true);
//     };

//     const handleSwitchToSignIn = () => {
//         setShowSignUp(false);
//         setShowSignIn(true);
//     };

//     const registerSave = () => {
//         console.log('User registration initiated.')
//     }

//     // Function to render the correct component based on state
//     const renderPageContent = () => {
//         switch (currentPage) {
//             case "home":
//                 // For the hero button, we'll navigate to the houses page
//                 return <HomeSection scrollToHouses={() => setCurrentPage('houses')} />;
//             case "houses":
//                 return <HousesSection />;
//             case "shops":
//                 return <ShopsSection />;
//             case "contact":
//                 return <ContactSection />;
//             default:
//                 return <HomeSection scrollToHouses={() => setCurrentPage('houses')} />;
//         }
//     };

//     return (
//         // Removed pt-16 since each section now starts at the top of the screen
//         <div className="min-h-screen bg-gray-50"> 

//             {/* Navbar now passes the state setter: setCurrentPage */}
//             <Navbar
//                 setCurrentPage={setCurrentPage}
//                 setIsMenuOpen={setIsMenuOpen}
//                 setShowSignIn={setShowSignIn}
//                 setShowSignUp={setShowSignUp}
//             />

//             {/* Main Content Area: Conditional Rendering */}
//             <div className="pt-16">
//                 {renderPageContent()}
//             </div>

//             <Footer setCurrentPage={setCurrentPage} /> {/* Footer should also use setCurrentPage for navigation */}


//             {/* Modals and Mobile Menu (Conditional Rendering) */}
//             {isMenuOpen && (
//                 <MobileMenu
//                     setIsMenuOpen={setIsMenuOpen}
//                     setCurrentPage={setCurrentPage} // Use setCurrentPage in MobileMenu too
//                     setShowSignIn={setShowSignIn}
//                     setShowSignUp={setShowSignUp}
//                     setShowAdmin={setShowAdmin}
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
//                     registerSave={registerSave}
//                     onClose={() => setShowSignUp(false)}
//                     onSwitchToSignIn={handleSwitchToSignIn}
//                 />
//             )}
//         </div>
//     );
// }

// export default HomePage;



import React from 'react'

function HomePage() {

    // Static Colors (No Theme Switch)
    const sectionBg = 'bg-gray-50';
    const sectionText = 'text-gray-800';

    // Headline Gradient
    const headlineGradient = 'from-gray-800 via-indigo-700 to-indigo-900';

    // Card Colors
    const cardBg = 'bg-white/70 border border-gray-200';
    const cardHoverBorder = 'hover:border-indigo-600';
    const cardDetailText = 'text-gray-500';

    // CTA Colors
    const ctaBg = 'bg-indigo-700 hover:bg-indigo-600';
    const ctaShadow = 'shadow-indigo-700/30';
    const ctaFocus = 'focus:ring-indigo-500/80';

    const scrollToHouses = () => {
        const section = document.getElementById("houses");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id="home"
            className={`${sectionBg} ${sectionText} flex flex-col justify-center items-center min-h-[90vh] px-4 py-24 relative overflow-hidden`}
        >
            <div className="max-w-7xl mx-auto z-10 text-center">

                {/* BRAND NAME */}
                <p className="text-sm sm:text-base font-semibold mb-2 tracking-widest uppercase text-indigo-500 border-b border-indigo-500 pb-1 inline-block">
                    T.N.S Complex
                </p>

                {/* HEADLINE */}
                <h2 className={`text-4xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight 
                                text-transparent bg-clip-text bg-gradient-to-r ${headlineGradient} drop-shadow-lg`}>
                    The Definitive Standard in Integrated Living.
                </h2>

                {/* SUBTITLE */}
                <p className="text-lg sm:text-xl max-w-4xl mx-auto mb-12 font-light text-gray-500">
                    A prestigious development offering the highest standards of security, infrastructure, and location. 
                    Your definitive choice for refined living and business distinction.
                </p>

                {/* FEATURE CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

                    {/* Card 1 */}
                    <div className={`${cardBg} p-5 rounded-lg shadow-lg ${cardHoverBorder} transition duration-300`}>
                        <span className="text-3xl block mb-2 text-indigo-500">🏙️</span>
                        <h4 className="text-lg font-bold mb-1 text-gray-900">Central Hub Distinction</h4>
                        <p className={`text-xs font-normal ${cardDetailText}`}>
                            The prime address for both lifestyle and commerce, positioned for optimal connectivity and growth.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className={`${cardBg} p-5 rounded-lg shadow-lg ${cardHoverBorder} transition duration-300`}>
                        <span className="text-3xl block mb-2 text-green-500">⚡</span>
                        <h4 className="text-lg font-bold mb-1 text-gray-900">Uninterrupted Excellence</h4>
                        <p className={`text-xs font-normal ${cardDetailText}`}>
                            Guaranteed zero-downtime infrastructure: full power backup and high-speed fiber services.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className={`${cardBg} p-5 rounded-lg shadow-lg ${cardHoverBorder} transition duration-300`}>
                        <span className="text-3xl block mb-2 text-yellow-500">🛡️</span>
                        <h4 className="text-lg font-bold mb-1 text-gray-900">Advanced Security Posture</h4>
                        <p className={`text-xs font-normal ${cardDetailText}`}>
                            Layered security protocols including 24/7 monitoring and controlled access points for safety.
                        </p>
                    </div>

                </div>

                {/* CTA BUTTON */}
                <button
                    onClick={scrollToHouses}
                    className={`${ctaBg} text-white font-semibold px-14 py-4 rounded-md text-base uppercase tracking-wider 
                                shadow-lg ${ctaShadow} transition duration-300 transform hover:scale-[1.03] 
                                focus:outline-none focus:ring-4 ${ctaFocus}`}
                >
                    House Views
                </button>
                <button
                    onClick={scrollToHouses}
                    className={`${ctaBg} text-white font-semibold px-14 py-4 rounded-md text-base uppercase tracking-wider 
                                shadow-lg ${ctaShadow} transition duration-300 transform hover:scale-[1.03] 
                                focus:outline-none focus:ring-4 ${ctaFocus}`}
                >
                    Request a Private Viewing
                </button>
                <button
                    onClick={scrollToHouses}
                    className={`${ctaBg} text-white font-semibold px-14 py-4 rounded-md text-base uppercase tracking-wider 
                                shadow-lg ${ctaShadow} transition duration-300 transform hover:scale-[1.03] 
                                focus:outline-none focus:ring-4 ${ctaFocus}`}
                >
                    Shops Views
                </button>
            </div>
        </section>
    )
}

export default HomePage;
