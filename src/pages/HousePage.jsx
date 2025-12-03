import React from 'react'
import PropertyCard from "../components/PropertyCard";   // adjust path if needed

// Image Imports
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";


const houseImages = [img1, img2, img3, img1, img2, img3];

const HousePage = () => {
    return (
        <section id="houses" className="bg-white py-20 px-4 min-h-[90vh]">
            <div className="max-w-7xl mx-auto">

                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-14 text-center">
                    Residential Listings <span className="text-indigo-600">🏘️</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 sm:gap-10">
                    {houseImages.map((img, index) => (
                        <PropertyCard
                            key={`house-${index}`}
                            src={img}
                            alt={`Modern House ${index + 1}`}
                            title={`House Model ${index + 1} - 3BHK`}
                            description="Spacious and modern design perfect for family living."
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}

export default HousePage;
