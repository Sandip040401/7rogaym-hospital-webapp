import React from 'react';

export const HospitalCard = ({ hospital }) => {
    return (
        <div className="ml-10 shadow-lg border border-gray-200 rounded-xl max-w-sm p-6 flex flex-col items-start transform transition-transform duration-300 hover:scale-105 bg-gradient-to-br from-white to-gray-100">
            <div className="w-full h-48 relative mb-4 overflow-hidden rounded-t-xl">
                <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
            </div>
            <div className="font-bold text-2xl text-gray-800 mb-2">{hospital.name}</div>
            <div className="text-gray-600 mb-2">{hospital.address}</div>
            <div className="text-gray-600 mb-2">{hospital.city}, {hospital.state}, {hospital.zip}</div>
            <div className="text-blue-600 mt-2 font-medium mb-4">{hospital.phone}</div>
            <div className='w-full'>
                <h3 className="font-bold text-lg mb-2 text-center text-gray-700">Discount%</h3>
                <div className='flex justify-around mb-2'>
                    <div className="text-center">
                        <p className="font-semibold text-gray-700">IPD</p>
                        <p className="text-gray-900">{hospital.discounts.ipd}%</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-gray-700">OPD</p>
                        <p className="text-gray-900">{hospital.discounts.opd}%</p>
                    </div>
                </div>
                <div className='flex justify-around'>
                    <div className="text-center">
                        <p className="font-semibold text-gray-700">Medicine</p>
                        <p className="text-gray-900">{hospital.discounts.medicine}%</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-gray-700">Diagnostic</p>
                        <p className="text-gray-900">{hospital.discounts.diagnostic}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
