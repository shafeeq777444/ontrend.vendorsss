import React from "react";

const OrderTable = ({ orders, onInvoiceClick,handleSelector }) => {
    return (
        <div className="overflow-x-auto rounded-xl shadow-md border border-red-300">
            <table className="min-w-full divide-y divide-red-200">
                <thead className="bg-red-600 text-white">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Update Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Invoice</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Order Time</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-red-100">
                    {orders.map((order) => (
                        <tr key={order.orderId + order.orderTime} className="hover:bg-red-50 transition">
                            <td className="px-4 py-3 text-sm">{order?.id}</td>
                            <td className="px-4 py-3 text-sm">{order?.userName}</td>
                            <td className="px-4 py-3 text-sm">{order?.status}</td>
                            <td className="px-4 py-3 text-sm">
                              
                                <select
                                   value={order?.status}
                                    onChange={(e)=>handleSelector(order.id,e.target.value)}
                                    className={`px-2 py-1 rounded-full text-xs font-medium border focus:outline-none ${
                                        order.status === "Preparing"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-green-100 text-green-800"
                                    }`}
                                >
                                    {["Pending", "All", "Processing", "Ready", "Picked Up", "Delivered", "Cancelled"].map(
                                        (status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        )
                                    )}
                                </select>
                            </td>
                            <td className="px-4 py-3 text-sm">{order.totalPrice}</td>
                            <td className="px-4 py-3 text-sm">
                                <button
                                    onClick={() => onInvoiceClick(order)}
                                    className="text-red-600 underline hover:text-red-800"
                                >
                                    View Invoice
                                </button>
                            </td>
                            <td className="px-4 py-3 text-sm">{order?.orderTimeStamp?.toDate().toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm">{order.lastUpdateTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
