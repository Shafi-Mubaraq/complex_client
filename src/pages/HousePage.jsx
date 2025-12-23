// import React, { useState, useEffect } from 'react';
// import PropertyCard from "../components/Common/PropertyCard";
// // import BookingModal from "../components/Common/BookingModal";
// import PropertyModal from '../components/Common/PropertyModal';
// import axios from 'axios';

// import { XCircleIcon, SparklesIcon, HomeModernIcon, MapPinIcon } from '@heroicons/react/24/outline';


// const SkeletonCard = () => (
//     <div className="animate-pulse bg-white p-4 rounded-xl shadow-lg border border-gray-200">
//         <div className="w-full h-56 bg-gray-200 rounded-lg mb-4"></div>
//         <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
//         <div className="h-4 bg-gray-200 rounded mb-4"></div>
//         <div className="flex justify-between mt-4">
//             <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
//             <div className="h-4 w-1/6 bg-gray-200 rounded"></div>
//         </div>
//     </div>
// );

// const HousePage = () => {

//     const [properties, setProperties] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [modalProperty, setModalProperty] = useState(null);
//     const [modalType, setModalType] = useState("view");

//     const openModal = ({ type, data }) => {
//         setModalType(type);
//         setModalProperty(data);
//         setModalOpen(true);
//     };


//     /* 🔹 NEW: booking modal state */
//     const [selectedProperty, setSelectedProperty] = useState(null);

//     const apiUrl = import.meta.env.VITE_API_URL?.trim() || 'http://localhost:5000';

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await axios.get(`${apiUrl}/api/house/fetchData`);
//                 if (Array.isArray(response.data) && response.data.length > 0) {
//                     setProperties(response.data);
//                 }
//             } catch (err) {
//                 setError("⚠️ We couldn't load live listings. Displaying a curated sample.");
//             } finally {
//                 setTimeout(() => setLoading(false), 500);
//             }
//         };
//         fetchData();
//     }, [apiUrl]);

//     const confirmBooking = () => {
//         alert(`🏡 Booking confirmed for ${selectedProperty.title}`);
//         setSelectedProperty(null);
//     };

//     if (loading) {
//         return (
//             <section className="py-20 px-4 min-h-[90vh] bg-white">
//                 <div className="max-w-7xl mx-auto">
//                     <div className="text-center mb-16">
//                         <HomeModernIcon className="w-12 h-12 mx-auto text-indigo-500 mb-4 animate-bounce" />
//                         <h2 className="text-3xl font-bold text-gray-900">
//                             Preparing Residential Listings...
//                         </h2>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//                         <SkeletonCard />
//                         <SkeletonCard />
//                         <SkeletonCard />
//                     </div>
//                 </div>
//             </section>
//         );
//     }

//     return (
//         <section className="py-20 px-4 min-h-[90vh] bg-white">
//             <div className="max-w-7xl mx-auto">

//                 {error && (
//                     <div className="flex bg-red-50 p-6 rounded-2xl mb-12 border border-red-200">
//                         <XCircleIcon className="w-6 h-6 text-red-500 mr-3" />
//                         <p className="text-red-700">{error}</p>
//                     </div>
//                 )}

//                 <div className="text-center mb-4">
//                     <SparklesIcon className="w-10 h-10 mx-auto text-indigo-500 mb-2" />
//                 </div>

//                 <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-6">
//                     Luxury Residential <span className="text-indigo-600">Homes</span>
//                 </h1>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
//                     {properties.map((property, index) => (
//                         <PropertyCard
//                             key={property.id || index}
//                             {...property}
//                             src={property.src}
//                             onActionClick={openModal}
//                         />
//                     ))}

//                 </div>
//             </div>

//             {/* 🔹 Booking Modal */}
//             {/* <BookingModal
//                 open={!!selectedProperty}
//                 property={selectedProperty}
//                 onClose={() => setSelectedProperty(null)}
//                 onConfirm={confirmBooking}
//             /> */}

//             <PropertyModal
//                 open={modalOpen}
//                 onClose={() => setModalOpen(false)}
//                 property={modalProperty}
//                 type={modalType}
//             />

//         </section>
//     );
// };

// export default HousePage;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { XMarkIcon, SparklesIcon, HomeModernIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { FaBed, FaBath, FaRulerCombined, FaCheckCircle, FaTimesCircle, FaArrowRight, FaDoorOpen, FaLayerGroup } from "react-icons/fa";

/* ================= 1. PURE WHITE POPUP MODAL ================= */
const PropertyModal = ({ house, onClose }) => {
    if (!house) return null;
    const apiUrl = import.meta.env.VITE_API_URL?.trim() || 'http://localhost:5000';

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white max-w-5xl w-full rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col lg:flex-row max-h-[90vh]">
                
                {/* Left Side: Full Image/Gallery */}
                <div className="lg:w-1/2 bg-slate-100 relative overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 gap-2 p-2">
                        {house.images?.length > 0 ? (
                            house.images.map((img, idx) => (
                                <img 
                                    key={idx}
                                    src={`${apiUrl}${img}`} 
                                    className="w-full h-72 lg:h-96 object-cover rounded-xl" 
                                    alt={`Property ${idx}`} 
                                />
                            ))
                        ) : (
                            <div className="h-96 flex items-center justify-center bg-slate-200">No Images</div>
                        )}
                    </div>
                    <button onClick={onClose} className="absolute top-5 left-5 bg-white/80 p-2 rounded-full shadow-lg lg:hidden">
                        <XMarkIcon className="w-6 h-6 text-slate-900" />
                    </button>
                </div>

                {/* Right Side: All Data Fields */}
                <div className="lg:w-1/2 p-8 overflow-y-auto bg-white flex flex-col">
                    <div className="hidden lg:flex justify-between items-center mb-6">
                        <span className="bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                            {house.propertyType}
                        </span>
                        <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
                            <XMarkIcon className="w-8 h-8" />
                        </button>
                    </div>

                    <h2 className="text-3xl font-black text-slate-900 leading-tight mb-2">{house.title}</h2>
                    <p className="text-slate-500 flex items-center gap-1 mb-6 text-sm">
                        <MapPinIcon className="w-5 h-5 text-indigo-500" /> {house.location}
                    </p>

                    {/* Data Grid Section */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="border border-slate-100 p-4 rounded-2xl bg-slate-50/50">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Rent</p>
                            <p className="text-xl font-black text-indigo-600">₹{house.rent?.toLocaleString()}</p>
                        </div>
                        <div className="border border-slate-100 p-4 rounded-2xl bg-slate-50/50">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Deposit</p>
                            <p className="text-xl font-black text-slate-900">₹{house.deposit?.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-3 p-3 border-b border-slate-50">
                            <FaLayerGroup className="text-indigo-400" />
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-bold leading-none">Floor</p>
                                <p className="text-sm font-bold">{house.floor || "N/A"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 border-b border-slate-50">
                            <FaDoorOpen className="text-indigo-400" />
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-bold leading-none">Door No.</p>
                                <p className="text-sm font-bold">{house.doorNumber || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Amenities Tag Cloud */}
                    <div className="mb-8">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Included Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                            {house.amenities?.map((item, i) => (
                                <span key={i} className="px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-100">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Footer Action */}
                    <div className="mt-auto pt-6">
                        <button 
                            onClick={() => { alert("Booking Confirmed!"); onClose(); }}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-3"
                        >
                            Confirm Booking Request <FaArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ================= 2. HOUSE PAGE (PURE WHITE BACKGROUND) ================= */
const HousePage = () => {
    const apiUrl = import.meta.env.VITE_API_URL?.trim() || 'http://localhost:5000';
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedHouse, setSelectedHouse] = useState(null);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const res = await axios.get(`${apiUrl}/api/house/fetchData`);
                setHouses(res.data);
            } catch (err) { console.error(err); } 
            finally { setLoading(false); }
        };
        fetchHouses();
    }, [apiUrl]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <HomeModernIcon className="w-12 h-12 text-indigo-500 animate-bounce" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Listings...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white p-6 md:p-16"> {/* Change to bg-white */}
            <div className="max-w-7xl mx-auto">
                <header className="mb-20 text-center">
                    <SparklesIcon className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
                        Find Your Next <span className="text-indigo-600">Luxury Stay</span>
                    </h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {houses.map((house) => (
                        <div key={house._id} className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
                            
                            {/* Card Image */}
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={house.images?.length ? `${apiUrl}${house.images[0]}` : ""}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    alt={house.title}
                                />
                                <div className="absolute top-6 left-6">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                        house.isAvailable ? "bg-white/90 text-indigo-600 shadow-xl" : "bg-red-500 text-white"
                                    }`}>
                                        {house.isAvailable ? "Available" : "Occupied"}
                                    </span>
                                </div>
                            </div>

                            {/* Card Details */}
                            <div className="p-8 flex-grow">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{house.title}</h2>
                                        <p className="text-slate-400 text-sm font-medium flex items-center gap-1 mt-1">
                                            <MapPinIcon className="w-4 h-4" /> {house.location}
                                        </p>
                                    </div>
                                </div>

                                {/* NEW: Deposit & Rent on Front */}
                                <div className="grid grid-cols-2 gap-4 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Rent</p>
                                        <p className="text-lg font-black text-indigo-600">₹{house.rent}</p>
                                    </div>
                                    <div className="border-l border-slate-200 pl-4">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Deposit</p>
                                        <p className="text-lg font-black text-slate-800">₹{house.deposit}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex gap-4">
                                        <div className="text-center">
                                            <FaRulerCombined className="text-indigo-500 mx-auto mb-1" />
                                            <p className="text-[10px] font-bold text-slate-800">{house.area} <span className="text-slate-400">Sqft</span></p>
                                        </div>
                                        <div className="text-center">
                                            <FaBed className="text-indigo-500 mx-auto mb-1" />
                                            <p className="text-[10px] font-bold text-slate-800">2 <span className="text-slate-400">BHK</span></p>
                                        </div>
                                    </div>

                                    <button
                                        disabled={!house.isAvailable}
                                        onClick={() => setSelectedHouse(house)}
                                        className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                                            house.isAvailable 
                                            ? "bg-slate-900 text-white hover:bg-indigo-600 shadow-lg shadow-indigo-100" 
                                            : "bg-slate-100 text-slate-300 cursor-not-allowed"
                                        }`}
                                    >
                                        View House
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal - Displays all data fields */}
            {selectedHouse && (
                <PropertyModal
                    house={selectedHouse}
                    onClose={() => setSelectedHouse(null)}
                />
            )}
        </div>
    );
};

export default HousePage;