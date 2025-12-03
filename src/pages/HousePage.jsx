import React from 'react';
import PropertyCard from "../components/Common/PropertyCard";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

const houseData = [
    {
        src: img1,
        title: "House Model 1 - The Azure",
        description: "Spacious 3BHK with premium fixtures and a garden view.",
        price: "$450,000",
        status: "Available",
    },
    {
        src: img2,
        title: "House Model 2 - The Citadel",
        description: "Corner unit 4BHK. Modern design and prime security access.",
        price: "$620,000",
        status: "Booked",
    },
    {
        src: img3,
        title: "House Model 3 - The Summit",
        description: "2BHK starter home. Ideal for young professionals.",
        price: "$310,000",
        status: "Available",
    },
    {
        src: img1,
        title: "House Model 4 - The Prestige",
        description: "Luxury 5BHK penthouse with panoramic city views.",
        price: "$850,000",
        status: "Sold Out",
    },
    {
        src: img2,
        title: "House Model 5 - The Core",
        description: "3BHK apartment in the central tower block.",
        price: "$480,000",
        status: "Available",
    },
    {
        src: img3,
        title: "House Model 6 - The Vista",
        description: "Last unit available in phase one development.",
        price: "$330,000",
        status: "Available",
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
            id="houses"
            className={`py-16 px-4 min-h-[90vh]`}
        >
            <div className="max-w-7xl mx-auto">

                <h2 className={`text-4xl sm:text-5xl font-extrabold ${theme.textPrimary} mb-4 text-center tracking-tight`}>
                    Premium Residential <span className={`${theme.brandAccent}`}>Listings</span>
                </h2>
                <p className={`text-lg text-gray-500 mb-16 text-center max-w-2xl mx-auto`}>
                    Explore our available luxury homes. The status below indicates immediate availability.
                </p>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    {houseData.map((house, index) => (
                        <PropertyCard
                            key={`house-${index}`}
                            src={house.src}
                            alt={`Residential Unit ${index + 1}`}
                            title={house.title}
                            description={house.description}
                            price={house.price}
                            status={house.status}
                        />
                    ))}
                </div>

                {/* Call to action for more properties/contact */}
                <div className="text-center mt-20">
                    <button
                        className={`bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 text-white font-semibold px-10 py-3 rounded-xl transition duration-300`}
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