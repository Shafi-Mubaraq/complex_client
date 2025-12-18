import React, { useEffect, useState } from "react";

const INITIAL_USER = {
    fullName: "", email: "", password: "", aadhar: "",
    mobile: "", additionalNumber: "", city: "", state: ""
};

const Modal = ({ title, onClose, onSave, children, buttonText, primaryColor }) => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform max-h-[90vh] overflow-hidden flex flex-col transition-all duration-300 ease-in-out">
            <div className={`p-5 border-b flex justify-between items-center bg-white border-${primaryColor}-600`}>
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="p-6 overflow-y-auto">{children}</div>
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
)

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, userName }) => {

    if (!isOpen) return null;

    return (
        <Modal
            title="Confirm Delete"
            onClose={onClose}
            onSave={onConfirm}
            buttonText="Yes, Delete User"
            primaryColor="red"
        >
            <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                    <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <p className="text-gray-500">
                    Are you sure you want to delete <span className="font-semibold text-gray-800">{userName}</span> ?
                </p>
                <p className="text-sm text-gray-400 mt-1">
                    This action is permanent and cannot be undone.
                </p>
            </div>
        </Modal>
    )
}

const UserManage = () => {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [editUser, setEditUser] = useState(null);
    const [showAddUser, setShowAddUser] = useState(false);
    const [form, setForm] = useState(INITIAL_USER);
    const [userToDelete, setUserToDelete] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    const loadUsers = async () => {
        try {
            const res = await fetch(`${apiUrl}/api/userManage/all-users`);
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;
        try {
            await fetch(`${apiUrl}/api/userManage/delete/${userToDelete._id}`, { method: "DELETE" });
            setUserToDelete(null);
            loadUsers();
        } catch (err) {
            alert("Failed to delete user.");
            console.error('Error in deleting user : ', err);
        }
    }

    const saveEdit = async () => {
        try {
            await fetch(`${apiUrl}/api/userManage/edit/${editUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editUser),
            });
            setEditUser(null);
            loadUsers();
        } catch (err) {
            alert("Failed to update user.");
            console.error('Error in updating user : ', err)
        }
    };

    const addUser = async () => {
        try {
            const res = await fetch(`${apiUrl}/api/auth/signup`, {
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
            alert("Failed to add new user.");
            console.error('Error in adding user : ', err)
        }
    };

    const handleFormChange = (e, targetForm, setTargetForm) => {
        const { name, value } = e.target;
        setTargetForm({ ...targetForm, [name]: value });
    };

    const filteredUsers = users.filter(
        u =>
            u.fullName.toLowerCase().includes(search.toLowerCase()) ||
            u.mobile.includes(search) ||
            u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen">
            <div className="mx-auto">
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

                <div className="bg-white p-6 shadow-md mb-6 border-t-2 border-gray-200 rounded-b-xl">
                    <label htmlFor="user-search" className="block text-sm font-medium text-gray-700 mb-2">
                        Search Users :
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

                <div className="shadow-lg overflow-x-auto border border-gray-200 rounded-lg">
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
                                    <tr
                                        key={u._id}
                                        className={
                                            index % 2 === 0
                                                ? "bg-white hover:bg-teal-50 transition duration-150"
                                                : "bg-gray-50 hover:bg-teal-50 transition duration-150"
                                        }
                                    >
                                        <td className="px-6 py-3 text-sm font-medium text-gray-900">{u.fullName}</td>
                                        <td className="px-6 py-3 text-sm text-gray-600">{u.email}</td>
                                        <td className="px-6 py-3 text-sm text-gray-600">
                                            {u.mobile}
                                            {u.additionalNumber && (
                                                <span className="block text-xs text-gray-400">
                                                    ({u.additionalNumber})
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-3 text-sm text-gray-600">{u.aadhar}</td>
                                        <td className="px-6 py-3 text-sm text-gray-600">
                                            {u.city}, {u.state}
                                        </td>
                                        <td className="px-6 py-3 text-center text-sm font-medium space-x-2">
                                            <button
                                                onClick={() => setEditUser({ ...u })}
                                                className="text-teal-600 hover:text-teal-800 bg-teal-100 px-3 py-1 rounded-md text-xs font-semibold shadow-sm transition hover:shadow-md"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(u)}
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
                                        {search
                                            ? "No users found matching your search criteria."
                                            : "No registered users in the directory."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {editUser && (
                    <Modal
                        title="✏️ Edit User Details"
                        onClose={() => setEditUser(null)}
                        onSave={saveEdit}
                        primaryColor="teal"
                        buttonText="Save Changes"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-6">
                            {Object.keys(INITIAL_USER)
                                .filter(key => key !== "password")
                                .map(key => (
                                    <div key={key} className="flex flex-col space-y-2">
                                        <label
                                            htmlFor={`edit-${key}`}
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())} :
                                        </label>
                                        <input
                                            type={
                                                key === "email"
                                                    ? "email"
                                                    : key.includes("mobile") || key.includes("aadhar")
                                                        ? "tel"
                                                        : "text"
                                            }
                                            name={key}
                                            id={`edit-${key}`}
                                            className="w-full h-10 bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                                            value={editUser[key] || ""}
                                            onChange={(e) => handleFormChange(e, editUser, setEditUser)}
                                        />
                                    </div>
                                ))}
                        </div>
                    </Modal>
                )}

                {showAddUser && (
                    <Modal
                        title="➕ Create New User Account"
                        onClose={() => {
                            setShowAddUser(false);
                            setForm(INITIAL_USER);
                        }}
                        onSave={addUser}
                        primaryColor="green"
                        buttonText="Create Account"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-6">
                            {Object.keys(INITIAL_USER).map(key => (
                                <div key={key} className="flex flex-col space-y-2">
                                    <label
                                        htmlFor={`add-${key}`}
                                        className="text-sm font-semibold text-gray-700 ml-1"
                                    >
                                        {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())} :
                                        {key !== "additionalNumber" && <span className="text-red-500 ml-1">*</span>}
                                    </label>
                                    <input
                                        type={
                                            key === "email"
                                                ? "email"
                                                : key === "password"
                                                    ? "password"
                                                    : key.includes("mobile") || key.includes("aadhar")
                                                        ? "tel"
                                                        : "text"
                                        }
                                        name={key}
                                        id={`add-${key}`}
                                        className="w-full h-11 bg-white border border-gray-300 rounded-lg px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
                                        value={form[key] || ""}
                                        onChange={(e) => handleFormChange(e, form, setForm)}
                                        required={key !== "additionalNumber"}
                                    />
                                </div>
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