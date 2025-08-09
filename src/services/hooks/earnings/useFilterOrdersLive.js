import { collection, query, where, onSnapshot } from "firebase/firestore";

import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";

export const useLiveVendorEarningsAndOrdersByFiltered = ({
  vendorId,
  startDate = null,
  endDate = null
}) => {
  const [data, setData] = useState({
    totalOrders: 0,
    totalEarnings: 0,
    totalData: []
  });

  useEffect(() => {
    if (!vendorId) return;

    const filters = [
      where("addedBy", "==", vendorId),
      where("status", "==", "Delivered")
    ];

    if (startDate) {
      filters.push(where("orderTimeStamp", ">=", startDate));
    }

    if (endDate) {
      filters.push(where("orderTimeStamp", "<=", endDate));
    }

    const q = query(collection(db, "orders"), ...filters);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let totalEarnings = 0;

      snapshot.docs.forEach((doc) => {
        const items = doc.data().items || [];
        items.forEach((item) => {
          const total = item.total || 0;
          const commission = item.commission || 0;
          const sellerEarning = total - (total * commission) / 100;
          totalEarnings += sellerEarning;
        });
      });

      setData({
        totalOrders: snapshot.size,
        totalEarnings: parseFloat(totalEarnings.toFixed(3)),
        totalData: snapshot.docs.map((doc) => doc.data())
      });
    });

    return () => unsubscribe();
  }, [vendorId, startDate, endDate]);

  return data;
};
