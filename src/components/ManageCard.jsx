import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    emergencyNumber: '',
    age: '',
    relation: '',
    bloodGroup: '',
    allergies: '',
    preExistingIllness: '',
    abhaId: ''
  });

  const [members, setMembers] = useState([]);
  const [planDetails, setPlanDetails] = useState({ planName: '', amount: 0 });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingFormData, setEditingFormData] = useState(null);

  useEffect(() => {
    const fetchPlanDetails = async () => {
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
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPlanDetails({
          planName: response.data.selectedPlan,
          amount: response.data.lastPaymentAmount
        });
      } catch (error) {
        console.error('Error fetching plan details:', error);
      }
    };

    const fetchMembers = async () => {
      const tokenString = localStorage.getItem('token');
      if (!tokenString) {
        console.error('No token found');
        return;
      }
      const decodedToken = JSON.parse(tokenString);
      const userEmail = decodedToken.email;
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/members`, {
          params: { email: userEmail }
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchPlanDetails();
    fetchMembers();
  }, []);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddMember = async () => {
    try {
      const tokenString = localStorage.getItem('token');
      if (!tokenString) {
        console.error('No token found');
        return;
      }
      const decodedToken = JSON.parse(tokenString);
      const userEmail = decodedToken.email;

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/members`, { ...formData, email: userEmail }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMembers([...members, response.data]);
      setFormData({
        name: '',
        emergencyNumber: '',
        age: '',
        relation: '',
        bloodGroup: '',
        allergies: '',
        preExistingIllness: '',
        abhaId: ''
      });
      toast.success('Member added successfully');
    } catch (error) {
      console.error('Error adding member:', error);
      toast.error('Failed to add member');
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditingFormData(members[index]);
  };

  const handleEditChange = (e) => {
    setEditingFormData({
      ...editingFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveEdit = async (index) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/members/${editingFormData._id}`, editingFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const updatedMembers = [...members];
      updatedMembers[index] = response.data;
      setMembers(updatedMembers);
      setEditingIndex(null);
      setEditingFormData(null);
      toast.success('Member updated successfully');
    } catch (error) {
      console.error('Error saving edited member:', error);
      toast.error('Failed to update member');
    }
  };

  const handleDelete = async (memberId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/members/${memberId}`);
      const updatedMembers = members.filter(member => member._id !== memberId);
      setMembers(updatedMembers);
      toast.success('Member deleted successfully');
    } catch (error) {
      console.error('Error deleting member:', error);
      toast.error('Failed to delete member');
    }
  };

  const planMemberLimits = {
    'Solo Lite': 1,
    'Solo': 1,
    'Solo Premium': 1,
    'Couple': 2,
    'Family': 4,
    'Family+': 6
  };

  const maxMembers = planMemberLimits[planDetails.planName] || 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-2">Selected Plan</h2>
        <p className="text-lg mb-4">{planDetails.planName} ₹{planDetails.amount}</p>
        <h3 className="text-lg font-medium mb-4">Member Added {members.length}/{maxMembers}</h3>

        <form className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleFormChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="emergencyNumber"
            placeholder="Emergency Number"
            value={formData.emergencyNumber}
            onChange={handleFormChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleFormChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="relation"
            placeholder="Relation"
            value={formData.relation}
            onChange={handleFormChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="bloodGroup"
            placeholder="Blood Group"
            value={formData.bloodGroup}
            onChange={handleFormChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="allergies"
            placeholder="Allergies"
            value={formData.allergies}
            onChange={handleFormChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="preExistingIllness"
            placeholder="Pre-existing Illness"
            value={formData.preExistingIllness}
            onChange={handleFormChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="abhaId"
            placeholder="ABHA ID"
            value={formData.abhaId}
            onChange={handleFormChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={handleAddMember}
            className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Member
          </button>
        </form>

        <h3 className="text-xl font-medium mt-6">Members</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Emergency Number</th>
                <th className="py-2 px-4 border-b">Age</th>
                <th className="py-2 px-4 border-b">Relation</th>
                <th className="py-2 px-4 border-b">Blood Group</th>
                <th className="py-2 px-4 border-b">Allergies</th>
                <th className="py-2 px-4 border-b">Pre-existing Illness</th>
                <th className="py-2 px-4 border-b">ABHA ID</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr key={member._id}>
                  <td className="py-2 px-4 border-b">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        name="name"
                        value={editingFormData.name}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      member.name
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        name="emergencyNumber"
                        value={editingFormData.emergencyNumber}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      member.emergencyNumber
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        name="age"
                        value={editingFormData.age}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      member.age
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        name="relation"
                        value={editingFormData.relation}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      member.relation
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        name="bloodGroup"
                        value={editingFormData.bloodGroup}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      member.bloodGroup
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        name="allergies"
                        value={editingFormData.allergies}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      member.allergies
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        name="preExistingIllness"
                        value={editingFormData.preExistingIllness}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      member.preExistingIllness
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        name="abhaId"
                        value={editingFormData.abhaId}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      member.abhaId
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editingIndex === index ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(index)}
                          className="text-green-600 hover:text-green-700 mr-2"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingIndex(null);
                            setEditingFormData(null);
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleEditClick(index)}
                        className="text-blue-600 hover:text-blue-700 mr-2"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(member._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageCard;
