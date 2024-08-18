import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HospitalPage from './pages/HospitalPage';
import Terms from './pages/Terms';
import Policy from './pages/Policy';
import Refund from './pages/Refund';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Plans from './pages/Plans';
import Payment from './components/Payment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from './pages/AdminLogin';
import { AuthProvider } from './AuthContext';
import ProtectedRoute, { SubscriptionProtectedRoute } from './ProtectedRoute';
import Admin from './pages/Admin';
import { Card } from './pages/Card';
import ScrollToTop from './ScrollToTop';
import AdminDashboard from './pages/AdminDashboard';
import { Gallery } from './components/Gallery';
import UserForm from './pages/UserForm';

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ScrollToTop/>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/hospitals" element={<HospitalPage />} />
                    <Route path="/tnc" element={<Terms />} />
                    <Route path="/privacy-policy" element={<Policy />} />
                    <Route path="/refund" element={<Refund />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/dashboard"
                        element={
                            // <SubscriptionProtectedRoute>
                                <Dashboard />
                            // </SubscriptionProtectedRoute>
                        }
                    />
                    <Route path="/plans" element={<Plans />} />
                    <Route path="/card" element={<Card />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/loading" element={<AdminDashboard />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/user-form" element={<UserForm />} />
                    <Route
                        path="/admin-dashboard"
                        element={
                            // <ProtectedRoute>
                                <Admin />
                            // </ProtectedRoute>
                        }
                    />
                </Routes>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </BrowserRouter>
        </AuthProvider>
    );
}
