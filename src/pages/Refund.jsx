import { AppBar } from "../components/AppBar";
import { Footer } from "../components/Footer";

export default function Refund() {
    return (
        <>
            <AppBar />
            <div className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 min-h-screen flex items-center justify-center">
                <div className="bg-white p-10 rounded-xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 transform transition-all duration-500 hover:scale-105">
                    <h1 className="text-center text-4xl font-bold mb-6 text-gray-800">Refund/Cancellation Policy</h1>
                    <p className="text-center text-xl font-semibold text-gray-600">
                        You are entitled to a refund in the case of the purchased course not being assigned to you within the expiration date from your date of purchase or if you have paid twice for the same course.
                        Under any other circumstance, we will not consider any requests for refund as this is a digital course purchase.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    )
}
