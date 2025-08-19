/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import OpenMapButton from "../../components/common/OpenMapButtons";
import RenderField from "../../components/FoodVendor/RenderField";


export default function VendorContactDetails({ email, phone, address, location, accountNumber, SWIFT, vatNumber, additionalPhone }) {
  return (
    <motion.div
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative h-full my-2 bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 flex flex-col gap-6 transition-all duration-300 "
    >
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full">
        {/* Column 1: Contact Info */}
        <div className="space-y-5">
          <h2 className="text-base font-semibold text-gray-800">Contact Info</h2>
          <RenderField label="Email" value={email} />
          <RenderField label="Phone Number" value={phone} fieldName="phone"/>
          {[0,1,2].map((i) => (
            <RenderField
              key={i}
              label={`Additional Phone Number ${i+1}`}
              value={additionalPhone?.[i]}
              fieldName="additionalPhone"
              additionalPhone={additionalPhone}
            />
          ))}
        </div>

        {/* Column 2: Location + GST */}
        <div className="space-y-5">
          <h2 className="text-base font-semibold text-gray-800">Location & GST</h2>
          <RenderField
            label="Google Maps Location"
            value={<OpenMapButton latitude={location?.lat} longitude={location?.lng} />}
          />
          <RenderField label="Business Address" value={address} />
          <RenderField label="VAT / GST Number" value={vatNumber} />
        </div>

        {/* Column 3: Account Details */}
        <div className="space-y-5">
          <h2 className="text-base font-semibold text-gray-800">Bank Info</h2>
          <RenderField label="Account Number" value={accountNumber} fieldName="accountNumber"/>
          <RenderField label="SWIFT Code" value={SWIFT?.toUpperCase()} fieldName="bankCode"/>
        </div>
      </div>
    </motion.div>
  );
}
