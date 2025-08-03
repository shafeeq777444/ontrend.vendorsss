// TabButton.jsx
const TabButton = ({ label, handleTabClick, activeTab, tabRefs }) => {
  const isActive = activeTab === label;

  return (
    <button
      ref={(el) => (tabRefs.current[label] = el)}
      onClick={() => handleTabClick(label)}
      className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
        ${isActive
          ? 'text-blue-600 '
          : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
        }`}
    >
      {label}
    </button>
  );
};

export default TabButton;
