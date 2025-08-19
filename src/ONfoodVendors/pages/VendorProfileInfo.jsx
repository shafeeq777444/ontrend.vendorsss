import React from "react";
import VendorProfileHeader from "../containers/Profile/VendorProfileHeader";
import VendorInfo from "../containers/Profile/VendorInfo";

import VendorContactDetails from "../containers/Profile/VendorContactDetails";
import VendorWorkingHours from "../containers/Profile/VendorWorkingHours";
import { useCurrentUser } from "../../services/hooks/profile/useCurrentUserLiveData";

const VendorProfileInfo = () => {
    const { data: VendorData, isLoading } = useCurrentUser();
    console.log(VendorData, "kkk");
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className=" md:ml-20">
            <div className=" md:mt-10 -mt-10 justify-center  flex items-start gap-10 flex-col md:flex-row">
                <div>
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
                <div className="w-full md:flex-1 md:h-110">
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
            <div className=" w-full flex justify-center"></div>
        </div>
    );
};

export default VendorProfileInfo;
