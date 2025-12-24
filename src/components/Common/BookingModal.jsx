// import React from "react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// import { MapPin } from "lucide-react";
// import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";

// const BookingModal = ({ open, onClose, property, onConfirm }) => {
//     if (!open || !property) return null;

//     const {
//         src,
//         images,
//         title,
//         description,
//         rent,
//         price,
//         deposit,
//         area,
//         sqft,
//         beds,
//         baths,
//         location,
//     } = property;

//     const finalPrice = price ?? rent;
//     const finalArea = sqft ?? area;

//     const formattedPrice =
//         typeof finalPrice === "number"
//             ? new Intl.NumberFormat("en-IN", {
//                   style: "currency",
//                   currency: "INR",
//                   maximumFractionDigits: 0,
//               }).format(finalPrice)
//             : finalPrice;

//     const formattedDeposit =
//         typeof deposit === "number"
//             ? new Intl.NumberFormat("en-IN", {
//                   style: "currency",
//                   currency: "INR",
//                   maximumFractionDigits: 0,
//               }).format(deposit)
//             : null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
//             <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl relative overflow-hidden animate-fadeIn">

//                 {/* Close Button */}
//                 <button
//                     onClick={onClose}
//                     className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 z-10"
//                 >
//                     <XMarkIcon className="w-6 h-6" />
//                 </button>

//                 {/* Image */}
//                 <img
//                     src={src || images?.[0]}
//                     alt={title}
//                     className="w-full h-56 sm:h-64 object-cover"
//                 />

//                 {/* Content */}
//                 <div className="p-6 sm:p-8 space-y-6">

//                     {/* Title */}
//                     <div>
//                         <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
//                             {title}
//                         </h2>
//                         <p className="text-gray-500 mt-2">{description}</p>
//                     </div>

//                     {/* Info Grid */}
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700">

//                         <div className="font-semibold">
//                             Price
//                             <div className="text-gray-900">{formattedPrice}</div>
//                         </div>

//                         {formattedDeposit && (
//                             <div className="font-semibold">
//                                 Deposit
//                                 <div className="text-gray-900">{formattedDeposit}</div>
//                             </div>
//                         )}

//                         {finalArea && (
//                             <div className="font-semibold">
//                                 Area
//                                 <div className="text-gray-900">{finalArea} Sqft</div>
//                             </div>
//                         )}

//                         {beds && (
//                             <div className="flex items-center gap-2">
//                                 <FaBed className="text-indigo-500" />
//                                 <span>{beds} Beds</span>
//                             </div>
//                         )}

//                         {baths && (
//                             <div className="flex items-center gap-2">
//                                 <FaBath className="text-indigo-500" />
//                                 <span>{baths} Baths</span>
//                             </div>
//                         )}

//                         {location && (
//                             <div className="flex items-center gap-2 col-span-2 sm:col-span-3">
//                                 <MapPin className="w-4 h-4 text-indigo-500" />
//                                 <span>{location}</span>
//                             </div>
//                         )}
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                         <button
//                             onClick={onConfirm}
//                             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-500/30 transition"
//                         >
//                             Confirm Booking
//                         </button>

//                         <button
//                             onClick={onClose}
//                             className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl transition"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BookingModal;