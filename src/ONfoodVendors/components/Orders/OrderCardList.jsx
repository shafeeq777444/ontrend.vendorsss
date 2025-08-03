import React from "react";

const statusOptions = [
  "Pending",
  "All",
  "Processing",
  "Ready",
  "Picked Up",
  "Delivered",
  "Cancelled",
];

const statusBadgeClass = (status) => {
  switch (status) {
    case "Preparing":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    case "Delivered":
      return "bg-green-100 text-green-800 border-green-200";
    case "Processing":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Ready":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Picked Up":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "Pending":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const OrderCardList = ({ orders, handleSelector, onInvoiceClick }) => {
  return (
    <div className="space-y-6 lg:hidden">
      {orders.map((order) => (
        <div
          key={order.id + order.orderTimeStamp}
          className="border border-gray-100 rounded-2xl shadow-md bg-white p-5 transition hover:shadow-lg"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-base font-semibold text-gray-900">
              Order ID: <span className="font-mono">{order.id}</span>
            </div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${statusBadgeClass(order.status)}`}
            >
              {order.status}
            </span>
          </div>

          {/* Customer */}
          <div className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Customer:</span> {order.userName}
          </div>

          {/* Status Selector */}
          <div className="mt-3">
            <label className="text-xs text-gray-500 mb-1 block">Update Status</label>
            <select
              value={order?.status}
              onChange={(e) => handleSelector(order.id, e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Info Rows */}
          <div className="mt-4 space-y-1 text-sm text-gray-700">
            <div>
              <span className="font-semibold">Amount:</span> OMR {order.totalPrice}
            </div>
            <div>
              <span className="font-semibold">Order Time:</span>{" "}
              {order.orderTimeStamp?.toDate().toLocaleString()}
            </div>
          </div>

          {/* Invoice Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => onInvoiceClick(order)}
              className="text-blue-700 text-sm font-medium underline hover:text-blue-900 transition"
            >
              View Invoice
            </button>
          </div>
        </div>
      ))}

      {orders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl text-gray-400">📭</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">Check back later or try different filters.</p>
        </div>
      )}
    </div>
  );
};

export default OrderCardList;
