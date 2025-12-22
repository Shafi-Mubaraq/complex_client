import React, { useState, useEffect } from 'react';
import PropertyCard from "../components/Common/PropertyCard";
import PropertyModal from "../components/Common/PropertyModal";
import axios from 'axios';

import {
  XCircleIcon,
  ShoppingBagIcon,
  SparklesIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';


/* 🔹 Skeleton Loader */
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

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* 🔹 Modal state (same as HousePage) */
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProperty, setModalProperty] = useState(null);
  const [modalType, setModalType] = useState("view");

  const openModal = ({ type, data }) => {
    setModalType(type);
    setModalProperty(data);
    setModalOpen(true);
  };

  const apiUrl = import.meta.env.VITE_API_URL?.trim() || "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${apiUrl}/api/shop/fetchData`);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setProperties(response.data);
        } 
      } catch (err) {
        setError("⚠️ Could not load live commercial listings. Showing curated examples.");
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchData();
  }, [apiUrl]);

  /* 🔹 Loading state */
  if (loading) {
    return (
      <section className="py-20 px-4 min-h-[90vh] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <ShoppingBagIcon className="w-12 h-12 mx-auto text-indigo-500 mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-gray-900">
              Loading Commercial Spaces...
            </h2>
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
    <section className="py-20 px-4 min-h-[90vh] bg-white">
      <div className="max-w-7xl mx-auto">

        {/* 🔹 Error Banner */}
        {error && (
          <div className="flex bg-red-50 p-6 rounded-2xl mb-12 border border-red-200">
            <XCircleIcon className="w-6 h-6 text-red-500 mr-3" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* 🔹 Header */}
        <div className="text-center mb-4">
          <SparklesIcon className="w-10 h-10 mx-auto text-indigo-500 mb-2" />
        </div>

        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-6">
          Premium <span className="text-indigo-600">Commercial Spaces</span>
        </h1>

        <p className="text-xl text-gray-500 mb-16 text-center max-w-3xl mx-auto">
          Retail, office & industrial properties designed for your business growth.
        </p>

        {/* 🔹 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {properties.map((property, index) => (
            <PropertyCard
              key={property._id || index}
              {...property}
              src={property.images?.[0] || property.src}
              onActionClick={openModal}
            />
          ))}
        </div>
      </div>

      {/* 🔹 SAME MODAL AS HOUSE PAGE */}
      <PropertyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        property={modalProperty}
        type={modalType}
      />
    </section>
  );
};

export default ShopPage;
