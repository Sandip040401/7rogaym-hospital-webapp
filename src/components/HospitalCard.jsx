import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Import the new arrow icon

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
        <div className={`shadow-lg ${borderColor} border-t-2 border-r-8 border-b-4 rounded-tl-xl rounded-tr-3xl rounded-br-xl rounded-bl-xl max-w-sm p-4 md:p-6 flex flex-col items-start bg-white`} style={{ width: '500px', height: '600px' }}>
            <div className="w-full h-32 md:h-48 relative mb-4 overflow-hidden rounded-t-xl">
                <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
            </div>
            <div className="flex justify-between w-full mb-2">
                <div className="text-gray-600 text-sm font-semibold">{category}</div>
                <div className="text-gray-600 text-sm font-semibold">{uid}</div>
            </div>
            <div className="font-bold text-xl md:text-2xl text-gray-800 mb-2">{name}</div>
            <div className="text-gray-600 mb-1 md:mb-2"><FontAwesomeIcon icon={faMapMarkerAlt} /> &nbsp;{address}</div>
            <div className="text-gray-600 mb-1 md:mb-2">{city}, {state}, {zip}</div>
            <div className="flex justify-between items-center text-blue-600 mt-2 font-medium mb-2 md:mb-4 w-full">
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 transform rotate-90" /> {/* Rotate the phone icon */}
                    <span>{phone}</span>
                </div>
                {map_link && (
                    <a href={map_link} target="_blank" rel="noopener noreferrer" className="ml-2 text-orange-600 flex items-center">
                        {/* <span className="mr-1">Direction</span> */}
                        <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="40"
                        width="40"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: 'rgb(255, 127, 38)', placeSelf: 'center' }}
                        >
                        <path d="M502.61 233.32L278.68 9.39c-12.52-12.52-32.83-12.52-45.36 0L9.39 233.32c-12.52 12.53-12.52 32.83 0 45.36l223.93 223.93c12.52 12.53 32.83 12.53 45.36 0l223.93-223.93c12.52-12.53 12.52-32.83 0-45.36zm-100.98 12.56l-84.21 77.73c-5.12 4.73-13.43 1.1-13.43-5.88V264h-96v64c0 4.42-3.58 8-8 8h-32c-4.42 0-8-3.58-8-8v-80c0-17.67 14.33-32 32-32h112v-53.73c0-6.97 8.3-10.61 13.43-5.88l84.21 77.73c3.43 3.17 3.43 8.59 0 11.76z" />
                        </svg>

                        {/* <FontAwesomeIcon icon={faArrowRight} />  */}
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
