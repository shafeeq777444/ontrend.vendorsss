import useCurrentUser from "../../../services/queries/user.query";
import OrderTableContainer from "./OrderTableContainer";
import OrderTabBar from "./OrderTabs";
import { useVendorAllOrders } from "../../../services/queries/orders.query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageIndex } from "../../../slices/order/orderSlice";

const OrdersContainer = () => {
    // eslint-disable-next-line no-unused-vars
    const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();
    const activeTab = useSelector((state) => state.order.activeTab);
    const dispatch = useDispatch();
    const {
        data: vendorOrders,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
        // } = useVendorAllOrders({ vendorId: "4bSsRJ5TbrUEtZ8RkXjtlpZFlfm2", status: activeTab });
    } = useVendorAllOrders({ vendorId: currentUser?.id, status: activeTab });

    // Only first page index
    const pageIndex = useSelector((state) => state.order.pageIndex);
    // Safe pages variable
    const pages = vendorOrders?.pages || [];

    // Fetch next page if trying to go beyond loaded pages
    useEffect(() => {
        if (
            pages.length > 0 &&
            pageIndex === pages.length - 1 &&
            hasNextPage
        ) {
            fetchNextPage();
        }
    }, [pageIndex, pages.length, hasNextPage, fetchNextPage]);

    const handleNext = () => {
        if (pageIndex < pages.length - 1) {
            dispatch(setPageIndex(1));
        } else if (hasNextPage) {
            // This will auto-fetch next in useEffect
            dispatch(setPageIndex(1));
        }
    };

    const handlePrevious = () => {
        if (pageIndex > 0) {
            dispatch(setPageIndex(-1));
        }
    };

    const loading = isUserLoading || isLoading;
    if (isError) return <div>Error: {error.message}</div>;

    const currentPageOrders = pages[pageIndex]?.orders ?? [];

    return (
        <div>
            <OrderTabBar />
            <OrderTableContainer
                loading={loading}
                orders={currentPageOrders}
                onNext={handleNext}
                onPrevious={handlePrevious}
                pageIndex={pageIndex}
                isFetchingNextPage={isFetchingNextPage}
                hasNextPage={hasNextPage}
                maxPage={pages.length > 0 ? pages.length - 1 : 0}
            />
        </div>
    );
};
export default OrdersContainer;
