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
import { useNavigate } from "react-router-dom";

/* ================= PROPERTY MODAL (UNCHANGED FORMAT) ================= */
const PropertyModal = ({ property, onClose }) => {
    const navigate = useNavigate();
    if (!property) return null;

    const apiUrl = import.meta.env.VITE_API_URL?.trim() || "http://localhost:5000";

    /* ================= STATE (FORM ONLY) ================= */
    const [formData, setFormData] = useState({
        fullName: "",
        familyType: "",
        numberOfMembers: "",
        phoneNumber: "",
        address: "",
        aadharNumber: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    /* ================= HANDLE CHANGE ================= */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
        setErrorMsg("");
    };

    /* ================= VALIDATION (FORM ONLY) ================= */
    const validateForm = () => {
        let temp = {};

        if (!formData.fullName.trim()) temp.fullName = "Required";
        if (!formData.familyType) temp.familyType = "Required";
        if (!formData.numberOfMembers) temp.numberOfMembers = "Required";
        if (!formData.phoneNumber.trim()) temp.phoneNumber = "Required";
        if (!formData.aadharNumber.trim()) temp.aadharNumber = "Required";
        if (!formData.address.trim()) temp.address = "Required";
        if (!formData.message.trim()) temp.message = "Required";

        setErrors(temp);
        return Object.keys(temp).length === 0;
    };

    /* ================= SUBMIT ================= */
    const handleSubmitRequest = async () => {
        if (!validateForm()) {
            setErrorMsg("Please fill all required fields");
            return;
        }

        try {
            setSubmitting(true);

            await axios.post(`${apiUrl}/api/propertyRequest/create`, {
                property: property.title,
                propertyType: "shop",
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
            setFormData({
                fullName: "",
                familyType: "",
                numberOfMembers: "",
                phoneNumber: "",
                address: "",
                aadharNumber: "",
                message: "",
            });
            navigate("/Dashboard");
            setErrors({});
        } catch (err) {
            console.error(err);
            setErrorMsg("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    /* ================= UI ================= */
    return (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white max-w-6xl w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]">

                {/* LEFT IMAGES */}
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

                {/* RIGHT DETAILS */}
                <div className="lg:w-1/2 p-8 overflow-y-auto">

                    {/* HEADER */}
                    <div className="flex justify-between items-start mb-6">
                        <span className="px-4 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
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

                    {/* AVAILABILITY */}
                    <div className="mb-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold
              ${property.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {property.isAvailable ? "Available" : "Occupied"}
                        </span>
                    </div>

                    {/* PRICING */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-50 p-4 rounded-xl">
                            <p className="text-xs text-slate-400 font-bold">RENT</p>
                            <p className="text-xl font-black text-indigo-600">₹{property.rent}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl">
                            <p className="text-xs text-slate-400 font-bold">DEPOSIT</p>
                            <p className="text-xl font-black">₹{property.deposit}</p>
                        </div>
                    </div>

                    {/* INFO */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <Info icon={<FaLayerGroup />} label="Floor" value={property.floor} />
                        <Info icon={<FaDoorOpen />} label="Door No" value={property.doorNumber} />
                        <Info icon={<FaRulerCombined />} label="Area" value={`${property.area} sqft`} />
                    </div>

                    {/* AMENITIES */}
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
                                <p className="text-slate-400 text-sm">No amenities listed</p>
                            )}
                        </div>
                    </div>

                    {/* ================= REQUEST FORM (ONLY CHANGED PART) ================= */}
                    <div className="border-t pt-8">
                        <h3 className="text-lg font-black mb-4">Request This Shop</h3>

                        {successMsg && <p className="text-green-600 font-bold mb-3">{successMsg}</p>}
                        {errorMsg && <p className="text-red-600 font-bold mb-3">{errorMsg}</p>}

                        <FormInput name="fullName" placeholder="Full Name *" value={formData.fullName} onChange={handleChange} error={errors.fullName} />
                        <FormSelect value={formData.familyType} onChange={handleChange} error={errors.familyType} />
                        <FormInput name="numberOfMembers" placeholder="Number of Members *" value={formData.numberOfMembers} onChange={handleChange} error={errors.numberOfMembers} />
                        <FormInput name="phoneNumber" placeholder="Phone Number *" value={formData.phoneNumber} onChange={handleChange} error={errors.phoneNumber} />
                        <FormInput name="aadharNumber" placeholder="Aadhar Number *" value={formData.aadharNumber} onChange={handleChange} error={errors.aadharNumber} />
                        <FormInput name="address" placeholder="Address *" value={formData.address} onChange={handleChange} error={errors.address} />
                        <FormInput name="message" placeholder="Message *" value={formData.message} onChange={handleChange} error={errors.message} />

                        <button
                            disabled={submitting}
                            onClick={handleSubmitRequest}
                            className={`mt-6 w-full py-4 rounded-2xl font-bold text-white
                ${submitting ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
                        >
                            {submitting ? "Submitting..." : "Submit Request"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

/* ================= SMALL COMPONENTS ================= */

const Info = ({ icon, label, value }) => (
    <div className="flex items-center gap-3">
        <span className="text-indigo-500">{icon}</span>
        <div>
            <p className="text-xs text-slate-400 font-bold">{label}</p>
            <p className="font-semibold">{value}</p>
        </div>
    </div>
);

const FormInput = ({ name, placeholder, value, onChange, error }) => (
    <div className="mb-3">
        <input
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className={`w-full border p-3 rounded-xl ${error && "border-red-500"}`}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
);

const FormSelect = ({ value, onChange, error }) => (
    <div className="mb-3">
        <select
            name="familyType"
            value={value}
            onChange={onChange}
            className={`w-full border p-3 rounded-xl ${error && "border-red-500"}`}
        >
            <option value="">Family Type *</option>
            <option value="nuclear">Nuclear</option>
            <option value="joint">Joint</option>
            <option value="bachelor">Bachelor</option>
        </select>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
);












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
