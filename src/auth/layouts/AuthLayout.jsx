/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCurrentUser } from "../../services/hooks/profile/useCurrentUserLiveData";
import LazyImg from "../../ONfoodVendors/components/common/LazyImg";
import { useEffect } from "react";
import Loading from "../../ONfoodVendors/components/common/Loading";

const AuthLayout = () => {
  const { data, isLoading } = useCurrentUser();
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (data) {
      navigate("/"); // Redirect to home
    }
  }, [data, navigate]);

  // Show loader while checking auth
  if (isLoading) return <Loading />;

  // Show auth UI only if user is not logged in
  if (!data) {
    return (
      <div className="flex h-screen">
        {/* Left Side - Auth Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <Outlet />
        </div>

        {/* Right Side - Image / Testimonial */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center relative p-6"
        >
          <div className="absolute inset-0 bg-black/5 z-10" />
          <LazyImg
            src="/ONtrendLogo/Blue-OntrendPartnersLogo.png"
            alt="testimonial"
            className="absolute inset-0 w-full h-full object-cover z-0"
            loading="lazy"
          />
          <div className="z-20 absolute bottom-4 text-white max-w-xl px-6" />
        </motion.div>
      </div>
    );
  }

  // While redirecting, render nothing to prevent UI flash
  return null;
};

export default AuthLayout;
