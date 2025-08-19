return (
    <div className="ml-0 md:ml-20">
        <div className="mt-6 md:mt-10 flex flex-col md:flex-row items-start gap-6 md:gap-10 justify-center">
            <div className="w-full md:w-auto">
                {/* profile header ✅ */}
                <VendorProfileHeader
                    isTop={VendorData?.isTop}
                    vendorLogo={VendorData?.image}
                    vendorType={VendorData?.vendorType}
                    restaurantName={VendorData?.restaurantName}
                />
                {/* vendor info  ✅ */}
                <VendorInfo
                    restaurantName={VendorData?.restaurantName}
                    restaurantArabicName={VendorData?.restaurantArabicName}
                    ownerName={VendorData?.ownerName}
                    vendorType={VendorData?.vendorType}
                />
            </div>
            <div className="flex-1 h-auto md:h-110 w-full">
                <VendorWorkingHours
                    openingTime={VendorData?.openingTime}
                    closingTime={VendorData?.closingTime}
                    workingDays={VendorData?.workingDays}
                    dayWiseOpenAndClosingTime={VendorData?.dayWiseOpenAndClosingTime}
                    vendorId={VendorData?.id}
                />
            </div>
        </div>
        {/* vendor contact details ✅ */}
        <VendorContactDetails
            email={VendorData?.email}
            accountNumber={VendorData?.accountNumber}
            SWIFT={VendorData?.bankCode}
            address={VendorData?.businessAddress}
            phone={VendorData?.phone}
            vatNumber={VendorData?.vatNumber}
            location={VendorData?.location}
            additionalPhone={VendorData?.additionalPhone}
        />
        <div className="w-full flex justify-center"></div>
    </div>
);