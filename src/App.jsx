/* eslint-disable no-unused-vars */
// import OntrendLoading from "./shared/components/common/OntrendLoading";
import { Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SideBarLayout from "./ONfoodVendors/Layouts/SideBarLayout";
import LoginScreen from "./auth/pages/Login";
import AuthLayout from "./auth/layouts/AuthLayout";
import VendorProfileInfo from "./ONfoodVendors/pages/VendorProfileInfo";

import AddMenuPage from "./ONfoodVendors/pages/AddMenuPage";
import VenderFoodPage from "./ONfoodVendors/pages/VenderFoodPage";
import TransliterateInput from "./ONfoodVendors/Test";
import OrderPage from "./ONfoodVendors/pages/orderPage";
import EarningsPage from "./ONfoodVendors/pages/EarningsPage";
import TestingPage from "./ONfoodVendors/pages/TestingPage";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<SideBarLayout />}>
                <Route index element={<OrderPage />} />
                <Route path="/menu" element={<VenderFoodPage />} />
                <Route path="/menu/:vendorType/:category/:id" element={<AddMenuPage />} />
                <Route path="/testing" element={<TestingPage />} />
                <Route path="/earnings" element={<EarningsPage />} />
                <Route path="/profile" element={<VendorProfileInfo />} />

            </Route>
            {/* ---------------------------------  Auth --------------------------------- */}
            <Route path="/auth" element={<AuthLayout />}>
                <Route index element={<LoginScreen />} />
            </Route>
        </Routes>
    );
}
