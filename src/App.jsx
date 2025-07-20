import { Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



// extras-----------------------------------------------------
// import OntrendLoading from "./shared/components/common/OntrendLoading";
import SideBarLayout from "./ONfoodVendors/Layouts/SideBarLayout";
import Menu from "./ONfoodVendors/components/Menus/Menu";
import AddItemPopOverForm from "./ONfoodVendors/components/Menus/AddItemPopOverForm";
import LoginScreen from "./auth/pages/Login";
import AuthLayout from "./auth/layouts/AuthLayout";

import VendorProfileInfo from "./ONfoodVendors/containers/Profile/VendorProfileInfo";
const queryClient = new QueryClient()



export default function App() {
    return (
      <QueryClientProvider client={queryClient}>
        {/* // <Suspense fallback={<OntrendLoading />}> */}
            <Routes>
                <Route path="/" element={<SideBarLayout />}>
                    {/* <Route index element={<AddItemPopOverForm />} /> */}
                    <Route index element={<VendorProfileInfo />} />
                </Route>
                {/* ---------------------------------  Auth --------------------------------- */}
                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={< LoginScreen/>} />
                </Route>

            </Routes>
        {/* // </Suspense> */}
        </QueryClientProvider>
    );
}
