import React from "react";
import { MapPin, Maximize2, ArrowRight, Building2, ShieldCheck, Zap } from "lucide-react";

const HouseCard = ({ house, apiUrl, onView }) => {
    return (
        <div className="group bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden flex flex-col transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] hover:border-slate-300">

            {/* Image Section: Refined Badging */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-50">
                <img
                    src={house.images?.length ? `${apiUrl}${house.images[0]}` : ""}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    alt={house.title}
                />

                {/* Top Badge: Asset ID */}
                <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
                        <Zap size={12} className="text-indigo-600 fill-indigo-600" />
                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-900">
                            Asset #{house._id?.slice(-5).toUpperCase() || "NEW"}
                        </span>
                    </div>
                </div>

                {/* Bottom Overlay: Price Visibility */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-slate-900/60 to-transparent">
                    <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Monthly Lease</span>
                    <p className="text-white text-xl font-black tracking-tight">₹{house.rent.toLocaleString()}</p>
                </div>
            </div>

            {/* Content Section: Balanced Density */}
            <div className="p-7 flex flex-col flex-grow">

                {/* Header Row */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 text-indigo-600 mb-1.5">
                        <ShieldCheck size={14} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Listing</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight uppercase group-hover:text-indigo-600 transition-colors">
                        {house.title}
                    </h2>
                    <div className="flex items-center gap-1.5 mt-2 text-slate-400">
                        <MapPin size={13} strokeWidth={2.5} />
                        <span className="text-[11px] font-bold uppercase tracking-widest">{house.location}</span>
                    </div>
                </div>

                {/* Technical Specs: Data-Sheet Grid (Mixed from Original) */}
                <div className="grid grid-cols-2 gap-px bg-slate-100 border border-slate-100 rounded-xl overflow-hidden mb-8">
                    <div className="bg-white p-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Maximize2 size={14} />
                            <span className="text-[9px] font-black uppercase tracking-tighter">Net Area</span>
                        </div>
                        <span className="text-xs font-bold text-slate-700 uppercase">{house.area} sq.ft</span>
                    </div>
                    <div className="bg-white p-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Building2 size={14} />
                            <span className="text-[9px] font-black uppercase tracking-tighter">Classification</span>
                        </div>
                        <span className="text-xs font-bold text-slate-700 uppercase">{house.propertyType}</span>
                    </div>
                </div>

                {/* Action Button: Clean & Authoritative */}
                <div className="mt-auto">
                    <button
                        disabled={!house.isAvailable}
                        onClick={() => onView(house)}
                        className={`w-full flex items-center justify-between px-6 py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.25em] transition-all duration-300 ${house.isAvailable
                                ? 'bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-100 active:scale-[0.98]'
                                : 'bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed'
                            }`}
                    >
                        <span>{house.isAvailable ? "Request Full Details" : "Asset Occupied"}</span>
                        {house.isAvailable && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HouseCard;