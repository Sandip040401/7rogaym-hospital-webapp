import React from 'react';

export const PlanCard = ({ title, price, period, features, isSelected, onSelect, isRecommended }) => {
  return (
    <div
      className={`relative border rounded-lg p-6 w-80 shadow-lg transition-transform duration-300 ${isSelected ? 'border-blue-600 border-r-4 transform scale-105' : 'border-gray-200 border-r-4 border-gray-200'}`}
      onClick={onSelect}
    >
      {isRecommended && (
        <div className="text-white bg-orange-600 text-xl font-semibold absolute top-0 left-0 w-full h-8 text-center rounded-t-lg">
          Recommended
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2 mt-6">{title}</h3>
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
          <button className="px-4 py-2 bg-black text-white w-full text-center font-semibold rounded-lg transition-colors duration-300 hover:bg-gray-800">
            Select
          </button>
        ) : (
          <div className="px-4 py-2 bg-blue-800 text-white text-center font-semibold rounded-lg w-full">
            Selected
          </div>
        )}
      </div>
    </div>
  );
};
