import React, { useEffect, useState } from "react";
import axios from "axios";

const Modal = ({ title, onClose, onSave, children, buttonText, primaryColor }) => (

    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform max-h-[90vh] overflow-hidden flex flex-col transition-all duration-300 ease-in-out">
            <div className={`p-5 border-b flex justify-between items-center bg-white border-${primaryColor}-600`}>
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="p-6 overflow-y-auto">{children}</div>

            <div className="p-5 border-t bg-gray-50 flex justify-end space-x-3">
                <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-lg transition"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    className={`bg-${primaryColor}-600 hover:bg-${primaryColor}-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition`}
                    onClick={onSave}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    </div>
)

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, propertyTitle }) => {
    if (!isOpen) return null;
    return (
        <Modal title="Confirm Delete" onClose={onClose} onSave={onConfirm} buttonText="Yes, Delete Property" primaryColor="red">
            <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                    <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <p className="text-gray-500">
                    Are you sure you want to delete <span className="font-semibold text-gray-800">{propertyTitle}</span>?
                </p>
                <p className="text-sm text-gray-400 mt-1">This action is permanent and cannot be undone.</p>
            </div>
        </Modal>
    );
};

const PropertyManage = () => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editData, setEditData] = useState(null);
    const [filterType, setFilterType] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const [housesRes, shopsRes] = await Promise.all([
                axios.get(`${apiUrl}/house/fetchData`),
                axios.get(`${apiUrl}/shop/fetchData`),
            ]);
            setProperties([...housesRes.data, ...shopsRes.data]);
        } catch (err) {
            console.error("Fetch error", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${apiUrl}/property/delete/${selectedProperty._id}`);
            setProperties(prev => prev.filter(p => p._id !== selectedProperty._id));
            setDeleteModalOpen(false);
            setSelectedProperty(null);
        } catch (err) {
            console.error("Delete error", err);
            alert("Failed to delete property");
        }
    };

    const handleSave = async () => {
        try {
            const payload = {
                ...editData,
                rent: Number(editData.rent),
                deposit: Number(editData.deposit),
                area: Number(editData.area),
                amenities: editData.amenities.map((a) => a.trim()).filter(Boolean),
                images: editData.images,
            };

            if (editData._id) {
                const res = await axios.put(`${apiUrl}/property/update/${editData._id}`, payload);
                setProperties((prev) =>
                    prev.map((p) => (p._id === res.data.property._id ? res.data.property : p))
                );
            } else {
                const res = await axios.post(`${apiUrl}/property/create`, payload);
                setProperties((prev) => [...prev, res.data.property]);
            }
            setEditData(null);
        } catch (err) {
            console.error("Save error", err);
            alert("Failed to save property details.");
        }
    };

    const filteredAndSearchedProperties = properties.filter((p) => {
        const typeMatch = filterType === "all" || p.propertyType === filterType;
        const searchLower = searchTerm.toLowerCase().trim();
        const searchMatch =
            searchLower === "" ||
            p.title.toLowerCase().includes(searchLower) ||
            p.location.toLowerCase().includes(searchLower) ||
            p.propertyType.toLowerCase().includes(searchLower);
        return typeMatch && searchMatch;
    });

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <p className="text-teal-600 font-semibold animate-pulse">Loading property directory...</p>
        </div>
    );

    return (
        <div className="min-h-screen">
            <div className="mx-auto">
                {/* Header Section */}
                <header className="bg-white p-6 rounded-t-xl shadow-md border-b-4 border-teal-600">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
                            🏠 Property Management
                        </h2>
                        <button
                            className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-md transition duration-200 transform hover:scale-[1.02]"
                            onClick={() =>
                                setEditData({
                                    title: "",
                                    propertyType: "house",
                                    rent: "",
                                    deposit: "",
                                    area: "",
                                    location: "",
                                    amenities: [],
                                    images: [],
                                    isAvailable: true,
                                })
                            }
                        >
                            + New Property
                        </button>
                    </div>
                </header>

                {/* Filter & Search Section */}
                <div className="bg-white p-6 shadow-md mb-6 border-t-2 border-gray-200 rounded-b-xl">
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="w-full md:w-1/3">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Search Assets: : </label>
                            <input
                                type="text"
                                placeholder="🔍 Search by Title, Location, or Type..."
                                className="w-full border-gray-300 focus:border-teal-500 focus:ring-teal-500 p-3 rounded-lg shadow-sm transition duration-150 text-gray-700"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="w-full md:w-1/4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type: : </label>
                            <select
                                className="w-full border-gray-300 focus:border-teal-500 focus:ring-teal-500 p-3 rounded-lg shadow-sm transition duration-150 text-gray-700"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="all">All Properties</option>
                                <option value="house">Houses</option>
                                <option value="shop">Shops</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="shadow-lg overflow-x-auto border border-gray-200 rounded-lg mb-8">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pricing (Rent/Dep)</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Area (sqft)</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredAndSearchedProperties.length > 0 ? (
                                filteredAndSearchedProperties.map((p, index) => (
                                    <tr key={p._id} className={index % 2 === 0 ? "bg-white hover:bg-teal-50 transition duration-150" : "bg-gray-50 hover:bg-teal-50 transition duration-150"}>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{p.title}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.propertyType === 'house' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                                                {p.propertyType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="font-semibold text-gray-800">₹{p.rent}</div>
                                            <div className="text-xs text-gray-400">Dep: ₹{p.deposit}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{p.area}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{p.location}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${p.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {p.isAvailable ? "Available" : "Occupied"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center text-sm font-medium space-x-2">
                                            <button
                                                onClick={() => setEditData(p)}
                                                className="text-teal-600 hover:text-teal-800 bg-teal-100 px-3 py-1 rounded-md text-xs font-semibold shadow-sm transition hover:shadow-md"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedProperty(p);
                                                    setDeleteModalOpen(true);
                                                }}
                                                className="text-red-600 hover:text-red-800 bg-red-100 px-3 py-1 rounded-md text-xs font-semibold shadow-sm transition hover:shadow-md"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-6 text-center text-gray-500 italic">No properties matching your criteria.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Edit/Add Modal */}
                {editData && (
                    <Modal
                        title={editData._id ? "✏️ Edit Property Details" : "➕ Add New Property"}
                        onClose={() => setEditData(null)}
                        onSave={handleSave}
                        primaryColor="teal"
                        buttonText={editData._id ? "Update Property" : "Create Listing"}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-6">
                            <div className="col-span-1 md:col-span-2 flex flex-col space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Property Type : </label>
                                <select
                                    className="w-full h-11 bg-white border border-gray-300 rounded-lg px-4 text-gray-800 focus:ring-2 focus:ring-teal-500 outline-none transition"
                                    value={editData.propertyType}
                                    onChange={(e) => setEditData({ ...editData, propertyType: e.target.value })}
                                >
                                    <option value="house">House</option>
                                    <option value="shop">Shop</option>
                                </select>
                            </div>
                            {[
                                ["Title", "title", "text"],
                                ["Rent (₹)", "rent", "number"],
                                ["Deposit (₹)", "deposit", "number"],
                                ["Area (sqft)", "area", "number"],
                                ["Location", "location", "text"],
                            ].map(([label, key, type]) => (
                                <div key={key} className="flex flex-col space-y-2">
                                    <label
                                        htmlFor={`prop-${key}`}
                                        className="text-sm font-semibold text-gray-700 ml-1"
                                    >
                                        {label} :
                                    </label>
                                    <input
                                        type={type}
                                        id={`prop-${key}`}
                                        className="w-full h-11 bg-white border border-gray-300 rounded-lg px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                                        value={editData[key] ?? ""}
                                        onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                                    />
                                </div>
                            ))}

                            {/* Availability Status Select */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Availability Status : </label>
                                <select
                                    className="w-full h-11 bg-white border border-gray-300 rounded-lg px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                                    value={editData.isAvailable.toString()}
                                    onChange={(e) => setEditData({ ...editData, isAvailable: e.target.value === "true" })}
                                >
                                    <option value="true">Available</option>
                                    <option value="false">Occupied / Not Available</option>
                                </select>
                            </div>

                            {/* Amenities Textarea */}
                            <div className="col-span-1 md:col-span-2 flex flex-col space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Amenities : </label>
                                <textarea
                                    className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-teal-500 outline-none transition"
                                    rows="2"
                                    value={editData.amenities.join(", ")}
                                    placeholder="e.g. Parking, WiFi, Security"
                                    onChange={(e) => setEditData({ ...editData, amenities: e.target.value.split(",").map((a) => a.trim()) })}
                                />
                            </div>

                            {/* Image Upload Section */}
                            <div className="col-span-1 md:col-span-2 flex flex-col space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Property Images : </label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files);
                                        Promise.all(files.map(file => new Promise((res, rej) => {
                                            const reader = new FileReader();
                                            reader.onload = () => res(reader.result);
                                            reader.onerror = rej;
                                            reader.readAsDataURL(file);
                                        }))).then(imgs => setEditData({ ...editData, images: imgs }));
                                    }}
                                />
                                <div className="flex flex-wrap mt-2 gap-3">
                                    {editData.images?.map((img, idx) => (
                                        <div key={idx} className="relative group">
                                            <img src={img} alt="preview" className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}

                <DeleteConfirmationModal
                    isOpen={deleteModalOpen}
                    onClose={() => {
                        setDeleteModalOpen(false);
                        setSelectedProperty(null);
                    }}
                    onConfirm={handleDelete}
                    propertyTitle={selectedProperty?.title}
                />

            </div>
        </div>
    );
};

export default PropertyManage;