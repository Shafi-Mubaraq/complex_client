// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import {
//     CheckCircle2, XCircle, Users, ClipboardList, CheckCircle,
//     Clock, Loader2, UserCheck, FilterX, Store, ArrowUpRight, Search
// } from "lucide-react";

// const BookingQueue = () => {
    
//     const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [processingId, setProcessingId] = useState(null);
//     const [searchContact, setSearchContact] = useState("");

//     // Fetch all requests
//     const fetchRequests = async () => {
//         try {
//             const res = await axios.get(`${apiUrl}/api/propertyRequest/all`);
//             setRequests(Array.isArray(res.data.data) ? res.data.data : []);
//         } catch (err) {
//             console.error("Fetch error:", err);
//             setRequests([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => { fetchRequests(); }, []);

//     // Filter requests by applicant name or phone
//     const filteredRequests = useMemo(() => {
//         return requests.filter(req => {
//             const name = req.applicant?.fullName?.toLowerCase() || "";
//             const phone = req.applicant?.phoneNumber || "";
//             return name.includes(searchContact.toLowerCase()) || phone.includes(searchContact);
//         });
//     }, [searchContact, requests]);

//     // Stats calculation
//     const stats = useMemo(() => ({
//         total: requests.length,
//         pending: requests.filter(r => r.status === "pending").length,
//         completed: requests.filter(r => r.status !== "pending").length
//     }), [requests]);

//     // Accept or Reject handler
//     const handleAction = async (id, endpoint) => {
//         setProcessingId(id);
//         try {
//             await axios.put(`${apiUrl}/api/propertyRequest/${endpoint}/${id}`);
//             await fetchRequests();
//         } catch (err) {
//             alert(err.response?.data?.message || "System could not update status.");
//         } finally {
//             setProcessingId(null);
//         }
//     };

//     if (loading) return <LoadingScreen />;

//     return (
//         <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-700">

//             {/* Header */}
//             <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
//                 <div className="max-w-[1600px] mx-auto py-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
//                     <div className="flex items-center gap-5">
//                         <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-2.5 rounded-xl shadow-lg shadow-indigo-200/50">
//                             <ClipboardList className="text-white" size={24} />
//                         </div>
//                         <div>
//                             <h1 className="text-xl font-bold tracking-tight text-slate-900">Request Console</h1>
//                             <div className="flex items-center gap-2 mt-0.5">
//                                 <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
//                                 <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Live System Feed</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="relative w-full md:w-[400px]">
//                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//                         <input
//                             type="text"
//                             placeholder="Search applicants..."
//                             className="w-full pl-12 pr-4 py-2.5 bg-slate-100/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
//                             value={searchContact}
//                             onChange={e => setSearchContact(e.target.value)}
//                         />
//                     </div>
//                 </div>
//             </header>

//             <main className="max-w-[1600px] mx-auto py-8 space-y-8">
//                 {/* Stats */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <StatCard label="Total Submissions" value={stats.total} icon={<Users className="text-indigo-600" />} />
//                     <StatCard label="Pending Review" value={stats.pending} icon={<Clock className="text-amber-500" />} />
//                     <StatCard label="Processed" value={stats.completed} icon={<CheckCircle className="text-emerald-500" />} />
//                 </div>

//                 {/* Table */}
//                 <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//                     <div className="overflow-x-auto">
//                         <table className="w-full text-left">
//                             <thead>
//                                 <tr className="bg-slate-50/50 border-b border-slate-100">
//                                     <th className="px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Property Details</th>
//                                     <th className="px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Applicant</th>
//                                     <th className="px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Usage Info</th>
//                                     <th className="px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400 text-center">Status</th>
//                                     <th className="px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400 text-right">Management</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-slate-100">
//                                 {filteredRequests.map(req => (
//                                     <tr key={req._id} className="hover:bg-slate-50/80 transition-all duration-200">
//                                         {/* Property */}
//                                         <td className="px-8 py-5">
//                                             <div className="flex flex-col">
//                                                 <span className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
//                                                     {req.property?.title} <ArrowUpRight size={14} className="text-slate-300" />
//                                                 </span>
//                                                 <span className={`text-[10px] font-bold uppercase mt-1 px-2 py-0.5 rounded w-fit ${req.propertyType === 'house' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
//                                                     {req.propertyType}
//                                                 </span>
//                                             </div>
//                                         </td>

//                                         {/* Applicant */}
//                                         <td className="px-8 py-5">
//                                             <div className="flex items-center gap-3">
//                                                 <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs border border-slate-200">
//                                                     {req.applicant?.fullName?.charAt(0)}
//                                                 </div>
//                                                 <div className="flex flex-col">
//                                                     <p className="font-semibold text-slate-700 text-sm">{req.applicant?.fullName}</p>
//                                                     <p className="text-xs text-slate-400 font-medium">{req.applicant?.phoneNumber}</p>
//                                                 </div>
//                                             </div>
//                                         </td>

//                                         {/* Usage */}
//                                         <td className="px-8 py-5">
//                                             {req.propertyType === "house" ? (
//                                                 <div className="flex flex-col text-xs text-slate-600 font-medium">
//                                                     <span className="flex items-center gap-1.5"><UserCheck size={14} className="text-slate-400" /> {req.houseDetails?.familyType}</span>
//                                                     <span className="text-[10px] text-slate-400 mt-1">{req.houseDetails?.numberOfMembers} Residents</span>
//                                                 </div>
//                                             ) : (
//                                                 <div className="flex flex-col text-xs text-slate-600 font-medium">
//                                                     <span className="flex items-center gap-1.5"><Store size={14} className="text-slate-400" /> {req.shopDetails?.businessName}</span>
//                                                     <span className="text-[10px] text-slate-400 mt-1">{req.shopDetails?.businessType} • {req.shopDetails?.numberOfEmployees} Staff</span>
//                                                 </div>
//                                             )}
//                                         </td>

//                                         {/* Status */}
//                                         <td className="px-8 py-5 text-center">
//                                             <StatusPill status={req.status} />
//                                         </td>

//                                         {/* Management */}
//                                         <td className="px-8 py-5 text-right">
//                                             {req.status === "pending" ? (
//                                                 <div className="flex justify-end gap-2">
//                                                     <button
//                                                         disabled={processingId === req._id}
//                                                         onClick={() => handleAction(req._id, "reject")}
//                                                         className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
//                                                     ><XCircle size={18} /></button>

//                                                     <button
//                                                         disabled={processingId === req._id}
//                                                         onClick={() => handleAction(req._id, "accept")}
//                                                         className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase text-white bg-slate-900 hover:bg-indigo-600 rounded-lg transition-all shadow-sm disabled:opacity-50"
//                                                     >
//                                                         {processingId === req._id ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
//                                                         Approve
//                                                     </button>
//                                                 </div>
//                                             ) : (
//                                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1 border border-slate-100 rounded-md">Archive</span>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                     {filteredRequests.length === 0 && <EmptyState />}
//                 </div>
//             </main>
//         </div>
//     );
// };

// /* --- Sub-Components --- */
// const StatCard = ({ label, value, icon }) => (
//     <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
//         <div>
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">{label}</p>
//             <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
//         </div>
//         <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">{icon}</div>
//     </div>
// );

// const StatusPill = ({ status }) => {
//     const configs = {
//         accepted: "text-emerald-700 bg-emerald-50 border-emerald-100",
//         rejected: "text-rose-700 bg-rose-50 border-rose-100",
//         pending: "text-amber-700 bg-amber-50 border-amber-100",
//     };
//     return (
//         <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${configs[status]}`}>
//             <span className={`h-1.5 w-1.5 rounded-full ${status === 'accepted' ? 'bg-emerald-500' : status === 'rejected' ? 'bg-rose-500' : 'bg-amber-500 animate-pulse'}`}></span>
//             {status}
//         </div>
//     );
// };

// const LoadingScreen = () => (
//     <div className="flex h-screen w-full flex-col items-center justify-center bg-[#F8FAFC] gap-4">
//         <div className="relative">
//             <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
//             <div className="absolute inset-0 h-12 w-12 border-4 border-indigo-100 rounded-full -z-10"></div>
//         </div>
//         <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Syncing Data</p>
//     </div>
// );

// const EmptyState = () => (
//     <div className="py-32 flex flex-col items-center justify-center text-center">
//         <div className="bg-slate-50 p-6 rounded-full mb-4">
//             <FilterX size={40} className="text-slate-200" />
//         </div>
//         <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">No requests found</h3>
//         <p className="text-xs text-slate-400 mt-2 font-medium">Try adjusting your filters or search terms.</p>
//     </div>
// );

// export default BookingQueue;




import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  CheckCircle2, XCircle, Users, Clock, Loader2, 
  Search, Home, Phone, Calendar, Banknote, X
} from "lucide-react";

const BookingQueue = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [searchContact, setSearchContact] = useState("");
  const [showLeaseModal, setShowLeaseModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const [leaseData, setLeaseData] = useState({
    startDate: "",
    endDate: "",
    monthlyRent: "",
    depositAmount: ""
  });

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/propertyRequest/all`);
      setRequests(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const name = req.applicantUser?.fullName?.toLowerCase() || "";
      const phone = req.applicantUser?.mobile || "";
      return name.includes(searchContact.toLowerCase()) || phone.includes(searchContact);
    });
  }, [searchContact, requests]);

//   const handleAction = async (id, action) => {

//     setProcessingId(id);
//     try {
//       await axios.put(`${apiUrl}/api/propertyRequest/${action}/${id}`);
//       if (action === 'accept') {
//         setSelectedRequestId(id);
//         setShowLeaseModal(true);
//       }
//       await fetchRequests();
//     } catch (err) {
//       alert(err.response?.data?.message || "Operation failed");
//     } finally {
//       setProcessingId(null);
//     }
//   };


const handleAction = async (id, action) => {

  if (action === "accept") {
    setSelectedRequestId(id);
    setShowLeaseModal(true);
    return; // ❗ DO NOT call backend yet
  }

  if (action === "reject") {
    try {
      setProcessingId(id);
      await axios.put(`${apiUrl}/api/propertyRequest/reject/${id}`);
      await fetchRequests();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    } finally {
      setProcessingId(null);
    }
  }
};
//   const createLease = async () => {
//     try {
//       await axios.post(`${apiUrl}/api/propertyRequest/create-lease/${selectedRequestId}`, leaseData);
//       alert("Lease Created Successfully");
//       setShowLeaseModal(false);
//       setLeaseData({ startDate: "", endDate: "", monthlyRent: "", depositAmount: "" });
//     } catch (err) {
//       alert(err.response?.data?.message || "Lease creation failed");
//     }
//   };

const createLease = async () => {

  if (!leaseData.startDate || !leaseData.monthlyRent) {
    alert("Start Date and Monthly Rent are required");
    return;
  }

  try {
    setProcessingId(selectedRequestId);

    // 1️⃣ First Accept Request
    await axios.put(
      `${apiUrl}/api/propertyRequest/accept/${selectedRequestId}`
    );

    // 2️⃣ Then Create Lease
    await axios.post(
      `${apiUrl}/api/propertyRequest/create-lease/${selectedRequestId}`,
      {
        startDate: leaseData.startDate,
        endDate: leaseData.endDate,
        monthlyRent: Number(leaseData.monthlyRent),
        depositAmount: Number(leaseData.depositAmount)
      }
    );

    alert("Lease Created Successfully");

    setShowLeaseModal(false);
    setLeaseData({
      startDate: "",
      endDate: "",
      monthlyRent: "",
      depositAmount: ""
    });

    await fetchRequests();

  } catch (err) {
    alert(err.response?.data?.message || "Lease creation failed");
  } finally {
    setProcessingId(null);
  }
};

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="text-indigo-600" /> Booking Requests
            </h1>
            <p className="text-slate-500 text-sm">Review and manage tenant applications</p>
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search by name or mobile..."
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl w-full md:w-80 shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              value={searchContact}
              onChange={e => setSearchContact(e.target.value)}
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Property Details</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Applicant</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.map(req => (
                <tr key={req._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                        <Home size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{req.property?.title}</p>
                        <p className="text-xs text-slate-500 italic">{req.property?.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-slate-900">{req.applicantUser?.fullName}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Phone size={12} /> {req.applicantUser?.mobile}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold capitalize border ${
                      req.status === 'accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      req.status === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                      'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {req.status === 'pending' && <Clock size={12} />}
                      {req.status === 'accepted' && <CheckCircle2 size={12} />}
                      {req.status === 'rejected' && <XCircle size={12} />}
                      {req.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {req.status === "pending" ? (
                      <div className="flex justify-end gap-2">
                        <button
                          disabled={processingId === req._id}
                          onClick={() => handleAction(req._id, 'reject')}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100"
                          title="Reject Application"
                        >
                          <XCircle size={20} />
                        </button>
                        <button
                          disabled={processingId === req._id}
                          onClick={() => handleAction(req._id, 'accept')}
                          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm disabled:opacity-50"
                        >
                          {processingId === req._id ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
                          Approve
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredRequests.length === 0 && (
            <div className="p-20 text-center text-slate-400">
              No matching requests found.
            </div>
          )}
        </div>
      </div>

      {/* Lease Modal */}
      {showLeaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowLeaseModal(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowLeaseModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2"
            >
              <X size={20} />
            </button>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">Finalize Lease Agreement</h2>
              <p className="text-sm text-slate-500">Enter the contract details to complete approval.</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase ml-1">Start Date</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                      value={leaseData.startDate}
                      onChange={e => setLeaseData({ ...leaseData, startDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase ml-1">End Date</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                      value={leaseData.endDate}
                      onChange={e => setLeaseData({ ...leaseData, endDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase ml-1">Monthly Rent</label>
                <div className="relative">
                  <Banknote size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                    value={leaseData.monthlyRent}
                    onChange={e => setLeaseData({ ...leaseData, monthlyRent: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase ml-1">Security Deposit</label>
                <div className="relative">
                  <Banknote size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                    value={leaseData.depositAmount}
                    onChange={e => setLeaseData({ ...leaseData, depositAmount: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all"
                  onClick={() => setShowLeaseModal(false)}
                >
                  Later
                </button>
                <button
                  className="flex-1 px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                  onClick={createLease}
                >
                  Generate Lease
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingQueue;