import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const backendUrl = import.meta.env.VITE_BASE_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success('Login successful');
            navigate('/admin-dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        setIsForgotPassword(true);
        setError('');
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${backendUrl}/api/admin/send-otp`, { email });
            setOtpSent(true);
            toast.success('OTP sent successfully');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to send OTP');
            toast.error(error.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${backendUrl}/api/admin/verify-otp`, { email, otp });
            setOtpVerified(true);
            toast.success('OTP verified successfully');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to verify OTP');
            toast.error(error.response?.data?.message || 'Failed to verify OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            toast.error('Passwords do not match');
            return;
        }
        setLoading(true);
        try {
            await axios.post(`${backendUrl}/api/admin/update-password`, { email, newPassword, confirmNewPassword });
            toast.success('Password updated successfully');
            navigate('/admin');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update password');
            toast.error(error.response?.data?.message || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isForgotPassword ? (otpVerified ? 'Update Password' : 'Forgot Password') : 'Admin Login'}
                </h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={isForgotPassword ? (otpVerified ? handleUpdatePassword : (otpSent ? handleVerifyOtp : handleSendOtp)) : handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {isForgotPassword ? (
                        otpVerified ? (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmNewPassword">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmNewPassword"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </>
                        ) : (
                            otpSent && (
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
                                        OTP
                                    </label>
                                    <input
                                        type="text"
                                        id="otp"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                    />
                                </div>
                            )
                        )
                    ) : (
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={loading}
                        >
                            {isForgotPassword ? (otpVerified ? 'Update Password' : (otpSent ? 'Verify OTP' : 'Send OTP')) : 'Sign In'}
                        </button>
                        {!isForgotPassword && (
                            <button
                                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                onClick={handleForgotPassword}
                            >
                                Forgot Password?
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
