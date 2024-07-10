import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
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
  const [isUpdated, setIsUpdated] = useState(false);

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
          phoneNumber: user.phoneNumber,
          gender: user.gender || '',
          address: user.address || '',
          birthYear: user.birthYear || '',
          pincode: user.pincode || '',
          city: user.city || '',
          state: user.state || ''
        });
      } catch (error) {
        console.error('Error fetching user data', error);
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
        alert('User data updated successfully');
      }
    } catch (error) {
      console.error('Error updating user data', error);
      alert('Failed to update user data');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center">User Details</h2>
      <form onSubmit={handleUpdate}>
        {Object.keys(userData).map((key) => (
          key !== 'gender' ? (
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
          ) : (
            <div key={key} className="mb-6">
              <label htmlFor={key} className="block text-gray-800 font-medium mb-2">
                Gender
              </label>
              <select
                id={key}
                name={key}
                value={userData[key]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
          )
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
    </div>
  );
};

export default Home;
