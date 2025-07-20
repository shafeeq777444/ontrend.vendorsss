import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import localforage from "localforage";
import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

export default function NameForm() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const watchFields = watch(["firstName", "lastName"]);

  // Encrypt and save to localforage
  useEffect(() => {
    const [firstName, lastName] = watchFields;
    if (firstName || lastName) {
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify({ firstName, lastName }),
        ENCRYPTION_KEY
      ).toString();
      localforage.setItem("userName", encrypted);
    }
  }, [watchFields, ENCRYPTION_KEY]);

  // Load stored data on mount
  useEffect(() => {
    localforage.getItem("userName").then((data) => {
      if (data) {
        try {
          const decrypted = CryptoJS.AES.decrypt(data, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
          const { firstName, lastName } = JSON.parse(decrypted);
          if (firstName) setValue("firstName", firstName);
          if (lastName) setValue("lastName", lastName);
        } catch (err) {
          console.error("Decryption failed:", err);
        }
      }
    });
  }, [setValue, ENCRYPTION_KEY]);

  return (
    <form className="space-y-4 p-4 max-w-md mx-auto">
      <div>
        <label className="block font-medium">First Name</label>
        <input
          {...register("firstName", {
            required: "Required",
            minLength: { value: 2, message: "Min 2 characters" },
            pattern: { value: /^[A-Za-z]+$/, message: "Only letters" },
          })}
          className="border p-2 w-full"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Last Name</label>
        <input
          {...register("lastName", {
            required: "Required",
            minLength: { value: 2, message: "Min 2 characters" },
            pattern: { value: /^[A-Za-z]+$/, message: "Only letters" },
          })}
          className="border p-2 w-full"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName.message}</p>
        )}
      </div>
    </form>
  );
}
