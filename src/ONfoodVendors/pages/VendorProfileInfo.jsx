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
        <div className=" ml-20">
            <div className=" mt-10  justify-center  flex items-start gap-10 ">
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
                <div className="flex-1 h-110">
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
                ifsc={VendorData?.bankCode}
                address={VendorData?.businessAddress}
                phone={VendorData?.phone}
                vatNumber={VendorData?.vatNumber}
                location={VendorData?.location}
            />
            <div className=" w-full flex justify-center"></div>
        </div>
    );
};

export default VendorProfileInfo;
