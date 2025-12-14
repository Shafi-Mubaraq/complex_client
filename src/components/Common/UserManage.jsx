import React, { useEffect, useState } from "react";

// Initial state structure for a new user
const INITIAL_USER = {
    fullName: "",
    email: "",
    password: "", 
    aadhar: "",
    mobile: "",
    additionalNumber: "",
    city: "",
    state: ""
};

/**
 * Reusable Modal component for Edit and Add forms.
 * It takes a primaryColor prop to style the header and primary action button.
 */
const Modal = ({ title, onClose, onSave, children, buttonText, primaryColor }) => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform max-h-[90vh] overflow-hidden flex flex-col transition-all duration-300 ease-in-out">
            {/* Modal Header */}
            <div className={`p-5 border-b flex justify-between items-center bg-white border-${primaryColor}-600   `}>
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <button 
                    onClick={onClose} 
                    className="text-gray-400 hover:text-gray-600 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
                {children}
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t bg-gray-50 flex justify-end space-x-3">
                <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-lg transition"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    className={`bg-${primaryColor}-600 hover:bg-${primaryColor}-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition`}
                    onClick={onSave}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    </div>
);


// ----------------------------------------------------------------------
// MAIN COMPONENT: UserManage
// ----------------------------------------------------------------------

const UserManage = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [editUser, setEditUser] = useState(null);
    const [showAddUser, setShowAddUser] = useState(false);
    const [form, setForm] = useState(INITIAL_USER);

    // API environment variable
    const API = import.meta.env.VITE_API_URL; 

    // --- Data Fetching and Mutation Functions ---

    /**
     * Fetches all users from the backend API.
     */
    const loadUsers = async () => {
        try {
            const res = await fetch(`${API}/api/auth/all-users`);
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error("Fetch users error:", err);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    /**
     * Deletes a user by ID.
     */
    const deleteUser = async (id) => {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
        try {
            await fetch(`${API}/api/auth/delete/${id}`, { method: "DELETE" });
            loadUsers();
        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete user.");
        }
    };

    /**
     * Saves the edited user details (PUT request).
     */
    const saveEdit = async () => {
        try {
            await fetch(`${API}/api/auth/edit/${editUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editUser),
            });
            setEditUser(null);
            loadUsers();
        } catch (err) {
            console.error("Update error:", err);
            alert("Failed to update user.");
        }
    };

    /**
     * Adds a new user (POST request).
     */
    const addUser = async () => {
        try {
            const res = await fetch(`${API}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const errData = await res.json();
                alert(errData.message || "Error creating user");
                return;
            }

            setShowAddUser(false);
            setForm(INITIAL_USER);
            loadUsers();
        } catch (err) {
            console.error("Add user error:", err);
            alert("Failed to add new user.");
        }
    };
    
    /**
     * Generic handler for updating form state (used for both Add and Edit).
     */
    const handleFormChange = (e, targetForm, setTargetForm) => {
        const { name, value } = e.target;
        setTargetForm({ ...targetForm, [name]: value });
    };

    /**
     * Filters the users based on the search input.
     */
    const filteredUsers = users.filter(
        u =>
            u.fullName.toLowerCase().includes(search.toLowerCase()) ||
            u.mobile.includes(search) ||
            u.email.toLowerCase().includes(search.toLowerCase())
    );

    // --- JSX Rendering ---
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header and Add Button */}
                <header className="bg-white p-6 rounded-t-xl shadow-md border-b-4 border-teal-600">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
                            👤 User Account Directory
                        </h2>
                        <button
                            className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-md transition duration-200 transform hover:scale-[1.02]"
                            onClick={() => setShowAddUser(true)}
                        >
                            + Create New User
                        </button>
                    </div>
                </header>
                
                {/* Filter and Search Section */}
                <div className="bg-white p-6 shadow-md mb-6 border-t-2 border-gray-200 rounded-b-xl">
                    <label htmlFor="user-search" className="block text-sm font-medium text-gray-700 mb-2">
                        Search Users:
                    </label>
                    <input
                        id="user-search"
                        type="text"
                        placeholder="🔍 Search by Name, Mobile, or Email..."
                        className="w-full md:w-1/3 border-gray-300 focus:border-teal-500 focus:ring-teal-500 p-3 rounded-lg shadow-sm transition duration-150 text-gray-700"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* USERS TABLE */}
                <div className="shadow-lg overflow-x-auto border border-gray-200 rounded-lg mb-8">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Full Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mobile</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID Number (Aadhar)</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((u, index) => (
                                    <tr key={u._id} className={index % 2 === 0 ? "bg-white hover:bg-teal-50 transition duration-150" : "bg-gray-50 hover:bg-teal-50 transition duration-150"}>
                                        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{u.fullName}</td>
                                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">{u.email}</td>
                                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">
                                            {u.mobile}
                                            {u.additionalNumber && <span className="block text-xs text-gray-400">({u.additionalNumber})</span>}
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">{u.aadhar}</td>
                                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">{u.city}, {u.state}</td>
                                        <td className="px-6 py-3 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                            <button
                                                onClick={() => setEditUser({ ...u })}
                                                className="text-teal-600 hover:text-teal-800 bg-teal-100 px-3 py-1 rounded-md text-xs font-semibold shadow-sm transition hover:shadow-md"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteUser(u._id)}
                                                className="text-red-600 hover:text-red-800 bg-red-100 px-3 py-1 rounded-md text-xs font-semibold shadow-sm transition hover:shadow-md"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-10 text-center text-gray-500 italic">
                                        {search ? "No users found matching your search criteria." : "No registered users in the directory."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* EDIT MODAL - Professional Floating Field Design */}
                {editUser && (
                    <Modal
                        title="✏️ Edit User Details"
                        onClose={() => setEditUser(null)}
                        onSave={saveEdit}
                        primaryColor="teal" 
                        buttonText="Save Changes"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.keys(INITIAL_USER).filter(key => key !== 'password').map((key) => (
                                <div key={key} className="relative">
                                    <input
                                        type={key === 'email' ? 'email' : key.includes('mobile') || key.includes('aadhar') ? 'tel' : 'text'}
                                        name={key}
                                        id={`edit-${key}`}
                                        // PROFESSIONAL INPUT CLASSES (Floating Label using 'peer')
                                        className="peer w-full h-12 bg-gray-50 border border-gray-300 rounded-lg px-4 pt-6 pb-2 text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                                        value={editUser[key] || ""}
                                        placeholder={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                        onChange={(e) => handleFormChange(e, editUser, setEditUser)}
                                    />
                                    <label 
                                        htmlFor={`edit-${key}`} 
                                        // PROFESSIONAL LABEL CLASSES (Floating Label transition)
                                        className="absolute left-4 top-1 text-xs text-gray-500 transition-all transform peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-teal-600 pointer-events-none"
                                    >
                                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </Modal>
                )}

                {/* ADD USER MODAL - Professional Floating Field Design */}
                {showAddUser && (
                    <Modal
                        title="➕ Create New User Account"
                        onClose={() => { setShowAddUser(false); setForm(INITIAL_USER); }}
                        onSave={addUser}
                        primaryColor="green"
                        buttonText="Create Account"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.keys(INITIAL_USER).map((key) => (
                                <div key={key} className="relative">
                                    <input
                                        type={key === 'email' ? 'email' : key === 'password' ? 'password' : key.includes('mobile') || key.includes('aadhar') ? 'tel' : 'text'}
                                        name={key}
                                        id={`add-${key}`}
                                        // PROFESSIONAL INPUT CLASSES (Floating Label using 'peer')
                                        className="peer w-full h-12 bg-gray-50 border border-gray-300 rounded-lg px-4 pt-6 pb-2 text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
                                        value={form[key] || ""}
                                        placeholder={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                        onChange={(e) => handleFormChange(e, form, setForm)}
                                        required={key !== 'additionalNumber'}
                                    />
                                    <label 
                                        htmlFor={`add-${key}`}
                                        // PROFESSIONAL LABEL CLASSES (Floating Label transition)
                                        className="absolute left-4 top-1 text-xs text-gray-500 transition-all transform peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-600 pointer-events-none"
                                    >
                                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default UserManage;
