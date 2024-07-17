import React from 'react';
import Tooltip from '@mui/material/Tooltip';

export const PlanCard = ({ title, price, period, features, isSelected, onSelect, isRecommended }) => {
  return (
    <div
      className={`relative border rounded-lg p-6 w-80 shadow-lg transition transform hover:scale-105 ${isSelected ? 'border-blue-600' : 'border-gray-200'}`}
      onClick={onSelect}
    >
      {isRecommended && (
        <div className="text-white bg-yellow-500 px-2 py-1 rounded-full text-xs absolute top-2 right-2">
          Recommended
        </div>
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">
        ₹{price} {period}
      </p>
      <ul className="mb-4">
        {features.map((feature, index) => (
          <Tooltip title={feature} key={index} arrow>
            <li className="text-gray-700 mb-1">{feature}</li>
          </Tooltip>
        ))}
      </ul>
      {isSelected && <div className="text-blue-600 font-semibold">Selected</div>}
    </div>
  );
};
