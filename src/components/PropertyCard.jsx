// import React from 'react';
// import { FaArrowRight } from "react-icons/fa";

// const PropertyCard = ({ src, alt, title, description = "Premium property details available upon request." }) => (
//     <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-500 overflow-hidden group border border-gray-100">
//         <img
//             src={src}
//             alt={alt}
//             className="w-full h-52 object-cover object-center group-hover:scale-[1.05] transition duration-700"
//             loading="lazy"
//         />
//         <div className="p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
//             <p className="text-gray-600 text-sm mb-4">{description}</p>
            
//             <button className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-sm">
//                 <span>View Details</span> 
//                 <FaArrowRight className="text-xs group-hover:translate-x-1 transition duration-200" />
//             </button>
//         </div>
//     </div>
// );

// export default PropertyCard;



import React from "react";
import { FaArrowRight } from "react-icons/fa";

const PropertyCard = ({
  src,
  alt,
  title,
  description = "Premium property details available upon request.",
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden group border border-gray-100 w-full">
      <img
        src={src}
        alt={alt}
        className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition duration-700"
      />

      <div className="p-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-4">{description}</p>

        <button className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2 text-sm font-semibold">
          <span>View Details</span>
          <FaArrowRight className="group-hover:translate-x-1 transition" />
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
