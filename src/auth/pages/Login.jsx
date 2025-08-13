/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

import { doc, getDoc } from "firebase/firestore";

import { useTranslation } from "react-i18next";


import { auth, db } from "../../config/firebase";


const LoginScreen = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error(isArabic ? "يرجى إدخال البريد وكلمة المرور" : "Please enter both email and password");
      return;
    }

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        // const hasMobile = !!userData.number;
        // const hasNationality = !!userData.nationality;
        // if (hasMobile && hasNationality) {
          toast.success(isArabic ? "تم تسجيل الدخول بنجاح" : "Login successful");
          navigate("/");
        } 
      // else {
      //     toast.success(isArabic ? "أكمل التسجيل" : "Continue signup");
      //     navigate("/auth/credential");
      //   }
      // } else {
      //   toast.error(isArabic ? "المستخدم غير مسجل" : "User not registered");
      // }
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error((isArabic ? "فشل تسجيل الدخول: " : "Login failed: ") + error.message);

    }
  };

  return (
    <div
      className={`min-h-[80vh] flex items-center justify-center bg-white px-4 ${isArabic ? "rtl text-right" : ""}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <motion.div
        className="w-full max-w-md space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <img src="/ONtrendLogo/Blue-OntrendPartnersLogo.png" alt="onTrend Logo" className="w-20 h-20" />
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-xl font-semibold text-gray-800">
            {isArabic ? "مرحباً بعودتك" : "Welcome Back"}
          </h1>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            {isArabic
              ? "اليوم هو يومك. رغباتك، احتياجاتك\n كلها على بُعد نقرة واحدة مع onTrend"
              : "Today is your day. With onTrend Partners, your business grows and your profits rise."}
          </p>
        </motion.div>

        {/* Input Fields */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isArabic ? "البريد الإلكتروني" : "Email address"}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 "
            dir={isArabic ? "rtl" : "ltr"}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isArabic ? "كلمة المرور" : "Password"}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 "
            dir={isArabic ? "rtl" : "ltr"}
          />
          <div className="text-sm text-red-500 text-right cursor-pointer">
            {/* {isArabic ? "هل نسيت كلمة المرور؟" : "Forgot password?"} */}
          </div>
        </motion.div>

        {/* Login Button */}
        <motion.button
          onClick={handleLogin}
          className="w-full py-3 from-sky-900 via-sky-700 to-sky-600 bg-gradient-to-r hover:bg-sky-800 text-white rounded-full shadow-md transition duration-300"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {isArabic ? "تسجيل الدخول" : "Login"}
        </motion.button>

        {/* Sign Up */}
        {/* <motion.p
          className="text-center text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {isArabic ? "ليس لديك حساب؟" : "Don’t have an account?"}{" "}
          <span
            className="text-red-500 font-semibold cursor-pointer"
            onClick={() => navigate("/auth/signup")}
          >
            {isArabic ? "سجّل الآن" : "Sign Up"}
          </span>
        </motion.p> */}


      </motion.div>
    </div>
  );
};

export default LoginScreen;
