/* eslint-disable react-hooks/exhaustive-deps */
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../../../config/firebase";
import { setPendingOrders } from "../../../slices/order/orderSlice";
import { useDispatch } from "react-redux";

export const useLiveOrdersWithSound = (vendorId) => {
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);
    const prevOrdersRef = useRef([]);
    const timersRef = useRef([]); // store sound timeouts
    const [alertLoop, setAlertLoop] = useState(false);

    useEffect(() => {
        if (!vendorId) return;

        const q = query(
            collection(db, "orders"),
            where("addedBy", "==", vendorId),
            orderBy("assignedTimestamp", "desc"),
            where("status", "==", "Pending")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newOrders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            dispatch(setPendingOrders(newOrders.length || 0));

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
        });

        return () => {
            stopAlertSequence(); // cleanup when unmount
            unsubscribe();
        };
    }, [vendorId]);

    const playSound = () => {
        const audio = new Audio("/tones/alert.mp3");
        audio.play().catch((err) => console.warn("Sound play error:", err));
    };

    const playAlertSequence = () => {
        stopAlertSequence(); // clear previous sequence before starting new
        setAlertLoop(true);
        timersRef.current.push(setTimeout(playSound, 0)); // immediate
        timersRef.current.push(setTimeout(playSound, 4000)); // after 3 sec
        timersRef.current.push(setTimeout(playSound, 8000)); // after 8 sec
    };

    const stopAlertSequence = () => {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
        setAlertLoop(false);
    };

    return { orders, stopAlertSequence, alertLoop };
};
