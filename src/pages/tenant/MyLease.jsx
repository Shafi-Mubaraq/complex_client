import React, { useEffect, useState } from "react";
import axios from "axios";
import { Home, Calendar, Banknote, User } from "lucide-react";

const MyLease = () => {

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const [leases, setLeases] = useState([]);
    const [loading, setLoading] = useState(true);

    const mobile = sessionStorage.getItem("mobile");
    const role = sessionStorage.getItem("role");

    useEffect(() => {

        if (role !== "tenant") return;

        const fetchLease = async () => {
            try {
                const res = await axios.get(
                    `${apiUrl}/api/propertyRequest/lease/tenant/${mobile}`
                );
                setLeases(res.data.data || []);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLease();

    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                Loading...
            </div>
        );
    }

    if (leases.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-400">
                No Active Lease Found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <h1 className="text-2xl font-bold mb-8">
                My Lease Details
            </h1>

            {leases.map((lease) => (
                <div
                    key={lease._id}
                    className="bg-white rounded-2xl shadow p-6 mb-6 border border-slate-200"
                >

                    <div className="flex items-center gap-3 mb-4">
                        <Home className="text-indigo-600" />
                        <div>
                            <p className="font-semibold text-lg">
                                {lease.property?.title}
                            </p>
                            <p className="text-sm text-gray-500">
                                {lease.property?.location}
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 text-sm">

                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            Start Date:
                            <span className="font-semibold">
                                {new Date(lease.startDate).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            End Date:
                            <span className="font-semibold">
                                {lease.endDate
                                    ? new Date(lease.endDate).toLocaleDateString()
                                    : "-"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Banknote size={16} />
                            Monthly Rent:
                            <span className="font-semibold text-indigo-600">
                                ₹ {lease.monthlyRent}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Banknote size={16} />
                            Deposit:
                            <span className="font-semibold">
                                ₹ {lease.depositAmount || 0}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <User size={16} />
                            Owner:
                            <span className="font-semibold">
                                {lease.owner?.fullName}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            Status:
                            <span className="text-green-600 font-bold capitalize">
                                {lease.status}
                            </span>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyLease;
