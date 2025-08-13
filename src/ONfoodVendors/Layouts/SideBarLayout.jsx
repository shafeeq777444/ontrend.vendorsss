import React, { useState } from "react";
import { Menu, X, ChevronDown, Zap, Search, Clock, Eye, Users, DollarSign } from "lucide-react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../services/hooks/profile/useCurrentUserLiveData";
import LogoutConfirmation from "../components/common/LogoutCard";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useFirebaseAuthReady } from "../../services/firebase/auth";
import NotificationButton from "../components/common/NotificationButton";
import LogoutButton from "../components/common/LogoutButton";
import ShopOpenCLoseButton from "../components/common/ShopOpenCLoseButton";
import ReusableConfirmationModal from "../components/common/ReusableConfirmationModal";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { resetApp } from "../../app/actions/appActions";
import { useUpdateVendorProfile } from "../../services/queries/vendor.query";
import { useLiveOrdersWithSound } from "../../services/hooks/orders/useLiveOrdersWithSound";
import StopAlertButton from "../components/Orders/StopAlertButton";
import useProcessingOrdersCount from "../../services/hooks/orders/useProcessingOrdersCountLive";
import { motion, AnimatePresence } from "framer-motion";

const SideBarLayout = () => {
    // -------------------------------------------------- hooks --------------------------------------------------
    const { data, isLoading } = useCurrentUser();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const authReady = useFirebaseAuthReady();
    const user = getAuth().currentUser;
    const dispatch = useDispatch();
    const { mutate } = useUpdateVendorProfile();
    const { orders, stopAlertSequence, alertLoop } = useLiveOrdersWithSound(data?.id);
    useProcessingOrdersCount(data?.id);

    // -------------------------------------- states --------------------------------------------------
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    // -------------------------------------- functions --------------------------------------
    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            queryClient.clear();
            toast.success("Logged out");
            navigate("/auth");
            dispatch(resetApp());
            setModalOpen(false);
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Failed to log out");
        }
    };

    const handleShopOpenClose = () => {
        mutate(
            { vendorId: data?.id, updatedData: { isOnline: !data?.isOnline } },
            {
                onSuccess: () => {
                    toast.success(`Shop ${!data?.isOnline ? "opened" : "closed"}`);
                },
                onError: () => {
                    toast.error("Failed to update shop status");
                },
            }
        );
    };

    // -------------------------------------- constants --------------------------------------------------
    const menuItems = [
        { name: "Orders", icon: null, route: "/" },
        { name: "Menus", icon: null, route: "/menu" },
        { name: "Earnings", icon: <Zap size={16} />, route: "/earnings" },
        { name: "Profile", icon: null, route: "/profile" },
        { name: "Banners", icon: null, route: "/banners-gallery" },
    ];

    // ------------------------------------------------------------- UI --------------------------------------------------
    if (!authReady) return <div className="p-10 text-center"></div>;
    if (!user) return <Navigate to="/auth" replace />;
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-sky-900 via-sky-700 to-sky-600 text-white shadow-lg h-80 border-b-2 ">
                <div className="max-w-8xl mx-auto px-18 py-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            {/* <img className="w-20" src="/ONtrend/ONtrend-logo.png"></img> */}
                            <span className="text-xl font-semibold text-sky-100">ONtrend</span>
                        </div>

                        {/* Right section */}
                        <div className="flex items-center gap-4">
                            <ShopOpenCLoseButton onClick={handleShopOpenClose} />
                            {/* <NotificationButton /> */}
                            <LogoutButton onClick={() => setModalOpen(true)} />
                            {/* Profile dropdown */}
                            {data && (
                                <div
                                    onClick={() => navigate("/profile")}
                                    className="flex items-center gap-2 cursor-pointer bg-[rgba(0,0,0,0.2)]  md:px-3 py-2 rounded-full hover:bg-[rgba(0,0,0,0.3)]  transition-colors duration-300 ease-in-out"
                                >
                                    {console.log(data, "profile data")}
                                    <img src={data?.image} alt="profile" className="w-8 h-8 rounded-full ring-2" />
                                    <span className="text-sm font-medium hidden sm:inline">{data?.restaurantName}</span>
                                    <ChevronDown size={4} className="text-sky-200 hidden sm:inline" />
                                </div>
                            )}

                            {/* Mobile menu icon */}
                            <div className="lg:hidden">
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="text-sky-200 hover:text-white transition-colors"
                                >
                                    {menuOpen ? <X /> : <Menu />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6 mt-4">
                        {menuItems.map((item, index) => (
                            <button
                                onClick={() => navigate(item?.route)}
                                key={index}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-md transition-colors ${
                                    item.route === window.location.pathname
                                        ? "bg-sky-600 text-white shadow-md "
                                        : "hover:bg-slate-600/30 hover:text-gray-100 "
                                }`}
                            >
                                {item.icon && <span className="text-sky-200">{item.icon}</span>}
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu (Right-to-Left Slide) */}
                <AnimatePresence>
                    {menuOpen && (
                        <div className="fixed inset-0 z-50 flex">
                            {/* Overlay */}
                            <div
                                className="flex-1 bg-black/30 bg-opacity-40"
                                onClick={() => setMenuOpen(false)}
                            />
                            {/* Sidebar with Framer Motion */}
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: "tween", duration: 0.35 }}
                                className="w-64 bg-white h-full shadow-lg flex flex-col fixed right-0 top-0"
                            >
                                <button
                                    className="self-end m-4 text-black hover:text-gray-700"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <X size={24} />
                                </button>
                                {/* Profile dropdown */}
                           
                                <div className="flex flex-col gap-2 px-6 py-4">
                                     {data && (
                                <div
                                    onClick={() => navigate("/profile")}
                                    className="flex items-center gap-2 cursor-pointer bg-[rgba(0,0,0,0.2)]  md:px-3 py-2 rounded-full hover:bg-[rgba(0,0,0,0.3)]  transition-colors duration-300 ease-in-out"
                                >
                                    {console.log(data, "profile data")}
                                    <img src={data?.image} alt="profile" className="w-8 h-8 rounded-full ring-2" />
                                    <span className="text-sm font-medium hidden sm:inline">{data?.restaurantName}</span>
                                    <ChevronDown size={4} className="text-sky-200 hidden sm:inline" />
                                </div>
                            )}
                                    {menuItems.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                navigate(item.route);
                                                setMenuOpen(false);
                                            }}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-md transition-colors ${
                                                item.route === window.location.pathname
                                                    ? "bg-sky-600 text-white shadow-md"
                                                    : "hover:bg-slate-600/30 hover:text-gray-900 text-sky-600"
                                            }`}
                                        >
                                            {/* {item.icon && <span className="text-sky-200">{item.icon}</span>}  */}
                                            {item.name}
                                        </button>
                                    ))}
                                    {/* <button className="flex items-center gap-2 bg-sky-50 text-sky-700 font-semibold px-4 py-2 rounded-lg text-sm mt-2 hover:bg-sky-100 transition-colors">
                                        <Search size={16} />
                                        Channel Consultation
                                    </button> */}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/*------------------------------- Modal ---------------------------*/}
            <ReusableConfirmationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onAction={() => {
                    handleLogout();
                }}
                // image={doorImage}
                title="Are you logging out?"
                description="You can always log back in at any time. If you just want to switch accounts, you can add another account."
                closeText="Cancel"
                actionText="Log out"
            />

            {/* --------------------- extra components --------------------- */}
            {<StopAlertButton stopAlertSequence={stopAlertSequence} alertLoop={alertLoop} />}

            {/*------------------------------- Main Content Area ---------------------------*/}
            <div className="h-80 px-4 py-6 -mt-40">
                <Outlet />
            </div>
        </div>
    );
};

export default SideBarLayout;
