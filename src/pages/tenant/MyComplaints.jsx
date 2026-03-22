
// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { 
//   MessageCircleWarning, Send, Loader2, Star, 
//   CheckCircle2, Clock, AlertCircle, Inbox, 
//   XCircle, MessageSquare, ChevronRight, RefreshCw
// } from "lucide-react";

// const MyComplaints = () => {
//     const apiUrl = import.meta.env.VITE_API_URL;
//     const token = sessionStorage.getItem("token");
//     const mobile = sessionStorage.getItem("mobile");

//     const [leases, setLeases] = useState([]);
//     const [complaints, setComplaints] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [isSyncing, setIsSyncing] = useState(false); // Background update indicator
//     const [activeTab, setActiveTab] = useState("all");
    
//     const [ratingComment, setRatingComment] = useState("");
//     const [selectedRating, setSelectedRating] = useState(5);

//     const [form, setForm] = useState({
//         propertyId: "",
//         title: "",
//         description: ""
//     });

//     const statusConfig = {
//         pending: { color: "bg-rose-100 text-rose-700 border-rose-200", icon: <AlertCircle size={14} /> },
//         in_progress: { color: "bg-amber-100 text-amber-700 border-amber-200", icon: <Clock size={14} /> },
//         resolved: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <CheckCircle2 size={14} /> },
//         closed: { color: "bg-slate-100 text-slate-700 border-slate-200", icon: <XCircle size={14} /> }
//     };

//     const fetchLeases = async () => {
//         try {
//             const res = await axios.get(`${apiUrl}/api/propertyRequest/lease/tenant/${mobile}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setLeases(res.data.data || []);
//         } catch (error) { console.error("Lease Fetch Error:", error); }
//     };

//     // Memoized fetch logic for the Heartbeat
//     const fetchComplaints = useCallback(async (isSilent = false) => {
//         if (!isSilent) setLoading(true);
//         setIsSyncing(true);
//         try {
//             const res = await axios.get(`${apiUrl}/api/complaints/tenant/${mobile}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             const data = Array.isArray(res.data) ? res.data : res.data.data || [];
//             setComplaints(data);
//         } catch (error) { 
//             console.error("Complaint Fetch Error:", error); 
//         } finally {
//             setLoading(false);
//             setIsSyncing(false);
//         }
//     }, [apiUrl, mobile, token]);

//     // HEARTBEAT EFFECT: Syncs state every 5 seconds
//     useEffect(() => {
//         fetchLeases();
//         fetchComplaints();

//         const heartbeat = setInterval(() => {
//             fetchComplaints(true); // Silent update in background
//         }, 5000); 

//         return () => clearInterval(heartbeat);
//     }, [fetchComplaints]);

//     const submitComplaint = async (e) => {
//         e.preventDefault();
//         if (!form.propertyId) return alert("Select a property");
//         try {
//             setLoading(true);
//             await axios.post(`${apiUrl}/api/complaints/create`, {
//                 mobile, ...form, status: "pending" 
//             }, { headers: { Authorization: `Bearer ${token}` } });
//             setForm({ propertyId: "", title: "", description: "" });
//             fetchComplaints(true); // Immediate update
//         } catch (error) { alert("Submission failed"); } 
//         finally { setLoading(false); }
//     };

//     const handleFeedbackSubmit = async (complaintId) => {
//         try {
//             await axios.post(`${apiUrl}/api/feedback/create`, {
//                 complaintId, 
//                 mobile, 
//                 rating: Number(selectedRating), 
//                 comment: ratingComment
//             }, { headers: { Authorization: `Bearer ${token}` } });
            
//             alert("Feedback sent!");
//             setRatingComment("");
//             fetchComplaints(true);
//         } catch (error) { alert("Feedback failed"); }
//     };

//     const filteredComplaints = activeTab === "all" ? complaints : complaints.filter(c => c.status === activeTab);

//     return (
//         <div className="h-screen flex flex-col bg-slate-50 font-sans text-slate-900 overflow-hidden">
            
//             {/* Header */}
//             <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
//                 <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
//                     <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-md">
//                         <MessageCircleWarning size={20} />
//                     </div>
//                     Support Center
//                     {isSyncing && <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />}
//                 </h2>
                
//                 <div className="flex bg-slate-100 p-1 rounded-xl w-fit border border-slate-200">
//                     {['all', 'in_progress', 'resolved', 'closed'].map((tab) => (
//                         <button
//                             key={tab}
//                             onClick={() => setActiveTab(tab)}
//                             className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all capitalize ${
//                                 activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
//                             }`}
//                         >
//                             {tab.replace('_', ' ')}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Scrollable Container */}
//             <div className="flex-1 overflow-y-auto p-4 md:p-8">
//                 <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 h-full">
                    
//                     {/* Sticky Sidebar Form */}
//                     <div className="lg:col-span-4">
//                         <div className="lg:sticky lg:top-0 bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
//                             <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
//                                 New Request <ChevronRight size={16} className="text-slate-400" />
//                             </h3>
//                             <form onSubmit={submitComplaint} className="space-y-4">
//                                 <select
//                                     value={form.propertyId}
//                                     onChange={(e) => setForm({...form, propertyId: e.target.value})}
//                                     required
//                                     className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
//                                 >
//                                     <option value="">Select Property</option>
//                                     {leases.map((l) => (
//                                         <option key={l._id} value={l.property?._id}>
//                                             {l.property?.title || "Unknown Property"}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <input
//                                     type="text"
//                                     placeholder="Issue Subject"
//                                     value={form.title}
//                                     onChange={(e) => setForm({...form, title: e.target.value})}
//                                     required
//                                     className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
//                                 />
//                                 <textarea
//                                     placeholder="Tell us more about the problem..."
//                                     value={form.description}
//                                     onChange={(e) => setForm({...form, description: e.target.value})}
//                                     rows="4"
//                                     required
//                                     className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl text-sm outline-none resize-none focus:ring-2 focus:ring-indigo-500/20"
//                                 />
//                                 <button
//                                     type="submit"
//                                     disabled={loading}
//                                     className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-indigo-600 transition-all shadow-lg disabled:opacity-50"
//                                 >
//                                     {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
//                                     Submit Ticket
//                                 </button>
//                             </form>
//                         </div>
//                     </div>

//                     {/* Complaints Feed */}
//                     <div className="lg:col-span-8 space-y-4">
//                         {loading && !isSyncing ? (
//                             <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-600" /></div>
//                         ) : filteredComplaints.length === 0 ? (
//                             <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-20 text-center">
//                                 <Inbox className="text-slate-300 mx-auto mb-4" size={48} />
//                                 <p className="text-slate-400 font-bold">No active tickets.</p>
//                             </div>
//                         ) : (
//                             filteredComplaints.map((complaint) => (
//                                 <div key={complaint._id} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden group hover:border-indigo-200 transition-all">
//                                     <div className="p-6 md:p-8">
//                                         <div className="flex justify-between items-start mb-4">
//                                             <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-1 rounded-full border ${statusConfig[complaint.status]?.color || "bg-slate-100"}`}>
//                                                 {statusConfig[complaint.status]?.icon}
//                                                 {complaint.status?.replace('_', ' ')}
//                                             </span>
//                                             <span className="text-slate-300 text-[10px] font-mono font-bold tracking-tighter">ID: {complaint._id.slice(-6).toUpperCase()}</span>
//                                         </div>
                                        
//                                         <h4 className="font-bold text-slate-900 text-xl mb-2 tracking-tight">{complaint.title}</h4>
//                                         <p className="text-slate-500 text-sm leading-relaxed mb-6">{complaint.description}</p>

//                                         {/* Response Section */}
//                                         {complaint.response && (
//                                             <div className="relative mt-4 flex gap-4 bg-indigo-50/50 p-5 rounded-3xl border border-indigo-100 shadow-inner">
//                                                 <div className="bg-white p-2.5 rounded-xl shadow-sm h-fit shrink-0">
//                                                     <MessageSquare className="text-indigo-600" size={20} />
//                                                 </div>
//                                                 <div className="flex-1">
//                                                     <div className="flex items-center justify-between mb-2">
//                                                         <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Official Response</span>
//                                                         <span className="text-[10px] text-slate-400 font-medium">Updated: {new Date(complaint.updatedAt).toLocaleDateString()}</span>
//                                                     </div>
//                                                     <p className="text-sm text-slate-700 font-medium leading-relaxed italic">
//                                                         "{complaint.response}"
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {/* Feedback Action */}
//                                         {complaint.status === "resolved" && !complaint.feedback && (
//                                             <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
//                                                 <div className="flex bg-slate-100 p-1 rounded-xl">
//                                                     {[5,4,3,2,1].map(num => (
//                                                         <button 
//                                                             key={num} 
//                                                             onClick={() => setSelectedRating(num)}
//                                                             className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${selectedRating === num ? 'bg-white text-amber-500 shadow-sm' : 'text-slate-400'}`}
//                                                         >
//                                                             {num}
//                                                         </button>
//                                                     ))}
//                                                 </div>
//                                                 <input
//                                                     type="text"
//                                                     placeholder="Brief feedback..."
//                                                     value={ratingComment}
//                                                     className="flex-1 bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500/20"
//                                                     onChange={(e) => setRatingComment(e.target.value)}
//                                                 />
//                                                 <button 
//                                                     onClick={() => handleFeedbackSubmit(complaint._id)}
//                                                     className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all"
//                                                 >
//                                                     Send
//                                                 </button>
//                                             </div>
//                                         )}

//                                         {complaint.feedback && (
//                                             <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-50 w-fit px-4 py-1.5 rounded-full border border-emerald-100">
//                                                 <Star size={12} fill="currentColor" /> {complaint.feedback.rating}/5 RATING LOGGED
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MyComplaints;



// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import {
//   MessageCircleWarning, Send, Loader2,
//   CheckCircle2, Clock, AlertCircle, Inbox,
//   XCircle, MessageSquare, ChevronRight, RefreshCw
// } from "lucide-react";

// const MyComplaints = () => {
//     const apiUrl = import.meta.env.VITE_API_URL;
//     const token = sessionStorage.getItem("token");
//     const mobile = sessionStorage.getItem("mobile");

//     const [leases, setLeases] = useState([]);
//     const [complaints, setComplaints] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [isSyncing, setIsSyncing] = useState(false);
//     const [activeTab, setActiveTab] = useState("all");

//     const [form, setForm] = useState({
//         propertyId: "",
//         title: "",
//         description: ""
//     });

//     const statusConfig = {
//         pending: { color: "bg-rose-100 text-rose-700 border-rose-200", icon: <AlertCircle size={14} /> },
//         in_progress: { color: "bg-amber-100 text-amber-700 border-amber-200", icon: <Clock size={14} /> },
//         resolved: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <CheckCircle2 size={14} /> },
//         closed: { color: "bg-slate-100 text-slate-700 border-slate-200", icon: <XCircle size={14} /> }
//     };

//     const fetchLeases = async () => {
//         const res = await axios.get(`${apiUrl}/api/propertyRequest/lease/tenant/${mobile}`, {
//             headers: { Authorization: `Bearer ${token}` }
//         });
//         setLeases(res.data.data || []);
//     };

//     const fetchComplaints = useCallback(async (silent = false) => {
//         if (!silent) setLoading(true);
//         setIsSyncing(true);

//         const res = await axios.get(`${apiUrl}/api/complaints/tenant/${mobile}`, {
//             headers: { Authorization: `Bearer ${token}` }
//         });

//         setComplaints(res.data || []);
//         setLoading(false);
//         setIsSyncing(false);
//     }, [apiUrl, mobile, token]);

//     useEffect(() => {
//         fetchLeases();
//         fetchComplaints();

//         const interval = setInterval(() => fetchComplaints(true), 5000);
//         return () => clearInterval(interval);
//     }, [fetchComplaints]);

//     const submitComplaint = async (e) => {
//         e.preventDefault();

//         await axios.post(`${apiUrl}/api/complaints/create`, {
//             mobile,
//             ...form
//         }, { headers: { Authorization: `Bearer ${token}` } });

//         setForm({ propertyId: "", title: "", description: "" });
//         fetchComplaints(true);
//     };

//     const filtered = activeTab === "all"
//         ? complaints
//         : complaints.filter(c => c.status === activeTab);

//     return (
//         <div className="p-6">
//             <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <MessageCircleWarning /> Complaints
//                 {isSyncing && <RefreshCw className="animate-spin w-4" />}
//             </h2>

//             {/* Form */}
//             <form onSubmit={submitComplaint} className="space-y-3 mb-6">
//                 <select
//                     value={form.propertyId}
//                     onChange={(e) => setForm({ ...form, propertyId: e.target.value })}
//                     required
//                     className="border p-2 w-full"
//                 >
//                     <option value="">Select Property</option>
//                     {leases.map(l => (
//                         <option key={l._id} value={l.property?._id}>
//                             {l.property?.title}
//                         </option>
//                     ))}
//                 </select>

//                 <input
//                     placeholder="Title"
//                     value={form.title}
//                     onChange={(e) => setForm({ ...form, title: e.target.value })}
//                     className="border p-2 w-full"
//                 />

//                 <textarea
//                     placeholder="Description"
//                     value={form.description}
//                     onChange={(e) => setForm({ ...form, description: e.target.value })}
//                     className="border p-2 w-full"
//                 />

//                 <button className="bg-black text-white px-4 py-2 flex gap-2 items-center">
//                     <Send size={16} /> Submit
//                 </button>
//             </form>

//             {/* Complaints List */}
//             {loading ? <Loader2 className="animate-spin" /> : (
//                 filtered.length === 0 ? <p>No complaints</p> :
//                 filtered.map(c => (
//                     <div key={c._id} className="border p-4 mb-3 rounded">
//                         <h4 className="font-bold">{c.title}</h4>
//                         <p>{c.description}</p>

//                         <span className="text-xs">
//                             {statusConfig[c.status]?.icon} {c.status}
//                         </span>

//                         {c.response && (
//                             <p className="mt-2 text-blue-600">
//                                 Response: {c.response}
//                             </p>
//                         )}
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default MyComplaints;





import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { 
  MessageCircleWarning, Send, Loader2, 
  CheckCircle2, Clock, AlertCircle, Inbox, 
  XCircle, MessageSquare, ChevronRight, RefreshCw
} from "lucide-react";

const MyComplaints = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = sessionStorage.getItem("token");
    const mobile = sessionStorage.getItem("mobile");

    const [leases, setLeases] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [activeTab, setActiveTab] = useState("all");

    const [form, setForm] = useState({ propertyId: "", title: "", description: "" });

    const statusConfig = {
        pending: { color: "bg-rose-100 text-rose-700 border-rose-200", icon: <AlertCircle size={14} /> },
        in_progress: { color: "bg-amber-100 text-amber-700 border-amber-200", icon: <Clock size={14} /> },
        resolved: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <CheckCircle2 size={14} /> },
        closed: { color: "bg-slate-100 text-slate-700 border-slate-200", icon: <XCircle size={14} /> }
    };

    const fetchLeases = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/propertyRequest/lease/tenant/${mobile}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLeases(res.data.data || []);
        } catch (error) { console.error(error); }
    };

    const fetchComplaints = useCallback(async (silent = false) => {
        if (!silent) setLoading(true);
        setIsSyncing(true);
        try {
            const res = await axios.get(`${apiUrl}/api/complaints/tenant/${mobile}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setComplaints(res.data || res.data.data || []);
        } catch (error) { console.error(error); }
        finally { setLoading(false); setIsSyncing(false); }
    }, [apiUrl, mobile, token]);

    useEffect(() => {
        fetchLeases();
        fetchComplaints();
        const interval = setInterval(() => fetchComplaints(true), 5000);
        return () => clearInterval(interval);
    }, [fetchComplaints]);

    const submitComplaint = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${apiUrl}/api/complaints/create`, { mobile, ...form }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setForm({ propertyId: "", title: "", description: "" });
            fetchComplaints(true);
        } catch (error) { alert("Failed to submit"); }
        finally { setLoading(false); }
    };

    const filtered = activeTab === "all" ? complaints : complaints.filter(c => c.status === activeTab);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-black flex items-center gap-3 tracking-tight">
                    <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-md">
                        <MessageCircleWarning size={20} />
                    </div>
                    My Complaints
                    {isSyncing && <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />}
                </h2>
                
                <div className="flex bg-slate-100 p-1 rounded-xl w-fit border border-slate-200">
                    {['all', 'in_progress', 'resolved', 'closed'].map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)}
                            className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all capitalize ${
                                activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {tab.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4 md:p-8 max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
                {/* Sidebar Form */}
                <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-24 bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">New Ticket <ChevronRight size={16} className="text-slate-400" /></h3>
                        <form onSubmit={submitComplaint} className="space-y-4">
                            <select value={form.propertyId} required className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                                onChange={(e) => setForm({...form, propertyId: e.target.value})}>
                                <option value="">Select Property</option>
                                {leases.map(l => <option key={l._id} value={l.property?._id}>{l.property?.title}</option>)}
                            </select>
                            <input type="text" placeholder="Issue Subject" required className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                                value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
                            <textarea placeholder="Describe the problem..." rows="4" required className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl text-sm outline-none resize-none focus:ring-2 focus:ring-indigo-500/20"
                                value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
                            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-indigo-600 transition-all shadow-lg disabled:opacity-50">
                                {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} Submit Ticket
                            </button>
                        </form>
                    </div>
                </div>

                {/* Feed */}
                <div className="lg:col-span-8 space-y-4">
                    {loading && !isSyncing ? (
                        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-600" /></div>
                    ) : filtered.length === 0 ? (
                        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-20 text-center text-slate-400 font-bold">
                            <Inbox className="mx-auto mb-4" size={48} /> No tickets found.
                        </div>
                    ) : (
                        filtered.map(c => (
                            <div key={c._id} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 md:p-8 hover:border-indigo-200 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-1 rounded-full border ${statusConfig[c.status]?.color}`}>
                                        {statusConfig[c.status]?.icon} {c.status?.replace('_', ' ')}
                                    </span>
                                    <span className="text-slate-300 text-[10px] font-mono font-bold uppercase">ID: {c._id.slice(-6)}</span>
                                </div>
                                <h4 className="font-bold text-slate-900 text-xl mb-2">{c.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6">{c.description}</p>
                                
                                {c.response && (
                                    <div className="flex gap-4 bg-indigo-50/50 p-5 rounded-3xl border border-indigo-100 italic text-sm text-slate-700">
                                        <MessageSquare className="text-indigo-600 shrink-0" size={18} />
                                        <p>"{c.response}"</p>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyComplaints;