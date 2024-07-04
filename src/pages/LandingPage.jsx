import { AppBar } from "../components/AppBar";
import { Banner } from "../components/Banner";
import { HowitWorks } from "../components/HowItWorks";
import { Services } from "../components/Services";


export default function LandingPage(){
    return(
        <>
            <AppBar/>
            <Banner/>
            <Services/>
            <HowitWorks/>
        </>
    )
}