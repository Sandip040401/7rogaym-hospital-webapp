// AdditionalBenefitsModal.js
import React from 'react';

export const AdditionalBenefitsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-xl font-semibold">Additional Benefits</h2>
                    <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="mt-4">
                    <ul className="list-disc list-inside">
                        <li>24/7 customer support for all your healthcare needs</li>
                        <li>Personalized health management services to help you maintain a healthy lifestyle</li>
                        <li>Easy online access to your health card information and healthcare records</li>
                        <li>Discounts on wellness products and services, including gym memberships and nutritional supplements</li>
                        <li>No waiting periods or pre-existing condition exclusions</li>
                        <li>No paperwork to worry about - simply show your health card and receive your discount</li>
                    </ul>
                </div>
                <div className="mt-6 text-right">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};
