import React, { useState } from "react";
import OrderTable from "../../components/Orders/OrderTable";

import InvoiceModal from "../../components/Orders/InvoiceModal";
import OrderCardList from "../../components/Orders/OrderCardList";

const dummyOrders = [
  {
    orderId: "ORD12345",
    customer: "John Doe",
    status: "Preparing",
    orderAmount: "$24.99",
    orderTime: "2025-07-21 10:30 AM",
    lastUpdateTime: "2025-07-21 11:00 AM",
    paymentMethod: "COD",
    discount: 2.5,
    sellerEarnings: 20.5,
    items: [
      {
        itemName: "Fresh Banana Jam",
        localName: "عصيرس كريم",
        itemPrice: 0.7,
        itemQuantity: 1,
        total: 0.7,
        addOns: [],
        addedBy: "LpU7mIF2",
      },
    ],
  },
  // Add more if needed
];

const OrderTableContainer = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const closeModal = () => setSelectedOrder(null);

  const handleInvoiceClick = (orderId) => {
    const foundOrder = dummyOrders.find((order) => order.orderId === orderId);
    if (foundOrder) setSelectedOrder(foundOrder);
  };

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block">
        <OrderTable orders={dummyOrders} onInvoiceClick={handleInvoiceClick} />
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="block lg:hidden">
        <OrderCardList orders={dummyOrders} onInvoiceClick={handleInvoiceClick} />
      </div>

      <InvoiceModal order={selectedOrder} onClose={closeModal} />
    </>
  );
};

export default OrderTableContainer;
