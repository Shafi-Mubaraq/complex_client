import React from 'react';
import PropertyCard from "../components/Common/PropertyCard"; 

import shops1 from "../assets/shops1.jpg";
import shops2 from "../assets/img2.jpg";
import shops3 from "../assets/shops3.jpg";

const shopData = [
    {
        src: shops1,
        title: "Retail Flagship - Level 1",
        description: "High-visibility ground floor unit. Perfect for flagship retail or luxury showroom.",
        price: "$4,500/mo", // Commercial Price Format
        status: "Available",
        sqft: "1,200",
        suitability: "Retail",
        floor: 1,
    },
    {
        src: shops2,
        title: "Corporate Office Suite - Level 3",
        description: "Spacious, customizable office space with panoramic complex views.",
        price: "$3,200/mo",
        status: "Leased",
        sqft: "850",
        suitability: "Office",
        floor: 3,
    },
    {
        src: shops3,
        title: "Food & Beverage Kiosk - Plaza",
        description: "Prime location near the main entrance. High foot traffic guaranteed.",
        price: "$2,100/mo",
        status: "Available",
        sqft: "400",
        suitability: "F&B",
        floor: "Plaza",
    },
    {
        src: shops1,
        title: "Small Business Unit - Level 2",
        description: "Affordable commercial unit ideal for startups or service-based businesses.",
        price: "$1,800/mo",
        status: "Available",
        sqft: "550",
        suitability: "Services",
        floor: 2,
    },
    {
        src: shops2,
        title: "Executive Penthouse Office",
        description: "Exclusive top-floor corner office with private terrace access.",
        price: "$6,800/mo",
        status: "Pending",
        sqft: "1,500",
        suitability: "Executive",
        floor: 5,
    },
    {
        src: shops3,
        title: "Fitness Studio Space",
        description: "Large open floor plan suitable for a gym, studio, or gallery.",
        price: "$4,000/mo",
        status: "Available",
        sqft: "950",
        suitability: "Wellness",
        floor: 2,
    },
];

const ShopPage = () => {
    const theme = {
        // Change: Lighter background for editorial contrast
        bg: 'bg-gray-100', 
        textPrimary: 'text-gray-900',
        brandAccent: 'text-indigo-600',
    };

    return (
        <section id="shops" className={`${theme.bg} py-20 px-4 min-h-[90vh]`}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h2 className={`text-5xl font-extrabold ${theme.textPrimary} mb-4 text-center tracking-tight`}>
                    Commercial <span className={theme.brandAccent}>Leasing</span> Opportunities
                </h2>

                <p className="text-lg text-gray-600 mb-16 text-center max-w-2xl mx-auto">
                    Secure your business's future in a location with guaranteed foot traffic and modern infrastructure.
                </p>

                {/* Grid Layout - Responsive */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {shopData.map((shop, index) => (
                        <PropertyCard
                            key={`shop-${index}`}
                            src={shop.src}
                            alt={`Commercial Unit ${index + 1} - ${shop.suitability}`}
                            title={shop.title}
                            description={shop.description}
                            // Commercial Props
                            price={shop.price}
                            status={shop.status}
                            sqft={shop.sqft}
                            
                            // Map suitability and floor to generic beds/baths slots
                            beds={shop.suitability} 
                            baths={shop.floor}      
                        />
                    ))}
                </div>

                {/* Call to action */}
                <div className="text-center mt-20">
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 text-white font-semibold px-12 py-4 rounded-xl transition duration-300 text-lg"
                        onClick={() => alert("Redirecting to Commercial Leasing Form...")}
                    >
                        Contact Leasing Team
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ShopPage;