import React from "react";
import { X, Building2, Save, Database, ShieldCheck, PlusCircle, Image as ImageIcon } from "lucide-react";

const PROPERTY_KEYS = ["title", "propertyType", "rent", "deposit", "floor", "doorNumber", "area", "location"];

const PropertyModal = ({ editData, setEditData, onSave, onClose, selectedFiles, setSelectedFiles, existingImages }) => {

    if (!editData) return null;

    const isAddMode = !editData._id;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
    };

    const formatLabel = (key) => key.replace(/([A-Z])/g, " $1").trim();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

            {/* Modal Container */}
            <div className="relative bg-white w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="shrink-0 px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                            {isAddMode ? <PlusCircle size={22} /> : <Building2 size={22} />}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                                {isAddMode ? 'New Property Registration' : 'Update Property Details'}
                            </h3>
                            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mt-0.5">
                                Real Estate Asset Management
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all">
                        <X size={22} />
                    </button>
                </div>

                {/* Form Body */}
                <form className="flex-1 p-8 md:p-10 bg-white overflow-y-auto hide-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {PROPERTY_KEYS.map((key) => {
                            const isFullWidth = key === 'title' || key === 'location';
                            return (
                                <div key={key} className={isFullWidth ? 'md:col-span-2' : ''}>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-3 ml-1">
                                        {formatLabel(key)} :
                                    </label>

                                    {key === "propertyType" ? (
                                        <select
                                            name="propertyType"
                                            value={editData.propertyType || "house"}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 outline-none placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/5"
                                        >
                                            <option value="house">House</option>
                                            <option value="shop">Shop</option>
                                        </select>
                                    ) : (
                                        <input
                                            type={['rent', 'deposit', 'floor', 'area'].includes(key) ? "number" : "text"}
                                            name={key}
                                            value={editData[key] || ""}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 outline-none placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/5"
                                        />
                                    )}
                                </div>
                            );
                        })}

                        {/* Image Upload Section */}
                        <div className="md:col-span-2 space-y-4">
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide ml-1">Property Media :</label>

                            <div className="flex flex-wrap gap-4 items-center p-4 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
                                <label className="flex flex-col items-center justify-center w-24 h-24 rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 text-indigo-600 cursor-pointer hover:bg-indigo-50 transition-colors">
                                    <ImageIcon size={24} />
                                    <span className="text-[10px] font-black mt-2 uppercase">Add Files</span>
                                    <input type="file" multiple onChange={handleFileChange} className="hidden" />
                                </label>

                                {/* Preview New Images */}
                                {selectedFiles.length > 0 && (
                                    <div className="flex flex-wrap gap-4 mt-4">
                                        {selectedFiles.map((file, index) => (
                                            <img
                                                key={index}
                                                src={URL.createObjectURL(file)}
                                                alt="preview"
                                                className="w-24 h-24 object-cover rounded-xl border"
                                            />
                                        ))}
                                    </div>
                                )}

                                {!isAddMode && existingImages?.length > 0 && (
                                    <div className="flex flex-wrap gap-4 mt-4">
                                        {existingImages.map((img, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={`${import.meta.env.VITE_API_URL}${img}`}
                                                    alt="existing"
                                                    className="w-24 h-24 object-cover rounded-xl border"
                                                />

                                                {/* ❌ Remove Image Button */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setExistingImages(prev =>
                                                            prev.filter((_, i) => i !== index)
                                                        )
                                                    }
                                                    className="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full p-1 shadow"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* Availability Toggle */}
                        <div className="md:col-span-2 flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <input
                                type="checkbox"
                                name="isAvailable"
                                id="isAvailable"
                                checked={editData.isAvailable || false}
                                onChange={handleChange}
                                className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
                            />
                            <label htmlFor="isAvailable" className="text-xs font-bold text-slate-700 uppercase tracking-widest cursor-pointer select-none">
                                Currently Available for Rent
                            </label>
                        </div>
                    </div>

                    {/* Infrastructure Badges */}
                    <div className="mt-10 flex items-center gap-6 px-2">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Database size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Asset Sync</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <ShieldCheck size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Verified Listing</span>
                        </div>
                    </div>
                </form>

                {/* Action Footer */}
                <div className="shrink-0 px-8 py-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-slate-500 hover:text-slate-800 uppercase tracking-widest transition-colors"
                    >
                        Discard Changes
                    </button>
                    <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); onSave(); }}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-indigo-200 active:scale-95"
                    >
                        {isAddMode ? <PlusCircle size={18} /> : <Save size={18} />}
                        {isAddMode ? 'Register Asset' : 'Save Updates'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyModal;