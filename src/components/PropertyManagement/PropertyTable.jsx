import React from "react";
import { Home, IndianRupee, Layers, Maximize2, Edit3, Trash2, CheckCircle2, XCircle } from "lucide-react";

const PropertyTable = ({ properties, onEdit, onDelete }) => {

    return (
        <div className="overflow-hidden border border-slate-100 rounded-2xl bg-white shadow-sm mt-6">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Property Overview</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Financials</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Specs & Location</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                        <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Management</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {properties.length > 0 ? (
                        properties.map((p) => (
                            <tr key={p._id} className="group hover:bg-indigo-50/30 transition-colors">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm">
                                            <Home size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 leading-none">{p.title}</p>
                                            <p className="text-[12px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">
                                                {p.propertyType}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <IndianRupee size={14} className="text-emerald-500" />
                                            <span className="text-[12px] font-bold">Rent: ₹{p.rent}</span>
                                        </div>
                                        <div className="text-[12px] font-bold text-slate-400 uppercase ml-5">
                                            Deposit: ₹{p.deposit}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1.5">
                                            <Layers size={12} className="text-indigo-400" />
                                            <span className="text-xs font-black text-slate-700">Floor {p.floor}</span>
                                            <span className="text-[12px] font-bold text-slate-400">({p.doorNumber})</span>
                                        </div>
                                        <div className="text-[12px] font-bold text-slate-500 ml-4">
                                            {p.location} • {p.area} sq.ft
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    {p.isAvailable ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[11px] font-black uppercase tracking-wider">
                                            <CheckCircle2 size={10} /> Available
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-100 text-red-500 text-[11px] font-black uppercase tracking-wider">
                                            <XCircle size={10} /> Occupied
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => onEdit(p)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                                            <Edit3 size={16} />
                                        </button>
                                        <button onClick={() => onDelete(p)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="px-6 py-12 text-center text-slate-400 font-bold">No properties found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PropertyTable;