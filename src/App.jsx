import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HospitalPage from "./pages/HospitalPage";


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/hospitals" element={<HospitalPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}