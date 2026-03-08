import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, Phone, MapPin, IdCard, Edit3, Save, X, ShieldCheck } from "lucide-react";

const MyProfile = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const mobile = sessionStorage.getItem("mobile");

  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/userManage/profile/${mobile}`);
      setProfile(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Profile fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    try {
      await axios.put(`${apiUrl}/api/userManage/edit/${profile._id}`, profile);
      alert("Profile updated successfully");
      setEditMode(false);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-32 md:h-40"></div>
        <div className="px-6 pb-6">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="p-1 bg-white rounded-2xl shadow-lg">
              <div className="bg-gray-100 h-24 w-24 md:h-32 md:w-32 rounded-xl flex items-center justify-center text-blue-600">
                <User size={48} />
              </div>
            </div>
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-md"
              >
                <Edit3 size={18} /> Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setEditMode(false)}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg font-medium transition-all"
                >
                  <X size={18} /> Cancel
                </button>
                <button
                  onClick={updateProfile}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-md"
                >
                  <Save size={18} /> Save Changes
                </button>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">{profile.fullName || "User Name"}</h1>
            <p className="text-gray-500 flex items-center gap-1 mt-1">
              <ShieldCheck size={16} className="text-green-500" /> Verified Account
            </p>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-4">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Group */}
          <InputField 
            label="Full Name" 
            name="fullName" 
            icon={<User size={18}/>} 
            value={profile.fullName} 
            onChange={handleChange} 
            disabled={!editMode} 
          />

          <InputField 
            label="Email Address" 
            name="email" 
            icon={<Mail size={18}/>} 
            value={profile.email} 
            onChange={handleChange} 
            disabled={!editMode} 
          />

          <InputField 
            label="Mobile Number" 
            name="mobile" 
            icon={<Phone size={18}/>} 
            value={profile.mobile} 
            disabled={true} 
            tooltip="Mobile number cannot be changed"
          />

          <InputField 
            label="Aadhar Number" 
            name="aadhar" 
            icon={<IdCard size={18}/>} 
            value={profile.aadhar} 
            onChange={handleChange} 
            disabled={!editMode} 
          />

          <InputField 
            label="Additional Number" 
            name="additionalNumber" 
            icon={<Phone size={18}/>} 
            value={profile.additionalNumber} 
            onChange={handleChange} 
            disabled={!editMode} 
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField 
              label="City" 
              name="city" 
              icon={<MapPin size={18}/>} 
              value={profile.city} 
              onChange={handleChange} 
              disabled={!editMode} 
            />
            <InputField 
              label="State" 
              name="state" 
              icon={<MapPin size={18}/>} 
              value={profile.state} 
              onChange={handleChange} 
              disabled={!editMode} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Component for clean code
const InputField = ({ label, name, icon, value, onChange, disabled, tooltip }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-gray-700 flex justify-between">
      {label}
      {tooltip && disabled && <span className="text-[10px] text-gray-400 uppercase tracking-tighter">{tooltip}</span>}
    </label>
    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
        {icon}
      </div>
      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all outline-none
          ${disabled 
            ? "bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed" 
            : "bg-white border-gray-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-50/50"
          }`}
      />
    </div>
  </div>
);

export default MyProfile;