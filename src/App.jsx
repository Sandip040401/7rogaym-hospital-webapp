import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HospitalPage from "./pages/HospitalPage";
import Terms from "./pages/Terms";
import Policy from "./pages/Policy";
import Refund from "./pages/Refund";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Payment from "./components/Payment";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/hospitals" element={<HospitalPage/>}/>
          <Route path="/tnc" element={<Terms/>}/>
          <Route path="/privacy-policy" element={<Policy/>}/>
          <Route path="/refund" element={<Refund/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/plans" element={<Plans/>}/>
          <Route path="/payment" element={<Payment/>}/>
        </Routes>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </BrowserRouter>
    </>
  )
}
