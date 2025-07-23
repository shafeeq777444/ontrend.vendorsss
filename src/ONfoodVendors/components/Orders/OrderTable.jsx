import React from "react";

const OrderTable = ({ orders, onInvoiceClick }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-red-300">
      <table className="min-w-full divide-y divide-red-200">
        <thead className="bg-red-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Invoice</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Order Time</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Last Update</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-red-100">
          {orders.map((order) => (
            <tr key={order.orderId + order.orderTime} className="hover:bg-red-50 transition">
              <td className="px-4 py-3 text-sm">{order.orderId}</td>
              <td className="px-4 py-3 text-sm">{order.customer}</td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === "Preparing"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">{order.orderAmount}</td>
              <td className="px-4 py-3 text-sm">
                <button
                  onClick={() => onInvoiceClick(order.orderId)}
                  className="text-red-600 underline hover:text-red-800"
                >
                  View Invoice
                </button>
              </td>
              <td className="px-4 py-3 text-sm">{order.orderTime}</td>
              <td className="px-4 py-3 text-sm">{order.lastUpdateTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
