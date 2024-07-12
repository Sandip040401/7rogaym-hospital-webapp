import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('admintoken')}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        toast.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, [baseUrl]);

  const handleLogout = () => {
    localStorage.removeItem('admintoken');
    navigate('/');
  };

  const handleEdit = (user) => {
    setEditingUser(user.email);
    setSubscriptionStatus(user.subscriptionStatus);
  };

  const handleSave = async (email) => {
    try {
      await axios.put(
        `${baseUrl}/api/admin/${email}`,
        { subscriptionStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('admintoken')}`
          }
        }
      );
      setUsers(
        users.map((user) =>
          user.email === email ? { ...user, subscriptionStatus } : user
        )
      );
      setEditingUser(null);
      toast.success('Subscription status updated successfully');
    } catch (error) {
      toast.error('Failed to update subscription status');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">Subscription Status</th>
            <th className="py-2 px-4 border-b">Selected Plan</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Birth Year</th>
            <th className="py-2 px-4 border-b">City</th>
            <th className="py-2 px-4 border-b">Gender</th>
            <th className="py-2 px-4 border-b">Pincode</th>
            <th className="py-2 px-4 border-b">State</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td className="py-2 px-4 border-b">{user.name || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.phoneNumber || 'N/A'}</td>
              <td className="py-2 px-4 border-b">
                {editingUser === user.email ? (
                  <select
                    value={subscriptionStatus}
                    onChange={(e) => setSubscriptionStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="active">active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                ) : (
                  user.subscriptionStatus || 'N/A'
                )}
              </td>
              <td className="py-2 px-4 border-b">{user.selectedPlan || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{user.address || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{user.birthYear || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{user.city || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{user.gender || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{user.pincode || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{user.state || 'N/A'}</td>
              <td className="py-2 px-4 border-b">
                {editingUser === user.email ? (
                  <>
                    <button
                      onClick={() => handleSave(user.email)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingUser(null)}
                      className="bg-gray-500 text-white px-2 py-1 rounded ml-2"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default Admin;
