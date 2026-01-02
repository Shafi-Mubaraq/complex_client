import React, { useEffect, useState } from "react";

const INITIAL_USER = {
    fullName: "", email: "", password: "", aadhar: "",
    mobile: "", additionalNumber: "", city: "", state: ""
};

// Mapping colors to avoid Tailwind JIT purging dynamic strings
const colorMap = {
    teal: "bg-teal-600 hover:bg-teal-700 border-teal-600",
    red: "bg-red-600 hover:bg-red-700 border-red-600",
    green: "bg-green-600 hover:bg-green-700 border-green-600"
};

// Reusable Form Field for the Create/Edit experience
const FormField = ({ label, name, value, onChange, type = "text", placeholder, error, required }) => (
    <div className="flex flex-col space-y-1 mb-1">
        <label htmlFor={name} className="text-sm font-semibold text-gray-700 ml-1">
            {label} : {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            className={`w-full h-10 bg-white border ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150`}
            value={value}
            onChange={onChange}
        />
        {error && <span className="text-[10px] text-red-500 font-medium ml-1 leading-none">{error}</span>}
    </div>
);

const Modal = ({ title, onClose, onSave, children, buttonText, primaryColor }) => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform max-h-[90vh] overflow-hidden flex flex-col transition-all duration-300 ease-in-out">
            <div className={`p-5 border-b flex justify-between items-center bg-white`}>
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="p-6 overflow-y-auto">{children}</div>
            <div className="p-5 border-t bg-gray-50 flex justify-end space-x-3">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-lg transition" onClick={onClose}>
                    Cancel
                </button>
                <button
                    className={`${colorMap[primaryColor] || 'bg-teal-600'} text-white font-medium px-4 py-2 rounded-lg shadow-md transition`}
                    onClick={onSave}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    </div>
);

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, userName }) => {
    if (!isOpen) return null;
    return (
        <Modal title="Confirm Delete" onClose={onClose} onSave={onConfirm} buttonText="Yes, Delete User" primaryColor="red">
            <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                    <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <p className="text-gray-500">Are you sure you want to delete <span className="font-semibold text-gray-800">{userName}</span>?</p>
                <p className="text-sm text-gray-400 mt-1">This action is permanent and cannot be undone.</p>
            </div>
        </Modal>
    );
};

const UserManage = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [editUser, setEditUser] = useState(null);
    const [showAddUser, setShowAddUser] = useState(false);
    const [form, setForm] = useState(INITIAL_USER);
    const [errors, setErrors] = useState({});
    const [userToDelete, setUserToDelete] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    const loadUsers = async () => {
        try {
            const res = await fetch(`${apiUrl}/api/userManage/all-users`);
            const data = await res.json();
            setUsers(data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { loadUsers(); }, []);

    // Core validation logic
    const validate = (data) => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.fullName) newErrors.fullName = "Name is required";
        if (!data.email) newErrors.email = "Email is required";
        else if (!emailRegex.test(data.email)) newErrors.email = "Invalid email format";
        if (!data.password) newErrors.password = "Password is required";
        if (!data.aadhar || data.aadhar.length !== 12) newErrors.aadhar = "Must be 12 digits";
        if (!data.mobile || data.mobile.length !== 10) newErrors.mobile = "Must be 10 digits";
        if (data.additionalNumber && data.additionalNumber.length !== 10) newErrors.additionalNumber = "Must be 10 digits";
        if (!data.city) newErrors.city = "City required";
        if (!data.state) newErrors.state = "State required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormChange = (e, targetForm, setTargetForm) => {
        const { name, value } = e.target;
        let processedValue = value;
        if (name === "mobile" || name === "additionalNumber" || name === "aadhar") {
            processedValue = value.replace(/[^0-9]/g, '');
            if (name === "aadhar" && processedValue.length > 12) return;
            if ((name === "mobile" || name === "additionalNumber") && processedValue.length > 10) return;
        }
        setTargetForm({ ...targetForm, [name]: processedValue });
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const addUser = async () => {
        if (!validate(form)) return;
        try {
            const res = await fetch(`${apiUrl}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) return alert("Error creating user");
            setShowAddUser(false); setForm(INITIAL_USER); loadUsers();
        } catch (err) { console.error(err); }
    };

    const saveEdit = async () => {
        if (!validate(editUser)) return;
        try {
            await fetch(`${apiUrl}/api/userManage/edit/${editUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editUser),
            });
            setEditUser(null); loadUsers();
        } catch (err) { console.error(err); }
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;
        try {
            await fetch(`${apiUrl}/api/userManage/delete/${userToDelete._id}`, { method: "DELETE" });
            setUserToDelete(null); loadUsers();
        } catch (err) { console.error(err); }
    };

    const filteredUsers = users.filter(u => 
        u.fullName.toLowerCase().includes(search.toLowerCase()) || 
        u.mobile.includes(search) || 
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto">
                <header className="bg-white p-6 rounded-t-xl shadow-md border-b-4 border-teal-600 flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-800 tracking-wide">👤 User Account Directory</h2>
                    <button 
                        className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-md transition transform hover:scale-[1.02]"
                        onClick={() => { setErrors({}); setShowAddUser(true); }}
                    >
                        + Create New User
                    </button>
                </header>

                <div className="bg-white p-6 shadow-md mb-6 border-t-2 border-gray-200 rounded-b-xl">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search Users :</label>
                    <input
                        type="text"
                        placeholder="🔍 Search by Name, Mobile, or Email..."
                        className="w-full md:w-1/3 border-gray-300 focus:border-teal-500 focus:ring-teal-500 p-3 rounded-lg shadow-sm text-gray-700"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="shadow-lg overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Full Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Mobile</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID (Aadhar)</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((u, index) => (
                                    <tr key={u._id} className={index % 2 === 0 ? "bg-white hover:bg-teal-50 transition" : "bg-gray-50 hover:bg-teal-50 transition"}>
                                        <td className="px-6 py-3 text-sm font-medium text-gray-900">{u.fullName}</td>
                                        <td className="px-6 py-3 text-sm text-gray-600">{u.email}</td>
                                        <td className="px-6 py-3 text-sm text-gray-600">
                                            {u.mobile} {u.additionalNumber && <span className="block text-xs text-gray-400">({u.additionalNumber})</span>}
                                        </td>
                                        <td className="px-6 py-3 text-sm text-gray-600">{u.aadhar}</td>
                                        <td className="px-6 py-3 text-sm text-gray-600">{u.city}, {u.state}</td>
                                        <td className="px-6 py-3 text-center space-x-2">
                                            <button 
                                                onClick={() => { setErrors({}); setEditUser({...u}); }} 
                                                className="text-teal-600 hover:text-teal-800 bg-teal-100 px-3 py-1 rounded-md text-xs font-semibold shadow-sm transition"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => setUserToDelete(u)} 
                                                className="text-red-600 hover:text-red-800 bg-red-100 px-3 py-1 rounded-md text-xs font-semibold shadow-sm transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-10 text-center text-gray-500 italic">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* CREATE & EDIT MODAL - Unified Logic */}
                {(showAddUser || editUser) && (
                    <Modal
                        title={showAddUser ? "➕ Create New User Account" : "✏️ Edit User Details"}
                        onClose={() => { setShowAddUser(false); setEditUser(null); setErrors({}); }}
                        onSave={showAddUser ? addUser : saveEdit}
                        primaryColor={showAddUser ? "green" : "teal"}
                        buttonText={showAddUser ? "Create Account" : "Save Changes"}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                            {Object.keys(INITIAL_USER).map(key => (
                                <FormField
                                    key={key}
                                    label={key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}
                                    name={key}
                                    type={key === "password" ? (showAddUser ? "password" : "text") : key === "email" ? "email" : "text"}
                                    value={showAddUser ? form[key] : editUser[key]}
                                    onChange={(e) => handleFormChange(e, showAddUser ? form : editUser, showAddUser ? setForm : setEditUser)}
                                    error={errors[key]}
                                    required={key !== "additionalNumber"}
                                    placeholder={key === "aadhar" ? "12 digits" : key.includes("mobile") ? "10 digits" : ""}
                                />
                            ))}
                        </div>
                    </Modal>
                )}

                <DeleteConfirmationModal 
                    isOpen={!!userToDelete} 
                    onClose={() => setUserToDelete(null)} 
                    onConfirm={confirmDelete} 
                    userName={userToDelete?.fullName} 
                />
            </div>
        </div>
    );
};

export default UserManage;