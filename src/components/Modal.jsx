import React, { useState } from 'react';

const Modal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        entityType: 'hospital' // Default value
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Submitted data:', formData);
        onClose(); // Close modal after submission
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
            <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-lg mx-4 transition-transform transform scale-100 hover:scale-105">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">Hospital Registration Form</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="entityType" className="block text-gray-800 text-lg font-medium">Entity Type</label>
                        <select
                            id="entityType"
                            name="entityType"
                            value={formData.entityType}
                            onChange={handleChange}
                            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-lg focus:border-emerald-600 focus:ring-emerald-600 transition-colors duration-200"
                        >
                            <option value="hospital">Hospital</option>
                            <option value="medical">Medical</option>
                            <option value="labs">Labs</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-gray-800 text-lg font-medium">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm text-lg focus:border-emerald-600 focus:ring-emerald-600 transition-colors duration-200 p-3"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-gray-800 text-lg font-medium">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm text-lg focus:border-emerald-600 focus:ring-emerald-600 transition-colors duration-200 p-3"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-gray-800 text-lg font-medium">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm text-lg focus:border-emerald-600 focus:ring-emerald-600 transition-colors duration-200 p-3"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-600 text-white px-4 py-2 rounded-md text-lg hover:bg-gray-700 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-emerald-500 text-white px-4 py-2 rounded-md text-lg hover:bg-emerald-600 transition-colors duration-200"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
