/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Select from "react-select";
import countries from "country-flag-emoji-json";
import localforage from "localforage";
import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY

export default function NationalInput() {
  const countryOptions = countries.map((country) => ({
    value: country.name,
    label: `${country.emoji} ${country.name}`,
  }));

  const defaultOman = countryOptions.find(
    (country) => country.value.toLowerCase() === "oman"
  );

  const [nationality, setNationality] = useState(defaultOman);

  // Load from secure storage
  useEffect(() => {
    localforage.getItem("userNationality").then((encrypted) => {
      if (encrypted) {
        try {
          const bytes = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY);
          const decrypted = bytes.toString(CryptoJS.enc.Utf8);
          const found = countryOptions.find(
            (c) => c.value.toLowerCase() === decrypted.toLowerCase()
          );
          if (found) setNationality(found);
        } catch (err) {
          console.error("Decryption failed", err);
        }
      }
    });
  }, []);

  const handleNationalityChange = (selectedOption) => {
    setNationality(selectedOption);
    const encrypted = CryptoJS.AES.encrypt(selectedOption.value, ENCRYPTION_KEY).toString();
    localforage.setItem("userNationality", encrypted);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-400 to-red-600 p-4">
      <div className="w-full max-w-md md:w-1/2 h-full md:h-[90vh] bg-white rounded-none md:rounded-2xl shadow-lg p-6 md:p-10">
        <h2 className="text-2xl font-bold mb-4">Complete Your Signup</h2>

        {/* Nationality with Flag */}
        <label className="block text-sm font-medium mb-1">Nationality</label>
        <Select
          options={countryOptions}
          value={nationality}
          onChange={handleNationalityChange}
          className="mb-4"
        />

        {nationality && (
          <p className="text-sm text-gray-600">Selected: {nationality.label}</p>
        )}
      </div>
    </div>
  );
}
