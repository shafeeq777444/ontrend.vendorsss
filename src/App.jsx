import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import OrderPage from "./ONfoodVendors/pages/orderPage"; // keep this normal import
import Loading from "./ONfoodVendors/components/common/Loading";
import SideBarLayout from "./ONfoodVendors/Layouts/SideBarLayout";

// Lazy imports
const LoginScreen = lazy(() => import("./auth/pages/Login"));
const AuthLayout = lazy(() => import("./auth/layouts/AuthLayout"));
const VendorProfileInfo = lazy(() => import("./ONfoodVendors/pages/VendorProfileInfo"));
const AddMenuPage = lazy(() => import("./ONfoodVendors/pages/AddMenuPage"));
const VenderFoodPage = lazy(() => import("./ONfoodVendors/pages/VenderFoodPage"));
const EarningsPage = lazy(() => import("./ONfoodVendors/pages/EarningsPage"));
const BannersGalleryPage = lazy(() => import("./ONfoodVendors/pages/BannersGalleryPage"));
export default function App() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<SideBarLayout />}>
                    <Route index element={<OrderPage />} />
                    <Route path="/menu" element={<VenderFoodPage />} />
                    <Route path="/menu/:vendorType/:category/:id" element={<AddMenuPage />} />
                    <Route path="/testing" element={<Loading />} />
                    <Route path="/earnings" element={<EarningsPage />} />
                    <Route path="/profile" element={<VendorProfileInfo />} />
                    <Route path="/banners-gallery" element={<BannersGalleryPage />} />
                </Route>
                {/* ---------------------------------  Auth --------------------------------- */}
                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<LoginScreen />} />
                </Route>
            </Routes>
        </Suspense>
    );
}
