import React from "react";
import PropertyCard from "../components/PropertyCard";


import shops1 from "../assets/shops1.jpg";
import shops2 from "../assets/img2.jpg"; 
import shops3 from "../assets/shops3.jpg";

const shopImages = [shops1, shops2, shops3, shops1, shops2, shops3];
const ShopPage = () => {
  return (
    <section id="shops" className="bg-gray-50 py-20 px-4 min-h-[90vh]">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-14 text-center">
          Commercial Spaces <span className="text-indigo-600">🛍️</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 sm:gap-10">
          {shopImages.map((img, index) => (
            <PropertyCard
              key={`shop-${index}`}
              src={img}
              alt={`Commercial Shop ${index + 1}`}
              title={`Shop Unit ${index + 1} - Prime Location`}
              description="High foot traffic area, ideal for retail or office space."
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ShopPage;
