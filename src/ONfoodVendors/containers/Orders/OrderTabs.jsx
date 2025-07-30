
import React, { useState, useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import TabButton from "../../components/Orders/TabButton";
import {  useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../../slices/order/orderSlice";

// const TABS = ["Request's", "all", "Preparing", "Ready", "Pickup", "Delivered","Cancelled"];
const TABS = ['Pending',"all", 'Processing', 'Ready', 'Picked Up', 'Delivered',"Cancelled"];

const OrderTabBar = () => {
  const dispatch=useDispatch()
  const activeTab = useSelector((state) => state.order.activeTab);
  const tabRefs = useRef({});

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
    <div className="relative border-b border-white/30 mb-4 overflow-x-auto">
      <div className="flex">
        {TABS.map((label) => (
         <TabButton
         key={label}
         handleTabClick={handleTabClick}
         tabRefs={tabRefs}
         activeTab={activeTab}
         label={label}
         />
        ))}
      </div>

      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 h-0.5 bg-white"
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          left: underlineStyle.left,
          width: underlineStyle.width,
          position: "absolute",
        }}
      />
    </div>
  );
};

export default OrderTabBar;
