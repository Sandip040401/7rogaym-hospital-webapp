import { BannerCards } from "./BannerCards";

export const Banner = () => {
    const servicesData = [
        {
            imageSrc: "https://img.icons8.com/external-line-colors-royyan-wijaya/64/external-doctor-medical-stuff-line-colors-royyan-wijaya.png",
            title: "Hospitals",
            description: "Up to 30% discount on OPD/IPD",
            color: "bg-blue-100 hover:bg-blue-200",
            textSize: "text-md",
            descSize: "text-xs"
        },
        {
            imageSrc: "https://img.icons8.com/dusk/64/microscope.png",
            title: "Lab & Diagnostic Centers",
            description: "Up to 40% discount on Lab Tests & Diagnostic Centers",
            color: "bg-green-100 hover:bg-green-200",
            textSize: "text-md",
            descSize: "text-xs"
        },
        {
            imageSrc: "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/external-medicines-health-and-medical-flatart-icons-lineal-color-flatarticons.png",
            title: "Medicines",
            description: "Up to 20% discount on Medicines",
            color: "bg-yellow-100 hover:bg-yellow-200",
            textSize: "text-md",
            descSize: "text-xs"
        }
    ];
    
    return (
        <div className="bg-[url('/background.jpg')] bg-no-repeat bg-cover pb-10 h-full w-full pt-10 mt-14 md:mt-24 px-6 md:px-36">
            <div className="flex flex-col md:flex-row">
                <div className="flex flex-col justify-center md:items-start">
                    <div className="font-normal text-4xl md:text-5xl">Healthcare that</div>
                    <div className="font-semibold text-4xl md:text-6xl mt-4">treats you right</div>
                    <div className="lg:mt-6 mt-16">
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfwJAwVYuB0aW5Wiyfrc5uoayvlw6OxRyVOlhgpeGbYyvRU2A/viewform"><button type="button" className="h-12 w-full md:w-48 flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-m px-5 py-2.5 text-center mb-2">
                            Check Prices
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ml-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </button></a>
                    </div>
                </div>
                <div className="flex justify-center md:pl-96  mt-12 lg:mt-8 md:mt-0">
                    <img src="/healthcard.png" className="transform transition-transform duration-300 hover:rotate-3 hover:scale-105" alt="Health Card" />
                </div>
            </div>
            <div className="mt-2 md:mt-20">
                <BannerCards data={servicesData} />
            </div>
        </div>
    );
}
