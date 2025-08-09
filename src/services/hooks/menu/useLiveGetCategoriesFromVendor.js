import { useState, useEffect } from "react";
import { collectionGroup, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../config/firebase";


export const useLiveGetCategoriesFromVendor = (vendorId) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!vendorId) return;

    const q = query(
      collectionGroup(db, "details"),
      where("addedBy", "==", vendorId),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const categoriesSet = new Set();
        snapshot.forEach((doc) => {
          const tag = doc.data()?.tag;
          if (tag) categoriesSet.add(tag);
        });
        setCategories(["All", ...Array.from(categoriesSet)]);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Clean up the listener
  }, [vendorId]);

  return { categories, loading, error };
};


