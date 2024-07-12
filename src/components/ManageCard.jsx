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
  const [editingFormData, setEditingFormData] = useState({
    name: '',
    emergencyNumber: '',
    age: '',
    relation: '',
    bloodGroup: '',
    allergies: '',
    preExistingIllness: '',
    abhaId: ''
  });

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
          params: { email: userEmail },
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
          params: { email: userEmail },
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

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/members`, 
        { ...formData, email: userEmail },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
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

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/members/${editingFormData._id}`, 
        editingFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      const updatedMembers = [...members];
      updatedMembers[editingIndex] = response.data;
      setMembers(updatedMembers);
      setEditingIndex(null);
      setEditingFormData({
        name: '',
        emergencyNumber: '',
        age: '',
        relation: '',
        bloodGroup: '',
        allergies: '',
        preExistingIllness: '',
        abhaId: ''
      });
      toast.success('Member updated successfully');
    } catch (error) {
      console.error('Error saving edited member:', error);
      toast.error('Failed to update member');
    }
  };

  const handleDelete = async (memberId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/members/${memberId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
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
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 mb-6 w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-4">Selected Plan</h2>
        <p className="text-lg text-gray-700 mb-4">{planDetails.planName} <span className="text-green-600">₹{planDetails.amount}</span></p>
        <h3 className="text-lg font-medium mb-4">Members Added: {members.length}/{maxMembers}</h3>

        <form className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleFormChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
          <input
            type="text"
            name="emergencyNumber"
            placeholder="Emergency Number"
            value={formData.emergencyNumber}
            onChange={handleFormChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleFormChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
          <input
            type="text"
            name="relation"
            placeholder="Relation"
            value={formData.relation}
            onChange={handleFormChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
          <input
            type="text"
            name="bloodGroup"
            placeholder="Blood Group"
            value={formData.bloodGroup}
            onChange={handleFormChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
          <input
            type="text"
            name="allergies"
            placeholder="Allergies"
            value={formData.allergies}
            onChange={handleFormChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
          <input
            type="text"
            name="preExistingIllness"
            placeholder="Pre-existing Illness"
            value={formData.preExistingIllness}
            onChange={handleFormChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
          <input
            type="text"
            name="abhaId"
            placeholder="ABHA ID"
            value={formData.abhaId}
            onChange={handleFormChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
          <button
            type="button"
            onClick={handleAddMember}
            className="mt-4 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Member
          </button>
        </form>

        <h3 className="text-xl font-bold mt-8 mb-4">Members List</h3>
        <table className="w-full table-auto bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Emergency Number</th>
              <th className="p-3">Age</th>
              <th className="p-3">Relation</th>
              <th className="p-3">Blood Group</th>
              <th className="p-3">Allergies</th>
              <th className="p-3">Pre-existing Illness</th>
              <th className="p-3">ABHA ID</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member._id} className="border-b border-gray-300">
                <td className="p-3">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="name"
                      value={editingFormData.name}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    member.name
                  )}
                </td>
                <td className="p-3">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="emergencyNumber"
                      value={editingFormData.emergencyNumber}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    member.emergencyNumber
                  )}
                </td>
                <td className="p-3">
                  {editingIndex === index ? (
                    <input
                      type="number"
                      name="age"
                      value={editingFormData.age}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    member.age
                  )}
                </td>
                <td className="p-3">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="relation"
                      value={editingFormData.relation}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    member.relation
                  )}
                </td>
                <td className="p-3">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="bloodGroup"
                      value={editingFormData.bloodGroup}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    member.bloodGroup
                  )}
                </td>
                <td className="p-3">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="allergies"
                      value={editingFormData.allergies}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    member.allergies
                  )}
                </td>
                <td className="p-3">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="preExistingIllness"
                      value={editingFormData.preExistingIllness}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    member.preExistingIllness
                  )}
                </td>
                <td className="p-3">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="abhaId"
                      value={editingFormData.abhaId}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    member.abhaId
                  )}
                </td>
                <td className="p-3 flex items-center justify-center">
                  {editingIndex === index ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="mr-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(index)}
                        className="mr-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member._id)}
                        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageCard;
