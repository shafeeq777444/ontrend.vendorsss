/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback, useRef } from "react";
import { collection, query, where, orderBy, startAfter, limit, onSnapshot } from "firebase/firestore";
import { db } from "../../../config/firebase";

const PAGE_SIZE = 10;
const STORAGE_KEY = "liveOrdersPageIndex";

export const usePaginatedLiveOrders = ({
    vendorId,
    status = "all",
    startDate = null,
    endDate = null,
    pageSize = PAGE_SIZE,
    enabled = true,
}) => {
    //------------------------------------------ State management ------------------------------------------
    const [orders, setOrders] = useState([]); // current page orders
    const [loading, setLoading] = useState(true); // loading state
    const [error, setError] = useState(null); // error state
    const [hasMore, setHasMore] = useState(true); // track more pages
    const [hasPrevious, setHasPrevious] = useState(false); // track previous pages

    //------------------------------------------ Refs for pagination management ------------------------------------------
    const unsubscribeRefs = useRef(new Map()); // Map to store multiple subscriptions by cacheKey
    const pageCache = useRef(new Map()); // Use Map for better performance
    const pageCursors = useRef([]); // store last document of each page
    const currentPageIndex = useRef(0); // track current page index
    const isInitialized = useRef(false); // one-time flag to prevent your initialization logic

    //------------------------------------------ Clear cache when dependencies change ------------------------------------------
    const clearCache = useCallback(() => {
        // Clean up all existing subscriptions when dependencies change
        unsubscribeRefs.current.forEach((unsubscribe) => unsubscribe());
        unsubscribeRefs.current.clear();
        
        pageCache.current.clear();
        pageCursors.current = [];
        currentPageIndex.current = 0;
        isInitialized.current = false;
        setHasPrevious(false);
        setHasMore(true);
        setError(null);
    }, [vendorId, status, startDate, endDate]);

    //------------------------------------------ Build Firestore query constraints ------------------------------------------
    const buildQueryConstraints = useCallback(
        (cursor = null) => {
            const constraints = [where("addedBy", "==", vendorId), orderBy("orderTimeStamp", "desc")];

            if (status !== "all") {
                constraints.push(where("status", "==", status));
            }

            if (startDate && endDate) {
                constraints.push(where("orderTimeStamp", ">=", startDate));
                constraints.push(where("orderTimeStamp", "<=", endDate));
            }

            if (cursor) {
                constraints.push(startAfter(cursor));
            }

            constraints.push(limit(pageSize + 1)); // +1 to check if there are more pages

            return constraints;
        },
        [vendorId, status, startDate, endDate, pageSize]
    );

    //-------------------------------------------------------- Fetch page data (prev/next) -------------------------------------------------------
    const fetchPage = useCallback(
        (pageIndex, cursor = null) => {
            if (!vendorId || !enabled) return;

            const cacheKey = `${pageIndex}_${status}_${cursor?.id || "start"}`;

            //-------------------------------------------------------- if already cached, return cached data and keep subscription --------------------------------------------------------
            if (pageCache.current.has(cacheKey)) {
                const cachedData = pageCache.current.get(cacheKey);
                setOrders(cachedData.orders);
                setHasMore(cachedData.hasMore);
                setHasPrevious(pageIndex > 0);
                setLoading(false);
                return;
            }

            //------------- Check if subscription already exists for this page -------------
            if (unsubscribeRefs.current.has(cacheKey)) {
                // Subscription already exists, just return (shouldn't happen with cache check above)
                return;
            }

            //-------------------------------------------------------- Create new subscription for this page --------------------------------------------------------
            setLoading(true);
            setError(null);

            const constraints = buildQueryConstraints(cursor);
            const q = query(collection(db, "orders"), ...constraints);

            // Create new subscription without cleaning up previous ones
            const unsubscribe = onSnapshot(
                q,
                (snapshot) => {
                    try {
                        const docs = snapshot.docs;
                        const hasMorePages = docs.length > pageSize;
                        const pageOrders = docs.slice(0, pageSize).map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));

                        // Cache the results
                        const cacheData = {
                            orders: pageOrders,
                            hasMore: hasMorePages,
                            lastDoc: docs[pageSize - 1] || docs[docs.length - 1],
                        };
                        pageCache.current.set(cacheKey, cacheData);

                        // Update cursors for navigation
                        if (pageIndex >= pageCursors.current.length && cacheData.lastDoc) {
                            pageCursors.current[pageIndex] = cacheData.lastDoc;
                        }

                        // Only update UI if this is the current page being viewed
                        if (pageIndex === currentPageIndex.current) {
                            setOrders(pageOrders);
                            setHasMore(hasMorePages);
                            setHasPrevious(pageIndex > 0);
                            setLoading(false);

                            // Save current page to localStorage
                            localStorage.setItem(STORAGE_KEY, pageIndex.toString());
                        }
                    } catch (err) {
                        console.error("Error processing orders snapshot:", err);
                        if (pageIndex === currentPageIndex.current) {
                            setError(err);
                            setLoading(false);
                        }
                    }
                },
                (err) => {
                    console.error("Error fetching orders:", err);
                    if (pageIndex === currentPageIndex.current) {
                        setError(err);
                        setLoading(false);
                    }
                }
            );

            // Store the subscription - keep it active until component unmount
            unsubscribeRefs.current.set(cacheKey, unsubscribe);
        },
        [vendorId, enabled, pageSize, buildQueryConstraints]
    );

    //---------------------------------------------- Navigation functions ----------------------------------------------
    const loadNext = useCallback(() => {
        if (!hasMore || loading) return;

        const nextPageIndex = currentPageIndex.current + 1;
        const cursor = pageCursors.current[currentPageIndex.current];

        currentPageIndex.current = nextPageIndex;
        fetchPage(nextPageIndex, cursor);
    }, [hasMore, loading, fetchPage]);

    const loadPrevious = useCallback(() => {
        if (!hasPrevious || loading) return;

        const prevPageIndex = currentPageIndex.current - 1;
        const cursor = prevPageIndex > 0 ? pageCursors.current[prevPageIndex - 1] : null;

        currentPageIndex.current = prevPageIndex;
        fetchPage(prevPageIndex, cursor);
    }, [hasPrevious, loading, fetchPage]);

    //---------------------------------------------- Refetch current page (An error happened while fetching or listening to the current page, avoid total refresh) ----------------------------------------------
    const refetch = useCallback(() => {
        const cursor = currentPageIndex.current > 0 ? pageCursors.current[currentPageIndex.current - 1] : null;
        const cacheKey = `${currentPageIndex.current}_${cursor?.id || "start"}`;

        // Clean up existing subscription for this specific page only
        if (unsubscribeRefs.current.has(cacheKey)) {
            unsubscribeRefs.current.get(cacheKey)();
            unsubscribeRefs.current.delete(cacheKey);
        }

        // Clear cache for current page
        pageCache.current.delete(cacheKey);

        fetchPage(currentPageIndex.current, cursor);
    }, [fetchPage]);

    //---------------------------------------------- Initialize or reset when dependencies change ----------------------------------------------
    useEffect(() => {
        if (!vendorId || !enabled) {
            setOrders([]);
            setLoading(false);
            return;
        }

        clearCache();
        setLoading(true);

        // Try to restore page from localStorage
        const savedPageIndex = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);

        if (savedPageIndex > 0 && !isInitialized.current) {
            // For now, start from page 0 for simplicity
            // In a production app, you might want to rebuild the cursor chain
            currentPageIndex.current = 0;
            localStorage.setItem(STORAGE_KEY, "0");
        }

        isInitialized.current = true;
        fetchPage(currentPageIndex.current);

        return () => {
            // Clean up ALL subscriptions only when component unmounts
            unsubscribeRefs.current.forEach((unsubscribe) => unsubscribe());
            unsubscribeRefs.current.clear();
        };
    }, [vendorId, status, startDate, endDate, enabled, clearCache, fetchPage]);

    return {
        orders,
        loading,
        error,
        loadNext,
        loadPrevious,
        refetch,
        hasMore,
        hasPrevious,
        currentPage: currentPageIndex.current + 1, // 1-based for display
        maxPage: Math.max(pageCursors.current.length, currentPageIndex.current + 1),
    };
};

