

const TabButton = ({ tabRefs, activeTab, label,handleTabClick}) => {
  return (
    <button
            key={label}
            ref={(el) => (tabRefs.current[label] = el)}
            onClick={()=>handleTabClick(label)}
            className={`relative whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === label ? "text-white" : "text-white/70 hover:text-gray-300"
            }`}
          >
            {label}
          </button>
  );
};

export default TabButton