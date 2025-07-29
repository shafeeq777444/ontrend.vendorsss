import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

export const updateVendorProfile = async ({ vendorId, updatedData }) => {
  console.log(vendorId,"--vendorID2 check3")
  console.log(updatedData,"--updatedData2 check3" )
    const vendorRef = doc(db, "users", vendorId);

    await updateDoc(vendorRef, {
       ...updatedData,
       updatedAt:serverTimestamp()
    });

    return true; // or return a custom message/object if needed
};
