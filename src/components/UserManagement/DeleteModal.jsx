import React from "react";
import { X, AlertCircle, Trash2, ShieldAlert, Database } from "lucide-react";

const DeleteModal = ({ user, onConfirm, onCancel }) => {

    if (!user) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">

            {/* Backdrop consistent with UserModal */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={onCancel}
            />

            {/* Modal Container */}
            <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="shrink-0 px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-rose-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-100">
                            <AlertCircle size={22} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                                Terminate Account
                            </h3>
                            <p className="text-[10px] font-bold text-rose-600 uppercase tracking-[0.2em] mt-0.5">
                                High Privilege Action
                            </p>
                        </div>
                    </div>
                    <button onClick={onCancel} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all">
                        <X size={22} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 bg-white">
                    <div className="space-y-4">
                        <p className="text-sm font-medium text-slate-600 leading-relaxed">
                            You are about to permanently remove <span className="font-bold text-slate-900 underline decoration-rose-200 underline-offset-4">{user.fullName}</span> from the enterprise database.
                        </p>

                        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4">
                            <p className="text-[11px] font-bold text-rose-700 uppercase tracking-wider mb-1">Warning</p>
                            <p className="text-xs text-rose-600 font-medium">
                                This action is irreversible. All associated identity data and access logs will be archived or purged.
                            </p>
                        </div>
                    </div>

                    {/* Infrastructure Badges to match theme */}
                    <div className="mt-8 flex items-center gap-6 px-1">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Database size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Data Purge</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <ShieldAlert size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Security Audit</span>
                        </div>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="shrink-0 px-8 py-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-slate-500 hover:text-slate-800 uppercase tracking-widest transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-rose-200 active:scale-95"
                    >
                        <Trash2 size={18} />
                        Confirm Termination
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;