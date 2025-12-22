import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { MapPinIcon, HomeIcon, CurrencyRupeeIcon } from "@heroicons/react/24/outline";

const PropertyModal = ({ open, onClose, property, type }) => {
  if (!open || !property) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {type === "waitlist" ? "Join Waitlist" : "Property Details"}
          </h2>
          <button onClick={onClose}>
            <XMarkIcon className="w-7 h-7 text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">

          {/* Title */}
          <div>
            <h3 className="text-xl font-semibold">{property.title}</h3>
            <p className="text-gray-500">{property.description}</p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
            <Info icon={<HomeIcon />} label="Area" value={`${property.area} Sqft`} />
            <Info icon={<CurrencyRupeeIcon />} label="Rent" value={`₹${property.rent?.toLocaleString()}`} />
            <Info icon={<CurrencyRupeeIcon />} label="Deposit" value={`₹${property.deposit?.toLocaleString()}`} />
            <Info label="Beds" value={property.beds} />
            <Info label="Baths" value={property.baths} />
            <Info icon={<MapPinIcon />} label="Location" value={property.location} />
          </div>

          {/* Action */}
          {type !== "waitlist" ? (
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg">
              Confirm Booking Request
            </button>
          ) : (
            <button className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-xl">
              Join Waitlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Info = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    {icon && <span className="text-indigo-500 w-5 h-5">{icon}</span>}
    <div>
      <p className="text-gray-400 text-xs uppercase">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

export default PropertyModal;
