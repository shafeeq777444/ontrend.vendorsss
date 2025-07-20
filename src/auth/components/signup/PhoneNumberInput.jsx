// components/MobileValidatorInput.jsx
import React, { useState, useEffect } from "react";
import { parsePhoneNumber } from "libphonenumber-js";
import localforage from "localforage";
import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

export default function PhoneNumberInput() {
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    localforage.getItem("userPhone").then((encrypted) => {
      if (encrypted) {
        try {
          const bytes = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY);
          const decrypted = bytes.toString(CryptoJS.enc.Utf8);
          setPhone(decrypted);
          validatePhone(decrypted);
        } catch (err) {
          console.error("Decryption failed", err);
        }
      }
    });
  }, []);

  const validatePhone = (value) => {
    try {
      const phoneNumber = parsePhoneNumber(`+968${value}`, "OM");
      const valid = phoneNumber.isValid();
      setIsValid(valid);
      return valid;
    } catch (err) {
      console.log(err)
      setIsValid(false);
      return false;
    }
  };

  const handleChange = (e) => {
    const cleaned = e.target.value.replace(/\D/g, "").replace(/^0+/, "").slice(0, 8);
    setPhone(cleaned);
    const encrypted = CryptoJS.AES.encrypt(cleaned, ENCRYPTION_KEY).toString();
    localforage.setItem("userPhone", encrypted);

  };

  return (
    <div className="mb-4 z-30">
      <label className="block text-sm font-medium mb-1">Phone Number </label>
      <div className="flex items-center border rounded-md overflow-hidden">
        <span className="bg-gray-100 px-3 py-2 text-sm text-gray-700">+968</span>
        <input
          type="tel"
          inputMode="numeric"
          value={phone}
          onChange={handleChange}
          maxLength={8}
          placeholder="Enter 8-digit number"
          className="w-full px-3 py-2 text-sm outline-none"
        />
        {isValid && (
          <span className="px-2 text-green-500 text-xl">✅</span>
        )}
      </div>
    </div>
  );
}
