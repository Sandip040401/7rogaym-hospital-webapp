import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HospitalPage from "./pages/HospitalPage";
import Terms from "./pages/Terms";
import Policy from "./pages/Policy";
import Refund from "./pages/Refund";


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
        </Routes>
      </BrowserRouter>
    </>
  )
}