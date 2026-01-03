import React from "react";
import { Mail, Phone, MapPin, Edit3, Trash2 } from "lucide-react";

const UserTable = ({ users, onEdit, onDelete }) => {

    return (
        <div className="overflow-hidden border border-slate-100 rounded-2xl bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Identify</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Communication</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                        <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Management</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {users.map((u) => (
                        <tr key={u._id} className="group hover:bg-indigo-50/30 transition-colors">
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm">
                                        {u.fullName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900 leading-none">{u.fullName}</p>
                                        <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">ID : {u.aadhar}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-5">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Mail size={14} className="text-slate-400" />
                                        <span className="text-[13px] font-bold">{u.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Phone size={14} className="text-slate-400" />
                                        <span className="text-[13px] font-bold">{u.mobile}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={14} className="text-indigo-400" />
                                    <span className="text-xs font-black text-slate-700">{u.city}</span>
                                    <span className="text-[12px] font-bold text-slate-400">({u.state})</span>
                                </div>
                            </td>
                            <td className="px-6 py-5 text-right">
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => onEdit(u)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                                        <Edit3 size={16} />
                                    </button>
                                    <button onClick={() => onDelete(u)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;