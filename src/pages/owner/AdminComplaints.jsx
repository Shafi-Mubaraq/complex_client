import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminComplaints = () => {

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const ownerId = sessionStorage.getItem("userId");

    const [complaints, setComplaints] = useState([]);


// ------------------------------------------------
// Load complaints
// ------------------------------------------------
    const loadComplaints = async () => {

        const res = await axios.get(
            `${apiUrl}/api/complaints/owner/${ownerId}`
        );

        setComplaints(res.data);

    };


// ------------------------------------------------
// Update complaint
// ------------------------------------------------
    const updateStatus = async (id, status) => {

        await axios.put(
            `${apiUrl}/api/complaints/update/${id}`,
            { status }
        );

        loadComplaints();
    };

    useEffect(()=>{
        loadComplaints();
    },[]);


    return (
        <div>

            <h2>Owner Complaints</h2>

            {complaints.map((c)=>(

                <div key={c._id}>

                    <h4>{c.title}</h4>

                    <p>{c.description}</p>

                    <p>Tenant: {c.tenant?.fullName}</p>

                    <p>Status: {c.status}</p>


                    <button
                        onClick={()=>updateStatus(c._id,"in_progress")}
                    >
                        Solved
                    </button>


                    <button
                        onClick={()=>updateStatus(c._id,"resolved")}
                    >
                        Resolved
                    </button>


                </div>

            ))}

        </div>
    );
};

export default AdminComplaints;

