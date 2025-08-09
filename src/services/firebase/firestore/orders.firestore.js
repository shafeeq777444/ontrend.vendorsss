import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

//update order
export const updateOrder = async ({ orderId, updatedData }) => {
    const vendorRef = doc(db, "orders", orderId);

    await updateDoc(vendorRef, {
        ...updatedData,
        // updatedAt:serverTimestamp()
    });

    return true; // or return a custom message/object if needed
};
