import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MapPin, 
  IndianRupee, 
  Calendar, 
  ChevronRight,
  Inbox
} from "lucide-react";

const BookingRequest = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const mobile = sessionStorage.getItem("mobile");

  useEffect(() => {
    if (!mobile) {
      setError("Please log in to view your requests.");
      setLoading(false);
      return;
    }

    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/propertyRequest/user/${mobile}`);
        if (res.data.success) {
          setRequests(res.data.data);
        }
      } catch (err) {
        setError("We couldn't retrieve your requests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [mobile, apiUrl]);

  const filteredRequests = requests.filter(req => 
    filter === "all" ? true : req.status === filter
  );

  const getStatusStyles = (status) => {
    switch (status) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "rejected":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  const StatusIcon = ({ status }) => {
    switch (status) {
      case "approved": return <CheckCircle2 size={16} />;
      case "rejected": return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-indigo-100 rounded-full"></div>
          <div className="absolute top-0 w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-500 font-medium animate-pulse">Loading your requests...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 mb-8">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Bookings
          </h1>
          <p className="text-slate-500 mt-2">Manage and track your property inquiries.</p>
          
          {/* Filter Tabs */}
          <div className="flex gap-6 mt-8">
            {["all", "pending", "approved", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`pb-3 text-sm font-semibold capitalize transition-all relative ${
                  filter === tab ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
                {filter === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {error ? (
          <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl text-center">
            {error}
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full mb-4">
              <Inbox className="text-slate-300" size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No requests found</h3>
            <p className="text-slate-500">You haven't made any requests in this category yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredRequests.map((req) => (
              <div
                key={req._id}
                className="group bg-white border border-slate-200 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between hover:border-indigo-200 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex gap-5 items-start">
                  {/* Visual thumbnail placeholder or icon */}
                  <div className="hidden sm:flex h-16 w-16 bg-slate-100 rounded-xl items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                    <MapPin size={24} />
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {req.property?.title || "Unnamed Property"}
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-slate-400" />
                        {req.property?.location}
                      </div>
                      <div className="flex items-center gap-1 font-medium text-slate-700">
                        <IndianRupee size={14} className="text-slate-400" />
                        {req.property?.rent?.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-slate-400" />
                        {new Date(req.createdAt).toLocaleDateString('en-IN', { 
                          day: 'numeric', month: 'short', year: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 uppercase tracking-wider ${getStatusStyles(req.status)}`}>
                    <StatusIcon status={req.status} />
                    {req.status || "pending"}
                  </span>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingRequest;