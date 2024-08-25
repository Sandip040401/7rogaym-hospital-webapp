import { Link } from "react-router-dom";
import { BannerCards } from "./BannerCards";

export const Banner = () => {
    const servicesData = [
        {
            imageSrc: "https://img.icons8.com/external-line-colors-royyan-wijaya/64/external-doctor-medical-stuff-line-colors-royyan-wijaya.png",
            title: "Hospitals",
            description: "Up to 30% discount on OPD/IPD",
            color: "bg-blue-100 hover:bg-blue-200",
        },
        {
            imageSrc: "https://img.icons8.com/dusk/64/microscope.png",
            title: "Lab & Diagnostic Centers",
            description: "Up to 40% discount on Lab Tests & Diagnostic Centers",
            color: "bg-green-100 hover:bg-green-200",
        },
        {
            imageSrc: "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/external-medicines-health-and-medical-flatart-icons-lineal-color-flatarticons.png",
            title: "Medicines",
            description: "Up to 20% discount on Medicines",
            color: "bg-yellow-100 hover:bg-yellow-200",
        },
    ];

    return (
        <div className="bg-[url('/background.jpg')] bg-no-repeat bg-cover pb-10 h-full w-full pt-14 mt-20 px-6 md:px-36">
            <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col justify-center items-center lg:items-start">
                    <h1 className="font-normal  text-5xl xl:text-6xl text-center md:text-left">Healthcare that</h1>
                    <h2 className="font-semibold text-3xl lg:text-3xl xl:text-6xl mt-2 text-center md:text-left">treats you right</h2>
                    <div className="mt-6 md:mt-16">
                        <Link to="/plans">
                            <button className="h-12 w-full md:w-48 flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full px-5 py-2.5 mb-2">
                                Check Prices
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25m11.25 0v11.25" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center mt-12 lg:mt-8 lg:pl-44 xl:pl-96">
                    <div className="relative h-60 w-68 md:w-auto rounded-xl perspective">
                        <img src="/cardfront.png" className="h-full w-full rounded-xl transform transition-transform duration-300 hover:rotate-y-180" alt="Health Card Front" />
                        <img src="/cardback.png" className="absolute top-0 left-0 h-full w-full rounded-xl transform rotate-y-180 transition-transform duration-300 opacity-0 hover:opacity-100" alt="Health Card Back" />
                    </div>
                </div>
            </div>
            <div className="hidden lg:block mt-12">
                <BannerCards data={servicesData} />
            </div>
        </div>
    );
};
