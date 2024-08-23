import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faIdCard, faHospital } from '@fortawesome/free-solid-svg-icons';

export const HowitWorks = () => {
    return (
        <div className="pt-10 h-full w-full bg-emerald-100 px-10 lg:px-20 pb-10 lg:pb-16">
            <div className="flex justify-center text-3xl font-bold text-black mb-8">
                <div className="text-5xl text-emerald-600">How</div>
                <div className="flex flex-col justify-center ml-2">it</div>
                <div className="text-5xl ml-2 text-emerald-600">Works</div>
            </div>
            <div className="container mx-auto pt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="flex justify-center md:justify-end items-center">
                        <FontAwesomeIcon icon={faUserPlus} size="6x" className="text-emerald-600 lg:mr-8" />
                    </div>
                    <div className="flex justify-center md:justify-start items-center text-lg">
                        <p className="bg-white p-6 rounded-lg shadow-lg">
                            <span className="text-xl font-bold text-emerald-600">Becoming a member</span> is 
                            <span className="text-xl font-bold"> super easy</span> and
                            <span className="text-xl font-bold"> affordable</span>. 
                            Simply click on <a href="/plans" className="text-xl font-bold">JOIN NOW</a>, provide some basic information, and pay online through any mode. Alternatively, you can ask one of our <span className="text-xl font-bold text-emerald-600">field executives</span> in your area to assist you.
                            <a href="/plans">
                            <button type="button" className="mt-4 text-white bg-blue-700 hover:text-white border border-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center">
                                JOIN NOW
                            </button>
                        </a>
                        </p>

                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="order-2 md:order-1 flex justify-center md:justify-end items-center text-lg">
                        <p className="bg-white p-6 rounded-lg shadow-lg">
                            After payment, you will receive a confirmation through SMS, WhatsApp, or email. Within 24 hours, you will get a link to download your <span className="text-xl font-bold text-emerald-600">Digital Aarogya Bharat Health Card™</span>. If you opt for a physical card, it will be delivered to your address by one of our field executives. Once you have a health card, either digital or physical, you can start using it <span className="text-xl font-bold">immediately</span>.
                        </p>
                    </div>
                    <div className="order-1 md:order-2 flex justify-center md:justify-start items-center">
                        <img src="/cardfront.png" className='h-60 rounded-3xl' alt="Digital Health Card" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="flex justify-center md:justify-end items-center">
                        <img src="/hospitalcard.png" className='h-72 rounded-3xl' alt="Hospital Card" />
                    </div>
                    <div className="flex justify-center md:justify-start items-center text-lg">
                        <p className="bg-white p-6 rounded-lg shadow-lg">
                            When you visit a network hospital or healthcare provider, simply present your health card at the time of billing to receive a discount of up to <span className="text-xl font-bold text-emerald-600">30%</span>. You can use your health card as often as you need to access healthcare services. <span className="text-xl font-bold text-emerald-600">NO LIMITS, NO RESTRICTIONS!!</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
