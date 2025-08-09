import React from "react";
import { format } from "date-fns";
import OrdersSkeleton from "./OrdersSkeleton";
import { formatOMR } from "../../../utils/formatOMR";
import StatusChangeModal from "./StatusChangeModal";

const OrderTable = ({ orders, onInvoiceClick, handleSelector, loading }) => {
    const [modalOpen, setModalOpen] = React.useState(false);
const [selectedOrderId, setSelectedOrderId] = React.useState(null);
const [currentStatus, setCurrentStatus] = React.useState("");
const [nextStatus, setNextStatus] = React.useState("");


const STATUS_FLOW = {
    Pending: "Processing",
    Processing: "Ready",
    Ready: null,
    "Picked Up": null,
    Delivered: null,
    Cancelled: null,
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

    // Helper function to calculate total amount
    const calculateTotalPrice = (items) => {
        if (!items || !Array.isArray(items)) return 0;
        return items.reduce((acc, item) => {
            const total = item?.total || 0;
            return acc + total;
        }, 0);
    };

    const formatCurrency = (amount) => {
        const numAmount = Number(amount) || 0;
        return numAmount.toFixed(2);
    };

    if (loading) {
        return <OrdersSkeleton />;
    }

    return (
        <div className="bg-white rounded-t-2xl  border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Orders</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order ID
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Update Status
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Invoice
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order Time
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr
                                key={order.orderId + order.orderTime}
                                className="hover:bg-gray-50 transition-colors duration-150"
                            >
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">#{order?.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{order?.userName}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{order?.status}</td>
                                <td className="px-6 py-4 text-sm">
    {STATUS_FLOW[order.status] ? (
        <button
            onClick={() => {
                setSelectedOrderId(order.id);
                setCurrentStatus(order.status);
                setNextStatus(STATUS_FLOW[order.status]);
                setModalOpen(true);
            }}
            className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200"
        >
            Mark as {STATUS_FLOW[order.status]}
        </button>
    ) : (
        order?.status === 'Ready' ? (
            <span className="text-xs text-gray-400 italic">Waiting for Picked Up</span>
        ) : order?.status === 'Picked Up' ? (
            <span className="text-xs text-gray-400 italic">Waiting for Delivery</span>
        ) : order?.status === 'Delivered' ? (
            <span className="text-xs text-gray-400 italic">Delivered</span>
        ) : order?.status === 'Cancelled' ? (
            <span className="text-xs text-gray-400 italic">Cancelled</span>
        ) : (
            <span className="text-xs text-gray-400 italic">No next step</span>
        )
    )}
</td>

                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {" "}
                                    OMR {formatOMR(calculateTotalPrice(order?.items))}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <button
                                        onClick={() => onInvoiceClick(order)}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
                                    >
                                        View Invoice
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {order?.orderTimeStamp?.toDate
                                        ? format(order.orderTimeStamp.toDate(), "MMM dd, yyyy HH:mm")
                                        : "N/A"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {orders.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl text-gray-400">📭</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                        <p className="text-gray-500">Please check back later or adjust your filters.</p>
                    </div>
                )}
            </div>
            <StatusChangeModal
    isOpen={modalOpen}
    onClose={() => setModalOpen(false)}
    onConfirm={() => {
        handleSelector(selectedOrderId, nextStatus);
        setModalOpen(false);
    }}
    currentStatus={currentStatus}
    nextStatus={nextStatus}
/>

        </div>
    );
};

export default OrderTable;
