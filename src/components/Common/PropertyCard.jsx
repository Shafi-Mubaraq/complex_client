import React from 'react';
import { FaArrowRight, FaTag, FaCheckCircle, FaTimesCircle, FaClock, FaRulerCombined, FaBuilding, FaClipboardList, FaBed, FaBath } from "react-icons/fa";
import { DollarSign, MapPin } from 'lucide-react';

const PropertyCard = ({
    src,
    alt,
    title,
    description = "Premium property details available upon request.",
    // Commercial Props
    price, 
    status, 
    sqft,
    // Residential Props
    rent, 
    area, 
    isAvailable, 
    deposit,

    // Generic/Mapped Props
    beds, 
    baths, 
    location = "TNS Complex", 
}) => {

    // --- 1. HARMONIZE PROPS ---
    const finalPrice = price || rent;
    const finalArea = sqft || area;
    const finalStatus = status || (isAvailable === true ? 'Available' : (isAvailable === false ? 'Leased' : 'Unknown'));

    // --- 2. STATUS LOGIC ---
    const currentStatus = finalStatus || 'Unknown';
    let statusConfig = { text: currentStatus.toUpperCase(), icon: FaClock, color: 'bg-gray-500', textColor: 'text-white' };
    
    switch (currentStatus.toLowerCase()) {
        case 'available':
            statusConfig = { text: 'AVAILABLE', icon: FaCheckCircle, color: 'bg-green-600', textColor: 'text-white' };
            break;
        case 'leased':
        case 'sold out':
            statusConfig = { text: 'LEASED', icon: FaTimesCircle, color: 'bg-red-600', textColor: 'text-white' };
            break;
        case 'pending':
            statusConfig = { text: 'PENDING', icon: FaClock, color: 'bg-yellow-500', textColor: 'text-gray-900' };
            break;
        default:
            break;
    }
    
    // --- 3. FORMATTING & TYPE CHECK ---
    const isCommercial = price || isNaN(beds) || isNaN(baths) || (typeof beds === 'string' && isNaN(parseInt(beds)));
    const ctaText = currentStatus === 'Available' ? (isCommercial ? 'View Lease Details' : 'Book a Tour') : 'Join Waitlist';

    const formattedSqft = finalArea ? finalArea.toLocaleString('en-US') : null;

    // Use specific formatting for INR (Residential - number type) or standard for commercial (string/price prop)
    const formattedPrice = typeof finalPrice === 'number' 
        ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(finalPrice)
        : finalPrice;
    
    const formattedDeposit = typeof deposit === 'number' 
        ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(deposit)
        : null;

    // Determine the Property Category label
    const categoryLabel = isCommercial ? (beds || 'Commercial') : 'Residential Home';


    return (
        // Design Change: Cleaner shadow, rounded corners, and subtle hover scale
        <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition duration-500 overflow-hidden transform hover:-translate-y-1 group">

            {/* Image Container */}
            <div className="relative h-64">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                />
            </div>

            {/* Content Area */}
            <div className="p-5 md:p-6 flex flex-col justify-between h-auto">

                {/* Top Row: Price, Status, Category */}
                <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                    
                    {/* Price Block */}
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-500 uppercase leading-none">
                            {isCommercial ? 'Monthly Lease' : 'Monthly Rent'}
                        </p>
                        <div className="flex items-center text-gray-900 font-extrabold mt-1">
                            <span className="text-3xl tracking-tight">{formattedPrice}</span>
                            {isCommercial && !deposit && <span className="text-base ml-1 text-gray-400 font-normal">/mo</span>}
                        </div>
                        {formattedDeposit && (
                            <p className="text-xs text-gray-500 mt-1">
                                Deposit: <span className="text-gray-800 font-semibold">{formattedDeposit}</span>
                            </p>
                        )}
                    </div>

                    {/* Status Badge */}
                    <span className={`text-xs font-bold uppercase px-3 py-1.5 rounded-full shadow-md ${statusConfig.color} ${statusConfig.textColor}`}>
                        {statusConfig.text}
                    </span>
                </div>


                {/* Title & Description Block */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 leading-snug hover:text-indigo-600 transition duration-300">
                        {title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                        {description}
                    </p>
                </div>

                {/* Feature Row (Editorial Divider Style) */}
                <div className="grid grid-cols-3 gap-3 border-y border-gray-200 py-3 mb-6 text-gray-700 text-center">
                    
                    {/* Area/Sqft */}
                    {formattedSqft && (
                        <div className="flex flex-col items-center">
                            <FaRulerCombined className="w-5 h-5 text-indigo-500 mb-1" />
                            <span className="text-sm font-semibold">{formattedSqft}</span>
                            <span className="text-xs text-gray-400">Sqft</span>
                        </div>
                    )}

                    {isCommercial ? (
                        <>
                            {/* Suitability (beds slot) */}
                            {beds && (
                                <div className="flex flex-col items-center border-l border-r border-gray-200">
                                    <FaClipboardList className="w-5 h-5 text-indigo-500 mb-1" /> 
                                    <span className="text-sm font-semibold">{beds}</span>
                                    <span className="text-xs text-gray-400">Use</span>
                                </div>
                            )}
                            {/* Floor (baths slot) */}
                            {baths && (
                                <div className="flex flex-col items-center">
                                    <FaBuilding className="w-5 h-5 text-indigo-500 mb-1" /> 
                                    <span className="text-sm font-semibold">{baths}</span>
                                    <span className="text-xs text-gray-400">Floor</span>
                                </div>
                            )}
                        </>
                    ) : (
                        // Residential Specific Features (Beds & Baths)
                        <>
                            {/* Beds */}
                            {beds && (
                                <div className="flex flex-col items-center border-l border-r border-gray-200">
                                    <FaBed className="w-5 h-5 text-indigo-500 mb-1" />
                                    <span className="text-sm font-semibold">{beds}</span>
                                    <span className="text-xs text-gray-400">Beds</span>
                                </div>
                            )}
                            {/* Baths */}
                            {baths && (
                                <div className="flex flex-col items-center">
                                    <FaBath className="w-5 h-5 text-indigo-500 mb-1" />
                                    <span className="text-sm font-semibold">{baths}</span>
                                    <span className="text-xs text-gray-400">Baths</span>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Action Button & Location */}
                <div className="flex flex-col items-start gap-3">
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase text-gray-500">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {location}
                    </span>
                    <button
                        className="w-full text-white flex items-center justify-center gap-3 text-base font-semibold transition rounded-lg py-3 px-4 bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/30"
                        onClick={() => console.log(`Viewing details for ${title}`)}
                    >
                        <span>{ctaText}</span>
                        <FaArrowRight className="w-3 h-3 transition duration-200 group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;