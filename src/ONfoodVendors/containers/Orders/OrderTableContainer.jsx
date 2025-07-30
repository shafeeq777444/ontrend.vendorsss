import React, { useState } from "react";
import OrderTable from "../../components/Orders/OrderTable";
import InvoiceModal from "../../components/Orders/InvoiceModal";
import OrderCardList from "../../components/Orders/OrderCardList";
import { useDispatch, useSelector } from "react-redux";
import { setInvoice } from "../../../slices/order/orderSlice";
import { useUpdateOrder } from "../../../services/queries/orders.query";

const OrderTableContainer = ({
  orders,
  onNext,
  onPrevious,
  pageIndex,
  isFetchingNextPage,
  hasNextPage,
  maxPage,
}) => {
  const { mutate: updateOrder } = useUpdateOrder();
 const invoice = useSelector((state) => state.order.invoice);
  console.log(invoice,"invoice")
  const dispatch = useDispatch(); 
  const onInvoiceClick = (order) => {
  dispatch(setInvoice(order)); // ✅ Use dispatch correctly
};

const handleCloseModal = () => {
  dispatch(setInvoice(null)); // ✅ Close modal
};

const handleSelector = (orderId, status) => {
  updateOrder({ orderId: orderId, updatedData: { status } });
};

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block">
        <OrderTable orders={orders} onInvoiceClick={onInvoiceClick} handleSelector={handleSelector}/>
      </div>

      {/* Mobile Cards */}
      <div className="block lg:hidden">
        <OrderCardList orders={orders}   onInvoiceClick={onInvoiceClick} handleSelector={handleSelector}/>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={onPrevious}
          disabled={pageIndex === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm">
          Page {pageIndex + 1} of {maxPage + 1}
        </span>

        <button
          onClick={onNext}
          disabled={!hasNextPage && pageIndex === maxPage}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          {isFetchingNextPage ? "Loading..." : "Next"}
        </button>
      </div>
       {invoice && <InvoiceModal onClose={handleCloseModal} order={invoice} />}
    </>
  );
};

export default OrderTableContainer;
