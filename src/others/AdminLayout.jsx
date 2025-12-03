// AdminLayout.jsx
import React from 'react';
import { LayoutDashboard, Users, ShoppingCart, Settings, Power, Zap, Menu, X } from 'lucide-react';
import { Outlet, useNavigate } from "react-router-dom";

const Sidebar = ({ currentPage, setCurrentPage, isSidebarOpen, setIsSidebarOpen }) => {
    const navigate = useNavigate();

    const navItems = [
        { path: 'dashboard', name: 'Dashboard', Icon: LayoutDashboard },
        { path: 'userManage', name: 'User Management', Icon: Users },
        { path: 'customer', name: 'Customer Center', Icon: ShoppingCart },
        { path: 'maintanance', name: 'Maintenance', Icon: Zap },
        { path: 'settings', name: 'Settings', Icon: Settings },
    ];

    const NavLinkItem = ({ path, name, Icon }) => {
        const isActive = currentPage === path;

        const base = "flex items-center space-x-3 p-3 transition-all cursor-pointer text-sm font-medium mx-2";
        const active = "text-indigo-700 bg-indigo-50 border-l-4 border-indigo-600 rounded-lg";
        const normal = "text-gray-600 hover:bg-gray-100 rounded-lg";

        const handleClick = () => {
            setCurrentPage(path);
            navigate(`/adminLayout/${path}`);

            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            }
        };

        return (
            <div className={`${base} ${isActive ? active : normal}`} onClick={handleClick}>
                <Icon className="w-5 h-5" />
                <span>{name}</span>
            </div>
        );
    };

    return (
        <aside className={`fixed top-0 left-0 w-64 h-full bg-white shadow-xl z-40 transition-transform duration-300 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 border-r`}>
            <div className="px-6 pt-6 pb-4 flex justify-between items-center border-b">
                <h2 className="text-3xl font-extrabold text-gray-900">
                    <span className="text-indigo-600">BUILD</span>HUB
                </h2>
                <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="p-4">
                {navItems.map(item => (
                    <NavLinkItem key={item.path} {...item} />
                ))}
            </div>

            <div className="absolute bottom-4 w-full px-4">
                <div
                    className="flex items-center space-x-3 p-3 cursor-pointer text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg mx-2"
                    onClick={() => { setCurrentPage('logout'); navigate("/adminLayout/logout"); }}
                >
                    <Power className="w-5 h-5" />
                    <span>Logout</span>
                </div>
            </div>
        </aside>
    );
};

const Header = ({ title, setIsSidebarOpen }) => (
    <header className="fixed top-0 right-0 left-0 md:left-64 bg-white shadow-xl z-30 p-4 border-b flex items-center">
        <button
            className="md:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 mr-4"
            onClick={() => setIsSidebarOpen(prev => !prev)}
        >
            <Menu className="w-6 h-6" />
        </button>

        <h1 className="text-xl font-semibold text-gray-700">{title}</h1>

        <div className="ml-auto flex items-center space-x-4">
            <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-indigo-600">#101</p>
            </div>
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                AD
            </div>
        </div>
    </header>
);

const AdminLayout = ({ currentPage, setCurrentPage, children, isSidebarOpen, setIsSidebarOpen }) => {
    const titles = {
        dashboard: "Project Dashboard",
        userManage: "User Management",
        customer: "Customer Center",
        maintanance: "System Maintenance",
        settings: "Global Settings",
        logout: "Logout",
    };

    const headerTitle = titles[currentPage] || "Admin Panel";

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
            )}

            <div className="flex-1 md:ml-64 flex flex-col">
                <Header title={headerTitle} setIsSidebarOpen={setIsSidebarOpen} />

                <main className="flex-grow pt-[72px]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
