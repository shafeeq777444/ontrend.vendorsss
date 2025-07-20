import { useState } from "react";
import { Pencil, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function VendorContactDetails() {
  const [isEditable, setIsEditable] = useState(false);

  const [email, setEmail] = useState("ontrend@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [address, setAddress] = useState("12, Business Street, Kochi");
  const [location, setLocation] = useState("https://goo.gl/maps/xyz");

  const [accountNumber, setAccountNumber] = useState("9040 6000 8081 4525");
  const [ifscCode, setIfscCode] = useState("SBIN0000256");
  const [gstNumber, setGstNumber] = useState("32ABCDE1234F1Z5");

  const inputStyle =
    "mt-1 w-full shadow-sm text-sm  py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200";

  const textStyle = "mt-1 text-sm text-gray-600";

  const renderField = (label, value, setValue, type = "text") => (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {isEditable ? (
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={inputStyle}
        />
      ) : (
        <p className={textStyle}>{value}</p>
      )}
    </div>
  );

  return (
    <motion.div
      animate={{ scale: isEditable ? 1 : 0.97 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative  h-full my-2 bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col gap-6 transition-all duration-300"
    >
      {/* Edit Button */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-black"
        onClick={() => setIsEditable((prev) => !prev)}
      >
        <AnimatePresence mode="wait">
          {isEditable ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Check className="w-5 h-5 text-green-600" />
            </motion.div>
          ) : (
            <motion.div
              key="pencil"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Pencil className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
        {/* Column 1: Contact Info */}
        <div className="space-y-5">
          <h2 className="text-base font-semibold text-gray-800">Contact Info</h2>
          {renderField("Email", email, setEmail, "email")}
          {renderField("Phone Number", phone, setPhone, "tel")}
          {renderField("Business Address", address, setAddress)}
        </div>

        {/* Column 2: Location + GST */}
        <div className="space-y-5">
          <h2 className="text-base font-semibold text-gray-800">Location & GST</h2>
          {renderField("Business Location Link", location, setLocation, "url")}
          {renderField("VAT / GST Number", gstNumber, setGstNumber)}
        </div>

        {/* Column 3: Account Details */}
        <div className="space-y-5">
          <h2 className="text-base font-semibold text-gray-800">Bank Info</h2>
          {renderField("Account Number", accountNumber, setAccountNumber)}
          {renderField("IFSC Code", ifscCode, setIfscCode)}
        </div>
      </div>
    </motion.div>
  );
}
