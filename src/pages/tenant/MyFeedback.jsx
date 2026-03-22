// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Star, Loader2 } from "lucide-react";

// const MyFeedback = () => {
//     const apiUrl = import.meta.env.VITE_API_URL;
//     const token = sessionStorage.getItem("token");
//     const mobile = sessionStorage.getItem("mobile");

//     const [complaints, setComplaints] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const [rating, setRating] = useState(5);
//     const [comment, setComment] = useState("");

//     const fetchData = async () => {
//         setLoading(true);

//         const res = await axios.get(`${apiUrl}/api/complaints/tenant/${mobile}`, {
//             headers: { Authorization: `Bearer ${token}` }
//         });

//         // Only resolved complaints
//         const resolved = res.data.filter(c => c.status === "resolved");
//         setComplaints(resolved);

//         setLoading(false);
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const submitFeedback = async (id) => {
//         await axios.post(`${apiUrl}/api/feedback/create`, {
//             complaintId: id,
//             mobile,
//             rating,
//             comment
//         }, {
//             headers: { Authorization: `Bearer ${token}` }
//         });

//         alert("Feedback submitted");
//         setComment("");
//         fetchData();
//     };

//     return (
//         <div className="p-6">
//             <h2 className="text-xl font-bold mb-4">Feedback</h2>

//             {loading ? <Loader2 className="animate-spin" /> : (
//                 complaints.length === 0 ? <p>No resolved complaints</p> :
//                 complaints.map(c => (
//                     <div key={c._id} className="border p-4 mb-4 rounded">
//                         <h4 className="font-bold">{c.title}</h4>
//                         <p>{c.description}</p>

//                         {/* Feedback Form */}
//                         {!c.feedback ? (
//                             <div className="mt-3 flex gap-2 items-center">
//                                 <select
//                                     value={rating}
//                                     onChange={(e) => setRating(e.target.value)}
//                                     className="border p-1"
//                                 >
//                                     {[5,4,3,2,1].map(n => (
//                                         <option key={n} value={n}>{n}</option>
//                                     ))}
//                                 </select>

//                                 <input
//                                     placeholder="Comment"
//                                     value={comment}
//                                     onChange={(e) => setComment(e.target.value)}
//                                     className="border p-1"
//                                 />

//                                 <button
//                                     onClick={() => submitFeedback(c._id)}
//                                     className="bg-blue-600 text-white px-3 py-1"
//                                 >
//                                     Submit
//                                 </button>
//                             </div>
//                         ) : (
//                             <div className="mt-2 text-green-600 flex items-center gap-2">
//                                 <Star size={14} /> {c.feedback.rating}/5 Submitted
//                             </div>
//                         )}
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default MyFeedback;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, Loader2, CheckCircle2, Inbox, Send, MessageSquare } from "lucide-react";

const MyFeedback = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = sessionStorage.getItem("token");
    const mobile = sessionStorage.getItem("mobile");

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${apiUrl}/api/complaints/tenant/${mobile}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const resolved = (res.data || []).filter(c => c.status === "resolved");
            setComplaints(resolved);
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    const submitFeedback = async (id) => {
        try {
            await axios.post(`${apiUrl}/api/feedback/create`, {
                complaintId: id, mobile, rating: Number(rating), comment
            }, { headers: { Authorization: `Bearer ${token}` } });
            setComment("");
            fetchData();
        } catch (error) { alert("Submission failed"); }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="mb-10 text-center md:text-left">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 justify-center md:justify-start">
                        <div className="bg-amber-500 p-2 rounded-lg text-white shadow-md">
                            <Star size={24} fill="currentColor" />
                        </div>
                        Service Feedback
                    </h2>
                    <p className="text-slate-500 mt-2 font-medium">Help us improve by rating your resolved issues.</p>
                </header>

                {loading ? (
                    <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-600" /></div>
                ) : complaints.length === 0 ? (
                    <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-20 text-center text-slate-400 font-bold">
                        <Inbox className="mx-auto mb-4" size={48} />
                        No resolved tickets pending feedback.
                    </div>
                ) : (
                    <div className="space-y-6">
                        {complaints.map(c => (
                            <div key={c._id} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 md:p-8 overflow-hidden">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-widest">Resolved</span>
                                    <span className="text-slate-300 text-[10px] font-mono">ID: {c._id.slice(-6).toUpperCase()}</span>
                                </div>
                                <h4 className="font-bold text-slate-900 text-xl mb-2">{c.title}</h4>
                                <p className="text-slate-500 text-sm mb-6">{c.description}</p>

                                {!c.feedback ? (
                                    <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <div className="flex bg-slate-100 p-1 rounded-xl">
                                                {[5,4,3,2,1].map(n => (
                                                    <button key={n} onClick={() => setRating(n)}
                                                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${rating === n ? 'bg-white text-amber-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                                                        {n}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="flex-1 min-w-[200px] relative">
                                                <input placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-200 text-sm rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                                            </div>
                                            <button onClick={() => submitFeedback(c._id)}
                                                className="bg-indigo-600 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all flex items-center gap-2">
                                                <Send size={16} /> Submit
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-4 flex items-center gap-3 text-emerald-600 bg-emerald-50/50 w-fit px-5 py-2 rounded-2xl border border-emerald-100">
                                        <CheckCircle2 size={18} />
                                        <div className="flex items-center gap-1 font-black text-[11px] uppercase tracking-tighter">
                                            <Star size={14} fill="currentColor" className="text-amber-500" />
                                            {c.feedback.rating}/5 Feedback Received
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyFeedback;