// services/hooks/useVendorFoodsLivePaginated.js
import { useCallback, useEffect, useRef, useState } from "react";
import {
  collectionGroup,
  onSnapshot,
  query,
  where,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../config/firebase";


function buildFoodsQuery({ vendorId, category, pageSize, cursor, orderByField }) {
  const filters = [where("addedBy", "==", vendorId)];
  if (category && category !== "All") filters.push(where("tag", "==", category));
  const base = [...filters, orderBy(orderByField || "__name__")];
  const pageParts = cursor ? [startAfter(cursor), limit(pageSize)] : [limit(pageSize)];
  return query(collectionGroup(db, "details"), ...base, ...pageParts);
}

export function useVendorFoodsLivePaginated(
  vendorId,
  category = "All",
  pageSize = 12,
  orderByField
) {
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const unsubscribersRef = useRef([]);
  const cursorsRef = useRef([null]);
  const lastInputsRef = useRef({ vendorId, category, pageSize, orderByField });

  const hardReset = useCallback(() => {
    unsubscribersRef.current.forEach((u) => u && u());
    unsubscribersRef.current = [];
    cursorsRef.current = [null];
    setPages([]);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const last = lastInputsRef.current;
    if (
      last.vendorId !== vendorId ||
      last.category !== category ||
      last.pageSize !== pageSize ||
      last.orderByField !== orderByField
    ) {
      hardReset();
      lastInputsRef.current = { vendorId, category, pageSize, orderByField };
    }
  }, [vendorId, category, pageSize, orderByField, hardReset]);

  useEffect(() => {
    if (!vendorId) return;
    const q = buildFoodsQuery({ vendorId, category, pageSize, cursor: null, orderByField });
    const unsub = onSnapshot(q, (snap) => {
      const foods = snap.docs.map((d) => ({
        id: d.id,
        category: d.data()?.tag ?? "Unknown",
        ...d.data(),
      }));
      const lastVisible = snap.docs[snap.docs.length - 1] || null;
      cursorsRef.current[0] = lastVisible;
      setPages([{ foods, lastVisible, hasMore: snap.size === pageSize }]);
      setIsLoading(false);
    });
    unsubscribersRef.current[0] = unsub;
    return () => unsub && unsub();
  }, [vendorId, category, pageSize, orderByField]);

  const hasNextPage = pages.length > 0 && pages[pages.length - 1]?.hasMore;

  const fetchNextPage = useCallback(() => {
    if (!vendorId || !hasNextPage || isFetchingNextPage) return;
    setIsFetchingNextPage(true);
    const cursor = cursorsRef.current[cursorsRef.current.length - 1] || null;
    const q = buildFoodsQuery({ vendorId, category, pageSize, cursor, orderByField });
    const unsub = onSnapshot(q, (snap) => {
      const foods = snap.docs.map((d) => ({
        id: d.id,
        category: d.data()?.tag ?? "Unknown",
        ...d.data(),
      }));
      const lastVisible = snap.docs[snap.docs.length - 1] || null;
      cursorsRef.current.push(lastVisible);
      setPages((prev) => [...prev, { foods, lastVisible, hasMore: snap.size === pageSize }]);
      setIsFetchingNextPage(false);
    });
    unsubscribersRef.current.push(unsub);
  }, [vendorId, category, pageSize, orderByField, hasNextPage, isFetchingNextPage]);

  const unsubscribePage = useCallback((pageIndex) => {
    const unsub = unsubscribersRef.current[pageIndex];
    if (unsub) {
      unsub();
      unsubscribersRef.current[pageIndex] = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      unsubscribersRef.current.forEach((u) => u && u());
      unsubscribersRef.current = [];
    };
  }, []);

  const allFoods = pages.flatMap((p) => p.foods);

  return {
    pages,
    allFoods,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    hardReset,
    unsubscribePage,
  };
}
