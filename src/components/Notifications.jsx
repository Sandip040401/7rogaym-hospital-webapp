import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  useEffect(() => {
    const fetchUserData = async () => {
      const tokenString = localStorage.getItem('token');
      if (!tokenString) {
        console.error('No token found');
        return;
      }
      const decodedToken = JSON.parse(tokenString);
      const userEmail = decodedToken.email;

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
      } catch (error) {
        console.error('Error fetching user data', error);
        toast.error('Error fetching user data');
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
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/users/update`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        setIsUpdated(false);
        toast.success('User data updated successfully');
      }
    } catch (error) {
      console.error('Error updating user data', error);
      toast.error('Failed to update user data');
    }
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/send-otp`, { email: userData.email });
      if (response.status === 200) {
        setOtpSent(true);
        toast.success('OTP sent successfully to email');
      }
    } catch (error) {
      console.error('Error sending OTP', error);
      toast.error('Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/verify-otp`, { email: userData.email, otp });
      if (response.status === 200) {
        setOtpVerified(true);
        toast.success('OTP verified successfully');
      }
    } catch (error) {
      console.error('Error verifying OTP', error);
      toast.error('Failed to verify OTP');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/users/change-password`, {
        email: userData.email,
        newPassword: passwordData.newPassword
      });
      if (response.status === 200) {
        toast.success('Password changed successfully');
      }
    } catch (error) {
      console.error('Error changing password', error);
      toast.error('Failed to change password');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center">User Details</h2>
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
      <ToastContainer />
    </div>
  );
};

export default Notifications;
