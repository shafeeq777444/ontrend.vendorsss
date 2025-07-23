import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import TabButton from "../../components/Orders/TabButton";

const TABS = ["Request's", "All Orders", "Preparing", "Ready", "Pickup", "Completed"];

const OrderTabBar = () => {
  const [activeTab, setActiveTab] = useState("Request's");
  const tabRefs = useRef({});

  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

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
         setActiveTab={setActiveTab}
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
