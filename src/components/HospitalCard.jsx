import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

export const HospitalCard = ({ hospital }) => {
    const {
        image,
        name,
        address,
        city,
        state,
        zip,
        phone,
        discounts = {},
        category,
        uid,
        map_link
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
        <div className={`shadow-lg ${borderColor} border-t-2 border-r-4 border-b-4 rounded-xl max-w-sm p-4 md:p-6 flex flex-col items-start bg-white`} style={{ width: '500px', height: '600px' }}>
            <div className="w-full h-32 md:h-48 relative mb-4 overflow-hidden rounded-t-xl">
                <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
            </div>
            <div className="flex justify-between w-full mb-2">
                <div className="text-gray-600 text-sm font-semibold">{category}</div>
                <div className="text-gray-600 text-sm font-semibold">{uid}</div>
            </div>
            <div className="font-bold text-xl md:text-2xl text-gray-800 mb-2">{name}</div>
            <div className="text-gray-600 mb-1 md:mb-2">{address}</div>
            <div className="text-gray-600 mb-1 md:mb-2">{city}, {state}, {zip}</div>
            <div className="flex justify-between items-center text-blue-600 mt-2 font-medium mb-2 md:mb-4 w-full">
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
                    <span>{phone}</span>
                </div>
                {map_link && (
                    <a href={map_link} target="_blank" rel="noopener noreferrer" className="ml-2 text-gray-600 flex items-center">
                        <span className="mr-1">Direction</span>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </a>
                )}
            </div>
            <div className='w-full'>
                <h3 className="font-bold text-md md:text-lg mb-2 text-center text-gray-700">Discount%</h3>
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
