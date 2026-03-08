import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, Phone, CreditCard, MapPin, Edit3, Save, X, Loader2, CheckCircle } from "lucide-react";

const MyProfile = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const initialMobile = sessionStorage.getItem("mobile");

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    mobile: "",
    aadhar: "",
    additionalNumber: "",
    city: "",
    state: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/api/userManage/profile/${initialMobile}`);
      if (res.data?.data) {
        setProfile(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching profile", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const validate = () => {
    let tempErrors = {};
    if (!profile.fullName?.trim()) tempErrors.fullName = "Full name is required";
    if (!/^\S+@\S+\.\S+$/.test(profile.email)) tempErrors.email = "Enter a valid email address";
    if (!/^\d{10}$/.test(profile.mobile)) tempErrors.mobile = "Mobile must be exactly 10 digits";
    if (profile.aadhar && !/^\d{12}$/.test(profile.aadhar)) tempErrors.aadhar = "Aadhar must be exactly 12 digits";
    if (!profile.city?.trim()) tempErrors.city = "City is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Strict Digit Constraints: Prevents typing more than allowed
    if (name === "mobile" || name === "additionalNumber") {
      if (!/^\d*$/.test(value) || value.length > 10) return;
    }
    if (name === "aadhar") {
      if (!/^\d*$/.test(value) || value.length > 12) return;
    }

    setProfile(prev => ({ ...prev, [name]: value }));
    
    // Clear error immediately when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const updateProfile = async () => {
    if (!validate()) return;

    try {
      setIsSaving(true);
      await axios.put(`${apiUrl}/api/userManage/edit/${profile._id}`, profile);
      sessionStorage.setItem("mobile", profile.mobile);
      setEditMode(false);
      // Optional: Success toast or notification
    } catch (err) {
      alert("Update failed. Please check your connection.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 space-y-4">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
        <p className="text-gray-500 font-medium animate-pulse">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Decorative Header Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8">
          <div className="flex justify-between items-start">
            <h2 className="text-white text-3xl font-bold flex items-center gap-3">
              <User className="bg-white/20 p-1.5 rounded-lg" size={32} />
              My Profile
            </h2>
            <button
              onClick={() => {
                if (editMode) fetchProfile();
                setEditMode(!editMode);
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-lg ${
                editMode 
                  ? "bg-white/20 text-white hover:bg-white/30 backdrop-blur-md" 
                  : "bg-white text-indigo-600 hover:scale-105 active:scale-95"
              }`}
            >
              {editMode ? <><X size={18} /> Cancel</> : <><Edit3 size={18} /> Edit Details</>}
            </button>
          </div>
        </div>

        <div className="px-8 pb-8 -mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-50">
            {/* Form Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InputField 
                label="Full Name" icon={<User size={18}/>} name="fullName" 
                value={profile.fullName} onChange={handleChange} 
                disabled={!editMode} error={errors.fullName} placeholder="John Doe"
              />
              <InputField 
                label="Email Address" icon={<Mail size={18}/>} name="email" 
                value={profile.email} onChange={handleChange} 
                disabled={!editMode} error={errors.email} placeholder="john@example.com"
              />
              <InputField 
                label="Mobile Number (10 Digits)" icon={<Phone size={18}/>} name="mobile" 
                value={profile.mobile} onChange={handleChange} 
                disabled={!editMode} error={errors.mobile} placeholder="9876543210"
              />
              <InputField 
                label="Aadhar Card (12 Digits)" icon={<CreditCard size={18}/>} name="aadhar" 
                value={profile.aadhar} onChange={handleChange} 
                disabled={!editMode} error={errors.aadhar} placeholder="1234 5678 9012"
              />
              <InputField 
                label="Secondary Contact" icon={<Phone size={18}/>} name="additionalNumber" 
                value={profile.additionalNumber} onChange={handleChange} 
                disabled={!editMode} placeholder="Optional contact"
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField 
                  label="City" icon={<MapPin size={18}/>} name="city" 
                  value={profile.city} onChange={handleChange} 
                  disabled={!editMode} error={errors.city} placeholder="City"
                />
                <InputField 
                  label="State" icon={<MapPin size={18}/>} name="state" 
                  value={profile.state} onChange={handleChange} 
                  disabled={!editMode} placeholder="State"
                />
              </div>
            </div>

            {/* Save Button */}
            {editMode && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={updateProfile}
                  disabled={isSaving}
                  className="group relative flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-200 transition-all transform hover:-translate-y-1 active:translate-y-0"
                >
                  {isSaving ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <CheckCircle size={20} className="group-hover:scale-110 transition-transform" />
                  )}
                  {isSaving ? "Saving..." : "Save Profile Changes"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Reusable Input Component
const InputField = ({ label, icon, name, value, onChange, disabled, error, placeholder }) => (
  <div className="flex flex-col gap-1.5 group">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
      {label}
    </label>
    <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition-all duration-200 ${
      disabled 
        ? "bg-gray-50 border-gray-100" 
        : "bg-white border-gray-200 group-focus-within:border-indigo-500 group-focus-within:ring-4 group-focus-within:ring-indigo-50"
    } ${error ? "border-red-400 ring-4 ring-red-50" : ""}`}>
      <span className={`${disabled ? "text-gray-300" : "text-indigo-400"} mr-3`}>
        {icon}
      </span>
      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full outline-none bg-transparent text-gray-700 font-medium placeholder:text-gray-300 disabled:text-gray-400"
      />
    </div>
    <div className="h-4">
        {error && <span className="text-xs text-red-500 font-medium ml-1 flex items-center gap-1">
            <X size={12} /> {error}
        </span>}
    </div>
  </div>
);

export default MyProfile;