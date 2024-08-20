import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDetailsPopup from '../components/UserDetailsPopup';

const UserManagement = ({ baseUrl, token }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [healthCards, setHealthCards] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };
    fetchUsers();
  }, [baseUrl, token]);

  const handleEdit = async (user) => {
    setSelectedUser(user);
    try {
      const response = await axios.get(`${baseUrl}/api/admin/users/${user.email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHealthCards(response.data.healthCards || []);
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching health cards', error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedUser(null);
    setHealthCards([]);
  };

  const handleInputChange = (updatedUser) => {
    setSelectedUser(updatedUser);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${baseUrl}/api/admin/users/${selectedUser.email}`,
        selectedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowPopup(false);
      // Refresh users after save
      const response = await axios.get(`${baseUrl}/api/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error saving user details', error);
    }
  };

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Phone Number</th>
            <th className="py-2 px-4 border-b text-left">Subscription Status</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email} className="hover:bg-gray-100 transition duration-150">
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.phoneNumber}</td>
              <td className="py-2 px-4 border-b">{user.subscriptionStatus}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 transition duration-150"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && selectedUser && (
        <UserDetailsPopup
          user={selectedUser}
          healthCards={healthCards}
          onClose={handleClosePopup}
          onChange={handleInputChange}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UserManagement;
