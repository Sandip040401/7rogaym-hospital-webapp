import React from 'react';

export const PlanCard = ({ title, price, period, features, isSelected, onSelect, isRecommended }) => {
  return (
    <div
      className={`relative border rounded-lg p-6 w-80 shadow-lg ${isSelected ? 'border-blue-600' : 'border-gray-200'}`}
      onClick={onSelect}
    >
      {isRecommended && (
        <div className="text-white bg-orange-500 text-lg absolute top-0 left-0 w-full h-6 text-center rounded-t-lg">
          Recommended
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2 mt-6">{title}</h3> {/* Adjusted margin to account for the "Recommended" label */}
      <p className="mb-4 font-bold text-2xl">
        ₹{price} <span className='font-semibold text-lg'>{period}</span>
      </p>
      <ul className="list-disc list-inside mb-4">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-700 mb-1">{feature}</li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center">
        {!isSelected ? (
          <button className="px-4 py-2 bg-black text-white w-full text-center font-semibold rounded-lg">
            Select
          </button>
        ) : (
          <div className="px-4 py-2 bg-black text-white text-center font-semibold rounded-lg w-full">
            Selected
          </div>
        )}
      </div>
    </div>
  );
};
