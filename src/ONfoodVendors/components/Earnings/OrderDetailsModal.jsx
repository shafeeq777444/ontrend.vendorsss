import React from 'react';
import { format } from 'date-fns';

const OrderDetailsModal = ({ selectedOrder, setSelectedOrder, getPaymentModeIcon }) => {
  if (!selectedOrder) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
            <button
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors duration-150"
              onClick={() => setSelectedOrder(null)}
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-600">Order ID</p>
              <p className="text-lg font-semibold text-gray-900">{selectedOrder.orderId}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-600">Payment Mode</p>
              <div className="flex items-center mt-1">
                <span className="mr-2">{getPaymentModeIcon(selectedOrder.paymentMode)}</span>
                <span className="text-lg font-semibold text-gray-900">{selectedOrder.paymentMode}</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-600">Item Total</p>
              <p className="text-lg font-semibold text-gray-900">₹{selectedOrder.itemTotal.toFixed(2)}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm font-medium text-green-600">Your Earnings</p>
              <p className="text-lg font-semibold text-green-700">₹{selectedOrder.sellerEarnings.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-600">Customer</p>
              <p className="text-lg text-gray-900">{selectedOrder.deliveryTo}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Delivery Address</p>
              <p className="text-lg text-gray-900">{selectedOrder.deliveryAddress}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Item Ordered</p>
              <p className="text-lg text-gray-900">{selectedOrder.deliveryItem}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Order Date & Time</p>
              <p className="text-lg text-gray-900">{format(selectedOrder.orderDate, 'MMMM dd, yyyy')}</p>
              <p className="text-sm text-gray-500">{format(selectedOrder.orderDate, 'HH:mm')}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={() => setSelectedOrder(null)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-150"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal; 