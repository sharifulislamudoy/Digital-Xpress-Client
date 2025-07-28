import React from 'react';

const ProductTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'latest', label: 'Latest' },
    { id: 'trending', label: 'Trending' },
    { id: 'best-sellers', label: 'Best Sellers' }
  ];

  return (
    <div className="flex justify-center mb-10">
      <div className="flex space-x-1 rounded-lg bg-gray-900 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-orange-500 text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductTabs;