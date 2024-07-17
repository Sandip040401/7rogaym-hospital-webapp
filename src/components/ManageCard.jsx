import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'react-toastify/dist/ReactToastify.css';
import HealthCard from './HealthCard';

const ManageCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    emergencyNumber: '',
    age: '',
    relation: '',
    bloodGroup: '',
    allergies: '',
    preExistingIllness: '',
    abhaId: '',
    photo: null
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
    abhaId: '',
    photo: null
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
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'photo' ? files[0] : value
    });
  };

  const handleAddMember = async () => {
    const formDataWithPhoto = new FormData();
    for (const key in formData) {
      formDataWithPhoto.append(key, formData[key]);
    }
    try {
      const tokenString = localStorage.getItem('token');
      if (!tokenString) {
        console.error('No token found');
        return;
      }
      const decodedToken = JSON.parse(tokenString);
      const userEmail = decodedToken.email;
      formDataWithPhoto.append('email', userEmail);

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/members`, formDataWithPhoto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
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
        abhaId: '',
        photo: null
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
    const { name, value, files } = e.target;
    setEditingFormData({
      ...editingFormData,
      [name]: name === 'photo' ? files[0] : value
    });
  };

  const handleSaveEdit = async () => {
    const formDataWithPhoto = new FormData();
    for (const key in editingFormData) {
      formDataWithPhoto.append(key, editingFormData[key]);
    }
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/members/${editingFormData._id}`, formDataWithPhoto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
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
        abhaId: '',
        photo: null
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

  const handleDownloadCard = async (member) => {
    const cardElement = document.getElementById(`card-${member._id}`);
    const scale = 6;
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
      format: [imgWidth, imgHeight]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
    pdf.save(`${member.name}_card.pdf`);
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
        <p className="text-lg text-gray-700 mb-4">Plan Name: {planDetails.planName}</p>
        <p className="text-lg text-gray-700 mb-4">Amount: ${planDetails.amount}</p>
      </div>

      {members.length < maxMembers && (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-6 w-full max-w-5xl">
          <h2 className="text-2xl font-bold mb-4">Add Family Member</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Name"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="emergencyNumber"
              value={formData.emergencyNumber}
              onChange={handleFormChange}
              placeholder="Emergency Number"
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleFormChange}
              placeholder="Age"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="relation"
              value={formData.relation}
              onChange={handleFormChange}
              placeholder="Relation"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleFormChange}
              placeholder="Blood Group"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleFormChange}
              placeholder="Allergies"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="preExistingIllness"
              value={formData.preExistingIllness}
              onChange={handleFormChange}
              placeholder="Pre-existing Illness"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="abhaId"
              value={formData.abhaId}
              onChange={handleFormChange}
              placeholder="ABHA ID"
              className="border p-2 rounded"
            />
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFormChange}
              className="border p-2 rounded"
            />
          </div>
          <button onClick={handleAddMember} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Add Member
          </button>
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-4">Family Members</h2>
        {members.map((member, index) => (
          <div key={member._id} className="mb-4">
            <HealthCard member={member} />
            <button onClick={() => handleEditClick(index)} className="bg-yellow-500 text-white px-4 py-2 rounded mt-2">
              Edit
            </button>
            <button onClick={() => handleDelete(member._id)} className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2">
              Delete
            </button>
            <button onClick={() => handleDownloadCard(member)} className="bg-green-500 text-white px-4 py-2 rounded mt-2 ml-2">
              Download Card
            </button>
            {editingIndex === index && (
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={editingFormData.name}
                    onChange={handleEditChange}
                    placeholder="Name"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="emergencyNumber"
                    value={editingFormData.emergencyNumber}
                    onChange={handleEditChange}
                    placeholder="Emergency Number"
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    name="age"
                    value={editingFormData.age}
                    onChange={handleEditChange}
                    placeholder="Age"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="relation"
                    value={editingFormData.relation}
                    onChange={handleEditChange}
                    placeholder="Relation"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="bloodGroup"
                    value={editingFormData.bloodGroup}
                    onChange={handleEditChange}
                    placeholder="Blood Group"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="allergies"
                    value={editingFormData.allergies}
                    onChange={handleEditChange}
                    placeholder="Allergies"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="preExistingIllness"
                    value={editingFormData.preExistingIllness}
                    onChange={handleEditChange}
                    placeholder="Pre-existing Illness"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="abhaId"
                    value={editingFormData.abhaId}
                    onChange={handleEditChange}
                    placeholder="ABHA ID"
                    className="border p-2 rounded"
                  />
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleEditChange}
                    className="border p-2 rounded"
                  />
                </div>
                <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                  Save
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default ManageCard;
