import React from "react";
import { useCurrentUser } from "../../../services/hooks/profile/useCurrentUserLiveData";
import OrderTableContainer from "./OrderTableContainer";
import OrderTabBar from "./OrderTabs";
import { useSelector } from "react-redux";
import { usePaginatedLiveOrders } from "../../../services/hooks/orders/useLiveVendorOrders";
import OrdersSkeleton from "../../components/Orders/OrdersSkeleton";
import OrderTabBarSkeleton from "../../components/Orders/OrderTabBarSkelton";
const OrdersContainer = () => {
    const { data: currentUser, isLoading: isUserLoading, error: userError } = useCurrentUser();
    const activeTab = useSelector((state) => state.order.activeTab);

    const {
        orders,
        loading: ordersLoading,
        error: ordersError,
        loadNext,
        loadPrevious,
        hasMore,
        hasPrevious,
        currentPage,
        maxPage,
        refetch,
    } = usePaginatedLiveOrders({
        vendorId: currentUser?.id,
        status: activeTab,
        pageSize: 10,
        enabled: !!currentUser?.id, // Only fetch when user ID is available
    });

    // Handle loading states
    const isLoading = isUserLoading || ordersLoading;

    // Handle error states
    if (userError) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <p className="text-red-600 mb-2">Failed to load user data</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (ordersError) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <p className="text-red-600 mb-2">Failed to load orders</p>
                    <button onClick={refetch} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Don't render orders until user is loaded
    if (!currentUser?.id) {
        return (
            <>
                <OrderTabBarSkeleton />
                {/* <OrdersSkeleton /> */}
            </>
        );
    }

    return (
        <div className="space-y-6">
            <OrderTabBar />
            <OrderTableContainer
                loading={isLoading}
                orders={orders}
                onNext={loadNext}
                onPrevious={loadPrevious}
                currentPage={currentPage}
                maxPage={maxPage}
                hasPrevious={hasPrevious}
                hasMore={hasMore}
            />
        </div>
    );
};

export default OrdersContainer;
