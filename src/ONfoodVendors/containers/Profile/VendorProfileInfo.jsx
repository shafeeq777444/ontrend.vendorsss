import React from "react";
import VendorProfileHeader from "../../components/Profile/VendorProfileHeader";
import VendorInfo from "../../components/Profile/VendorInfo";

import VendorContactDetails from "../../components/Profile/VendorContactDetails";
import VendorWorkingHours from "../../components/Profile/VendorWorkingHours";
import useCurrentUser from "../../../services/queries/user.query";

const VendorProfileInfo = () => {
    const {data:VendorData}=useCurrentUser()
    console.log(VendorData)
    return (
        <div className=" ml-20">
            <div className=" mt-10  justify-center  flex items-start gap-10 ">
                <div>
                    <VendorProfileHeader  vendorType={VendorData?.vendorType} restaurantName={VendorData?.restaurantName}/>
                    <VendorInfo />
                </div>
                <div className="flex-1 h-110">
              <VendorWorkingHours />
                </div>
            </div>
                    <VendorContactDetails />
            <div className=" w-full flex justify-center">
            </div>
        </div>
    );
};

export default VendorProfileInfo;
