import React, { useState } from "react";
import { Menu, X, ChevronDown, Zap } from "lucide-react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../services/hooks/profile/useCurrentUserLiveData";
import { getAuth, signOut } from "firebase/auth";
import { useFirebaseAuthReady } from "../../services/firebase/auth";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { resetApp } from "../../app/actions/appActions";
import { useUpdateVendorProfile } from "../../services/queries/vendor.query";
import { useLiveOrdersWithSound } from "../../services/hooks/orders/useLiveOrdersWithSound";
import StopAlertButton from "../components/Orders/StopAlertButton";
import useProcessingOrdersCount from "../../services/hooks/orders/useProcessingOrdersCountLive";
import { motion, AnimatePresence } from "framer-motion";

import ReusableConfirmationModal from "../components/common/ReusableConfirmationModal";
import ShopOpenCLoseButton from "../components/common/ShopOpenCLoseButton";
import LogoutButton from "../components/common/LogoutButton";

const SideBarLayout = () => {
  // ------------------------ hooks ------------------------
  const { data, isLoading } = useCurrentUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const authReady = useFirebaseAuthReady();
  const user = getAuth().currentUser;
  const dispatch = useDispatch();
  const { mutate } = useUpdateVendorProfile();
  const { orders, stopAlertSequence, alertLoop } = useLiveOrdersWithSound(data?.id);
  useProcessingOrdersCount(data?.id);

  // ------------------------ states ------------------------
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // ------------------------ functions ------------------------
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

  // ------------------------ constants ------------------------
  const menuItems = [
    { name: "Orders", icon: null, route: "/" },
    { name: "Menus", icon: null, route: "/menu" },
    { name: "Earnings", icon: <Zap size={16} />, route: "/earnings" },
    { name: "Profile", icon: null, route: "/profile" },
    { name: "Banners", icon: null, route: "/banners-gallery" },
  ];

  // ------------------------ UI ------------------------
  if (!authReady) return <div className="p-10 text-center"></div>;
  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-700 to-sky-600 text-white shadow-lg h-80 border-b-2">
        <div className="max-w-8xl mx-auto px-4 py-4 lg:px-18 lg:py-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-lg lg:text-xl font-semibold text-sky-100">ONtrend</span>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2 lg:gap-4">
              <ShopOpenCLoseButton onClick={handleShopOpenClose} />
              <LogoutButton onClick={() => setModalOpen(true)} />

              {data && (
                <div
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-1 md:gap-2 cursor-pointer bg-[rgba(0,0,0,0.2)] px-2 py-1 md:px-3 md:py-2 rounded-full hover:bg-[rgba(0,0,0,0.3)] transition-colors duration-300"
                >
                  <img
                    src={data?.image}
                    alt="profile"
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full ring-2"
                  />
                  <span className="text-xs md:text-sm font-medium hidden sm:inline">
                    {data?.restaurantName}
                  </span>
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
                    ? "bg-sky-600 text-white shadow-md"
                    : "hover:bg-slate-600/30 hover:text-gray-100"
                }`}
              >
                {item.icon && <span className="text-sky-200">{item.icon}</span>}
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
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
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.35 }}
                className="w-64 bg-white h-full shadow-lg flex flex-col fixed right-0 top-0 p-4 space-y-2"
              >
                <button
                  className="self-end text-black hover:text-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  <X size={24} />
                </button>

                {data && (
                  <div
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-2 cursor-pointer bg-[rgba(0,0,0,0.2)] px-3 py-2 rounded-full hover:bg-[rgba(0,0,0,0.3)] transition-colors duration-300"
                  >
                    <img
                      src={data?.image}
                      alt="profile"
                      className="w-8 h-8 rounded-full ring-2"
                    />
                    <span className="text-sm font-medium">{data?.restaurantName}</span>
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
                    {item.name}
                  </button>
                ))}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Logout Modal */}
      <ReusableConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAction={handleLogout}
        title="Are you logging out?"
        description="You can always log back in at any time. If you just want to switch accounts, you can add another account."
        closeText="Cancel"
        actionText="Log out"
      />

      {/* Stop Alert Button */}
      {<StopAlertButton stopAlertSequence={stopAlertSequence} alertLoop={alertLoop} />}

      {/* Main Content */}
      <div className="h-80 px-4 py-6 -mt-40">
        <Outlet />
      </div>
    </div>
  );
};

export default SideBarLayout;
