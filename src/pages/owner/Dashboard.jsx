import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
    Home, Users, DollarSign, Clock, TrendingUp,
    Menu, RefreshCw
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [monthlyData, setMonthlyData] = useState([]);
    const [distributionData, setDistributionData] = useState([]);
    const [activities, setActivities] = useState([]);
    const [timeRange, setTimeRange] = useState('week');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            const [statsRes, monthlyRes, distributionRes, activitiesRes] = await Promise.all([
                axios.get(`${API_URL}/api/dashboard/stats`, { headers }),
                axios.get(`${API_URL}/api/dashboard/monthly-requests`, { headers }),
                axios.get(`${API_URL}/api/dashboard/property-distribution`, { headers }),
                axios.get(`${API_URL}/api/dashboard/recent-activities`, { headers })
            ]);

            if (statsRes.data.success) setStats(statsRes.data.data);
            if (monthlyRes.data.success) setMonthlyData(monthlyRes.data.data);
            if (distributionRes.data.success) setDistributionData(distributionRes.data.data);
            if (activitiesRes.data.success) setActivities(activitiesRes.data.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ title, value, icon: Icon, color, trend, subtitle }) => (
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                {trend && (
                    <span className={`text-sm font-semibold ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        <TrendingUp className="w-4 h-4 inline mr-1" />
                        {trend}%
                    </span>
                )}
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden text-gray-600 hover:text-gray-900"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800">Owner Dashboard</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={fetchDashboardData}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <RefreshCw className="w-5 h-5 text-gray-600" />
                        </button>
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                            {['week', 'month', 'year'].map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setTimeRange(range)}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium capitalize transition-colors ${
                                        timeRange === range 
                                            ? 'bg-blue-500 text-white' 
                                            : 'text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Properties"
                        value={stats?.properties?.total || 0}
                        icon={Home}
                        color="bg-blue-500"
                        trend={+12}
                        subtitle={`${stats?.properties?.available || 0} Available, ${stats?.properties?.occupied || 0} Occupied`}
                    />
                    <StatCard
                        title="Total Tenants"
                        value={stats?.users?.totalTenants || 0}
                        icon={Users}
                        color="bg-green-500"
                        trend={+8}
                    />
                    <StatCard
                        title="Pending Requests"
                        value={stats?.requests?.pending || 0}
                        icon={Clock}
                        color="bg-yellow-500"
                        trend={-5}
                    />
                    <StatCard
                        title="Monthly Revenue"
                        value={`₹${(stats?.leases?.totalMonthlyRevenue || 0).toLocaleString()}`}
                        icon={DollarSign}
                        color="bg-purple-500"
                        trend={+15}
                    />
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Monthly Requests Chart */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Requests Overview</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pending" fill="#FFBB28" name="Pending" />
                                <Bar dataKey="accepted" fill="#00C49F" name="Accepted" />
                                <Bar dataKey="rejected" fill="#FF8042" name="Rejected" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Property Distribution Pie Chart */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Property Distribution</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Houses', value: stats?.properties?.houses || 0 },
                                        { name: 'Shops', value: stats?.properties?.shops || 0 },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    <Cell fill="#0088FE" />
                                    <Cell fill="#00C49F" />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Occupancy Trend Line Chart */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Occupancy Trend</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="accepted" stroke="#8884d8" name="New Occupancies" />
                                <Line type="monotone" dataKey="pending" stroke="#82ca9d" name="Pending Requests" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Location Distribution Bar Chart */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Properties by Location</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={distributionData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="_id" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="houses" fill="#0088FE" name="Houses" />
                                <Bar dataKey="shops" fill="#00C49F" name="Shops" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
                    <div className="space-y-4">
                        {activities.map((activity, index) => (
                            <div key={index} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="text-2xl">{activity.icon}</div>
                                <div className="flex-1">
                                    <p className="text-gray-800">{activity.description}</p>
                                    <div className="flex items-center space-x-3 mt-1">
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            activity.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                            activity.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                            activity.status === 'active' ? 'bg-blue-100 text-blue-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                            {activity.status}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(activity.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;