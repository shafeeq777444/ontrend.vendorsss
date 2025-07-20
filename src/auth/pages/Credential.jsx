/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import localforage from "localforage";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CryptoJS from "crypto-js";

import "react-phone-input-2/lib/style.css";
import Select from "react-select";
const omanPhoneRegex = /^\d{7,}$/;
import countryList from "country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { createUserWithEmailAndPassword, getAuth,  } from "firebase/auth";

import { app, db } from "@/lib/firebase/config";
import { getFriendlyFirebaseError } from "@/lib/firebase/auth";


const Credential = () => {
    const navigate = useNavigate();
    const secretKey = import.meta.env.VITE_CRYPTO_SECRET || "";
    const [details, setDetails] = useState({
        referenceCode: "",
        mobileNumber: "",
        nationality: "",
    });

    const countryOptions = countryList.getNames().map((country) => ({
        label: country,
        value: country,
    }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
  e.preventDefault();

  if (!details.mobileNumber || !details.nationality) {
    toast.error("Mobile & nationality required");
    return;
  }

  const omanPhoneRegex = /^\d{7,}$/;// adjust if needed
  if (!omanPhoneRegex.test(details.mobileNumber)) {
    toast.error("Invalid number");
    return;
  }

  try {
    const auth = getAuth(app);
    const currentUser = auth.currentUser;

    if (!currentUser) {
      toast.error("User not logged in");
      return;
    }

    const uid = currentUser.uid;

    const userDoc = {
      nationality: details.nationality,
      number: details.mobileNumber.replace("+968", ""),
      usedHeroCode: details.referenceCode || "",
      updatedAt: serverTimestamp(), // ⏱ Track last update time
    };

    await setDoc(doc(db, "users", uid), userDoc, { merge: true });

    toast.success("Account created");
    navigate("/");
  } catch (error) {
    const message = getFriendlyFirebaseError(error); // optional: your own error formatter
    toast.error(message || "Something went wrong");
    console.error("Error:", error);
  }
};

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <motion.div
                className="w-full max-w-md space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Heading */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-xl font-semibold text-gray-800">Additional Info</h2>
                    <p className="text-sm text-gray-500 mt-2">Please provide the following information to continue.</p>
                </motion.div>

                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {/* Reference Code */}
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">#</span>
                        <input
                            type="text"
                            name="referenceCode"
                            placeholder="Reference Code (optional)"
                            value={details.referenceCode}
                            onChange={handleChange}
                            className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none "
                        />
                    </div>

                    {/* Phone Number */}
                    <PhoneInput
                        country="om" // ✅ Oman supported here
                        value={details.mobileNumber}
                        onChange={(value) => setDetails((prev) => ({ ...prev, mobileNumber: value }))}
                        onlyCountries={["om"]} // ✅ lock to Oman
                        disableDropdown={true} // ✅ prevent change
                        inputStyle={{
                            width: "100%",
                            border: "none",
                            outline: "none",
                        }}
                        containerStyle={{
                            borderRadius: "8px",
                            border: " solid #d1d5db",
                            padding: "8px",
                        }}
                    />

                    {/* Nationality */}
                    <Select
                        options={countryOptions}
                        placeholder="Select Nationality"
                        onChange={(option) => setDetails((prev) => ({ ...prev, nationality: option.value }))}
                        className="text-sm"
                        styles={{
                            control: (base) => ({
                                ...base,
                                padding: "4px",
                                borderRadius: "0.5rem",
                                borderColor: "#d1d5db",
                                boxShadow: "none",
                            }),
                        }}
                    />

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md transition duration-300"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Continue
                    </motion.button>
                </motion.form>
            </motion.div>
        </div>
    );
};

export default Credential;
