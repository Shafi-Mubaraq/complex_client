import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OverLayout from "./layouts/OverLayout";
import HousePage from "./pages/HousePage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
       
function App() {

    return (
        <Router>
            <Routes>
                <Route path="/*" element={<OverLayout />} >
                    <Route path="homepage" element={<HomePage />} />
                    <Route path="houses" element={<HousePage />} />
                    <Route path="shops" element={<ShopPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="login" element={<LoginPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
