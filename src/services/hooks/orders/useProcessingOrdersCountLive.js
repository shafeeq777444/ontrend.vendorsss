/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { useDispatch } from "react-redux";
import { setProcessingOrders } from "../../../slices/order/orderSlice";
import { db } from "../../../config/firebase";

function useProcessingOrdersCount(vendorId) {

const dispatch = useDispatch();
  useEffect(() => {
    if (!vendorId) return;

    const q = query(
      collection(db, "orders"),
      where("addedBy", "==", vendorId),
      where("status", "==", "Processing")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      dispatch(setProcessingOrders(snapshot.size || 0)); 
    });

    return () => unsubscribe();
  }, [vendorId]);

}

export default useProcessingOrdersCount;
