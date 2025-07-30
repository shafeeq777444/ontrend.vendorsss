import React from "react";

const InvoiceModal = ({ order, onClose }) => {
    if (!order) return null;

    const subtotal = order.totalPrice;
    const sellerEarnings = subtotal - order.totalCommission || 0;
    const discount = order.discount || 0;
    const total = subtotal - discount;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-xl p-6 relative">
                <h2 className="text-xl font-bold mb-4">Invoice</h2>

                <div className="space-y-2 text-sm">
                    <p>
                        <strong>Order ID:</strong> {order.id}
                    </p>
                    <p>
                        <strong>Customer:</strong> {order.userName}
                    </p>
                    <p>
                        <strong>Status:</strong> {order.status}
                    </p>
                    <p>
                        <strong>Payment Method:</strong> {order.paymentType}
                    </p>
                    <p>
                        <strong>Order Time:</strong> {order?.orderTimeStamp?.toDate().toLocaleString()}
                    </p>
                </div>

                <hr className="my-4" />

                <h3 className="font-semibold mb-2">Items</h3>
                <div className="space-y-1 text-sm">
                    {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between">
                            <div>
                                {item.itemName} ({item.itemQuantity} × ${item.itemPrice.toFixed(3)})
                            </div>
                            <div>${item.total.toFixed(3)}</div>
                        </div>
                    ))}
                </div>

                <hr className="my-4" />

                <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between text-yellow-700">
                        <span>Discount</span>
                        <span>- ${discount.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between text-red-600 font-medium">
                        <span>ONtrend service Fee</span>
                        <span>${order?.totalCommission?.toFixed(3) || "0.000"}</span>
                    </div>
                    <div className="flex justify-between text-green-700">
                        <span>Seller Earnings</span>
                        <span>${sellerEarnings?.toFixed(3) || 0}</span>
                    </div>
                </div>

                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg  " onClick={onClose}>
                    &times;
                </button>
            </div>
        </div>
    );
};

export default InvoiceModal;
