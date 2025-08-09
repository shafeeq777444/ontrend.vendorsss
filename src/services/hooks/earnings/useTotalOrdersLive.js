import { collection, query, where, onSnapshot } from "firebase/firestore";

import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";

export const useLiveTotalDeliveredOrders = (vendorId) => {
    console.log(vendorId,"vendorIwwwd");
  const [count, setCount] = useState(0);
console.log(count,"count");
  useEffect(() => {
    if (!vendorId) return;

    const q = query(
      collection(db, "orders"),
      where("addedBy", "==", vendorId),
      where("status", "==", "Delivered")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log(snapshot.size,"snapshot.size");
      setCount(snapshot.size); // real-time count
    });

    return () => unsubscribe();
  }, [vendorId]);

  return count;
};
