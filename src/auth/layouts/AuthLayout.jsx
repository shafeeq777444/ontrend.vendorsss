import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const AuthLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Auth Form (Login/Signup/etc.) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <Outlet />
      </div>

      {/* Right Side - Testimonial Section */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center relative p-6"
      >
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img
          src="/login/loginui.png"
          alt="testimonial"
          className="absolute inset-0 w-full h-full object-cover z-0"
          loading="lazy"
        />
        <div className="z-20 absolute bottom-4 text-white max-w-xl px-6">
          {/* <p className="text-xl font-semibold">
            OnTrend helped us save hours every day by combining food, grocery,
            pharmacy, and even rental services into one powerful delivery
            platform.
          </p> */}
          {/* <p className="mt-4 text-sm">
            Emira Kensington
            <br />
            Business Partner, OnTrend
          </p> */}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
