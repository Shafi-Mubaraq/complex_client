import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, UserPlus } from "lucide-react";
import PropertyTable from "../components/PropertyManagement/PropertyTable";
import PropertyModal from "../components/PropertyManagement/PropertyModal";
import DeleteModal from "../components/PropertyManagement/DeleteModal";

const PropertyManage = () => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editData, setEditData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [existingImages, setExistingImages] = useState([]);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const [housesRes, shopsRes] = await Promise.all([
                axios.get(`${apiUrl}/api/house/fetchData`),
                axios.get(`${apiUrl}/api/shop/fetchData`)
            ]);
            setProperties([...housesRes.data, ...shopsRes.data]);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally { setLoading(false) }
    };

    const handleSave = async () => {

        try {

            const formData = new FormData();
            formData.append("title", editData.title);
            formData.append("propertyType", editData.propertyType === "shop" ? "shop" : "house");
            formData.append("rent", Number(editData.rent) || 0);
            formData.append("deposit", Number(editData.deposit) || 0);
            formData.append("floor", editData.floor || "");
            formData.append("doorNumber", editData.doorNumber || "");
            formData.append("area", Number(editData.area) || 0);
            formData.append("location", editData.location);
            formData.append("isAvailable", editData.isAvailable);
            formData.append("amenities", Array.isArray(editData.amenities) ? editData.amenities.join(",") : "");
            formData.append("existingImages", JSON.stringify(existingImages || []));
            selectedFiles.forEach(file => { formData.append("images", file) });
            const config = { headers: { "Content-Type": "multipart/form-data" } };
            let res;
            if (editData._id) {
                res = await axios.put(`${apiUrl}/api/property/update/${editData._id}`, formData, config);
                setProperties(prev => prev.map(p => p._id === res.data.property._id ? res.data.property : p));
            } else {
                res = await axios.post(`${apiUrl}/api/property/create`, formData, config);
                setProperties(prev => [res.data.property, ...prev]);
            }
            setEditData(null);
            setSelectedFiles([]);
            setExistingImages([]);
            alert("Success! Property Registered.");
        } catch (err) {
            console.error("Error details:", err.response?.data);
            alert(err.response?.data?.message || "Check if Title, Rent, and Location are filled correctly.");
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${apiUrl}/api/property/delete/${selectedProperty._id}`);
            setProperties(prev => prev.filter(p => p._id !== selectedProperty._id));
            setDeleteModalOpen(false);
            setSelectedProperty(null);
        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete property");
        }
    };

    const filteredProperties = properties.filter(p => {
        const searchLower = searchTerm.toLowerCase();
        return (
            p.title?.toLowerCase().includes(searchLower) ||
            p.location?.toLowerCase().includes(searchLower) ||
            p.propertyType?.toLowerCase().includes(searchLower)
        );
    });

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="ml-3 text-indigo-600 font-semibold">Loading directory...</p>
        </div>
    );

    return (
        <div className="space-y-6 bg-white min-h-screen p-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                {/* Search */}
                <div className="relative w-full md:w-80 group">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Search directory..."
                        className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Add Property Button */}
                <button
                    onClick={() => setEditData({
                        title: "",
                        propertyType: "house",
                        rent: "",
                        deposit: "",
                        floor: "",
                        doorNumber: "",
                        area: "",
                        location: "",
                        isAvailable: true,
                        amenities: [],
                    })}
                    className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-[0.15em] px-6 py-3 rounded-xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                    <UserPlus size={16} /> Register New Property
                </button>
            </div>

            {/* Property Table */}
            <PropertyTable
                properties={filteredProperties}
                onEdit={p => {
                    setEditData(p);
                    setExistingImages(p.images || []);
                }}
                onDelete={p => {
                    setSelectedProperty(p);
                    setDeleteModalOpen(true);
                }}
            />

            {/* Property Modal */}
            {editData && (
                <PropertyModal
                    editData={editData}
                    setEditData={setEditData}
                    onSave={handleSave}
                    onClose={() => setEditData(null)}
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                    existingImages={existingImages}
                    setExistingImages={setExistingImages}
                />
            )}

            {/* Delete Modal */}
            <DeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                propertyTitle={selectedProperty?.title}
            />
        </div>
    );
};

export default PropertyManage;
