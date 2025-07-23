// components/Orders/OrderCardList.jsx
import React from "react";

const OrderCardList = ({ orders, onInvoiceClick }) => {
  return (
    <div className="space-y-4 lg:hidden">
      {orders.map((order) => (
        <div
          key={order.orderId + order.orderTime}
          className="border rounded-lg shadow p-4 bg-white"
        >
          <div className="text-sm font-semibold text-gray-700">
            Order ID: {order.orderId}
          </div>
          <div className="text-sm text-gray-600">Customer: {order.customer}</div>
          <div className="text-sm text-gray-600">
            Status:{" "}
            <span
              className={`font-medium ${
                order.status === "Preparing"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {order.status}
            </span>
          </div>
          <div className="text-sm text-gray-600">Amount: {order.orderAmount}</div>
          <div className="text-sm text-gray-600">Order Time: {order.orderTime}</div>
          <div className="text-sm text-gray-600">
            Last Update: {order.lastUpdateTime}
          </div>

          <button
            onClick={() => onInvoiceClick(order.orderId)}
            className="mt-3 text-red-600 underline text-sm hover:text-red-800"
          >
            View Invoice
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrderCardList;
