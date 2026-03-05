import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  FiHome, FiUser, FiCalendar, FiSearch, FiFilter, 
  FiMoreVertical, FiArrowUpRight, FiTrendingUp, FiClock 
} from "react-icons/fi";

const LeaseDetails = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLeases = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/propertyRequest/leases`);
      setLeases(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeases(); }, []);

  // UI Helper: Status Badge Logic
  const StatusBadge = ({ status }) => {
    const styles = {
      active: "bg-emerald-50 text-emerald-600 ring-emerald-600/20",
      pending: "bg-amber-50 text-amber-600 ring-amber-600/20",
      expired: "bg-rose-50 text-rose-600 ring-rose-600/20",
    };
    const style = styles[status?.toLowerCase()] || "bg-slate-50 text-slate-600 ring-slate-600/20";
    return (
      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${style}`}>
        {status}
      </span>
    );
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 p-4 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP NAV / TITLE */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Lease Overview</h1>
            <p className="text-slate-500 font-medium">Monitoring {leases.length} active rental contracts.</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-200 flex items-center gap-2 w-fit">
            <FiHome size={18}/> Add New Lease
          </button>
        </header>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Total Revenue', value: '₹4.2L', icon: <FiTrendingUp />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Active Leases', value: leases.length, icon: <FiHome />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Expiring Soon', value: '3', icon: <FiClock />, color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-indigo-200 transition-all cursor-default">
              <div>
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.bg} ${stat.color} p-4 rounded-xl text-xl group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* TABLE CONTROLS */}
        <div className="bg-white rounded-t-3xl border-x border-t border-slate-100 p-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search property, tenant or owner..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 text-slate-600 font-semibold px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
            <FiFilter /> Filters
          </button>
        </div>

        {/* DATA TABLE */}
        <div className="bg-white rounded-b-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Property</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Tenant</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Timeline</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Monthly Rent</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leases.map((lease) => (
                  <tr key={lease._id} className="group hover:bg-slate-50/80 transition-all">
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {lease.property?.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{lease.property?.location}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                          {lease.tenant?.fullName?.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-700">{lease.tenant?.fullName}</div>
                          <div className="text-[11px] text-slate-400 leading-none">Owner: {lease.owner?.fullName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <FiCalendar className="text-indigo-400" />
                        <span>{new Date(lease.startDate).toLocaleDateString()}</span>
                        <span className="text-slate-300">→</span>
                        <span>{lease.endDate ? new Date(lease.endDate).toLocaleDateString() : '—'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm font-black text-slate-800">
                        ₹{lease.monthlyRent?.toLocaleString()}
                        <span className="text-[10px] text-slate-400 font-medium ml-1">/mo</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <StatusBadge status={lease.status} />
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-slate-300 hover:text-slate-600 transition-colors">
                        <FiMoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaseDetails;