import { useVendorAllOrders } from "../../services/queries/orders.query";
import useCurrentUser from "../../services/queries/user.query";
import OrderTableContainer from "../containers/Orders/OrderTableContainer";

const OrdersPage = () => {
    const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();

    const {
        data: vendorOrders,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useVendorAllOrders({vendorId:"4bSsRJ5TbrUEtZ8RkXjtlpZFlfm2", status:"all"});

    // Only first page index
    const pageIndex = 0;

    if (isUserLoading || isLoading) return <div>Loading orders...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    const firstPageOrders = vendorOrders?.pages[pageIndex]?.orders ?? [];
    console.log("First page orders:", firstPageOrders);

    return (
        <div>
            {/* <OrderTabs /> */}
            <OrderTableContainer
                orders={firstPageOrders} // Pass first page orders here
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
            />
        </div>
    );
};
export default OrdersPage;
