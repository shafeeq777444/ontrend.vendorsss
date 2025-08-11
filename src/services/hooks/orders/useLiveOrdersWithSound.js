/* eslint-disable react-hooks/exhaustive-deps */
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../../../config/firebase";
import { setPendingOrders } from "../../../slices/order/orderSlice";
import { useDispatch } from "react-redux";

export const useLiveOrdersWithSound = (vendorId) => {
  console.log(vendorId, "venssdorId");
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const prevOrdersRef = useRef([]);
  const timersRef = useRef([]); // store sound timeouts
  const [alertLoop, setAlertLoop] = useState(false);

  useEffect(() => {
      console.log(1,"qqq")
    if (!vendorId) return;

    const q = query(
      collection(db, "orders"),
      where("addedBy", "==", vendorId),
    //   orderBy("assignedTimestamp", "desc"),
      where("status", "==", "Pending")
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        try {
          const newOrders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

          console.log(newOrders, "newOrders.length");
          dispatch(setPendingOrders(newOrders?.length || 0));

          // If new orders added
          if (newOrders.length > prevOrdersRef.current.length) {
            playAlertSequence();
          }

          // If orders decreased (status changed), stop any ongoing sounds
          if (newOrders.length < prevOrdersRef.current.length) {
            stopAlertSequence();
          }

          prevOrdersRef.current = newOrders;
          setOrders(newOrders);
        } catch (err) {
          console.error("Error processing orders snapshot:", err);
        }
      },
      (error) => {
        console.error("Firestore onSnapshot error:", error);
      }
    );

    return () => {
      stopAlertSequence(); // cleanup when unmount
      unsubscribe();
    };
  }, [vendorId]);

  const playSound = () => {
    try {
      const audio = new Audio("/tones/alert.mp3");
      audio.play().catch((err) => console.warn("Sound play error:", err));
    } catch (err) {
      console.error("playSound error:", err);
    }
  };

  const playAlertSequence = () => {
    stopAlertSequence(); // clear previous sequence before starting new
    setAlertLoop(true);
    timersRef.current.push(setTimeout(playSound, 0)); // immediate
    timersRef.current.push(setTimeout(playSound, 4000)); // after 4 sec
    timersRef.current.push(setTimeout(playSound, 8000)); // after 8 sec
  };

  const stopAlertSequence = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setAlertLoop(false);
  };

  return { orders, stopAlertSequence, alertLoop };
};
