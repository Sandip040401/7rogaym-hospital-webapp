import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  });
  const [isUpdated, setIsUpdated] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      const tokenString = localStorage.getItem('token');
      if (!tokenString) {
        setAlert({ type: 'error', message: 'No token found' });
        return;
      }
      const decodedToken = JSON.parse(tokenString);
      const userEmail = decodedToken.email;

      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users`, {
          params: { email: userEmail }
        });
        const user = response.data;
        setUserData({
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setAlert({ type: 'error', message: 'Error fetching user data' });
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
    setIsUpdated(true);
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/users/update`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        setIsUpdated(false);
        setAlert({ type: 'success', message: 'User data updated successfully' });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAlert({ type: 'error', message: 'Failed to update user data' });
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/send-otp`, { email: userData.email });
      if (response.status === 200) {
        setOtpSent(true);
        setAlert({ type: 'success', message: 'OTP sent successfully to email' });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAlert({ type: 'error', message: 'Failed to send OTP' });
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/verify-otp`, { email: userData.email, otp });
      if (response.status === 200) {
        setOtpVerified(true);
        setAlert({ type: 'success', message: 'OTP verified successfully' });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAlert({ type: 'error', message: 'Failed to verify OTP' });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAlert({ type: 'error', message: 'Passwords do not match' });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/users/change-password`, {
        email: userData.email,
        newPassword: passwordData.newPassword
      });
      if (response.status === 200) {
        setAlert({ type: 'success', message: 'Password changed successfully' });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAlert({ type: 'error', message: 'Failed to change password' });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center">User Details</h2>
      {alert.message && (
        <div
          className={`mb-4 p-4 rounded ${alert.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
        >
          {alert.message}
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center mb-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
        </div>
      )}
      <form onSubmit={handleUpdate}>
        {['name', 'email', 'phoneNumber'].map((key) => (
          <div key={key} className="mb-6">
            <label htmlFor={key} className="block text-gray-800 font-medium mb-2">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={userData[key]}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent ${['email', 'phoneNumber', 'name'].includes(key) ? 'bg-gray-200 cursor-not-allowed' : ''}`}
              disabled={['email', 'phoneNumber', 'name'].includes(key)}
            />
          </div>
        ))}
        {isUpdated && (
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-150"
          >
            Update
          </button>
        )}
      </form>
      {!otpSent ? (
        <button
          onClick={handleSendOtp}
          className="w-full py-3 px-6 mt-6 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-150"
        >
          Send OTP to Change Password
        </button>
      ) : (
        <>
          {!otpVerified ? (
            <div className="mt-6">
              <label htmlFor="otp" className="block text-gray-800 font-medium mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              />
              <button
                onClick={handleVerifyOtp}
                className="w-full py-3 px-6 mt-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition duration-150"
              >
                Verify OTP
              </button>
            </div>
          ) : (
            <form onSubmit={handleChangePassword} className="mt-6">
              <div className="mb-6">
                <label htmlFor="newPassword" className="block text-gray-800 font-medium mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-800 font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-150"
              >
                Change Password
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default Notifications;

