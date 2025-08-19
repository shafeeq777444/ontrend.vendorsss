import React from "react";
import { formatOMR } from "../../../utils/formatOMR";

const InvoiceModal = ({ order, onClose }) => {
    if (!order) return null;

    // Helper function to calculate total amount
    const calculateSubTotalPrice = (items) => {
        console.log(items, "items check");
        if (!items || !Array.isArray(items)) return 0;
        return items.reduce((acc, item) => {
            const total = item?.total || item?.itemPrice * item?.itemQuantity || 0;
            return acc + total;
        }, 0);
    };

    // Helper function to calculate seller earnings
    const calculateSellerEarnings = (order) => {
        console.log(order, "seller earnings");
        if (!order) return 0;
        const total = order?.totalPrice || 0;
        const commission = order?.totalCommission || 0;
        const serviceFee = order?.serviceFee || 0;
        const deliveryFee = order?.deliveryFee || 0;
        const discountApplied = order?.discountApplied || 0;
        const sellerEarning = total - commission - serviceFee - deliveryFee - discountApplied;
        return sellerEarning;
    };

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
                        <div key={i} className="flex flex-col">
                            <div className="flex justify-between">
                                <div>
                                    {item.itemName} ({item.itemQuantity} × {formatOMR(item.itemPrice?.toFixed(3))})
                                    {item.addOns && item.addOns.length > 0 && (
                                        <div className="text-xs text-gray-500">
                                            Add-ons: {item.addOns.map(addon => 
                                                `${addon.name} (${formatOMR(addon.price)})`
                                            ).join(', ')}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {formatOMR((item?.total || item.itemPrice * item.itemQuantity))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <hr className="my-4" />

                <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatOMR(calculateSubTotalPrice(order?.items))}</span>
                    </div>
                    <div className="flex justify-between text-yellow-700">
                        <span>Discount Applied</span>
                        <span>{formatOMR(order?.discountApplied)}</span>
                    </div>
                    {/* <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(3)}</span>
                    </div> */}
                    <div className="flex justify-between text-red-600 font-medium">
                        <span>Total bill</span>
                        <span>{formatOMR(order?.totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-green-700">
                        <span>Seller Earnings</span>
                        <span> {formatOMR(calculateSellerEarnings(order))}</span>
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
// const calculateSellerEarnings = (items) => {
//     if (!items || !Array.isArray(items)) return 0;

//     return items.reduce((acc, item) => {
//         const total = item?.total || 0;
//         const commission = item?.commission || 0;
//         const sellerEarning = total - (total * commission) / 100;
//         return acc + sellerEarning;
//     }, 0);
// };

// const subtotal = order.totalPrice;
// const sellerEarnings = subtotal - order.totalCommission || 0;
// const discount = order.discount || 0;
// const total = subtotal - discount;

// Helper function to calculate commission
// const calculateTotalCommission = (items) => {
//     if (!items || !Array.isArray(items)) return 0;
//     return items.reduce((acc, item) => {
//         const commissionPer = item?.commission || 0;
//         const commissionAmount = (item?.total * commissionPer) / 100;
//         return acc + commissionAmount;
//     }, 0);
// };
