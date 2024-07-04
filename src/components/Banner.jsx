import { BannerCards } from "./BannerCards";

export const Banner = () => {
    const servicesData = [
        {
            imageSrc: "https://img.icons8.com/external-line-colors-royyan-wijaya/64/external-doctor-medical-stuff-line-colors-royyan-wijaya.png",
            title: "Hospitals",
            description: "Up to 30% discount on OPD/IPD",
            color: "bg-blue-100 hover:bg-blue-200",
            circle: "bg-green-400",
            textSize: "text-md",
            descSize: "text-xs"
        },
        {
            imageSrc: "https://img.icons8.com/dusk/64/microscope.png",
            title: "Lab & Diagnostic Centers",
            description: "Up to 40% discount on Lab Tests & Diagnostic Centers",
            color: "bg-green-100 hover:bg-green-200",
            circle: "bg-green-400",
            textSize: "text-md",
            descSize: "text-xs"
        },
        {
            imageSrc: "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/external-medicines-health-and-medical-flatart-icons-lineal-color-flatarticons.png",
            title: "Medicines",
            description: "Up to 20% discount on Medicines",
            color: "bg-yellow-100 hover:bg-yellow-200",
            circle: "bg-green-400",
            textSize: "text-md",
            descSize: "text-xs"

        }
    ];
    return (
        <div className="h-full w-full mt-36 pl-36 ">
            <div className="flex">
                <div className="">
                    <div className="font-light text-6xl">Healthcare that</div>
                    <div className="font-semibold text-6xl mt-4">treats you right</div>
                    <div className="mt-6">
                        <button type="button" className="h-12 w-48 flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-m px-5 py-2.5 text-center me-2 mb-2">
                            Check Prices
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ml-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="pl-96 shadow-sm">
                    <img src="/healthcard.png" className="transform transition-transform duration-300 hover:rotate-3 hover:scale-105" alt="" />
                </div>
            </div>
            <BannerCards data={servicesData}/>
        </div>
    );
}
