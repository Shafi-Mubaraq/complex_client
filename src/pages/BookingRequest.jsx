import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";

const BookingRequest = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/propertyRequest/all`);
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const acceptRequest = async (id) => {
    await axios.put(`${apiUrl}/api/propertyRequest/accept/${id}`);
    fetchRequests();
  };

  const rejectRequest = async (id) => {
    await axios.put(`${apiUrl}/api/propertyRequest/reject/${id}`);
    fetchRequests();
  };

  if (loading) return <p>Loading requests...</p>;

  return (
    <div>
      <h2 className="text-2xl font-black mb-6">Booking Requests</h2>

      <div className="space-y-6">
        {requests.map((req) => (
          <div
            key={req._id}
            className="border rounded-xl p-6 shadow-sm bg-white"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-black text-lg">{req.property}</h3>
                <p className="text-sm text-gray-500">
                  {req.propertyType.toUpperCase()}
                </p>
              </div>

              <span
                className={`px-4 py-1 rounded-full text-xs font-bold ${
                  req.status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : req.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {req.status.toUpperCase()}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
              <p><b>Name:</b> {req.applicantDetails.fullName}</p>
              <p><b>Phone:</b> {req.applicantDetails.phoneNumber}</p>
              <p><b>Family:</b> {req.applicantDetails.familyType}</p>
              <p><b>Members:</b> {req.applicantDetails.numberOfMembers}</p>
              <p className="md:col-span-2">
                <b>Address:</b> {req.applicantDetails.address}
              </p>
            </div>

            {req.adminResponse && (
              <p className="mt-3 text-sm text-indigo-600 font-semibold">
                Admin: {req.adminResponse}
              </p>
            )}

            {req.status === "pending" && (
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => acceptRequest(req._id)}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-bold"
                >
                  <CheckCircle size={18} /> Accept
                </button>

                <button
                  onClick={() => rejectRequest(req._id)}
                  className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg font-bold"
                >
                  <XCircle size={18} /> Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingRequest;
