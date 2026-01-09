import React from "react";
import { MapPin, Maximize2, ArrowRight, ShieldCheck, Zap, Briefcase } from "lucide-react";

const ShopCard = ({ shop, apiUrl, onView }) => {
    return (
        <div className="group bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden flex flex-col transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] hover:border-slate-300">

            {/* Image Section */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-50">
                <img
                    src={shop.images?.length ? `${apiUrl}${shop.images[0]}` : ""}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    alt={shop.title}
                />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
                        <Briefcase size={12} className="text-indigo-600 fill-indigo-600" />
                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-900">
                            COMMERCIAL
                        </span>
                    </div>
                </div>

                {/* Price Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-slate-900/60 to-transparent">
                    <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Monthly Rent</span>
                    <p className="text-white text-xl font-black tracking-tight">₹{shop.rent?.toLocaleString()}</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-7 flex flex-col flex-grow">
                <div className="mb-6">
                    <div className="flex items-center gap-2 text-indigo-600 mb-1.5">
                        <ShieldCheck size={14} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Space</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight uppercase group-hover:text-indigo-600 transition-colors">
                        {shop.title}
                    </h2>
                    <div className="flex items-center gap-1.5 mt-2 text-slate-400">
                        <MapPin size={13} strokeWidth={2.5} />
                        <span className="text-[11px] font-bold uppercase tracking-widest">{shop.location}</span>
                    </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-px bg-slate-100 border border-slate-100 rounded-xl overflow-hidden mb-8">
                    <div className="bg-white p-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Zap size={14} />
                            <span className="text-[9px] font-black uppercase tracking-tighter">Deposit</span>
                        </div>
                        <span className="text-xs font-bold text-slate-700 uppercase">₹{shop.deposit?.toLocaleString()}</span>
                    </div>
                    <div className="bg-white p-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Maximize2 size={14} />
                            <span className="text-[9px] font-black uppercase tracking-tighter">Floor Area</span>
                        </div>
                        <span className="text-xs font-bold text-slate-700 uppercase">{shop.area} sq.ft</span>
                    </div>
                </div>

                <div className="mt-auto">
                    <button
                        disabled={!shop.isAvailable}
                        onClick={() => onView(shop)}
                        className={`w-full flex items-center justify-between px-6 py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.25em] transition-all duration-300 ${
                            shop.isAvailable
                                ? 'bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-100'
                                : 'bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed'
                        }`}
                    >
                        <span>{shop.isAvailable ? "Request Booking" : "Space Occupied"}</span>
                        {shop.isAvailable && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShopCard;