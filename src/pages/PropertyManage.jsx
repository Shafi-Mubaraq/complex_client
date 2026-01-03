


import React, { useEffect, useState } from "react";
import axios from "axios";
// Added missing icons: Search, UserPlus
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
                axios.get(`${apiUrl}/api/shop/fetchData`),
            ]);
            setProperties([...housesRes.data, ...shopsRes.data]);
        } catch (err) {
            console.error("Fetch error", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();

            // Append basic fields
            Object.keys(editData).forEach(key => {
                if (key === 'amenities' && Array.isArray(editData[key])) {
                    formData.append(key, editData[key].join(","));
                } else if (key !== 'images') {
                    formData.append(key, editData[key]);
                }
            });

            // Append files
            selectedFiles.forEach((file) => {
                formData.append("images", file);
            });

            const config = { headers: { "Content-Type": "multipart/form-data" } };
            let res;

            if (editData._id) {
                res = await axios.put(`${apiUrl}/api/property/update/${editData._id}`, formData, config);
                setProperties(prev => prev.map(p => p._id === res.data.property._id ? res.data.property : p));
            } else {
                res = await axios.post(`${apiUrl}/api/property/create`, formData, config);
                setProperties(prev => [...prev, res.data.property]);
            }

            setEditData(null);
            setSelectedFiles([]);
        } catch (err) {
            console.error("SAVE ERROR:", err.response?.data || err.message);
            alert("Save failed: " + (err.response?.data?.message || "Unknown error"));
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${apiUrl}/api/property/delete/${selectedProperty._id}`);
            setProperties(prev => prev.filter(p => p._id !== selectedProperty._id));
            setDeleteModalOpen(false);
            setSelectedProperty(null);
        } catch (err) {
            console.error("Delete error", err);
            alert("Failed to delete property");
        }
    };

    const filteredProperties = properties.filter((p) => {
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
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 mb-6 shadow-sm">
                <div className="relative w-full md:w-80 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search properties..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button
                    onClick={() => setEditData({
                        title: "", propertyType: "House", rent: "", deposit: "",
                        floor: "", doorNumber: "", area: "", location: "",
                        isAvailable: true, amenities: []
                    })}
                    className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                    <UserPlus size={16} />
                    Register New Property
                </button>
            </div>

            <PropertyTable
                properties={filteredProperties}
                onEdit={(p) => { setEditData(p); setExistingImages(p.images || []); }}
                onDelete={(p) => { setSelectedProperty(p); setDeleteModalOpen(true); }}
            />

            {editData && (
                <PropertyModal
                    editData={editData}
                    setEditData={setEditData}
                    onSave={handleSave}
                    onClose={() => setEditData(null)}
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                    existingImages={existingImages}
                />
            )}

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