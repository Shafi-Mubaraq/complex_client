import React, { useEffect, useState } from "react";
import { Search, UserPlus } from "lucide-react";
import UserTable from "../components/UserManagement/UserTable";
import UserModal from "../components/UserManagement/UserModal";
import DeleteModal from "../components/UserManagement/DeleteModal";

const INITIAL_USER = {
    fullName: "", email: "", password: "", aadhar: "",
    mobile: "", additionalNumber: "", city: "", state: ""
};

const UserManage = () => {
    
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [editUser, setEditUser] = useState(null);
    const [showAddUser, setShowAddUser] = useState(false);
    const [form, setForm] = useState(INITIAL_USER);
    const [errors, setErrors] = useState({});
    const [userToDelete, setUserToDelete] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const loadUsers = async () => {
        try {
            const res = await fetch(`${apiUrl}/api/userManage/all-users`);
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setUsers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Load Error:", err);
            setUsers([]);
        }
    };

    useEffect(() => { loadUsers(); }, []);

    // --- CORE VALIDATION LOGIC ---
    const validate = (data) => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!data.fullName?.trim()) newErrors.fullName = "Full Name is required";

        if (!data.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(data.email)) {
            newErrors.email = "Invalid email format";
        }

        // Password required only for new users
        if (showAddUser && !data.password) {
            newErrors.password = "Password is required";
        }

        if (!data.aadhar || data.aadhar.length !== 12) {
            newErrors.aadhar = "Aadhar must be exactly 12 digits";
        }

        if (!data.mobile || data.mobile.length !== 10) {
            newErrors.mobile = "Mobile must be 10 digits";
        }

        if (data.additionalNumber && data.additionalNumber.length !== 10) {
            newErrors.additionalNumber = "Additional number must be 10 digits";
        }

        if (!data.city?.trim()) newErrors.city = "City is required";
        if (!data.state?.trim()) newErrors.state = "State is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;

        // Input Masking: Only numbers for ID and Phone
        if (["mobile", "additionalNumber", "aadhar"].includes(name)) {
            processedValue = value.replace(/[^0-9]/g, '');
            if (name === "aadhar" && processedValue.length > 12) return;
            if (name !== "aadhar" && processedValue.length > 10) return;
        }

        if (showAddUser) {
            setForm(prev => ({ ...prev, [name]: processedValue }));
        } else {
            setEditUser(prev => ({ ...prev, [name]: processedValue }));
        }

        // Clear error as user fixes the field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleAction = async (type) => {
        const isAdd = type === 'add';
        const data = isAdd ? form : editUser;

        // Trigger validation
        if (!validate(data)) return;

        const url = isAdd
            ? `${apiUrl}/api/auth/signup`
            : `${apiUrl}/api/userManage/edit/${editUser._id}`;

        try {
            const res = await fetch(url, {
                method: isAdd ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setShowAddUser(false);
                setEditUser(null);
                setForm(INITIAL_USER);
                setErrors({});
                loadUsers();
            } else {
                const errorData = await res.json();
                alert(errorData.message || "Operation failed");
            }
        } catch (err) {
            console.error("Action Error:", err);
        }
    };

    const confirmDelete = async () => {
        try {
            const res = await fetch(`${apiUrl}/api/userManage/delete/${userToDelete._id}`, { method: "DELETE" });
            if (res.ok) {
                setUserToDelete(null);
                loadUsers();
            }
        } catch (err) { console.error("Delete Error:", err); }
    };

    const filteredUsers = users.filter(u =>
        u.fullName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.mobile.includes(search)
    );

    return (
        <div className="space-y-6 bg-white min-h-screen">

            {/* Action Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                <div className="relative w-full md:w-80 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search directory..."
                        className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button
                    onClick={() => {
                        setErrors({});
                        setForm(INITIAL_USER);
                        setEditUser(null);
                        setShowAddUser(true);
                    }}
                    className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-[0.15em] px-6 py-3 rounded-xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                    <UserPlus size={16} />
                    Register New User
                </button>
            </div>

            <UserTable
                users={filteredUsers}
                onEdit={(u) => {
                    setErrors({});
                    setEditUser({ ...u });
                    setShowAddUser(false);
                }}
                onDelete={setUserToDelete}
            />

            <UserModal
                isOpen={showAddUser || !!editUser}
                isAddMode={showAddUser}
                data={showAddUser ? form : editUser || {}}
                onClose={() => {
                    setShowAddUser(false);
                    setEditUser(null);
                    setErrors({});
                }}
                onChange={handleFormChange}
                onSave={() => handleAction(showAddUser ? 'add' : 'edit')}
                errors={errors}
            />

            <DeleteModal
                user={userToDelete}
                onConfirm={confirmDelete}
                onCancel={() => setUserToDelete(null)}
            />
        </div>
    );
};

export default UserManage;