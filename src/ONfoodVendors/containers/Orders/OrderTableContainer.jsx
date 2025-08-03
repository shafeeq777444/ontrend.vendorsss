import React, { useState } from "react";
import OrderTable from "../../components/Orders/OrderTable";
import InvoiceModal from "../../components/Orders/InvoiceModal";
import OrderCardList from "../../components/Orders/OrderCardList";
import { useDispatch, useSelector } from "react-redux";
import { setInvoice } from "../../../slices/order/orderSlice";
import { useUpdateOrder } from "../../../services/queries/orders.query";
import { ChevronLeft, ChevronRight } from "lucide-react";
const OrderTableContainer = ({
  loading,
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
        <OrderTable orders={orders} onInvoiceClick={onInvoiceClick} handleSelector={handleSelector} loading={loading}/>
      </div>

      {/* Mobile Cards */}
      <div className="block lg:hidden">
        <OrderCardList orders={orders}   onInvoiceClick={onInvoiceClick} handleSelector={handleSelector} loading={loading}/>
      </div>

      

{/* Pagination Controls */}
<div className="px-6 py-4 bg-white border-t border-gray-100  rounded-b-2xl shadow-lg ">
  <div className="flex items-center justify-between">
    <div className="text-sm text-gray-700">
      Page {pageIndex + 1} of {maxPage + 1}
    </div>

    <div className="flex items-center space-x-1">
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={pageIndex === 0}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={!hasNextPage && pageIndex === maxPage}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isFetchingNextPage ? (
          <span className="flex items-center space-x-1">
            <span>Loading</span>
            <span className="animate-spin">⏳</span>
          </span>
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>
    </div>
  </div>
</div>

{/* Invoice Modal */}
{invoice && <InvoiceModal onClose={handleCloseModal} order={invoice} />}

    </>
  );
};

export default OrderTableContainer;
