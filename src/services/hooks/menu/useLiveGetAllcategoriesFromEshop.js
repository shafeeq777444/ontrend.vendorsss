// -------------------------------------- Live get All categories from e-shop -----------------------------------------------------------
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";


export function useLiveAllCategoriesFromEshop() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, "E-Shop/items/categories"),
            where("isApproved", "==", true)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list = snapshot.docs.map((doc) => {
                const name = doc.get("name");
                return { value: name, label: name };
            });
            setCategories(list);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { categories, loading };
}
