import React from "react";
import { X, ShieldCheck, Save, Database, UserPlus, Fingerprint } from "lucide-react";

const INITIAL_USER_KEYS = [
    "fullName", "email", "password", "aadhar",
    "mobile", "additionalNumber", "city", "state"
];

const UserModal = ({ isOpen, onClose, data, onSave, onChange, errors, isAddMode }) => {

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave();
    };

    const formatLabel = (key) => key.replace(/([A-Z])/g, " $1").trim();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

            {/* Modal Container */}
            <div className="relative bg-white w-full max-w-3xl max-h-[80vh] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col animate-in fade-in zoom-in duration-200">

                {/* Header: Clean & Integrated */}
                <div className="shrink-0 px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                            {isAddMode ? <UserPlus size={22} /> : <Fingerprint size={22} />}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                                {isAddMode ? 'Create New User Account' : 'Edit Account Details'}
                            </h3>
                            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mt-0.5">
                                Enterprise Identity Management
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all">
                        <X size={22} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 p-8 md:p-10 bg-white overflow-y-auto hide-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {INITIAL_USER_KEYS.map((key) => {
                            const isRequired = key !== 'additionalNumber';
                            const isFullWidth = key === 'fullName' || key === 'email';
                            return (
                                <div key={key} className={isFullWidth ? 'md:col-span-2' : ''}>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-3 ml-1">
                                        {formatLabel(key)} :
                                        {isRequired && <span className="text-rose-500 ml-1">*</span>}
                                    </label>

                                    <div className="relative">
                                        <input
                                            type={key === 'password' ? 'password' : 'text'}
                                            name={key}
                                            value={data[key] || ""}
                                            onChange={onChange}
                                            className={`
                                                w-full bg-slate-50 border rounded-xl px-4 py-3.5 text-sm font-medium
                                                transition-all duration-200 outline-none placeholder:text-slate-400
                                                ${errors[key]
                                                    ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5'
                                                    : 'border-slate-200 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/5'}
                                            `}
                                        />
                                        {errors[key] && (
                                            <p className="mt-2 ml-1 text-[11px] font-medium text-rose-500 animate-in slide-in-from-top-1">
                                                {errors[key]}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Infrastructure Badges for extra detail */}
                    <div className="mt-10 flex items-center gap-6 px-2">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Database size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Secure Sync</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <ShieldCheck size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Identity Verified</span>
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
                        onClick={onSave}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-indigo-200 active:scale-95"
                    >
                        {isAddMode ? <UserPlus size={18} /> : <Save size={18} />}
                        {isAddMode ? 'Create Account' : 'Save Updates'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserModal;