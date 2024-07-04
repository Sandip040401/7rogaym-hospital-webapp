import React, { useState } from 'react';
import { BannerCards } from "./BannerCards";
import { AdditionalBenefitsModal } from "./AdditionalBenefitsModal";

export const Services = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const servicesData1 = [
        {
            imageSrc: "https://img.icons8.com/external-outline-icons-maxicons/64/external-books-education-outline-icons-maxicons.png",
            title: "Education",
            description: "Discounts on online courses",
            color: "bg-purple-100 hover:bg-purple-200",
            circle: "bg-green-400",
            textSize: "text-2xl",
            descSize: "text-md"
        },
        {
            imageSrc: "https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/external-travel-travel-kiranshastry-lineal-kiranshastry.png",
            title: "Travel",
            description: "Exclusive travel deals",
            color: "bg-red-100 hover:bg-red-200",
            circle: "bg-green-400",
            textSize: "text-2xl",
            descSize: "text-md"
        },
        {
            imageSrc: "https://img.icons8.com/external-flat-juicy-fish/64/external-food-food-and-drink-flat-flat-juicy-fish.png",
            title: "Food",
            description: "Discounts at top restaurants",
            color: "bg-orange-100 hover:bg-orange-200",
            circle: "bg-green-400",
            textSize: "text-2xl",
            descSize: "text-md"
        },
        {
            imageSrc: "https://img.icons8.com/external-flat-juicy-fish/64/external-food-food-and-drink-flat-flat-juicy-fish.png",
            title: "Food",
            description: "Discounts at top restaurants",
            color: "bg-orange-100 hover:bg-orange-200",
            circle: "bg-green-400",
            textSize: "text-2xl",
            descSize: "text-md"
        }
    ];

    const servicesData2 = [
        {
            imageSrc: "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/external-medicines-health-and-medical-flatart-icons-lineal-color-flatarticons.png",
            title: "Medicines",
            description: "Up to 20% discount on Medicines",
            color: "bg-yellow-100 hover:bg-yellow-200",
            circle: "bg-green-400",
            textSize: "text-2xl",
            descSize: "text-md"

        },
        {
            imageSrc: "https://img.icons8.com/external-flat-juicy-fish/64/external-food-food-and-drink-flat-flat-juicy-fish.png",
            title: "Pharmacy",
            description: "Up to 25% discount on Pharmacy",
            color: "bg-blue-100 hover:bg-blue-200",
            circle: "bg-green-400",
            textSize: "text-2xl",
            descSize: "text-md"

        },
        {
            imageSrc: "https://img.icons8.com/external-flat-juicy-fish/64/external-food-food-and-drink-flat-flat-juicy-fish.png",
            title: "Health",
            description: "Free health check-ups",
            color: "bg-green-100 hover:bg-green-200",
            circle: "bg-green-400",
            textSize: "text-2xl",
            descSize: "text-md"

        },
        {
            imageSrc: "https://img.icons8.com/external-flat-juicy-fish/64/external-food-food-and-drink-flat-flat-juicy-fish.png",
            title: "Support",
            description: "24/7 Support",
            color: "bg-pink-100 hover:bg-pink-200",
            circle: "bg-green-400",
            textSize: "text-2xl",
            descSize: "text-md"

        }
    ];

    return (
        <div className="h-full w-full mt-10 bg-cyan-700 py-6">
            <div className="flex justify-center text-3xl font-bold text-white">
                <span className="flex flex-col justify-center">The</span>
                <span className="text-teal-200 text-4xl pl-2">Services</span>
                <span className="flex flex-col justify-center pl-2">We Provide</span> 
            </div>
            <div className="flex justify-center px-48">
                <BannerCards data={servicesData1} height="h-80" width="w-64" feature={true} />
            </div>
            <div className="flex justify-center px-48">
                <BannerCards data={servicesData2} height="h-80" width="w-64" feature={true} />
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
