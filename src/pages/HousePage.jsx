import React, { useEffect, useState } from "react";
import axios from "axios";
import { XMarkIcon, SparklesIcon, HomeModernIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { FaBed, FaBath, FaRulerCombined, FaCheckCircle, FaTimesCircle, FaArrowRight, FaDoorOpen, FaLayerGroup } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/* ================= 1. PURE WHITE POPUP MODAL ================= */



const PropertyModal = ({ house, onClose }) => {
    const navigate = useNavigate();
    if (!house) return null;

    const apiUrl = import.meta.env.VITE_API_URL?.trim() || "http://localhost:5000";

    const [form, setForm] = useState({
        fullName: "",
        familyType: "",
        numberOfMembers: "",
        phoneNumber: "",
        address: "",
        aadharNumber: "",
        message: "",
    });

    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const submitRequest = async () => {
        setStatus("");

        if (
            !form.fullName ||
            !form.familyType ||
            !form.numberOfMembers ||
            !form.phoneNumber ||
            !form.address ||
            !form.aadharNumber
        ) {
            setStatus("error");
            return;
        }

        try {
            setLoading(true);
            await axios.post(`${apiUrl}/api/propertyRequest/create`, {
                property: house.title,
                propertyType: "house",
                applicantDetails: form,
                message: form.message,
            });

            setStatus("success");
            setForm({
                fullName: "",
                familyType: "",
                numberOfMembers: "",
                phoneNumber: "",
                address: "",
                aadharNumber: "",
                message: "",
            });

            setTimeout(() => navigate("/Dashboard"), 1200);
        } catch (err) {
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[92vh]">

                {/* LEFT – IMAGE PREVIEW */}
                <div className="lg:w-1/2 bg-slate-100 overflow-y-auto p-4">
                    {house.images?.length ? (
                        house.images.map((img, i) => (
                            <img
                                key={i}
                                src={`${apiUrl}${img}`}
                                className="w-full h-72 object-cover rounded-2xl mb-4"
                            />
                        ))
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-400">
                            No Images Available
                        </div>
                    )}
                </div>

                {/* RIGHT – DETAILS */}
                <div className="lg:w-1/2 flex flex-col overflow-y-auto">

                    {/* HEADER */}
                    <div className="sticky top-0 z-10 bg-white border-b p-6 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-black">{house.title}</h2>
                            <p className="text-slate-500 flex items-center gap-1 text-sm">
                                <MapPinIcon className="w-4 h-4" /> {house.location}
                            </p>
                        </div>
                        <button onClick={onClose}>
                            <XMarkIcon className="w-7 h-7 text-slate-500 hover:text-red-500" />
                        </button>
                    </div>

                    {/* CONTENT */}
                    <div className="p-8">

                        {/* TOP 10 FIELDS – UNCHANGED */}
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <Info label="Status" value={house.isAvailable ? "Available" : "Occupied"} />
                            <Info label="Property Type" value={house.propertyType} />
                            <Info label="Rent" value={`₹${house.rent}`} highlight />
                            <Info label="Deposit" value={`₹${house.deposit}`} />
                            <Info label="Floor" value={house.floor} />
                            <Info label="Door No" value={house.doorNumber} />
                            <Info label="Area" value={`${house.area} sqft`} />
                            <Info label="Location" value={house.location} />
                            <Info label="Amenities" value={house.amenities?.length || 0} />
                            <Info label="Availability" value={house.isAvailable ? "Yes" : "No"} />
                        </div>

                        {/* DESCRIPTION */}
                        {house.description && (
                            <div className="mb-10">
                                <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">
                                    Description
                                </h4>
                                <p className="text-slate-600 leading-relaxed">
                                    {house.description}
                                </p>
                            </div>
                        )}

                        {/* REQUEST FORM */}
                        {house.isAvailable && (
                            <div className="border-t pt-8">
                                <h3 className="text-xl font-black mb-6">
                                    Property Request Form
                                </h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <Input name="fullName" placeholder="Full Name *" value={form.fullName} onChange={handleChange} />
                                    <select className="input" name="familyType" value={form.familyType} onChange={handleChange}>
                                        <option value="">Family Type *</option>
                                        <option value="nuclear">Nuclear</option>
                                        <option value="joint">Joint</option>
                                        <option value="bachelor">Bachelor</option>
                                    </select>
                                    <Input name="numberOfMembers" placeholder="Members *" value={form.numberOfMembers} onChange={handleChange} />
                                    <Input name="phoneNumber" placeholder="Phone *" value={form.phoneNumber} onChange={handleChange} />
                                </div>

                                <Input className="mt-4" name="address" placeholder="Address *" value={form.address} onChange={handleChange} />
                                <Input className="mt-4" name="aadharNumber" placeholder="Aadhar *" value={form.aadharNumber} onChange={handleChange} />

                                <textarea
                                    className="input mt-4"
                                    name="message"
                                    placeholder="Message (Optional)"
                                    value={form.message}
                                    onChange={handleChange}
                                />

                                {/* RESPONSE VIEW */}
                                {status && (
                                    <div className={`mt-5 p-4 rounded-xl font-semibold flex gap-2 ${
                                        status === "success"
                                            ? "bg-green-50 text-green-700"
                                            : "bg-red-50 text-red-700"
                                    }`}>
                                        {status === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
                                        {status === "success"
                                            ? "Request submitted successfully!"
                                            : "Please fill all required fields."}
                                    </div>
                                )}

                                <button
                                    onClick={submitRequest}
                                    disabled={loading}
                                    className={`mt-6 w-full py-4 rounded-2xl font-black flex justify-center items-center gap-2 ${
                                        loading
                                            ? "bg-gray-300"
                                            : "bg-indigo-600 hover:bg-indigo-700 text-white"
                                    }`}
                                >
                                    {loading ? "Submitting..." : "Send Request"}
                                    {!loading && <FaArrowRight />}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* SMALL REUSABLE COMPONENTS */
const Info = ({ label, value, highlight }) => (
    <div className="bg-slate-50 p-4 rounded-xl">
        <p className="text-xs uppercase text-slate-400 font-bold">{label}</p>
        <p className={`font-black ${highlight ? "text-indigo-600 text-lg" : ""}`}>
            {value}
        </p>
    </div>
);

const Input = (props) => (
    <input {...props} className={`input ${props.className || ""}`} />
);






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
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${house.isAvailable ? "bg-white/90 text-indigo-600 shadow-xl" : "bg-red-500 text-white"
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

                                    </div>

                                    <button
                                        disabled={!house.isAvailable}
                                        onClick={() => setSelectedHouse(house)}
                                        className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${house.isAvailable
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