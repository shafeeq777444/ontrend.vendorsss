/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import localforage from "localforage";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebase/config";
import { handleGoogleLogin } from "@/lib/firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";


const SignUP = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();
  const secretKey = import.meta.env.VITE_CRYPTO_SECRET || "";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = formData;

    if (firstName.trim().length < 3) {
      toast.error(isArabic ? "الاسم قصير جدًا" : "First name too short");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(isArabic ? "بريد إلكتروني غير صالح" : "Invalid email");
      return;
    }

    if (password.length < 6) {
      toast.error(isArabic ? "كلمة المرور قصيرة جدًا" : "Password too short");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      const userDoc = {
        role: "User",
        firstName,
        lastName,
        email,
        profileImageUrl: "",
        timeStamp: serverTimestamp(),
      };

      await setDoc(doc(db, "users", uid), userDoc);

      toast.success(isArabic ? "تم التسجيل بنجاح" : "Signup successful");
      navigate("/auth/credential");
    } catch (error) {
      console.error("Signup error:", error);
      if (error.code === "auth/email-already-in-use") {
        toast.error(isArabic ? "البريد الإلكتروني مسجل بالفعل" : "Email already registered");
      } else {
        toast.error(isArabic ? "فشل في التسجيل" : "Signup failed");
      }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-white px-4 ${isArabic ? "rtl" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
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
          <img src="/ONtrend-logo.png" alt="onTrend Logo" className="w-20 h-20" />
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-xl font-semibold text-gray-800">
            {isArabic ? "هيا بنا نبدأ" : "Let’s Get You Set Up"}
          </h1>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            {isArabic
              ? "أنشئ حسابك وابدأ رحلتك مع onTrend"
              : "Create your account and start your cravings journey with onTrend"}
          </p>
        </motion.div>

        {/* Input Fields */}
        <motion.form
          className="space-y-4"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex gap-4 flex-row-reverse md:flex-row">
            <input
              type="text"
              name="firstName"
              placeholder={isArabic ? "الاسم الأول" : "First Name"}
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="text"
              name="lastName"
              placeholder={isArabic ? "الاسم الأخير (اختياري)" : "Last Name (optional)"}
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder={isArabic ? "البريد الإلكتروني" : "Email address"}
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="password"
            name="password"
            placeholder={isArabic ? "كلمة المرور" : "Password"}
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <motion.button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md transition duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {isArabic ? "إنشاء الحساب" : "Create Account"}
          </motion.button>
        </motion.form>

        {/* Already have account? */}
        <motion.p
          className="text-center text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {isArabic ? "لديك حساب بالفعل؟" : "Already have an account?"}{" "}
          <span
            className="text-red-500 font-semibold cursor-pointer"
            onClick={() => navigate("/auth")}
          >
            {isArabic ? "تسجيل الدخول" : "Login"}
          </span>
        </motion.p>

        {/* Social Login */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-center text-sm text-gray-500 mb-3">
            {isArabic ? "أو سجل عبر" : "Or sign up with"}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleGoogleLogin({ navigate, toast })}
              type="button"
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 text-lg"
            >
              <FaGoogle />
            </button>
            <button type="button" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 text-lg">
              <FaApple />
            </button>
            <button type="button" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 text-lg">
              <FaFacebookF />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUP;
