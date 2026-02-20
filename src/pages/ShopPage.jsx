import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Sparkles,
    Store, 
    LayoutGrid,
    Filter
} from "lucide-react";
import ShopModal from "../components/Shop/ShopModal";
import ShopCard from "../components/Shop/ShopCard";

const ShopsPage = () => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedShop, setSelectedShop] = useState(null);

    useEffect(() => {
        axios.get(`${apiUrl}/api/property/fetch/shop`) 
            .then(res => setShops(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [apiUrl]);

    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
                <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">Loading Commercial Assets</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50">

            {/* Header Section */}
            <div className="bg-white border-b border-slate-200">
                <header className="max-w-7xl mx-auto px-8 py-12 md:py-16">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">
                            <Sparkles size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Commercial Inventory 2026</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            Launch Your <span className="text-indigo-600">Dream Business</span>
                        </h1>
                        <p className="text-slate-500 max-w-2xl text-sm md:text-base font-medium">
                            Premium retail spaces, offices, and commercial outlets in prime locations.
                        </p>
                    </div>
                </header>
            </div>

            {/* Content Section */}
            <main className="max-w-7xl mx-auto px-8 py-12">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
                    <div className="flex items-center gap-3 text-slate-400">
                        <LayoutGrid size={18} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Showing {shops.length} Active Spaces</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors uppercase tracking-widest">
                            <Filter size={14} /> Filter
                        </button>
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {shops.map(shop => (
                        <ShopCard
                            key={shop._id}
                            shop={shop}
                            apiUrl={apiUrl}
                            onView={() => setSelectedShop(shop)}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {shops.length === 0 && (
                    <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                        <Store size={48} strokeWidth={1} className="mb-4" />
                        <p className="text-sm font-medium uppercase tracking-widest">No commercial units available</p>
                    </div>
                )}
            </main>

            {selectedShop && (
                <ShopModal
                    shop={selectedShop}
                    onClose={() => setSelectedShop(null)}
                />
            )}

        </div>
    );
};

export default ShopsPage;
