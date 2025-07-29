/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import OpenMapButton from "../../components/common/OpenMapButtons";

export default function VendorContactDetails({ email, phone, address, location, accountNumber, ifsc, vatNumber }) {
    const textStyle = "mt-1 text-sm text-gray-600";
    const labelStyle = "text-sm font-medium text-gray-700";

    const renderField = (label, value) => (
        <div>
            <label className={labelStyle}>{label}</label>
            <p className={textStyle}>{value || "—"}</p>
        </div>
    );

    return (
        <motion.div
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative h-full my-2 bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col gap-6 transition-all duration-300"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
                {/* Column 1: Contact Info */}
                <div className="space-y-5">
                    <h2 className="text-base font-semibold text-gray-800">Contact Info</h2>
                    {renderField("Email", email)}
                    {renderField("Phone Number", phone)}
                    {renderField("Business Address", address)}
                </div>

                {/* Column 2: Location + GST */}
                <div className="space-y-5">
                    <h2 className="text-base font-semibold text-gray-800">Location & GST</h2>

                    {renderField(
                        "Google Maps Location",
                        <OpenMapButton latitude={location?.lat} longitude={location?.lng} />
                    )}
                    {renderField("VAT / GST Number", vatNumber)}
                </div>

                {/* Column 3: Account Details */}
                <div className="space-y-5">
                    <h2 className="text-base font-semibold text-gray-800">Bank Info</h2>
                    {renderField("Account Number", accountNumber)}
                    {renderField("IFSC Code", ifsc)}
                </div>
            </div>
        </motion.div>
    );
}
