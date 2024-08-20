import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AppBar } from '../components/AppBar';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [alert, setAlert] = useState(null);
  const backendUrl = import.meta.env.VITE_BASE_URL;

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAlert(null);

    try {
      const response = await fetch(`${backendUrl}/api/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = JSON.stringify(data);
        localStorage.setItem('token', token);
        setAlert({ type: 'success', message: 'Sign-in successful!' });
        window.location.href = '/dashboard';
      } else {
        const error = await response.text();
        setAlert({ type: 'error', message: 'Invalid email or password' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendOtp = async () => {
    setIsSubmitting(true);
    setAlert(null);

    try {
      const response = await axios.post(`${backendUrl}/api/users/send-otp`, { email });
      if (response.status === 200) {
        setOtpSent(true);
        setAlert({ type: 'success', message: 'OTP sent successfully to email' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to send OTP' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsSubmitting(true);
    setAlert(null);

    try {
      const response = await axios.post(`${backendUrl}/api/users/verify-otp`, { email, otp });
      if (response.status === 200) {
        setOtpVerified(true);
        setAlert({ type: 'success', message: 'OTP verified successfully' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to verify OTP' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setAlert(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAlert({ type: 'error', message: 'Passwords do not match' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.put(`${backendUrl}/api/users/change-password`, {
        email,
        newPassword: passwordData.newPassword
      });
      if (response.status === 200) {
        setAlert({ type: 'success', message: 'Password changed successfully' });
        setOtpVerified(false);
        setOtpSent(false);
        setShowResetPassword(false);
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to change password' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AppBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center">Sign In</h2>

          {alert && (
            <div className={`p-4 mb-4 text-sm text-${alert.type === 'success' ? 'green' : 'red'}-700 bg-${alert.type === 'success' ? 'green' : 'red'}-100 rounded-lg`} role="alert">
              {alert.message}
            </div>
          )}

          {!showResetPassword ? (
            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </button>
              </div>
            </form>
          ) : (
            <>
              {!otpSent ? (
                <>
                  <label htmlFor="email" className="block text-xl font-medium text-gray-700">
                    Enter your email to reset password
                  </label>
                  <input
                    type="email"
                    id="resetEmail"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  <button
                    onClick={handleSendOtp}
                    className="w-full py-3 px-6 mt-6 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-150"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                </>
              ) : (
                <>
                  {!otpVerified ? (
                    <>
                      <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mt-6">
                        Enter OTP
                      </label>
                      <input
                        type="text"
                        id="otp"
                        name="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                      <button
                        onClick={handleVerifyOtp}
                        className="w-full py-3 px-6 mt-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition duration-150"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Verifying OTP...' : 'Verify OTP'}
                      </button>
                    </>
                  ) : (
                      <form onSubmit={handleChangePassword} className="mt-6">
                        <div className="mb-6">
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              id="newPassword"
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 focus:outline-none"
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                        <div className="mb-6">
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? 'text' : 'password'}
                              id="confirmPassword"
                              name="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 focus:outline-none"
                            >
                              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="w-full py-3 px-6 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-150"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Changing Password...' : 'Change Password'}
                        </button>
                      </form>

                  )}
                </>
              )}
            </>
          )}

          {!showResetPassword && (
            <button
              onClick={() => setShowResetPassword(true)}
              className="w-full py-3 px-6 mt-6 bg-gradient-to-r from-gray-600 to-gray-500 text-white font-semibold rounded-lg shadow-md hover:from-gray-700 hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Forgot Password?
            </button>
          )}


          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
