import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "../../../config/firebase";

export const getVendorAllOrders = async ({
  vendorId,
  status = "all",
  pageSize = 10,
  lastDoc = null,
}) => {
  try {
    console.log("getVendorAllOrders called with vendorId:", vendorId);
    const constraints = [
      where("addedBy", "==", vendorId), // filter by vendor
      orderBy("orderTimeStamp", "desc"),     // order newest first
    ];

    // Only add status filter if it's valid
    if (status && status !== "all") {
      console.log("not all worked")
      constraints.push(where("status", "==", status));
    }

    // If paginating, start after last document
    if (lastDoc) {
      console.log("no last doc")
      constraints.push(startAfter(lastDoc));
    }

    // Fetch one extra doc to check if more pages exist
    constraints.push(limit(pageSize + 1));

    const q = query(collection(db, "orders"), ...constraints);
    const snapshot = await getDocs(q);
    const docs = snapshot.docs;

    const hasMore = docs.length > pageSize;
    const orders = docs.slice(0, pageSize).map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const newLastDoc = hasMore ? docs[pageSize - 1] : null;
console.log(orders,"orders")
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

