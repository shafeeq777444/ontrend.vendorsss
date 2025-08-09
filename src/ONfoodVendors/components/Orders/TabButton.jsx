// TabButton.jsx
const TabButton = ({ label, handleTabClick, activeTab, tabRefs, span = 0 }) => {
  const isActive = activeTab === label;

  return (
    <button
      ref={(el) => (tabRefs.current[label] = el)}
      onClick={() => handleTabClick(label)}
      className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
        ${isActive
          ? 'text-blue-600'
          : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
        }`}
    >
      {label}

      {span > 0 && (
        <span
          className="absolute -top-1 -right-1 min-w-[1.2rem] h-[1.2rem] flex items-center justify-center
          text-[0.7rem] font-bold text-white bg-blue-600 rounded-full shadow-md"
        >
          {span}
        </span>
      )}
    </button>
  );
};

export default TabButton;
