import React from 'react';
import PropertyCard from "../components/Common/PropertyCard";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

const houseData = [
    {
        src: img1,
        title: "House Model 1 - The Azure",
        description: "Spacious 3BHK with premium fixtures and a garden view in a quiet suburban area.",
        rent: 450000, 
        deposit: 900000,
        area: 1800, // sqft
        location: "Greenwood Suburb",
        isAvailable: true,
        beds: 3,
        baths: 2,
    },
    {
        src: img2,
        title: "House Model 2 - The Citadel",
        description: "Corner unit 4BHK. Modern design and prime security access near the city center.",
        rent: 620000,
        deposit: 1240000,
        area: 2500,
        location: "Metro Downtown",
        isAvailable: false, // Leased/Sold Out
        beds: 4,
        baths: 3,
    },
    {
        src: img3,
        title: "Shopfront Unit A - Galleria", // Mixed entry (Commercial data structure, Residential props)
        description: "High-visibility ground floor retail space, ideal for boutique businesses.",
        rent: 310000,
        deposit: 620000,
        area: 1200,
        location: "Central Market",
        isAvailable: true,
    },
    {
        src: img1,
        title: "House Model 4 - The Prestige",
        description: "Luxury 5BHK penthouse with panoramic city views and exclusive rooftop access.",
        rent: 850000,
        deposit: 1700000,
        area: 4500,
        location: "Skyline Heights",
        isAvailable: false,
        beds: 5,
        baths: 4,
    },
    {
        src: img2,
        title: "House Model 5 - The Core",
        description: "3BHK apartment in the central tower block. Excellent transport links.",
        rent: 480000,
        deposit: 960000,
        area: 1650,
        location: "Tower District",
        isAvailable: true,
        beds: 3,
        baths: 2,
    },
    {
        src: img3,
        title: "Shopfront Unit B - The Vista", // Mixed entry
        description: "Last unit available in phase one development. Perfect for a small cafe or office.",
        rent: 330000,
        deposit: 660000,
        area: 950,
        location: "New Commerce Zone",
        isAvailable: true,
    },
];

const HousePage = () => {

    const theme = {
        bg: 'bg-white',
        textPrimary: 'text-gray-900',
        brandAccent: 'text-indigo-600',
    };

    return (
        <section
            id="properties"
            className={`py-20 px-4 min-h-[90vh] ${theme.bg}`}
        >
            <div className="max-w-7xl mx-auto">

                <h2 className={`text-5xl font-extrabold ${theme.textPrimary} mb-4 text-center tracking-tight`}>
                    Luxury Residential <span className={`${theme.brandAccent}`}>Homes</span>
                </h2>
                <p className={`text-lg text-gray-600 mb-16 text-center max-w-2xl mx-auto`}>
                    Explore our available residential and commercial spaces. Contact us for details on amenities and floor plans.
                </p>
                

                {/* Grid Layout - Responsive */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {houseData.map((property, index) => (
                        <PropertyCard
                            key={`property-${index}`}
                            src={property.src}
                            alt={`Property Unit ${index + 1}`}
                            title={property.title}
                            description={property.description}
                            
                            // Residential Props
                            rent={property.rent} 
                            area={property.area} 
                            isAvailable={property.isAvailable} 
                            deposit={property.deposit}
                            
                            // Remaining Props
                            location={property.location}
                            beds={property.beds} 
                            baths={property.baths} 
                        />
                    ))}
                </div>

                {/* Call to action for more properties/contact */}
                <div className="text-center mt-20">
                    <button
                        className={`bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 text-white font-semibold px-12 py-4 rounded-xl transition duration-300 text-lg`}
                        onClick={() => alert("Redirecting to Contact Page...")}
                    >
                        Inquire About Future Listings
                    </button>
                </div>

            </div>
        </section>
    );
}

export default HousePage;