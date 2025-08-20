import React, { useState } from "react";
import { Menu, X, ChevronDown, Zap, ArrowLeft, ArrowRight } from "lucide-react";
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
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

import ReusableConfirmationModal from "../components/common/ReusableConfirmationModal";
import ShopOpenCLoseButton from "../components/common/ShopOpenCLoseButton";
import LogoutButton from "../components/common/LogoutButton";
import LogoutButtonSIdeBar from "../components/common/LogoutButtonSIdeBar";

const SideBarLayout = () => {
  // ------------------------ hooks ------------------------
  const { data } = useCurrentUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const authReady = useFirebaseAuthReady();
  const user = getAuth().currentUser;
  const dispatch = useDispatch();
  const { mutate } = useUpdateVendorProfile();
  // eslint-disable-next-line no-unused-vars
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
    { name: "Banners", icon: null, route: "/banners-gallery" },
    { name: "Profile", icon: null, route: "/profile" },
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
            <div className="flex items-start gap-3 lg:gap-4">
              <ShopOpenCLoseButton onClick={handleShopOpenClose} />
              <div className="hidden lg:block">
                <LogoutButton onClick={() => setModalOpen(true)} />
              </div>

              {data && (
                <div
                  onClick={() => navigate("/profile")}
                  className=" hidden sm:flex items-center gap-1 md:gap-2 cursor-pointer bg-[rgba(0,0,0,0.2)] px-2 py-1 md:px-3 md:py-2 rounded-full hover:bg-[rgba(0,0,0,0.3)] transition-colors duration-300"
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
                  className="text-sky-200 hover:text-white transition-colors "
                >
                  {menuOpen ? <X /> :  <img
                    src={data?.image}
                    alt="profile"
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full ring-2 "
                  />}
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
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex bg-black/20"
            >
              {/* Overlay */}
              <div
                className="flex-1"
                onClick={() => setMenuOpen(false)}
              />
              {/* Sidebar with Framer Motion */}
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  damping: 25, 
                  stiffness: 200,
                  opacity: { duration: 0.2 }
                }}
                className="w-64 bg-white/20 backdrop-blur-md border-l border-white/20 h-full shadow-2xl flex flex-col fixed right-0 top-0 p-4 space-y-2  rounded-l-lg"
              >
                <button
                  className="self-start text-white/60 bg-white/20 rounded-full p-2 hover:bg-white/30 hover:text-gray-100 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <ArrowRight size={18} />
                </button>

                {data && (
                  <div
                    onClick={() => {
                      navigate("/profile");
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-2 cursor-pointer bg-white/20 px-3 py-2 rounded-full hover:bg-white/30 transition-colors duration-300"
                  >
                    <img
                      src={data?.image}
                      alt="profile"
                      className="w-8 h-8 rounded-full ring-2 ring-white/40"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white drop-shadow-sm">{data?.restaurantName}</span>
                      <span className="text-xs font-light pl-1 text-white/50 drop-shadow-sm">{data?.ownerName}</span>
                    </div>
                    <ChevronDown size={4} className="text-white/80 hidden sm:inline" />
                  </div>
                )}

                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      navigate(item.route);
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-md transition-colors font-medium ${
                      item.route === window.location.pathname
                        ? "bg-white/40 text-white shadow-lg border border-white/30"
                        : "hover:bg-white/25 hover:text-white text-white/90 hover:shadow-md"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                
                {/* Mobile Logout Button */}
                <div className="mt-auto pt-4 border-t border-white/20">
                  <LogoutButtonSIdeBar onClick={() => setModalOpen(true)} />
                </div>
              </motion.div>
            </motion.div>
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
