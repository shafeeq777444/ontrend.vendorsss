import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import TabButton from "../../components/Orders/TabButton";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../../slices/order/orderSlice";

const TABS = ['Pending', 
  // 'all', //when want time uncommented this is useful part
   'Processing', 'Ready', 'Picked Up', 'Delivered', 'Cancelled'];

const OrderTabBar = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.order.activeTab);
  const tabRefs = useRef({});
  const pendingOrders = useSelector((state) => state.order.pendingOrders);
  const processingOrders = useSelector((state) => state.order.processingOrders);
  console.log("pendingOrders", pendingOrders);
  console.log("processingOrders", processingOrders);

  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const handleTabClick = (label) => {
    dispatch(setActiveTab(label));
  };

  useEffect(() => {
    const currentTab = tabRefs.current[activeTab];
    if (currentTab) {
      setUnderlineStyle({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div className="relative px-3 py-2 bg-white rounded-xl shadow border border-gray-200 overflow-x-auto scrollbar-hide mb-3">
      
      <div className="flex gap-2 whitespace-nowrap">
        {TABS.map((label) => (
          <TabButton
            key={label}
            handleTabClick={handleTabClick}
            tabRefs={tabRefs}
            activeTab={activeTab}
            label={label}
           span={label === "Pending" ? pendingOrders : label === "Processing"? processingOrders : undefined}
          />
        ))}
      </div>

      {/* Animated underline */}
      <motion.div
        className="absolute h-[2px] bg-blue-600 rounded"
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          left: underlineStyle.left,
          width: underlineStyle.width,
        }}
      />
    </div>
  );
};

export default OrderTabBar;
