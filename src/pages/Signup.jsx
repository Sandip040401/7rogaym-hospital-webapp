import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppBar } from '../components/AppBar';
import { Footer } from '../components/Footer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Spinner component
const Spinner = () => (
    <div className="w-5 h-5 border-4 border-t-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
);

export default function Signup() {
    const [form, setForm] = useState({
        phoneNumber: '',
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        otp: ''
    });
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const [loading, setLoading] = useState(false); // State for loading spinner
    const [passwordStrength, setPasswordStrength] = useState({ text: '', color: 'red' });
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [userExists, setUserExists] = useState(false); // State for user existence
    const backendUrl = import.meta.env.VITE_BASE_URL;
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        let timer;
        if (otpSent && otpTimer > 0) {
            timer = setInterval(() => {
                setOtpTimer(prev => prev - 1);
            }, 1000);
        } else if (otpTimer === 0) {
            setOtpSent(false); // Reset OTP sent state
        }
        return () => clearInterval(timer);
    }, [otpSent, otpTimer]);

    useEffect(() => {
        // Reset OTP and timer if email changes
        if (otpSent) {
            setOtpSent(false);
            setOtpTimer(0);
        }
    }, [form.email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => {
            const newForm = {
                ...prevForm,
                [name]: value
            };
    
            // Check password strength and email validity
            if (name === 'password') {
                evaluatePasswordStrength(value);
            }
            if (name === 'email') {
                validateEmail(value);
            }
    
            // Check if passwords match
            if (newForm.password && newForm.confirmPassword) {
                setPasswordsMatch(newForm.password === newForm.confirmPassword);
            }
    
            return newForm;
        });
    };
    
    const evaluatePasswordStrength = (password) => {
        let strength = { text: '', color: 'red' };
        if (password.length > 0 && password.length < 6) {
            strength = { text: 'Too weak', color: 'red' };
        } else if (password.length >= 6 && password.length < 8) {
            strength = { text: 'Weak', color: 'orange' };
        } else if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
            strength = { text: 'Strong', color: 'green' };
        } else if (password.length >= 8) {
            strength = { text: 'Moderate', color: 'yellow' };
        }
        setPasswordStrength(strength);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(email));
    };

    const checkUserExists = async (email) => {
        const response = await fetch(`${backendUrl}/api/users/check`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            toast.error('Error checking user existence');
            return false;
        }

        const data = await response.json();
        return data.exists; // Adjust based on your API response structure
    };

    const handleSendOtp = async () => {
        // Check if user exists
        const exists = await checkUserExists(form.email);
        if (exists) {
            toast.error('User already exists');
            return;
        }

        setLoading(true); // Show spinner
        const response = await fetch(`${backendUrl}/api/users/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: form.email }),
        });

        setLoading(false); // Hide spinner

        if (!response.ok) {
            toast.error('Error sending OTP');
            return;
        }

        setOtpSent(true); // Show OTP input and timer
        setOtpTimer(60); // Start timer
        toast.success('OTP sent successfully');
    };

    const handleVerifyOtp = async () => {
        const response = await fetch(`${backendUrl}/api/users/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: form.email, otp: form.otp }),
        });

        if (response.ok) {
            setOtpVerified(true);
            toast.success('OTP verified successfully');
        } else {
            toast.error('Invalid or expired OTP');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otpVerified) {
            toast.error('Please verify OTP');
            return;
        }

        const response = await fetch(`${backendUrl}/api/users/submit-form`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            toast.success('Form submitted successfully');
            window.location.href = '/signin'; // Replace with your desired URL
        } else {
            const error = await response.text();
            toast.error(`Error: ${error}`);
        }
    };

    return (
        <>
        <AppBar />
        <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-20 py-12">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="flex items-center">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                placeholder='example@gmail.com'
                                onChange={handleChange}
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                disabled={otpVerified}
                            />
                            {otpVerified && (
                                <span className="ml-2 text-green-500">✔</span>
                            )}
                        </div>
                        {!otpVerified && isEmailValid && (
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    className="mt-2 px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    disabled={otpSent || loading}
                                >
                                    { otpSent ? `Resend OTP in ${otpTimer}s` : 'Send OTP'}
                                </button>
                                {loading && (
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <Spinner />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {!otpVerified && (
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                                Enter OTP
                            </label>
                            <input
                                type="text"
                                id="otp"
                                name="otp"
                                value={form.otp}
                                onChange={handleChange}
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                disabled={!otpSent} // Disabled until OTP is sent
                            />
                            {(otpSent && !otpVerified) && (
                                <div className="flex items-center mt-2">
                                    <button
                                        type="button"
                                        onClick={handleVerifyOtp}
                                        className="px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        disabled={!form.otp}
                                    >
                                        Verify OTP
                                    </button>
                                    {!otpVerified && otpTimer === 0 && (
                                        <button
                                            type="button"
                                            onClick={handleSendOtp}
                                            className="ml-4 px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Resend OTP
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="1234567890"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            disabled={!otpVerified}
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            placeholder='Enter name'
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            disabled={!otpVerified}
                        />
                    </div>

                    <div className="relative">
    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Password
    </label>
    <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
        <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder='Enter Password'
            value={form.password}
            onChange={handleChange}
            className={`flex-1 px-3 py-2 mt-1 focus:outline-none focus:ring-${passwordStrength.color}-500 focus:border-${passwordStrength.color}-500`}
            disabled={!otpVerified}
        />
        {otpVerified && (
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center px-3 py-2 text-gray-500 focus:outline-none"
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
        )}
    </div>
    {form.password && (
        <p className={`mt-1 text-sm font-medium text-${passwordStrength.color}-500`}>
            {passwordStrength.text}
        </p>
    )}
                    </div>

                    <div className="relative mt-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder='Confirm password'
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="flex-1 px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                disabled={!otpVerified}
                            />
                            {otpVerified && (
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="flex items-center px-3 py-2 text-gray-500 focus:outline-none"
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            )}
                        </div>
                        {!passwordsMatch && form.password && form.confirmPassword && (
                            <p className="mt-1 text-sm font-medium text-red-500">Passwords do not match</p>
                        )}
                        {passwordsMatch && form.password && form.confirmPassword && (
                            <p className="mt-1 text-sm font-medium text-green-500">Passwords match</p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={!otpVerified}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}
