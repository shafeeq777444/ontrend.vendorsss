import React from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatOMR } from "../../../utils/formatOMR";

const OrdersTable = ({
    filteredOrders = [],
    paginatedOrders = [],
    currentPage = 1,
    totalPages = 1,
    itemsPerPage = 10,
    handlePageChange,
    setSelectedOrder,
    getPaymentModeIcon,
    getPaymentModeColor,
}) => {
 // Helper function to calculate total amount
 const calculateTotalPrice = (items) => {
    if (!items || !Array.isArray(items)) return 0;
    return items.reduce((acc, item) => {
        const total = item?.total || 0;
        return acc + total;
    }, 0);
};

    // Helper function to calculate seller earnings
    const calculateSellerEarnings = (items) => {
        if (!items || !Array.isArray(items)) return 0;

        return items.reduce((acc, item) => {
            const total = item?.total || 0;
            const commission = item?.commission || 0;
            const sellerEarning = total - (total * commission) / 100;
            return acc + sellerEarning;
        }, 0);
    };

   
    console.log(paginatedOrders, "paginated orders");
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order ID
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Item Total
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Your Earnings
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Payment
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date & Time
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {paginatedOrders.map((order, index) => (
                            <tr key={order?.orderID || order?.orderId || index} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        #{order?.orderID || order?.orderId || 'N/A'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        OMR {formatOMR(calculateTotalPrice(order?.items))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-semibold text-green-600">
                                        OMR {formatOMR(calculateSellerEarnings(order?.items))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            getPaymentModeColor ? getPaymentModeColor(order?.paymentType || order?.paymentMode) : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        <span className="mr-1">
                                            {getPaymentModeIcon ? getPaymentModeIcon(order?.paymentType || order?.paymentMode) : '💳'}
                                        </span>
                                        {order?.paymentType || order?.paymentMode || 'N/A'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {order?.orderTimeStamp || order?.orderDate ?
                                            format(
                                                order?.orderTimeStamp?.toDate ? order.orderTimeStamp.toDate() :
                                                order?.orderDate ? new Date(order.orderDate) : new Date(),
                                                "MMM dd, yyyy"
                                            ) : 'N/A'
                                        }
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {order?.orderTimeStamp || order?.orderDate ?
                                            format(
                                                order?.orderTimeStamp?.toDate ? order.orderTimeStamp.toDate() :
                                                order?.orderDate ? new Date(order.orderDate) : new Date(),
                                                "HH:mm"
                                            ) : 'N/A'
                                        }
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => setSelectedOrder && setSelectedOrder(order)}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredOrders.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl text-gray-400">📊</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No earnings found</h3>
                        <p className="text-gray-500">Try adjusting your filter criteria to see more results.</p>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {filteredOrders.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                            {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} results
                            {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
                        </div>
                        <div className="flex items-center space-x-1">
                            {/* Previous Button - Always Visible */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            {/* Page Numbers - Only show if multiple pages */}
                            {totalPages > 1 && (
                                <>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-3 py-2 text-sm font-medium border ${
                                                currentPage === page
                                                    ? "bg-blue-600 text-white border-blue-600"
                                                    : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50"
                                            } transition-colors`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </>
                            )}

                            {/* Next Button - Always Visible */}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersTable;
