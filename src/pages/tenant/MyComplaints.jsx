import React, { useState, useEffect } from "react";
import axios from "axios";
import { MessageCircleWarning, Send, Loader2 } from "lucide-react";

const MyComplaints = () => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = sessionStorage.getItem("token");
    const mobile = sessionStorage.getItem("mobile");

    const [leases, setLeases] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const [form, setForm] = useState({
        propertyId: "",
        title: "",
        description: ""
    });

    // ================================
    // Handle Input Change
    // ================================

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    // ================================
    // Fetch Tenant Leases
    // ================================

    const fetchLeases = async () => {

        try {

            const res = await axios.get(
                `${apiUrl}/api/propertyRequest/lease/tenant/${mobile}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setLeases(res.data.data || []);

        } catch (error) {

            console.error("Lease fetch error:", error);

        }

    };

    // ================================
    // Submit Complaint
    // ================================

    const submitComplaint = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await axios.post(
                `${apiUrl}/api/complaints/create`,
                {
                    mobile: mobile,
                    propertyId: form.propertyId,
                    title: form.title,
                    description: form.description
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Complaint submitted successfully");

            setForm({
                propertyId: "",
                title: "",
                description: ""
            });

            fetchComplaints();

        } catch (error) {

            alert(error.response?.data?.message || "Failed to submit complaint");

        } finally {

            setLoading(false);

        }

    };

    // ================================
    // Fetch Complaints
    // ================================

    const fetchComplaints = async () => {

        try {

            const res = await axios.get(
                `${apiUrl}/api/complaints/tenant/${mobile}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setComplaints(res.data);

        } catch (error) {

            console.error("Complaint fetch error:", error);

        }

    };

    // ================================
    // Load Data
    // ================================

    useEffect(() => {

        fetchLeases();
        fetchComplaints();

    }, []);

    const submitFeedback = async (complaintId) => {

        try {

            await axios.post(`${apiUrl}/api/feedback/create`, {

                complaintId,
                mobile,
                rating,
                comment

            });

            alert("Feedback submitted");

            setRating(5);
            setComment("");

            fetchComplaints();

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    return (

        <div className="p-6 max-w-4xl mx-auto">

            {/* Header */}

            <div className="flex items-center gap-3 mb-6">
                <MessageCircleWarning className="w-7 h-7 text-indigo-600" />
                <h2 className="text-2xl font-bold text-slate-800">
                    Tenant Complaints
                </h2>
            </div>

            {/* Complaint Form */}

            <form
                onSubmit={submitComplaint}
                className="bg-white p-6 rounded-xl shadow space-y-4 mb-10"
            >

                {/* Property Dropdown */}

                <select
                    name="propertyId"
                    value={form.propertyId}
                    onChange={handleChange}
                    required
                    className="w-full border p-3 rounded-lg"
                >

                    <option value="">
                        Select Property
                    </option>

                    {leases.map((lease) => (

                        <option
                            key={lease._id}
                            value={lease.property._id}
                        >

                            {lease.property.title} - {lease.property.location}

                        </option>

                    ))}

                </select>

                {/* Title */}

                <input
                    type="text"
                    name="title"
                    placeholder="Complaint Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full border p-3 rounded-lg"
                />

                {/* Description */}

                <textarea
                    name="description"
                    placeholder="Describe the issue"
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border p-3 rounded-lg"
                />

                {/* Submit Button */}

                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
                >

                    {loading ? (
                        <>
                            <Loader2 className="animate-spin w-4 h-4" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <Send size={16} />
                            Submit Complaint
                        </>
                    )}

                </button>

            </form>

            {/* Complaint List */}

            <div className="space-y-4">

                {complaints.length === 0 && (

                    <p className="text-gray-500">
                        No complaints submitted yet.
                    </p>

                )}

                {complaints.map((complaint) => (

                    <div
                        key={complaint._id}
                        className="border rounded-xl p-4 bg-gray-50"
                    >

                        <h3 className="font-bold text-lg">
                            {complaint.title}
                        </h3>

                        <p className="text-gray-600 text-sm mt-1">
                            {complaint.description}
                        </p>

                        <div className="flex justify-between mt-3 text-sm">

                            <span className="font-semibold">
                                Status: {complaint.status}
                            </span>

                            <span className="text-gray-400">
                                {new Date(
                                    complaint.createdAt
                                ).toLocaleDateString()}
                            </span>

                        </div>

                        {complaint.response && (

                            <div className="mt-3 text-green-600 text-sm">
                                Owner Response: {complaint.response}
                            </div>

                        )}
                        {complaint.status === "resolved" && !complaint.feedback && (

                            <div className="mt-4 border-t pt-3">

                                <h4 className="font-semibold mb-2">
                                    Give Feedback
                                </h4>

                                <select
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    className="border p-2 rounded w-full mb-2"
                                >

                                    <option value="5">⭐⭐⭐⭐⭐</option>
                                    <option value="4">⭐⭐⭐⭐</option>
                                    <option value="3">⭐⭐⭐</option>
                                    <option value="2">⭐⭐</option>
                                    <option value="1">⭐</option>

                                </select>

                                <textarea
                                    placeholder="Write feedback"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="border p-2 rounded w-full mb-2"
                                />

                                <button
                                    onClick={() => submitFeedback(complaint._id)}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded"
                                >

                                    Submit Feedback

                                </button>

                            </div>

                        )}

                    </div>


                ))}


            </div>

        </div>

    );

};

export default MyComplaints;