import React from 'react';
import { FaArrowRight, FaTag, FaCheckCircle, FaTimesCircle, FaClock, FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { DollarSign, MapPin } from 'lucide-react'; // Using Lucide icons for a sleeker look

const PropertyCard = ({
    src,
    alt,
    title,
    description = "Premium property details available upon request.",
    price,
    status,
    // New props for quick features (assuming you update houseData to include these)
    beds = 3,
    baths = 2,
    sqft = "1800",
}) => {

    // --- Status Badge Logic ---
    let statusConfig = {
        text: status,
        icon: FaClock,
        color: 'bg-gray-500',
        textColor: 'text-white',
    };

    switch (status) {
        case 'Available':
            statusConfig = {
                text: 'AVAILABLE',
                icon: FaCheckCircle,
                color: 'bg-green-600', // Stronger green
                textColor: 'text-white',
            };
            break;
        case 'Booked':
            statusConfig = {
                text: 'BOOKED',
                icon: FaClock,
                color: 'bg-yellow-500',
                textColor: 'text-gray-900', // Better contrast on yellow
            };
            break;
        case 'Sold Out':
            statusConfig = {
                text: 'SOLD OUT',
                icon: FaTimesCircle,
                color: 'bg-red-600',
                textColor: 'text-white',
            };
            break;
        default:
            statusConfig = {
                text: status.toUpperCase(),
                icon: FaTag,
                color: 'bg-indigo-500',
                textColor: 'text-white',
            };
    }
    // --- End Status Badge Logic ---


    return (
        <div className="bg-white rounded-xl shadow-2xl hover:shadow-indigo-300/50 transition duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-1 group">

            {/* Image Container with Status Badge */}
            <div className="relative">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-56 object-cover object-center transition duration-700 group-hover:scale-[1.05]"
                    loading="lazy"
                />

                {/* Status Badge - Prominent */}
                <span className={`absolute top-4 right-4 flex items-center gap-1 text-xs font-bold uppercase px-3 py-1.5 rounded-full shadow-lg ${statusConfig.color} ${statusConfig.textColor} transition duration-300`}>
                    <statusConfig.icon className="w-3 h-3" />
                    {statusConfig.text}
                </span>

                {/* Location Tag */}
                <span className="absolute bottom-4 left-4 flex items-center gap-1 text-xs font-semibold uppercase px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-gray-800 shadow-md">
                    <MapPin className="w-3 h-3 text-indigo-500" />
                    TNS Complex
                </span>
            </div>

            <div className="p-6">

                {/* Title and Price */}
                <div className="mb-4">
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-1 leading-snug">
                        {title}
                    </h3>
                    <div className="flex items-center text-indigo-600 font-bold text-lg">
                        <DollarSign className="w-5 h-5 mr-1" />
                        <span className="text-3xl tracking-wide">{price}</span>
                    </div>
                </div>

                {/* Quick Feature Row */}
                <div className="flex justify-start space-x-6 border-b border-gray-100 pb-4 mb-4 text-gray-600">
                    <div className="flex items-center space-x-1.5">
                        <FaBed className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-medium">{beds} Bed</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                        <FaBath className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-medium">{baths} Bath</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                        <FaRulerCombined className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-medium">{sqft} sqft</span>
                    </div>
                </div>


                {/* Description */}
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    {description}
                </p>

                {/* Action Button */}
                <button
                    className="w-full text-indigo-600 hover:text-white flex items-center justify-center gap-3 text-base font-semibold transition focus:outline-none focus:ring-4 focus:ring-indigo-500/50 rounded-lg py-3 px-4 border border-indigo-200 hover:bg-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"
                    onClick={() => console.log(`Viewing details for ${title}`)}
                >
                    <span>Request Floor Plan</span>
                    <FaArrowRight className="w-3 h-3 transition duration-200 group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    );
};

export default PropertyCard;