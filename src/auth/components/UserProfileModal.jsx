/* eslint-disable no-unused-vars */
import useCurrentUser from "@/shared/services/queries/user.query";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiLogOut, FiCheckCircle } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";


const UserProfileModal = ({ setShowUserMOdal }) => {
    const { data: userData, isLoading, isError } = useCurrentUser();
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const isArabic = i18n.language === "ar";

    if (isLoading) return null;
    if (isError) return <p className="text-red-500">Failed to load profile</p>;

    return (
        <AnimatePresence>
            <motion.div
                dir={isArabic ? "rtl" : "ltr"}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-3xl shadow-2xl p-0 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {/* Cover image placeholder - FIXED */}
                    <div className="h-40 relative pointer-events-none">
                        <button
                            onClick={() => {
                                setShowUserMOdal(false);
                            }}
                            className={`absolute top-4 ${isArabic ? "left-4" : "right-4"} bg-white text-black rounded-full py-0.5 px-2 hover:scale-105 hover:shadow-md transition-transform duration-300 ease-in-out pointer-events-auto`}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Profile Header */}
                    <div className={`p-6 flex items-center gap-6 -mt-36 ${isArabic ? "flex-row-reverse text-right" : ""}`}>
                        {userData?.profileImageUrl && (
                            <img
                                src={userData?.profileImageUrl}
                                alt="Profile"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/extras/user.png";
                                }}
                                className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
                            />
                        )}
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-semibold">
                                    {userData.firstName} {userData.lastName}
                                </h2>
                                <FiCheckCircle className="text-blue-500" />
                            </div>
                            <p className="text-sm text-gray-500">{userData.email}</p>
                            <p className="text-sm text-gray-500">{userData.nationality}</p>
                        </div>
                        {/* Sign out button */}
                        <div className="ml-auto flex gap-2">
                            <button
                                onClick={() => {
                                    signOut(auth)
                                        .then(() => {
                                            navigate("/auth");
                                        })
                                        .catch((error) => {
                                            console.error("Sign out error:", error);
                                        });
                                }}
                                className="flex items-center gap-1 px-3 py-1 border rounded-md text-sm"
                            >
                                <FiLogOut />
                                {isArabic ? "تسجيل خروج" : "Sign out"}
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="px-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex gap-6 text-sm text-gray-500 font-medium">
                            <button className="text-black border-b-2 border-black dark:text-white py-3">
                                {isArabic ? "الملف الشخصي" : "Profile"}
                            </button>
                        </div>
                    </div>

                    {/* Form section */}
                    <div className={`p-6 space-y-6 text-sm ${isArabic ? "text-right" : ""}`}>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block text-gray-600 mb-1">
                                    {isArabic ? "الاسم الأول" : "First Name"}
                                </label>
                                <input
                                    type="text"
                                    value={userData.firstName}
                                    readOnly
                                    className="w-full px-4 py-2 bg-gray-100 rounded-full border border-gray-200 focus:outline-none"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-gray-600 mb-1">{isArabic ? "اسم العائلة" : "Last Name"}</label>
                                <input
                                    type="text"
                                    value={userData.lastName}
                                    readOnly
                                    className="w-full px-4 py-2 bg-gray-100 rounded-full border border-gray-200 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1">{isArabic ? "البريد الإلكتروني" : "Email"}</label>
                            <input
                                type="email"
                                value={userData.email}
                                readOnly
                                className="w-full px-4 py-2 bg-gray-100 rounded-full border border-gray-200 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1">{isArabic ? "اسم المستخدم" : "Username"}</label>
                            <div className="flex items-center w-full px-4 py-2 bg-gray-100 rounded-full border border-gray-200">
                                <span className="text-gray-400">@</span>
                                <span className="mx-1 text-black">{userData.firstName}</span>
                                <span className="ml-auto text-green-500">✔</span>
                            </div>
                        </div>

                        <div className={`flex justify-end gap-3 pt-6 border-t mt-4 ${isArabic ? "flex-row-reverse" : ""}`}>
                            <button
                                className="px-4 py-2 rounded-full border text-sm hover:bg-gray-100"
                                onClick={() => {
                                    setShowUserMOdal(false);
                                }}
                            >
                                {isArabic ? "إلغاء" : "Discard"}
                            </button>
                            <button
                                className="px-4 py-2 rounded-full bg-black text-white text-sm opacity-50 cursor-not-allowed"
                                disabled
                            >
                                {isArabic ? "تم" : "Done"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default UserProfileModal;
