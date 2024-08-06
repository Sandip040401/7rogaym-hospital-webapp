import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import HealthCard from '../components/HealthCard';
import PremiumHealthCard from '../components/PremiumHealthCard';
import BackCard from '../components/BackCard';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [healthCards, setHealthCards] = useState([]);
  const [showHealthCards, setShowHealthCards] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingCards, setLoadingCards] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const cardRefs = useRef([]);

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
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [baseUrl]);

  useEffect(() => {
    if (selectedUser) {
      setLoadingCards(true);
      const fetchHealthCards = async () => {
        try {
          const response = await axios.get(`${baseUrl}/api/admin/users/${selectedUser.email}/members`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('admintoken')}`
            }
          });
          setHealthCards(response.data);
        } catch (error) {
          toast.error('Failed to fetch health cards');
        } finally {
          setLoadingCards(false);
        }
      };

      fetchHealthCards();
    }
  }, [selectedUser, baseUrl]);

  const handleLogout = () => {
    localStorage.removeItem('admintoken');
    navigate('/');
  };

  const handleEdit = (user) => {
    setEditingUser(user.email);
    setSubscriptionStatus(user.subscriptionStatus);
    setSelectedUser(user);
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDownload = async () => {
    const scale = 6;

    for (let index = 0; index < healthCards.length; index++) {
      const cardElement = cardRefs.current[index];

      await document.fonts.ready;
      const canvas = await html2canvas(cardElement, {
        scale: scale,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width / scale;
      const imgHeight = canvas.height / scale;

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: [imgWidth, imgHeight],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      pdf.save(`${healthCards[index].name}_card.pdf`);
    }
  };

  if (loadingUsers) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-150">
          Logout
        </button>
      </div>
      <div className="overflow-x-auto overflow-y-auto max-h-80 mb-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {['Name', 'Email', 'Phone Number', 'Subscription Status', 'Selected Plan', 'Last Payment Date', 'Last Payment Amount', 'Address', 'Birth Year', 'City', 'Gender', 'Pincode', 'State', 'Actions'].map((header) => (
                <th key={header} className="py-2 px-4 border-b text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email} className="hover:bg-gray-100 transition duration-150">
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
                <td className="py-2 px-4 border-b">{user.lastPaymentDate ? formatDate(user.lastPaymentDate) : 'N/A'}</td>
                <td className="py-2 px-4 border-b">{user.lastPaymentAmount || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{user.address || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{user.birthYear || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{user.city || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{user.gender || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{user.pincode || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{user.state || 'N/A'}</td>
                <td className="py-2 px-4 border-b">
                  {editingUser === user.email ? (
                    <div className='flex'>
                      <button
                        onClick={() => handleSave(user.email)}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700 transition duration-150"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className="bg-gray-500 text-white px-2 py-1 rounded ml-2 hover:bg-gray-700 transition duration-150"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 transition duration-150"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <div className="mt-6">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-bold mr-4">Health Cards for {selectedUser.name}</h2>
            <button
              onClick={() => setShowHealthCards(!showHealthCards)}
              className={`px-4 py-2 rounded transition duration-150 ${showHealthCards ? 'bg-red-500 text-white hover:bg-red-700' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
            >
              {showHealthCards ? 'Hide Cards' : 'Show Cards'}
            </button>
            {showHealthCards && (
              <button
                onClick={handleDownload}
                className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-150"
              >
                Download Cards
              </button>
            )}
          </div>
          {showHealthCards && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              {loadingCards ? (
                <div>Loading health cards...</div>
              ) : (
                healthCards.map((member, index) => (
                  <div key={member._id} ref={(el) => (cardRefs.current[index] = el)} className="mb-6" id={`card-${member._id}`}>
                    {selectedUser.selectedPlan.includes('Solo') ? (
                      <div className='flex'>
                        <PremiumHealthCard member={member} />
                        <BackCard member={member} />
                      </div>
                    ) : (
                      <div className='flex'>
                        <HealthCard member={member} />
                        <BackCard member={member} />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Admin;
