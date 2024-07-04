import React from 'react';

export const HowitWorks = () => {
    return (
        <div className="pt-10 h-full w-full bg-emerald-100 px-20 pb-16">
            <div className="flex justify-center text-3xl font-bold text-black mb-8">
                <div className="text-5xl text-emerald-600">How</div>
                <div className="flex flex-col justify-center ml-2">it</div>
                <div className="text-5xl ml-2 text-emerald-600">Works</div>
            </div>
            <div className="container mx-auto pt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="flex justify-center md:justify-end items-center">
                        <img src="path/to/your/image1.jpg" alt="Step 1" className="w-3/4 rounded-lg shadow-lg" />
                    </div>
                    <div className="flex justify-center md:justify-start items-center text-lg">
                        <p className="bg-white p-6 rounded-lg shadow-lg">
                            <span className="text-xl font-bold text-emerald-600">Becoming a member</span> is <span className="text-xl font-bold">super easy</span> and <span className="text-xl font-bold">affordable</span>. Simply visit our registration page and provide us with some basic information or you can just ask one of our <span className="text-xl font-bold text-emerald-600">field executives</span>.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="order-2 md:order-1 flex justify-center md:justify-end items-center text-lg">
                        <p className="bg-white p-6 rounded-lg shadow-lg">
                            After submitting the details, you will receive your <span className="text-xl font-bold text-emerald-600">7R Arogym Health Card™</span> on WhatsApp. You can print it out later. Once you have a health card, either <span className="text-xl font-bold">digital</span> or <span className="text-xl font-bold">physical</span>, you can start using it <span className="text-xl font-bold">immediately</span>.
                        </p>
                    </div>
                    <div className="order-1 md:order-2 flex justify-center md:justify-start items-center">
                        <img src="path/to/your/image2.jpg" alt="Step 2" className="w-3/4 rounded-lg shadow-lg" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="flex justify-center md:justify-end items-center">
                        <img src="path/to/your/image3.jpg" alt="Step 3" className="w-3/4 rounded-lg shadow-lg" />
                    </div>
                    <div className="flex justify-center md:justify-start items-center text-lg">
                        <p className="bg-white p-6 rounded-lg shadow-lg">
                            When you visit a registered hospital or healthcare provider, simply present your health card at the time of service to receive the <span className="text-xl font-bold text-emerald-600">discounted rate</span>. You can use your health card as often as you need to access healthcare services. <span className="text-xl font-bold text-emerald-600">NO RESTRICTIONS!!</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
