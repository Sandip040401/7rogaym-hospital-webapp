import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // To toggle password visibility
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(''); // For password strength meter
    const [showNewPassword, setShowNewPassword] = useState(false); // To toggle new password visibility
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const backendUrl = import.meta.env.VITE_BASE_URL;

    // Password Strength Check
    const checkPasswordStrength = (password) => {
        if (password.length < 6) return 'Weak';
        if (password.length >= 6 && password.length < 10) return 'Medium';
        if (password.length >= 10) return 'Strong';
        return '';
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await login(email, password);
            setSuccess('Login successful');
            navigate('/admin-dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordStrength(checkPasswordStrength(e.target.value));
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
        setPasswordStrength(checkPasswordStrength(e.target.value));
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        setIsForgotPassword(true);
        setError('');
        setSuccess('');
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await axios.post(`${backendUrl}/api/admin/send-otp`, { email });
            setOtpSent(true);
            setSuccess('OTP sent successfully');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await axios.post(`${backendUrl}/api/admin/verify-otp`, { email, otp });
            setOtpVerified(true);
            setSuccess('OTP verified successfully');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to verify OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await axios.post(`${backendUrl}/api/admin/update-password`, { email, newPassword });
            setSuccess('Password updated successfully');
            navigate('/admin');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update password');
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
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error! </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Success! </strong>
                        <span className="block sm:inline">{success}</span>
                    </div>
                )}
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
    <div className="mb-4 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
            New Password
        </label>
        <div className="relative">
            <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center top-1/2 transform -translate-y-1/2 cursor-pointer">
                {showNewPassword ? (
                    <FaEyeSlash onClick={() => setShowNewPassword(!showNewPassword)} />
                ) : (
                    <FaEye onClick={() => setShowNewPassword(!showNewPassword)} />
                )}
            </div>
        </div>
        <p className={`mt-2 text-sm ${passwordStrength === 'Weak' ? 'text-red-500' : passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
            {passwordStrength && `Password Strength: ${passwordStrength}`}
        </p>
    </div>
    <div className="mb-4 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmNewPassword">
            Confirm New Password
        </label>
        <div className="relative">
            <input
                type={showNewPassword ? 'text' : 'password'}
                id="confirmNewPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center top-1/2 transform -translate-y-1/2 cursor-pointer">
                {showNewPassword ? (
                    <FaEyeSlash onClick={() => setShowNewPassword(!showNewPassword)} />
                ) : (
                    <FaEye onClick={() => setShowNewPassword(!showNewPassword)} />
                )}
            </div>
        </div>
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
<div className="mb-6 relative">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
    </label>
    <div className="relative">
        <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={handlePasswordChange}
            required
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
            {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
            ) : (
                <FaEye onClick={() => setShowPassword(!showPassword)} />
            )}
        </div>
    </div>
</div>




                    )}
                    <div className="flex items-center justify-between">
                        <button
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : isForgotPassword ? (otpVerified ? 'Update Password' : (otpSent ? 'Verify OTP' : 'Send OTP')) : 'Login'}
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
