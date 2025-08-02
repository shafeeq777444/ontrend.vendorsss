import {
    collection,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    // serverTimestamp,
    startAfter,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "../../../config/firebase";

export const getVendorAllOrders = async ({
    vendorId,
    status = "all",
    pageSize = 10,
    lastDoc = null,
    startDate = null, // optional Firestore Timestamp
    endDate = null, // optional Firestore Timestamp
}) => {
    try {
        console.log("getVendorAllOrders called with vendorId:", vendorId);
        const constraints = [where("addedBy", "==", vendorId), orderBy("orderTimeStamp", "desc")];

        // Add status filter
        if (status && status !== "all") {
            constraints.push(where("status", "==", status));
        }

        // Add date filters if provided
        if (startDate && endDate) {
            constraints.push(where("orderTimeStamp", ">=", startDate));
            constraints.push(where("orderTimeStamp", "<=", endDate));
        }

        // Add pagination if applicable
        if (lastDoc) {
            constraints.push(startAfter(lastDoc));
        }

        // Limit results
        constraints.push(limit(pageSize + 1)); // +1 to check if more pages

        const q = query(collection(db, "orders"), ...constraints);
        const snapshot = await getDocs(q);
        const docs = snapshot.docs;

        const hasMore = docs.length > pageSize;
        const orders = docs.slice(0, pageSize).map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        const newLastDoc = hasMore ? docs[pageSize - 1] : null;

        return {
            orders,
            lastDoc: newLastDoc,
            hasMore,
        };
    } catch (error) {
        console.error("Error fetching vendor orders:", error);
        return {
            orders: [],
            lastDoc: null,
            hasMore: false,
        };
    }
};

//update order
export const updateOrder = async ({ orderId, updatedData }) => {
    const vendorRef = doc(db, "orders", orderId);

    await updateDoc(vendorRef, {
        ...updatedData,
        // updatedAt:serverTimestamp()
    });

    return true; // or return a custom message/object if needed
};
