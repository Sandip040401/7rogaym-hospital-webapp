import { AboutUs } from "../components/AboutUs";
import { AppBar } from "../components/AppBar";
import { Banner } from "../components/Banner";
import { FAQ } from "../components/FAQ";
import { Footer } from "../components/Footer";
import { HowitWorks } from "../components/HowItWorks";
import { JoinUs } from "../components/JoinUs";
import { OurPartners } from "../components/OurPartners";
import PlansHome from "../components/PlansHome";
import { Services } from "../components/Services";
import { Gallery } from '../components/Gallery';
import Testimonials from "../components/Testimonials";


export default function LandingPage(){
    return(
        <>
            <AppBar/>
            <Banner/>
            <Services/>
            <HowitWorks/>
            <OurPartners/>
            <div className="flex justify-center font-bold text-4xl mt-12">
                Our Plans
            </div>
            <PlansHome/>
            <Gallery/>
            <Testimonials/>
            <JoinUs/>
            <AboutUs/>
            <FAQ/>
            <Footer/>
        </>
    )
}