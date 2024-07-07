import { AppBar } from "../components/AppBar";
import { Footer } from "../components/Footer";

export default function Refund(){
    return(
        <>
            <AppBar/>
            <div className="mt-36 w-full h-screen">
                <h1 className="flex justify-center text-4xl font-bold">Refund/Cancellation Policy</h1>
                <p className="flex justify-center px-36 mt-6 text-xl font-semibold">You are entitled to a refund in the case of the purchased course not being assigned to you within the expiration date from your date of purchase or if you have paid twice for the same course. 
                    Under any other circumstance, we will not consider any requests for refund as this is a digital course purchase.</p>
            </div>
            <Footer/>
        </>
    )
}