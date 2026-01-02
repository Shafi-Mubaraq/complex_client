import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { 
  CheckCircle2, XCircle, Users, 
  Contact2, ClipboardList, CheckCircle, Clock, Loader2,
  Phone, UserCheck, FilterX
} from "lucide-react";

const BookingRequest = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search state focused on contact/identity only
  const [searchContact, setSearchContact] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/propertyRequest/all`);
      setRequests(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const applicantName = req.applicantDetails?.fullName?.toLowerCase() || "";
      const phone = req.applicantDetails?.phoneNumber || "";
      
      // Matches either name or phone number
      return applicantName.includes(searchContact.toLowerCase()) || phone.includes(searchContact);
    });
  }, [searchContact, requests]);

  const stats = useMemo(() => ({
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    completed: requests.filter(r => r.status !== 'pending').length
  }), [requests]);

  const handleAction = async (id, endpoint) => {
    try {
      await axios.put(`${apiUrl}/api/propertyRequest/${endpoint}/${id}`);
      fetchRequests();
    } catch (err) {
      alert("System could not update status.");
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 font-sans antialiased selection:bg-indigo-100">
      {/* Header Section */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-200">
              <ClipboardList className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-slate-800 leading-none uppercase">
                Request Console
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Operational Overview</p>
            </div>
          </div>

          {/* Singular Optimized Search Bar */}
          <div className="relative w-full md:w-96 group">
            <Contact2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search by name or phone number..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 shadow-sm"
              value={searchContact}
              onChange={(e) => setSearchContact(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard label="Total Submissions" value={stats.total} icon={<Users className="text-blue-600" />} bgColor="bg-blue-50" />
          <StatCard label="Pending Review" value={stats.pending} icon={<Clock className="text-amber-600" />} bgColor="bg-amber-50" />
          <StatCard label="Processed" value={stats.completed} icon={<CheckCircle className="text-emerald-600" />} bgColor="bg-emerald-50" />
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden transition-all">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-500">Property Details</th>
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-500">Applicant Identity</th>
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-500">Occupancy</th>
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-500 text-center">Status</th>
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRequests.map((req) => (
                  <tr key={req._id} className="group hover:bg-slate-50 transition-colors duration-150">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {req.property} 
                        </span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-1">
                          {req.propertyType}
                        </span>
                      </div>
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center font-bold text-indigo-600 border border-indigo-100">
                          {req.applicantDetails.fullName.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <p className="font-bold text-slate-700 text-sm leading-tight">{req.applicantDetails.fullName}</p>
                          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-medium">
                            <Phone size={12} className="text-slate-300" /> {req.applicantDetails.phoneNumber}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                          <UserCheck size={14} className="text-indigo-400" />
                          <span>{req.applicantDetails.familyType}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase pl-5">
                          {req.applicantDetails.numberOfMembers} Members
                        </p>
                      </div>
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        <StatusPill status={req.status} />
                      </div>
                    </td>

                    <td className="px-8 py-6 text-right">
                      {req.status === "pending" ? (
                        <div className="flex justify-end gap-3">
                          <button 
                            onClick={() => handleAction(req._id, "reject")}
                            className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all active:scale-90"
                          >
                            <XCircle size={20} />
                          </button>
                          <button 
                            onClick={() => handleAction(req._id, "accept")}
                            className="flex items-center gap-2 px-5 py-2.5 text-[11px] font-black uppercase text-white bg-slate-900 hover:bg-indigo-600 rounded-xl transition-all shadow-md active:scale-95"
                          >
                            <CheckCircle2 size={16} />
                            Approve
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest pr-4">Archived</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredRequests.length === 0 && <EmptyState />}
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ label, value, icon, bgColor }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center justify-between shadow-sm">
    <div className="space-y-1">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-3xl font-black text-slate-800">{value}</p>
    </div>
    <div className={`p-4 rounded-2xl ${bgColor}`}>{icon}</div>
  </div>
);

const StatusPill = ({ status }) => {
  const configs = {
    accepted: "text-emerald-700 bg-emerald-50 border-emerald-100",
    rejected: "text-rose-700 bg-rose-50 border-rose-100",
    pending: "text-amber-700 bg-amber-50 border-amber-100",
  };
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wider ${configs[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === 'accepted' ? 'bg-emerald-500' : status === 'rejected' ? 'bg-rose-500' : 'bg-amber-500 animate-pulse'}`}></span>
      {status}
    </div>
  );
};

const LoadingScreen = () => (
  <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 gap-4">
    <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Loading Console...</p>
  </div>
);

const EmptyState = () => (
  <div className="py-24 flex flex-col items-center justify-center">
    <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 text-slate-200 mb-6 shadow-sm">
      <FilterX size={48} />
    </div>
    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">No Results</h3>
    <p className="text-xs text-slate-400 mt-2 font-medium">Try searching for a different name or phone number.</p>
  </div>
);

export default BookingRequest;