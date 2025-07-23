/* eslint-disable no-unused-vars */
// import OntrendLoading from "./shared/components/common/OntrendLoading";
import { Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SideBarLayout from "./ONfoodVendors/Layouts/SideBarLayout";
import LoginScreen from "./auth/pages/Login";
import AuthLayout from "./auth/layouts/AuthLayout";
import VendorProfileInfo from "./ONfoodVendors/containers/Profile/VendorProfileInfo";
import OrdersPage from "./ONfoodVendors/pages/OrdersPage";
import AddMenuPage from "./ONfoodVendors/pages/AddMenuPage";
import FoodMenuPage from "./ONfoodVendors/pages/FoodMenuPage";
import VenderFoodPage from "./ONfoodVendors/pages/VenderFoodPage";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<SideBarLayout />}>
                <Route index element={<OrdersPage />} />
                <Route path="/menu/:category/:id" element={<AddMenuPage />} />
                <Route path="/menu" element={<VenderFoodPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/profile" element={<VendorProfileInfo />} />
            </Route>
            {/* ---------------------------------  Auth --------------------------------- */}
            <Route path="/auth" element={<AuthLayout />}>
                <Route index element={<LoginScreen />} />
            </Route>
        </Routes>
    );
}
