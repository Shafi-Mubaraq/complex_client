import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/common/HomePage";
import OverLayout from "./layouts/OverLayout";
import HousePage from "./pages/common/HousePage";
import ShopPage from "./pages/common/ShopPage";
import AboutPage from "./pages/common/AboutPage";
import ContactPage from "./pages/common/ContactPage";
import LoginPage from "./pages/common/LoginPage";
import Dashboard from "./pages/common/Dashboard";
import RegisterPage from "./pages/common/RegisterPage";

const PrivateRoute = ({ children }) => {
    const role = sessionStorage.getItem("role"); 
    return role ? children : <Navigate to="/login" replace />;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<OverLayout />}>
                    <Route index element={<Navigate to="homepage" replace />} />
                    <Route path="homepage" element={<HomePage />} />
                    <Route path="houses" element={<HousePage />} />
                    <Route path="shops" element={<ShopPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />

                    {/* 🔐 ROLE BASED DASHBOARD */}
                    <Route
                        path="dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
