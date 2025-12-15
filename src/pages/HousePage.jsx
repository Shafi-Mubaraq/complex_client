import React, { useState, useEffect } from 'react';
import PropertyCard from "../components/Common/PropertyCard";
import axios from 'axios';

// Import icons for better UX (Using Heroicons to match the ShopPage style)
import { XCircleIcon, ShoppingBagIcon, SparklesIcon, HomeModernIcon, MapPinIcon } from '@heroicons/react/24/outline'; 
// Note: Added HomeModernIcon and MapPinIcon for the residential theme/filter bar.

// Import images/assets (These will be used if the fetched data doesn't include image URLs)
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

// Hardcoded data remains as a fallback/initial data until the API call completes
const initialHouseData = [
    {
        src: img1,
        title: "House Model 1 - The Azure",
        description: "Spacious 3BHK with premium fixtures and a garden view in a quiet suburban area.",
        rent: 450000,
        deposit: 900000,
        area: 1800,
        location: "Greenwood Suburb",
        isAvailable: true,
        beds: 3,
        baths: 2,
    },
    {
        src: img2,
        title: "Loft Apartment - Downtown",
        description: "Modern, open-plan loft with floor-to-ceiling windows overlooking the city skyline.",
        rent: 320000,
        deposit: 640000,
        area: 1200,
        location: "Central Business District",
        isAvailable: true,
        beds: 2,
        baths: 2,
    },
    {
        src: img3,
        title: "Villa - Lakeside Retreat",
        description: "Exclusive single-family villa boasting private lake access and dedicated boat dock.",
        rent: 850000,
        deposit: 1700000,
        area: 3500,
        location: "Lakeview Estates",
        isAvailable: false,
        beds: 5,
        baths: 4,
    }
];

// Helper component for a better loading state (Skeleton Card) - Reused from ShopPage
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


const HousePage = () => {
    // State to hold the fetched property data
    const [properties, setProperties] = useState(initialHouseData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Ensure the API URL is trimmed and corrected for use
    const apiUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.trim() : 'http://localhost:5000';

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${apiUrl}/api/house/fetchData`); 
                
                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    setProperties(response.data);
                } else {
                    console.warn("API returned non-array data or no data. Using fallback.");
                    setProperties(initialHouseData); 
                }
            } catch (err) {
                console.error("Error fetching house data:", err);
                setError("⚠️ We couldn't load live listings. Displaying a curated sample.");
                setProperties(initialHouseData); 
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

    // 1. Loading State (Using Skeletons for premium feel)
    if (loading) {
        return (
            <section className={`py-20 px-4 min-h-[90vh] ${theme.bg}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <HomeModernIcon className="w-12 h-12 mx-auto text-indigo-500 mb-4 animate-bounce" />
                        <h2 className={`text-3xl font-bold ${theme.textPrimary}`}>Preparing Residential Listings...</h2>
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
    
    // 2. Error Message (Enhanced Banner)
    const errorMessage = error ? (
        <div className="flex items-start bg-red-50 p-6 rounded-2xl mb-12 shadow-md border border-red-200">
            <XCircleIcon className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5 mr-3" aria-hidden="true" />
            <div>
                <h3 className="text-lg font-semibold text-red-800">Data Fetch Error</h3>
                <p className="text-red-700 text-base">{error}</p>
            </div>
        </div>
    ) : null;
    
    // 3. Final Content Rendering

    return (
        <section
            id="properties"
            className={`py-20 px-4 min-h-[90vh] ${theme.bg}`}
        >
            <div className="max-w-7xl mx-auto">
                {errorMessage}

                {/* Header - Premium Design */}
                <div className="text-center mb-4">
                    <SparklesIcon className="w-10 h-10 mx-auto text-indigo-500 mb-2"/>
                </div>
                <h1 className={`text-5xl sm:text-6xl font-extrabold ${theme.textPrimary} mb-4 text-center tracking-tight leading-tight`}>
                    Luxury Residential <span className={`${theme.brandAccent}`}>Homes</span>
                </h1>

                <p className="text-xl text-gray-500 mb-16 text-center max-w-3xl mx-auto">
                    The definitive collection of upscale houses, apartments, and villas available for rent.
                </p>
                
                {/* Sticky Filter Bar Placeholder (Added for modern UX) */}
                <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-y border-gray-200 py-4 mb-10 shadow-sm">
                    <div className="flex justify-between items-center max-w-6xl mx-auto px-4">
                         <span className="text-lg font-bold text-gray-800">{properties.length} Active Listings</span>
                         <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg hover:bg-indigo-100 transition">
                            <MapPinIcon className="w-5 h-5"/>
                            View on Map
                         </button>
                    </div>
                </div>

                {/* Grid Layout - Cards use gap-x-8 and gap-y-12 for better spacing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {properties.map((property, index) => (
                        <PropertyCard
                            key={property.id || `property-${index}`}
                            
                            // Data Mapping
                            src={property.src || img1} 
                            alt={property.title}
                            title={property.title}
                            description={property.description}

                            // Residential/Price Props
                            rent={property.rent} 
                            deposit={property.deposit} 
                            area={property.area} 
                            isAvailable={property.isAvailable} 

                            // Feature Props
                            location={property.location}
                            beds={property.beds} 
                            baths={property.baths} 
                        />
                    ))}
                </div>

                {/* Final CTA - Premium Styling */}
                <div className="text-center mt-24">
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 focus:outline-none shadow-xl shadow-indigo-500/40 text-white font-bold tracking-wide px-14 py-5 rounded-full transition duration-300 text-xl uppercase"
                        onClick={() => alert("Redirecting to Contact Page...")}
                    >
                        Schedule a Private Viewing
                    </button>
                </div>

            </div>
        </section>
    );
}

export default HousePage;