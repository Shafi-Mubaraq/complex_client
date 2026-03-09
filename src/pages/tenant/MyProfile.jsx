import React, { useState, useEffect } from "react";
import axios from "axios";

const MyComplaints = () => {

const apiUrl = "http://localhost:5000";

const [title,setTitle] = useState("");
const [description,setDescription] = useState("");
const [complaints,setComplaints] = useState([]);

const [rating,setRating] = useState("");
const [comment,setComment] = useState("");

const tenantId = sessionStorage.getItem("userId");
const propertyId = sessionStorage.getItem("propertyId");
const ownerId = sessionStorage.getItem("ownerId");


// =====================
// Load Complaints
// =====================

useEffect(()=>{
fetchComplaints();
},[])

const fetchComplaints = async () =>{
try{
const res = await axios.get(`${apiUrl}/api/complaints/tenant/${tenantId}`);
setComplaints(res.data);
}catch(err){
console.log(err);
}
}


// =====================
// Submit Complaint
// =====================

const submitComplaint = async () =>{

try{

await axios.post(`${apiUrl}/api/complaints/create`,{
property:propertyId,
tenant:tenantId,
owner:ownerId,
title,
description
});

setTitle("");
setDescription("");

fetchComplaints();

}catch(err){
console.log(err);
}

}


// =====================
// Submit Feedback
// =====================

const submitFeedback = async (complaint) =>{

try{

await axios.post(`${apiUrl}/api/feedback/add`,{

property:complaint.property,
tenant:tenantId,
owner:complaint.owner,
rating,
comment

});

alert("Feedback Submitted");

setRating("");
setComment("");

}catch(err){
console.log(err);
}

}


// =====================
// UI
// =====================

return (

<div style={{padding:"20px"}}>

<h2>Raise Complaint</h2>

<input
placeholder="Complaint Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
style={{display:"block",marginBottom:"10px",width:"300px"}}
/>

<textarea
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
style={{display:"block",marginBottom:"10px",width:"300px"}}
/>

<button onClick={submitComplaint}>
Submit Complaint
</button>

<hr/>

<h2>My Complaints</h2>

{complaints.map((c)=>(
<div key={c._id} style={{border:"1px solid #ccc",padding:"10px",marginBottom:"15px"}}>

<h4>{c.title}</h4>
<p>{c.description}</p>
<p>Status : <b>{c.status}</b></p>


{/* Feedback form only when complaint resolved */}

{c.status === "resolved" && (

<div>

<h4>Give Feedback</h4>

<select
value={rating}
onChange={(e)=>setRating(e.target.value)}
>

<option value="">Rating</option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>

</select>

<br/><br/>

<textarea
placeholder="Comment"
value={comment}
onChange={(e)=>setComment(e.target.value)}
style={{width:"250px"}}
/>

<br/><br/>

<button onClick={()=>submitFeedback(c)}>
Submit Feedback
</button>

</div>

)}

</div>
))}

</div>

)

}

export default MyComplaints