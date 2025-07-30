import React from "react";

const statusOptions = [
  "Pending",
  "All",
  "Processing",
  "Ready",
  "Picked Up",
  "Delivered",
  "Cancelled"
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
          className="border rounded-2xl shadow-lg p-5 bg-white hover:bg-gray-50 transition flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <div className="text-base font-bold text-gray-800">
              Order ID: <span className="font-mono">{order.id}</span>
            </div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-bold border ${statusBadgeClass(order.status)}`}
            >
              {order.status}
            </span>
          </div>
          <div className="text-sm text-gray-600 font-medium">Customer: {order.userName}</div>
          <div className="flex flex-col items-center gap-1 mt-2">
            <label className="text-xs text-gray-500 mb-1">Update Status</label>
            <select
              value={order?.status}
              onChange={(e) => handleSelector(order.id, e.target.value)}
              className="w-full max-w-xs px-3 py-2 rounded-md text-sm font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white shadow-sm transition hover:border-red-400"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="text-sm text-gray-700 font-semibold">Amount: <span className="font-normal">{order.totalPrice}</span></div>
            <div className="text-sm text-gray-700 font-semibold">Order Time: <span className="font-normal">{order.orderTimeStamp?.toDate().toLocaleString()}</span></div>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              onClick={() => onInvoiceClick(order)}
              className="text-red-600 underline hover:text-red-800 text-sm font-semibold transition"
            >
              View Invoice
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCardList;
