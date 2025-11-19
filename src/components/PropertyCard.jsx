            import React from 'react';
import { FaArrowRight } from "react-icons/fa";

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

export default PropertyCard;