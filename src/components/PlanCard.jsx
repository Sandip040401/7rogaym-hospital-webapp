import React from 'react';

export const PlanCard = ({ title, price, period, features, isSelected, isRecommended, onSelect }) => {
  return (
    <div
      className={`flex flex-col justify-between p-6 bg-white shadow-md rounded-lg w-80 h-96 ${isSelected ? 'border-2 border-blue-500' : ''} ${isRecommended ? 'border-t-4 border-orange-500' : ''}`}
      onClick={onSelect}
    >
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="flex items-baseline mb-4">
          <span className="text-4xl font-bold">₹{price}</span>
          <span className="text-sm text-gray-600 ml-1">{period}</span>
        </div>
        <ul className="text-gray-700 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="mb-2">• {feature}</li>
          ))}
        </ul>
      </div>
      <button className={`w-full py-2 text-white rounded-lg ${isSelected ? 'bg-black' : 'bg-gray-700 hover:bg-black transition duration-300'}`}>
        {isSelected ? 'Selected' : 'Select'}
      </button>
    </div>
  );
};
