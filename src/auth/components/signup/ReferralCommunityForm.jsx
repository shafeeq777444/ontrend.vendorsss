import localforage from "localforage";
import CryptoJS from "crypto-js";
import React from "react";
import { useForm } from "react-hook-form";
import { addBuyer } from "../../firebase/fireStore/buyerFirestore";
import { useNavigate } from "react-router-dom";

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

export default function ReferralCommunityForm() {
  const navigate=useNavigate()
   const decryptValue = (encryptedValue) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedValue, ENCRYPTION_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Decryption error:", error);
      return null;
    }
  };
  
   const onSubmit = async (formData) => {
  const decryptedData = {};

  // Decrypt all localforage data
  await localforage.iterate((value, key) => {
    const decryptedValue = decryptValue(value);
    try {
      decryptedData[key] = JSON.parse(decryptedValue); // if value is a JSON string
    } catch {
      decryptedData[key] = decryptedValue; // fallback for plain text
    }
  });
  console.log(decryptedData)

  // Combine both
  const combinedData = {
    number:decryptedData?.userPhone,
    role:"User",
    firstName:decryptedData?.userName?.firstName,
   lastName:decryptedData?.userName?.lastName,
   nationality:decryptedData?.userNationality
    // ...decryptedData.userName,
    // ...formData,
  };

  console.log("Combined Data:", combinedData);
  await addBuyer(combinedData)
  navigate('/location')
};

  const {
    register,
    handleSubmit,
  } = useForm();


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-md mx-auto space-y-4">
      <div>
        <label className="block mb-1 font-medium">Referral Code</label>
        <input
          {...register("referralCode")}
          placeholder="Enter referral code"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Community Code</label>
        <input
          {...register("communityCode")}
          placeholder="Enter community code"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 w-full text-white  py-2 rounded hover:bg-green-700"
      >
        Submit
      </button>
    </form>
  );
}
