import React, { useState } from 'react';
import { BannerCards } from "./BannerCards";
import { AdditionalBenefitsModal } from "./AdditionalBenefitsModal";

export const Services = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const servicesData1 = [
        {
            imageSrc: "https://img.icons8.com/external-others-pike-picture/50/external-Heart-Surgery-surgery-others-pike-picture.png",
            title: "Heart Diseases",
            description: "Comprehensive care for heart conditions, including diagnostics, treatment, and rehabilitation.",
            color: "bg-purple-100 hover:bg-purple-200",
            textSize: "text-lg lg:text-2xl",
            descSize: "text-md"
        },
        {
            imageSrc: "https://img.icons8.com/arcade/64/surgery.png",
            title: "General Surgery",
            description: "Expert surgical procedures covering a wide range of medical conditions with advanced techniques.",
            color: "bg-red-100 hover:bg-red-200",
            textSize: "text-lg lg:text-2xl",
            descSize: "text-md"
        },
        {
            imageSrc: "https://img.icons8.com/pulsar-color/48/tooth-protection.png",
            title: "Dental Problems",
            description: "Advanced dental treatments including preventive, restorative, and cosmetic dentistry.",
            color: "bg-orange-100 hover:bg-orange-200",
            textSize: "text-lg lg:text-2xl",
            descSize: "text-md"
        },
        {
            imageSrc: "https://img.icons8.com/external-inipagistudio-mixed-inipagistudio/64/external-diagnostic-antibody-testing-inipagistudio-mixed-inipagistudio.png",
            title: "Diagnostic",
            description: "Accurate diagnostic services with state-of-the-art equipment for early detection and treatment.",
            color: "bg-yellow-100 hover:bg-yellow-200",
            textSize: "text-lg lg:text-2xl",
            descSize: "text-md"
        }
    ];

    const servicesData2 = [
        {
            imageSrc: "https://img.icons8.com/color/96/pill.png",
            title: "Medicine",
            description: "Wide range of medicines available for various health conditions, ensuring quality and affordability.",
            color: "bg-blue-100 hover:bg-blue-200",
            textSize: "text-lg lg:text-2xl",
            descSize: "text-md"
        },
        {
            imageSrc: "https://img.icons8.com/external-beshi-color-kerismaker/48/external-Neurology-medical-service-beshi-color-kerismaker.png",
            title: "Neurology",
            description: "Specialized neurological care for conditions affecting the brain, spinal cord, and nerves.",
            color: "bg-green-100 hover:bg-green-200",
            textSize: "text-lg lg:text-2xl",
            descSize: "text-md"
        },
        {
            imageSrc: "https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/external-eye-care-hospital-and-healthcare-xnimrodx-lineal-color-xnimrodx.png",
            title: "Eye Care",
            description: "Comprehensive eye care services including vision tests, treatments, and surgeries.",
            color: "bg-pink-100 hover:bg-pink-200",
            textSize: "text-lg lg:text-2xl",
            descSize: "text-md"
        },
        {
            imageSrc: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-bones-anatomy-flaticons-lineal-color-flat-icons-3.png",
            title: "Orthopaedics",
            description: "Advanced orthopaedic treatments for bone, joint, and muscle conditions, including surgeries and rehabilitation.",
            color: "bg-purple-100 hover:bg-purple-200",
            textSize: "text-lg lg:text-2xl",
            descSize: "text-md"
        }
    ];

    return (
        <div className="h-full w-full py-6 px-4 pb-14 lg:bg-[url('/services.jpg')] bg-no-repeat bg-contain" id="services">
            <div className="flex justify-center text-3xl font-bold text-white">
                <span className="flex flex-col text-black justify-center">The</span>
                <span className="text-teal-500 lg:text-4xl pl-2">Services</span>
                <span className="flex flex-col text-black justify-center pl-2">We Provide</span> 
            </div>
            <div className="flex justify-center lg:px-48 w-full">
                <BannerCards data={servicesData1} height="h-70 lg:h-80" width="w-40 lg:w-56 xl:w-60" feature={true} />
            </div>
            <div className="flex justify-center lg:px-48 w-full">
                <BannerCards data={servicesData2} height="h-70 lg:h-80" width="w-40 lg:w-56 xl:w-60" feature={true} />
            </div>
            <div className="flex justify-center pt-14">
                <button 
                    type="button" 
                    className="h-12 w-72 flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-m px-5 py-2.5 text-center me-2 mb-2"
                    onClick={openModal}
                >
                    View Additional Benefits
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </button>
            </div>
            <AdditionalBenefitsModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};
