// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import OverLayout from "./layouts/OverLayout";
// import HousePage from "./pages/HousePage";
// import ShopPage from "./pages/ShopPage";
// import AboutPage from "./pages/AboutPage";
// import ContactPage from "./pages/ContactPage";
// import LoginPage from "./pages/LoginPage";
// import Dashboard from "./pages/Dashboard";

// const PrivateRoute = ({ children }) => {
//     const role = sessionStorage.getItem("role");
//     return role ? children : <Navigate to="/login" replace />;
// };

// function App() {

//     return (
//         <Router>
//             <Routes>
//                 <Route path="/*" element={<OverLayout />}>
//                     {/* Default Route */}
//                     <Route index element={<Navigate to="homepage" replace />} />
//                     <Route path="homepage" element={<HomePage />} />
//                     <Route path="houses" element={<HousePage />} />
//                     <Route path="shops" element={<ShopPage />} />
//                     <Route path="about" element={<AboutPage />} />
//                     <Route path="contact" element={<ContactPage />} />
//                     <Route path="login" element={<LoginPage />} />
//                     {/* 🔐 Protected Dashboard */}
//                     <Route path="dashboard" element={
//                         <PrivateRoute>
//                             <Dashboard />
//                         </PrivateRoute>
//                     } />
//                 </Route>
//             </Routes>
//         </Router>
//     )
// }

// export default App;



import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OverLayout from "./layouts/OverLayout";
import HousePage from "./pages/HousePage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

const PrivateRoute = ({ children }) => {
    const role = sessionStorage.getItem("role"); // owner | tenant
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
