import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the base API URL
const API = "http://localhost:5000/api";

const PropertyManagePage = () => {
  // --- STATE MANAGEMENT ---
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null); // Holds data for the modal (new/edit)
  const [filterType, setFilterType] = useState("all"); // all | house | shop
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input

  // --- LIFECYCLE HOOK ---
  useEffect(() => {
    fetchProperties();
  }, []);

  // ---------------- FETCH ALL PROPERTIES ----------------
  const fetchProperties = async () => {
    try {
      // Fetch both houses and shops data in parallel
      const [housesRes, shopsRes] = await Promise.all([
        axios.get(`${API}/house/fetchData`),
        axios.get(`${API}/shop/fetchData`),
      ]);
      // Combine results into a single array
      setProperties([...housesRes.data, ...shopsRes.data]);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- DELETE PROPERTY ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      await axios.delete(`${API}/auth/property/delete/${id}`);
      // Update state: remove the deleted property
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  // ---------------- CREATE / UPDATE PROPERTY ----------------
  const handleSave = async () => {
    try {
      // Prepare payload: convert string inputs to numbers and clean up amenities
      const payload = {
        ...editData,
        rent: Number(editData.rent),
        deposit: Number(editData.deposit),
        area: Number(editData.area),
        // Ensure amenities is an array of strings, filtering out empty strings
        amenities: editData.amenities.map(a => a.trim()).filter(Boolean),
        images: editData.images,
      };

      if (editData._id) {
        // --- UPDATE EXISTING PROPERTY ---
        const res = await axios.put(
          `${API}/auth/property/update/${editData._id}`,
          payload
        );

        // Update state: replace the old version with the updated data
        setProperties((prev) =>
          prev.map((p) =>
            p._id === res.data.property._id ? res.data.property : p
          )
        );
      } else {
        // --- CREATE NEW PROPERTY ---
        const res = await axios.post(`${API}/auth/property/create`, payload);
        // Update state: add the new property to the list
        setProperties((prev) => [...prev, res.data.property]);
      }

      // Close the modal
      setEditData(null);
    } catch (err) {
      console.error("Save error", err);
    }
  };

  // ---------------- COMBINED FILTER AND SEARCH LOGIC (UPDATED) ----------------
  const filteredAndSearchedProperties = properties.filter((p) => {
    // 1. Filter by Property Type (if not 'all')
    const typeMatch = filterType === "all" || p.propertyType === filterType;

    // 2. Filter by Search Term (case-insensitive on title, location, AND type)
    const searchLower = searchTerm.toLowerCase().trim();
    const searchMatch =
      searchLower === "" ||
      p.title.toLowerCase().includes(searchLower) ||
      p.location.toLowerCase().includes(searchLower) ||
      p.propertyType.toLowerCase().includes(searchLower); // <-- ADDED TYPE CHECK HERE

    // Only include properties that match BOTH the type filter AND the search term
    return typeMatch && searchMatch;
  });

  // --- RENDER LOADING STATE ---
  if (loading)
    return <p className="text-center mt-10">Loading properties...</p>;

  // --- MAIN COMPONENT RENDER ---
  return (
    <div className="p-6">
      {/* ---------------- HEADER (Title, Search, Filter, New Button) ---------------- */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Property Management</h1>

        <div className="flex gap-3">
          {/* SEARCH INPUT FIELD */}
          <input
            type="text"
            className="border px-3 py-2 rounded"
            placeholder="Search by Title, Location, or Type..." // <-- UPDATED PLACEHOLDER
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* FILTER DROPDOWN */}
          <select
            className="border px-3 py-2 rounded"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Properties</option>
            <option value="house">Houses</option>
            <option value="shop">Shops</option>
          </select>

          {/* NEW PROPERTY BUTTON */}
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() =>
              setEditData({
                title: "",
                propertyType: "house", // Default type
                rent: "",
                deposit: "",
                area: "",
                location: "",
                amenities: [],
                images: [],
                isAvailable: true,
              })
            }
          >
            + New Property
          </button>
        </div>
      </div>

      {/* ---------------- PROPERTY TABLE ---------------- */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Rent</th>
              <th className="border p-2">Deposit</th>
              <th className="border p-2">Area</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Available</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSearchedProperties.map((p) => (
              <tr key={p._id} className="text-center">
                <td className="border p-2">{p.title}</td>
                <td className="border p-2 capitalize">{p.propertyType}</td>
                <td className="border p-2">₹{p.rent}</td>
                <td className="border p-2">₹{p.deposit}</td>
                <td className="border p-2">{p.area}</td>
                <td className="border p-2">{p.location}</td>
                <td className="border p-2">
                  {p.isAvailable ? "Yes" : "No"}
                </td>
                <td className="border p-2 flex justify-center gap-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => setEditData(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {/* Empty state message */}
            {filteredAndSearchedProperties.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No properties found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ---------------- CREATE / EDIT MODAL ---------------- */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-[600px] max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editData._id ? "Edit Property" : "New Property"}
            </h3>

            {/* PROPERTY TYPE SELECT */}
            <select
              className="border p-2 w-full mb-2"
              value={editData.propertyType}
              onChange={(e) =>
                setEditData({ ...editData, propertyType: e.target.value })
              }
            >
              <option value="house">House</option>
              <option value="shop">Shop</option>
            </select>

            {/* INPUT FIELDS (Title, Rent, Deposit, Area, Location) */}
            {[
              ["Title", "title"],
              ["Rent", "rent", "number"],
              ["Deposit", "deposit", "number"],
              ["Area", "area", "number"],
              ["Location", "location"],
            ].map(([label, key, type]) => (
              <input
                key={key}
                type={type || "text"}
                className="border p-2 w-full mb-2"
                placeholder={label}
                // Use a default empty string for new property creation
                value={editData[key] === null || editData[key] === undefined ? "" : editData[key]}
                onChange={(e) =>
                  setEditData({ ...editData, [key]: e.target.value })
                }
              />
            ))}

            {/* AMENITIES INPUT */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">
                Amenities (comma separated)
              </label>
              <input
                type="text"
                className="border p-2 w-full"
                value={editData.amenities.join(", ")}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    amenities: e.target.value
                      .split(",")
                      .map((a) => a.trim()),
                  })
                }
              />
            </div>

            {/* IMAGES UPLOAD AND PREVIEW */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  // Convert files to Base64 strings for storage
                  Promise.all(
                    files.map(
                      (file) =>
                        new Promise((resolve, reject) => {
                          const reader = new FileReader();
                          reader.onload = () => resolve(reader.result);
                          reader.onerror = reject;
                          reader.readAsDataURL(file);
                        })
                    )
                  ).then((imagesBase64) => {
                    // Overwrite old images if new ones are selected
                    setEditData({ ...editData, images: imagesBase64 });
                  });
                }}
              />

              <div className="flex flex-wrap mt-2 gap-2">
                {editData.images?.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    className="w-20 h-20 object-cover border rounded"
                  />
                ))}
              </div>
            </div>

            {/* AVAILABILITY SELECT */}
            <select
              className="border p-2 w-full mb-4"
              // Convert boolean back to string for the select value
              value={editData.isAvailable.toString()}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  // Convert string back to boolean
                  isAvailable: e.target.value === "true",
                })
              }
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>

            {/* ACTION BUTTONS */}
            <div className="flex justify-between">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                {editData._id ? "Save Changes" : "Create Property"}
              </button>
              <button
                className="bg-gray-400 px-4 py-2 rounded"
                onClick={() => setEditData(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyManagePage;