import React, { useState, useEffect } from 'react';
import PropertyCard from "../components/Common/PropertyCard";
import axios from 'axios';

// Import icons for better UX
import { XCircleIcon, ShoppingBagIcon, SparklesIcon, MapPinIcon } from '@heroicons/react/24/outline';

// Fallback images (assuming paths are correct)
import shops3 from "../assets/shops4.jpg";
import shops4 from "../assets/shops3.jpg";

// Initial fallback data
const initialShopData = [
    {
        src: shops3,
        title: "Retail Flagship - Level 1",
        description: "High-visibility retail unit with excellent foot traffic.",
        rent: 4500,
        deposit: 20000,
        area: 1200,
        location: "City Center",
        isAvailable: true,
        suitability: "Retail",
        floor: 1
    },
    {
        src: shops4,
        title: "Corporate Office Suite",
        description: "Modern office space suitable for startups and enterprises.",
        rent: 3200,
        deposit: 15000,
        area: 850,
        location: "Business Park",
        isAvailable: false,
        suitability: "Office",
        floor: 3
    },
    // {
    //     src: shops3,
    //     title: "Warehouse & Logistics Bay",
    //     description: "Large, flexible space ideal for storage and distribution.",
    //     rent: 6500,
    //     deposit: 30000,
    //     area: 5500,
    //     location: "Industrial Zone",
    //     isAvailable: true,
    //     suitability: "Industrial",
    //     floor: 1
    // }
];

// Helper component for a better loading state (Skeleton Card) - Reused from HousePage
const SkeletonCard = () => (
    <div className="animate-pulse bg-white p-4 rounded-xl shadow-lg border border-gray-200">
        <div className="w-full h-56 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="flex justify-between mt-4">
            <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/6 bg-gray-200 rounded"></div>
        </div>
    </div>
);


const ShopPage = () => {

    const [properties, setProperties] = useState(initialShopData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL
        ? import.meta.env.VITE_API_URL.trim()
        : 'http://localhost:5000';

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${apiUrl}/shop/fetchData`);

                if (Array.isArray(response.data) && response.data.length > 0) {
                    setProperties(response.data);
                } else if (response.data.length === 0) {
                    setProperties(initialShopData);
                    console.warn("API returned no data. Showing local fallback data.");
                } else {
                    console.warn("Unexpected API response:", response.data);
                    throw new Error("Invalid data format from API.");
                }
            } catch (err) {
                console.error("Error fetching shop data:", err);
                setError("⚠️ Could not load live commercial listings. Showing curated local examples.");
                setProperties(initialShopData);
            } finally {
                setTimeout(() => setLoading(false), 500);
            }
        };

        fetchData();
    }, [apiUrl]);

    const theme = {
        bg: 'bg-white',
        textPrimary: 'text-gray-900',
        brandAccent: 'text-indigo-600',
    };

    // 🔄 Loading state with Skeletons
    if (loading) {
        return (
            <section className={`py-20 px-4 min-h-[90vh] ${theme.bg}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <ShoppingBagIcon className="w-12 h-12 mx-auto text-indigo-500 mb-4 animate-bounce" />
                        <h2 className={`text-3xl font-bold ${theme.textPrimary}`}>Loading Commercial Spaces...</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={`py-20 px-4 min-h-[90vh] ${theme.bg}`}>
            <div className="max-w-7xl mx-auto">

                {/* Error banner - Enhanced Banner (Adopted from HousePage) */}
                {error && (
                    <div className="flex items-start bg-red-50 p-6 rounded-2xl mb-12 shadow-md border border-red-200">
                        <XCircleIcon className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5 mr-3" aria-hidden="true" />
                        <div>
                            <h3 className="text-lg font-semibold text-red-800">Connection Error</h3>
                            <p className="text-red-700 text-base">{error}</p>
                        </div>
                    </div>
                )}

                {/* Header - Premium Design (Adopted from HousePage) */}
                <div className="text-center mb-4">
                    <SparklesIcon className="w-10 h-10 mx-auto text-indigo-500 mb-2" />
                </div>
                <h1 className={`text-5xl sm:text-6xl font-extrabold ${theme.textPrimary} mb-4 text-center tracking-tight leading-tight`}>
                    Premium Business <br className="hidden sm:inline-block" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        Commercial Spaces
                    </span>
                </h1>

                <p className="text-xl text-gray-500 mb-16 text-center max-w-3xl mx-auto">
                    Discover premium retail, office, and business spaces tailored to elevate your enterprise.
                </p>

                {/* Sticky Filter Bar Placeholder (Adopted from HousePage) */}
                <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-y border-gray-200 py-4 mb-10 shadow-sm">
                    <div className="flex justify-between items-center max-w-6xl mx-auto px-4">
                        <span className="text-lg font-bold text-gray-800">{properties.length} Available Units</span>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg hover:bg-indigo-100 transition">
                            <MapPinIcon className="w-5 h-5" />
                            View on Map
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {properties.map((property, index) => (
                        <PropertyCard
                            key={property._id || `shop-${index}`}

                            /* Image */
                            src={property.images?.[0] || property.src || shops3}
                            alt={property.title}

                            /* Main content */
                            title={property.title}
                            description={property.description}

                            /* Commercial pricing */
                            rent={property.rent}
                            deposit={property.deposit}
                            area={property.area}
                            isAvailable={property.isAvailable}

                            /* Reused fields */
                            location={property.location}
                            // Custom labels for commercial use
                            feature1Label="Suitability"
                            feature1Value={property.suitability || "Commercial"}
                            feature2Label="Floor"
                            feature2Value={property.floor || "NA"}
                        />
                    ))}
                </div>

                {/* CTA - Premium Styling (Adopted from HousePage) */}
                <div className="text-center mt-24">
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 focus:outline-none shadow-xl shadow-indigo-500/40 text-white font-bold tracking-wide px-14 py-5 rounded-full transition duration-300 text-xl uppercase"
                        onClick={() => alert("Redirecting to Commercial Inquiry Page...")}
                    >
                        Contact Leasing Team
                    </button>
                </div>

            </div>
        </section>
    );
};

export default ShopPage;