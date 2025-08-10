import React from 'react';

const FormTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { number: 1, label: "Basic Info" },
    { number: 2, label: "Pricing & Availability" },
    { number: 3, label: "Variants" },
    { number: 4, label: "Add-ons" },
    { number: 5, label: "Save & Settings" }
  ];

  return (
    <div className="flex space-x-4 border-b border-gray-300">
      {tabs.map((tab) => (
        <button
          key={tab.number}
          onClick={() => setActiveTab(tab.number)}
          className={`px-4 py-2 font-semibold rounded-t-lg focus:outline-none ${
            activeTab === tab.number
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default FormTabs;
