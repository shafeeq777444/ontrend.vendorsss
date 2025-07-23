import React from "react";
import { MapPin } from "lucide-react";
import { Star as StarIcon } from "lucide-react";

const FoodVendorDetails = ({ currentVendor }) => {
    return (
        <div className=" p-4 w-full ">
            {/* Header */}
            <div className="flex items-center gap-3">
                <img src={currentVendor?.image} alt="Woke Ramen" className="w-16 h-16 rounded-lg object-cover" />
                <div>
                    <h2 className="text-lg font-semibold">{currentVendor?.name}</h2>
                    {/* <p className="text-sm text-gray-500">Woke Ramen serves bold flavors</p> */}

                    <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{currentVendor?.businessAddress}</span>
                    </div>

                </div>
            </div>

            {/* Stats */}
            
            <div className="flex justify-between bg-gray-100 mt-4 rounded-lg p-3 text-center">
                {/* <div> */}

                    {/* <div className="flex items-center text-sm text-gray-600 mt-1">
                       <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/rating.png" alt="rating"/>
                        <span className="mr-2">
                            {(currentVendor?.Ratings / currentVendor?.totalRatings).toFixed(1)} ({currentVendor?.Ratings})
                        </span>
                    </div>

          <div className="text-xs text-gray-500">Reviews</div>  */}


                {/* </div> */}
                <div>
                    <div className="font-semibold text-black flex"><img width="30"  src="https://img.icons8.com/ios/50/rating-circled.png" alt="rating-circled"/>{(currentVendor?.Ratings / currentVendor?.totalRatings).toFixed(1)} ({currentVendor?.Ratings}) </div>
                    <div className="text-xs text-gray-500">Reviews</div>
                </div>
                <div>
                    <div className="font-semibold text-black">{currentVendor?.distance} km</div>
                    <div className="text-xs text-gray-500">Distance</div>
                </div>
                <div>
                    <div className="font-semibold text-black">{currentVendor?.estimatedTime}</div>
                    <div className="text-xs text-gray-500">Delivery Time</div>
                </div>
            </div>
        </div>
    );
};

export default FoodVendorDetails;
