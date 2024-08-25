import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    gender: '',
    address: '',
    birthYear: '',
    pincode: '',
    city: '',
    state: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [restricted, setRestricted] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const tokenString = localStorage.getItem('token');
      if (!tokenString) {
        setAlert({ type: 'error', message: 'No token found' });
        setRestricted(true);
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
          phoneNumber: user.phoneNumber,
          gender: user.gender || '',
          address: user.address || '',
          birthYear: user.birthYear || '',
          pincode: user.pincode || '',
          city: user.city || '',
          state: user.state || ''
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
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const tokenString = localStorage.getItem('token');
    if (!tokenString) {
      setAlert({ type: 'error', message: 'No token found' });
      setLoading(false);
      return;
    }
  
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/users/update`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${tokenString}`
          }
        }
      );
      setAlert({ type: 'success', message: 'User details updated successfully' });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAlert({ type: 'error', message: 'Error updating user details' });
    }
  };
  

  if (restricted) {
    return <div className="text-red-500">{alert?.message}</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      {alert && <div className={`mb-4 p-3 rounded ${alert.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{alert.message}</div>}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              disabled
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <input
              type="text"
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Birth Year</label>
            <input
              type="text"
              name="birthYear"
              value={userData.birthYear}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={userData.pincode}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={userData.city}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={userData.state}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
};
