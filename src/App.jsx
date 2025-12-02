import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminLayout from "./components/layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Usermanage from "./pages/UserManage";
import Logout from "./pages/Logout";
import Maintanance from "./pages/Maintanance";
import Settings from "./pages/Settings";
import Customer from "./pages/Customer";

function App() {

  // FIX ⬇⬇ Add these 2 states
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/adminLayout/*"
          element={
            <AdminLayout
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="userManage" element={<Usermanage />} />
          <Route path="logout" element={<Logout />} />
          <Route path="maintanance" element={<Maintanance />} />
          <Route path="settings" element={<Settings />} />
          <Route path="customer" element={<Customer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
