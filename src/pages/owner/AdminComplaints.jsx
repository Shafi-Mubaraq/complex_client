// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { MessageCircleWarning, Loader2 } from "lucide-react";

// const AdminComplaints = () => {

//     const apiUrl = import.meta.env.VITE_API_URL;
//     const mobile = sessionStorage.getItem("mobile");

//     const [complaints, setComplaints] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // ================================
//     // Fetch Complaints
//     // ================================

//     const fetchComplaints = async () => {

//         try {

//             const res = await axios.get(
//                 `${apiUrl}/api/complaints/owner/${mobile}`
//             );

//             setComplaints(res.data);

//         } catch (error) {

//             console.error("Complaint fetch error:", error);

//         } finally {

//             setLoading(false);

//         }

//     };

//     // ================================
//     // Update Complaint Status
//     // ================================

//     const updateStatus = async (id, status) => {

//         const response = prompt("Enter response message");

//         if (!response) return;

//         try {

//             await axios.put(`${apiUrl}/api/complaints/update/${id}`, {
//                 status,
//                 response
//             });

//             fetchComplaints();

//         } catch (error) {

//             alert("Failed to update complaint");

//         }

//     };

//     useEffect(() => {

//         fetchComplaints();

//     }, []);

//     return (

//         <div className="p-6 max-w-5xl mx-auto">

//             <div className="flex items-center gap-3 mb-6">
//                 <MessageCircleWarning className="w-7 h-7 text-indigo-600" />
//                 <h2 className="text-2xl font-bold text-slate-800">
//                     Owner Complaints
//                 </h2>
//             </div>

//             {loading && (
//                 <div className="flex items-center gap-2 text-gray-500">
//                     <Loader2 className="animate-spin w-5 h-5" />
//                     Loading complaints...
//                 </div>
//             )}

//             {!loading && complaints.length === 0 && (
//                 <p className="text-gray-500">
//                     No complaints received yet.
//                 </p>
//             )}

//             {complaints.map((complaint) => (

//                 <div
//                     key={complaint._id}
//                     className="bg-white shadow rounded-xl p-5 mb-5 border"
//                 >

//                     {/* Complaint Title */}

//                     <h3 className="text-lg font-semibold text-slate-800">
//                         {complaint.title}
//                     </h3>

//                     <p className="text-gray-600 mt-1">
//                         {complaint.description}
//                     </p>

//                     {/* Property */}

//                     <div className="mt-3 text-sm text-gray-700">

//                         <p>
//                             <b>Tenant:</b> {complaint.tenant?.fullName} ({complaint.tenant?.mobile})
//                         </p>

//                         <p>
//                             <b>Property:</b> {complaint.property?.title}
//                         </p>

//                     </div>

//                     {/* Status */}

//                     <div className="flex justify-between mt-3 text-sm">

//                         <span className="font-semibold">
//                             Status: {complaint.status}
//                         </span>

//                         <span className="text-gray-400">
//                             {new Date(complaint.createdAt).toLocaleDateString()}
//                         </span>

//                     </div>

//                     {/* Owner Response */}

//                     {complaint.response && (

//                         <div className="mt-3 text-green-600 text-sm">
//                             Owner Response: {complaint.response}
//                         </div>

//                     )}

//                     {/* ⭐ Tenant Feedback */}

//                     {complaint.feedback && (

//                         <div className="mt-4 border-t pt-3 bg-yellow-50 p-3 rounded-lg">

//                             <p className="font-semibold text-yellow-700">
//                                 Tenant Feedback
//                             </p>

//                             <p className="text-lg">
//                                 {"⭐".repeat(complaint.feedback.rating)}
//                             </p>

//                             {complaint.feedback.comment && (
//                                 <p className="text-gray-700 mt-1">
//                                     {complaint.feedback.comment}
//                                 </p>
//                             )}

//                         </div>

//                     )}

//                     {/* Action Buttons */}

//                     <div className="flex gap-2 mt-4">

//                         <button
//                             onClick={() => updateStatus(complaint._id, "in_progress")}
//                             className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                         >
//                             In Progress
//                         </button>

//                         <button
//                             onClick={() => updateStatus(complaint._id, "resolved")}
//                             className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//                         >
//                             Resolve
//                         </button>

//                         <button
//                             onClick={() => updateStatus(complaint._id, "closed")}
//                             className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
//                         >
//                             Close
//                         </button>

//                     </div>

//                 </div>

//             ))}

//         </div>

//     );

// };

// export default AdminComplaints;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { MessageCircleWarning, Loader2, X, CheckCircle2, Clock, Ban, Star } from "lucide-react";

const AdminComplaints = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = sessionStorage.getItem("token");
    const mobile = sessionStorage.getItem("mobile");

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [statusToUpdate, setStatusToUpdate] = useState("");
    const [ownerResponse, setOwnerResponse] = useState("");

    const fetchComplaints = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/complaints/owner/${mobile}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setComplaints(res.data);
        } catch (error) {
            console.error("Complaint fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateClick = (id, status) => {
        setSelectedId(id);
        setStatusToUpdate(status);
        setShowModal(true);
    };

    const submitStatusUpdate = async () => {
        if (!ownerResponse.trim()) return alert("Please enter a response message.");

        try {
            await axios.put(`${apiUrl}/api/complaints/update/${selectedId}`, 
                { status: statusToUpdate, response: ownerResponse },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setShowModal(false);
            setOwnerResponse("");
            fetchComplaints();
        } catch (error) {
            alert("Failed to update complaint");
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case "resolved": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "in_progress": return "bg-amber-100 text-amber-700 border-amber-200";
            case "closed": return "bg-slate-100 text-slate-700 border-slate-200";
            default: return "bg-rose-100 text-rose-700 border-rose-200";
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto min-h-screen bg-slate-50/50">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-600 p-2 rounded-lg">
                        <MessageCircleWarning className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                        Maintenance Requests
                    </h2>
                </div>
                <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full shadow-sm border">
                    {complaints.length} Total Issues
                </span>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                    <Loader2 className="animate-spin w-10 h-10 mb-4 text-indigo-600" />
                    <p className="font-medium">Loading complaints...</p>
                </div>
            ) : complaints.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
                    <p className="text-slate-400">No complaints received yet.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {complaints.map((complaint) => (
                        <div key={complaint._id} className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl p-6 border border-slate-200">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">{complaint.title}</h3>
                                    <p className="text-slate-500 text-sm mt-1 leading-relaxed">{complaint.description}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusStyle(complaint.status)}`}>
                                    {complaint.status.replace("_", " ")}
                                </span>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4 py-4 border-y border-slate-100 my-4 text-sm">
                                <div className="space-y-1">
                                    <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">Tenant Details</p>
                                    <p className="text-slate-700 font-semibold">{complaint.tenant?.fullName}</p>
                                    <p className="text-slate-500">{complaint.tenant?.mobile}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">Property</p>
                                    <p className="text-slate-700 font-semibold">{complaint.property?.title}</p>
                                    <p className="text-slate-500 italic">{new Date(complaint.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            {/* Owner Response Display */}
                            {complaint.response && (
                                <div className="mb-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                                    <p className="text-[11px] font-bold text-indigo-600 uppercase mb-1">Your Response</p>
                                    <p className="text-sm text-indigo-900">{complaint.response}</p>
                                </div>
                            )}

                            {/* ⭐ Tenant Feedback Section */}
                            {complaint.feedback && (
                                <div className="mt-4 p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-bold text-amber-800 text-sm flex items-center gap-2">
                                            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                                            Tenant Satisfaction
                                        </p>
                                        <div className="flex text-amber-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-4 h-4 ${i < complaint.feedback.rating ? 'fill-current' : 'text-amber-200'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    {complaint.feedback.comment && (
                                        <p className="text-slate-700 text-sm italic">"{complaint.feedback.comment}"</p>
                                    )}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-2 mt-6">
                                <button onClick={() => handleUpdateClick(complaint._id, "in_progress")} className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm font-bold hover:bg-amber-100 transition-colors">
                                    <Clock size={16} /> In Progress
                                </button>
                                <button onClick={() => handleUpdateClick(complaint._id, "resolved")} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200">
                                    <CheckCircle2 size={16} /> Resolve Issue
                                </button>
                                <button onClick={() => handleUpdateClick(complaint._id, "closed")} className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-900 transition-colors">
                                    <Ban size={16} /> Close
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Overlay */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-800">Update Status</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-sm text-slate-500">Provide a message to the tenant regarding the <span className="font-bold text-slate-800 underline uppercase">{statusToUpdate}</span> status.</p>
                            <textarea 
                                className="w-full border-slate-200 border rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                rows="4"
                                placeholder="e.g., Plumber has been scheduled for tomorrow morning..."
                                value={ownerResponse}
                                onChange={(e) => setOwnerResponse(e.target.value)}
                            />
                        </div>
                        <div className="p-6 bg-slate-50 flex gap-3">
                            <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">
                                Cancel
                            </button>
                            <button onClick={submitStatusUpdate} className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-lg shadow-indigo-100">
                                Confirm Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminComplaints;