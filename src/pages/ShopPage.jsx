import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  XMarkIcon,
  SparklesIcon,
  MapPinIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";
import {
  FaRulerCombined,
  FaDoorOpen,
  FaLayerGroup,
} from "react-icons/fa";

/* ================= PROPERTY MODAL (UNCHANGED FORMAT) ================= */
const PropertyModal = ({ property, onClose }) => {
  if (!property) return null;
  const apiUrl = import.meta.env.VITE_API_URL?.trim() || "http://localhost:5000";

  const [formData, setFormData] = useState({
    fullName: "",
    familyType: "",
    numberOfMembers: "",
    phoneNumber: "",
    address: "",
    aadharNumber: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitRequest = async () => {
    try {
      setSubmitting(true);

      await axios.post(`${apiUrl}/api/propertyRequest/create`, {
        property: property.title,
        propertyType: "shop", // or "house"

        applicantDetails: {
          fullName: formData.fullName,
          familyType: formData.familyType,
          numberOfMembers: formData.numberOfMembers,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          aadharNumber: formData.aadharNumber,
        },

        message: formData.message,
      });


      setSuccessMsg("Request submitted successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white max-w-6xl w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]">

        {/* LEFT: IMAGES */}
        <div className="lg:w-1/2 bg-slate-100 overflow-y-auto p-3">
          {property.images?.length ? (
            property.images.map((img, idx) => (
              <img
                key={idx}
                src={`${apiUrl}${img}`}
                className="w-full h-72 object-cover rounded-xl mb-3"
              />
            ))
          ) : (
            <div className="h-96 flex items-center justify-center text-slate-400">
              No Images Available
            </div>
          )}
        </div>

        {/* RIGHT: DETAILS */}
        <div className="lg:w-1/2 p-8 overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <span className="px-4 py-1 rounded-full text-xs font-bold uppercase bg-indigo-100 text-indigo-700">
              Shop
            </span>
            <button onClick={onClose}>
              <XMarkIcon className="w-7 h-7 text-slate-500 hover:text-red-500" />
            </button>
          </div>

          <h2 className="text-3xl font-black mb-1">{property.title}</h2>
          <p className="text-slate-500 flex items-center gap-1 mb-4">
            <MapPinIcon className="w-4 h-4" /> {property.location}
          </p>

          <div className="mb-6">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${property.isAvailable
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                }`}
            >
              {property.isAvailable ? "Available" : "Occupied"}
            </span>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-xs uppercase text-slate-400 font-bold">Rent</p>
              <p className="text-xl font-black text-indigo-600">
                ₹{property.rent}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-xs uppercase text-slate-400 font-bold">
                Deposit
              </p>
              <p className="text-xl font-black">₹{property.deposit}</p>
            </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <FaLayerGroup className="text-indigo-500" />
              <div>
                <p className="text-xs text-slate-400 font-bold">Floor</p>
                <p className="font-semibold">{property.floor}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaDoorOpen className="text-indigo-500" />
              <div>
                <p className="text-xs text-slate-400 font-bold">Door No</p>
                <p className="font-semibold">{property.doorNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaRulerCombined className="text-indigo-500" />
              <div>
                <p className="text-xs text-slate-400 font-bold">Area</p>
                <p className="font-semibold">{property.area} sqft</p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">
              Amenities
            </h4>
            <div className="flex flex-wrap gap-2">
              {property.amenities?.length ? (
                property.amenities.map((a, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-xl"
                  >
                    {a}
                  </span>
                ))
              ) : (
                <p className="text-slate-400 text-sm">
                  No amenities listed
                </p>
              )}
            </div>
          </div>

          {/* ================= PROPERTY REQUEST FORM ================= */}
          <div className="mt-10 border-t pt-8">
            <h3 className="text-lg font-black mb-4 text-slate-800">
              Request This Shop
            </h3>

            {successMsg && (
              <p className="mb-4 text-green-600 font-bold">{successMsg}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="fullName"
                placeholder="Full Name"
                className="border p-3 rounded-xl"
                onChange={handleChange}
              />

              <select
                name="familyType"
                className="border p-3 rounded-xl"
                onChange={handleChange}
              >
                <option value="">Family Type</option>
                <option value="nuclear">Nuclear</option>
                <option value="joint">Joint</option>
                <option value="bachelor">Bachelor</option>
              </select>

              <input
                name="numberOfMembers"
                type="number"
                placeholder="Number of Members"
                className="border p-3 rounded-xl"
                onChange={handleChange}
              />

              <input
                name="phoneNumber"
                placeholder="Phone Number"
                className="border p-3 rounded-xl"
                onChange={handleChange}
              />

              <input
                name="aadharNumber"
                placeholder="Aadhar Number"
                className="border p-3 rounded-xl"
                onChange={handleChange}
              />

              <input
                name="address"
                placeholder="Address"
                className="border p-3 rounded-xl md:col-span-2"
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Message (optional)"
                className="border p-3 rounded-xl md:col-span-2"
                onChange={handleChange}
              />
            </div>

            <button
              disabled={submitting}
              onClick={handleSubmitRequest}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl"
            >
              {submitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ================= SHOPS PAGE (SAME AS HOUSE PAGE) ================= */
const ShopsPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL?.trim() || "http://localhost:5000";
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShop, setSelectedShop] = useState(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/shop/fetchData`);
        setShops(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, [apiUrl]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <HomeModernIcon className="w-12 h-12 text-indigo-500 animate-bounce" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
            Loading Listings...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white p-6 md:p-16">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <SparklesIcon className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
            Find Your Perfect <span className="text-indigo-600">Shop</span>
          </h1>
        </header>

        {/* SAME CARD GRID AS HOUSEPAGE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {shops.map((shop) => (
            <div
              key={shop._id}
              className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={
                    shop.images?.length
                      ? `${apiUrl}${shop.images[0]}`
                      : ""
                  }
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${shop.isAvailable
                        ? "bg-white/90 text-indigo-600"
                        : "bg-red-500 text-white"
                      }`}
                  >
                    {shop.isAvailable ? "Available" : "Occupied"}
                  </span>
                </div>
              </div>

              {/* DETAILS (SAME AS HOUSE) */}
              <div className="p-8 flex-grow">
                <h2 className="text-2xl font-black text-slate-900 line-clamp-1">
                  {shop.title}
                </h2>

                <p className="text-slate-400 text-sm flex items-center gap-1 mt-1 mb-4">
                  <MapPinIcon className="w-4 h-4" /> {shop.location}
                </p>

                {/* RENT + DEPOSIT */}
                <div className="grid grid-cols-2 gap-4 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                      Rent
                    </p>
                    <p className="text-lg font-black text-indigo-600">
                      ₹{shop.rent}
                    </p>
                  </div>
                  <div className="border-l border-slate-200 pl-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                      Deposit
                    </p>
                    <p className="text-lg font-black text-slate-800">
                      ₹{shop.deposit}
                    </p>
                  </div>
                </div>

                {/* AREA */}
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <FaRulerCombined className="text-indigo-500 mx-auto mb-1" />
                    <p className="text-[10px] font-bold text-slate-800">
                      {shop.area} <span className="text-slate-400">Sqft</span>
                    </p>
                  </div>

                  <button
                    disabled={!shop.isAvailable}
                    onClick={() => setSelectedShop(shop)}
                    className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${shop.isAvailable
                        ? "bg-slate-900 text-white hover:bg-indigo-600"
                        : "bg-slate-100 text-slate-300 cursor-not-allowed"
                      }`}
                  >
                    View Shop
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedShop && (
        <PropertyModal
          property={selectedShop}
          onClose={() => setSelectedShop(null)}
        />
      )}
    </div>
  );
};

export default ShopsPage;
