import React, { useMemo } from "react";
import OrderTable from "../../components/Orders/OrderTable";
import InvoiceModal from "../../components/Orders/InvoiceModal";
import OrderCardList from "../../components/Orders/OrderCardList";
import { useDispatch, useSelector } from "react-redux";
import { setInvoice } from "../../../slices/order/orderSlice";
import { useUpdateOrder } from "../../../services/queries/orders.query";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import OrdersSkeleton from "../../components/Orders/OrdersSkeleton";

const OrderTableContainer = ({ loading, orders, onNext, onPrevious, currentPage, maxPage, hasPrevious, hasMore }) => {
    const dispatch = useDispatch();
    const invoice = useSelector((state) => state.order.invoice);
    const { mutate: updateOrder, isLoading: isUpdatingOrder } = useUpdateOrder();

    // Memoized handlers to prevent unnecessary re-renders
    const handleInvoiceClick = useMemo(
        () => (order) => {
            dispatch(setInvoice(order));
        },
        [dispatch]
    );

    const handleCloseModal = useMemo(
        () => () => {
            dispatch(setInvoice(null));
        },
        [dispatch]
    );

    const handleStatusChange = useMemo(
        () => (orderId, status) => {
            updateOrder({ orderId, updatedData: { status } });
        },
        [updateOrder]
    );

    // Pagination info
    const paginationInfo = useMemo(() => {
        const totalPages = Math.max(maxPage, 1);
        const displayCurrentPage = Math.max(currentPage, 1);
        const displayMaxPage = Math.max(totalPages, displayCurrentPage);

        return {
            current: displayCurrentPage,
            total: displayMaxPage,
            showingStart: orders.length > 0 ? (displayCurrentPage - 1) * 10 + 1 : 0,
            showingEnd: Math.min(displayCurrentPage * 10, (displayCurrentPage - 1) * 10 + orders.length),
            totalOrders: (displayCurrentPage - 1) * 10 + orders.length + (hasMore ? 1 : 0), // Approximate
        };
    }, [currentPage, maxPage, orders.length, hasMore]);



    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Orders Content */}
            <div className="relative">
                {/* Loading overlay */}
                {loading && orders.length > 0 && (
                      <OrdersSkeleton/>
                          
                )}

                {/* Desktop Table */}
                <div className="hidden lg:block">
                    <OrderTable
                        orders={orders}
                        onInvoiceClick={handleInvoiceClick}
                        handleSelector={handleStatusChange}
                        loading={loading}
                        isUpdating={isUpdatingOrder}
                    />
                </div>

                {/* Mobile Cards */}
                <div className="block lg:hidden">
                    <OrderCardList
                        orders={orders}
                        onInvoiceClick={handleInvoiceClick}
                        handleSelector={handleStatusChange}
                        loading={loading}
                        isUpdating={isUpdatingOrder}
                    />
                </div>
            </div>

            {/* Enhanced Pagination Controls */}
            {orders.length > 0 && (
                <div className="px-6 py-4 bg-white ">
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                        {/* Pagination Info */}
                        <div className="text-sm text-gray-700">
                            <span className="font-medium">
                                Showing {paginationInfo.showingStart}-{paginationInfo.showingEnd}
                            </span>
                            <span className="mx-1">of</span>
                            <span className="font-medium">
                                {hasMore ? `${paginationInfo.totalOrders}+` : paginationInfo.totalOrders} orders
                            </span>
                        </div>

                        {/* Page Info & Controls */}
                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-gray-700">
                                Page <span className="font-medium">{paginationInfo.current}</span> of{" "}
                                <span className="font-medium">{paginationInfo.total}</span>
                            </div>

                            <div className="flex items-center space-x-1">
                                {/* Previous Button */}
                                <button
                                    onClick={ 
                                        ()=>{onPrevious()
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                        });

                                        }
                                    }
                                    disabled={!hasPrevious || loading}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                {/* Next Button */}
                                <button
                                    onClick={
                                        ()=>{
                                            onNext()
                                            window.scrollTo({
                                                top: 0,
                                                behavior: "smooth",
                                            });
                                        }
                                    }
                                    disabled={!hasMore || loading}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
                                    aria-label="Next page"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!loading && orders.length === 0 && <div className="text-center "></div>}

            {/* Invoice Modal */}
            {invoice && <InvoiceModal onClose={handleCloseModal} order={invoice} />}
        </div>
    );
};

export default OrderTableContainer;
