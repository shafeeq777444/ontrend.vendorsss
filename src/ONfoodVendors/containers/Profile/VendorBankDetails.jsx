import { useState } from "react";
import { Pencil, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function VendorBankDetails() {
  const [isEditable, setIsEditable] = useState(false);
  const [accountNumber, setAccountNumber] = useState("9040 6000 8081 4525");
  const [SWIFTCode, setSWIFTCode] = useState("7525 0000 2122 2542");

  const inputStyle =
    "mt-1 w-full shadow-md text-sm px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200";

  return (
    <motion.div
      animate={{ scale: isEditable ? 1 : 0.97 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full max-w-sm mx-auto rounded-2xl bg-white shadow-lg p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-800">My Bank Account</h2>
        <button
          onClick={() => setIsEditable((prev) => !prev)}
          className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition"
        >
          {isEditable ? (
            <>
              <Check className="w-4 h-4" /> Done
            </>
          ) : (
            <>
              <Pencil className="w-4 h-4" /> Edit
            </>
          )}
        </button>
      </div>

      {/* Content Section */}
      <motion.div
        key={isEditable ? "editable-bank" : "readonly-bank"}
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-5"
      >
        {/* Account Number */}
        <div>
          <label className="text-sm font-medium text-gray-700">Account Number</label>
          {isEditable ? (
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className={inputStyle}
            />
          ) : (
            <p className="mt-1 text-sm text-gray-600">{accountNumber}</p>
          )}
        </div>

        {/* SWIFT Code */}
        <div>
          <label className="text-sm font-medium text-gray-700">SWIFT Code</label>
          {isEditable ? (
            <input
              type="text"
              value={SWIFTCode}
              onChange={(e) => setSWIFTCode(e.target.value)}
              className={inputStyle}
            />
          ) : (
            <p className="mt-1 text-sm text-gray-600">{SWIFTCode}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
