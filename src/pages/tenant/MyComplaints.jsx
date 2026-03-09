import React, { useEffect, useState } from "react";
import axios from "axios";

const MyComplaints = () => {

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const tenantId = sessionStorage.getItem("userId");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [complaints, setComplaints] = useState([]);


// ------------------------------------------------
// Load complaints
// ------------------------------------------------
    const loadComplaints = async () => {

        const res = await axios.get(
            `${apiUrl}/api/complaints/tenant/${tenantId}`
        );

        setComplaints(res.data);

    };


// ------------------------------------------------
// Submit complaint
// ------------------------------------------------
    const handleSubmit = async (e) => {

        e.preventDefault();

        const property = sessionStorage.getItem("propertyId");
        const owner = sessionStorage.getItem("ownerId");

        await axios.post(`${apiUrl}/api/complaints/create`, {
            property,
            tenant: tenantId,
            owner,
            title,
            description
        });

        setTitle("");
        setDescription("");

        loadComplaints();
    };

    useEffect(() => {
        loadComplaints();
    }, []);


// ------------------------------------------------
// Feedback
// ------------------------------------------------
    const giveFeedback = async (complaintId) => {

        const rating = prompt("Enter rating 1-5");
        const comment = prompt("Enter feedback");

        await axios.post(`${apiUrl}/api/feedback/create`, {
            complaint: complaintId,
            tenant: tenantId,
            rating,
            comment
        });

        alert("Feedback submitted");
    };



    return (
        <div>

            <h2>Raise Complaint</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Complaint title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Complaint description"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />

                <button type="submit">
                    Submit Complaint
                </button>

            </form>


            <h2>My Complaints</h2>

            {complaints.map((c)=>(

                <div key={c._id}>

                    <h4>{c.title}</h4>
                    <p>{c.description}</p>
                    <p>Status: {c.status}</p>

                    {c.status === "resolved" && (
                        <button
                            onClick={()=>giveFeedback(c._id)}
                        >
                            Give Feedback
                        </button>
                    )}

                </div>

            ))}

        </div>
    );
};

export default MyComplaints;

