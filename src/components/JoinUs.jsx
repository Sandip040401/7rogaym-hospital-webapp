import React, { useState } from 'react';
import Modal from './Modal'; // Import the Modal component

export const JoinUs = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="h-full w-full bg-emerald-100 py-10 flex items-center justify-center px-10">
            <div className='w-1/2 pr-10'>
                <div className="flex justify-center text-4xl font-bold mb-6">
                    <span className="text-gray-800">Join</span> <span className="pl-2 text-emerald-600">Us</span>
                </div>
                <div className="flex justify-center px-12 py-6 text-xl text-gray-800 text-center">
                    <p className="max-w-3xl">
                        If you are a <span className="font-bold text-emerald-600">hospital</span> or <span className="font-bold text-emerald-600">healthcare provider</span>, we invite you to register with us. Please fill out the <span className="font-bold text-emerald-600">registration form</span> and one of our representatives will get in touch with you to discuss the <span className="font-bold text-emerald-600">registration process</span>.
                    </p>
                </div>
                <div className="flex justify-center mt-8">
                    <button 
                        onClick={openModal}
                        className="bg-emerald-600 text-white px-8 py-3 rounded-md hover:bg-emerald-700 transition duration-300"
                    >
                        Hospital Registration Form
                    </button>
                </div>
                {isModalOpen && <Modal onClose={closeModal} />}
            </div>
            <div className="w-1/2">
                    <img src="/hospitalregistration.jpg" alt="Hospital Registration" className="w-full h-auto rounded-lg" />
            </div>
        </div>
    );
};
