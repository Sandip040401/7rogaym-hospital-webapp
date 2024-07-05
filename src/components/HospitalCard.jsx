import React from 'react';

export const HospitalCard = ({ hospital }) => {
    const {
        image,
        name,
        address,
        city,
        state,
        zip,
        phone,
        discounts = {}
    } = hospital;

    const borderColors = [
        "border-pink-300",
        "border-blue-300",
        "border-green-300",
        "border-yellow-300",
        "border-purple-300",
        "border-teal-300",
        "border-red-300",
        "border-indigo-300"
    ];

    const borderColor = borderColors[Math.floor(Math.random() * borderColors.length)];

    return (
        <div className={`shadow-lg ${borderColor} border-r-4 border-b-4 rounded-xl max-w-sm p-6 flex flex-col items-start transform transition-transform duration-300 hover:scale-105 bg-white`}>
            <div className="w-full h-48 relative mb-4 overflow-hidden rounded-t-xl">
                <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
            </div>
            <div className="font-bold text-2xl text-gray-800 mb-2">{name}</div>
            <div className="text-gray-600 mb-2">{address}</div>
            <div className="text-gray-600 mb-2">{city}, {state}, {zip}</div>
            <div className="text-blue-600 mt-2 font-medium mb-4">{phone}</div>
            <div className='w-full'>
                <h3 className="font-bold text-lg mb-2 text-center text-gray-700">Discount%</h3>
                <div className='flex justify-around mb-2'>
                    <div className="text-center">
                        <p className="font-semibold text-gray-700">IPD</p>
                        <p className="text-gray-900">{discounts.ipd || 'N/A'}%</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-gray-700">OPD</p>
                        <p className="text-gray-900">{discounts.opd || 'N/A'}%</p>
                    </div>
                </div>
                <div className='flex justify-around'>
                    <div className="text-center">
                        <p className="font-semibold text-gray-700">Medicine</p>
                        <p className="text-gray-900">{discounts.medicine || 'N/A'}%</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-gray-700">Diagnostic</p>
                        <p className="text-gray-900">{discounts.diagnostic || 'N/A'}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
