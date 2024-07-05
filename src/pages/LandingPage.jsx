import { AboutUs } from "../components/AboutUs";
import { AppBar } from "../components/AppBar";
import { Banner } from "../components/Banner";
import { FAQ } from "../components/FAQ";
import { Footer } from "../components/Footer";
import { HowitWorks } from "../components/HowItWorks";
import { JoinUs } from "../components/JoinUs";
import { OurPartners } from "../components/OurPartners";
import { Services } from "../components/Services";


export default function LandingPage(){
    return(
        <>
            <AppBar/>
            <Banner/>
            <Services/>
            <HowitWorks/>
            <OurPartners/>
            <JoinUs/>
            <AboutUs/>
            <FAQ/>
            <Footer/>
        </>
    )
}