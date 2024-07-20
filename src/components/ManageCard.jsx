import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'react-toastify/dist/ReactToastify.css';
import HealthCard from './HealthCard';
import PremiumHealthCard from './PremiumHealthCard';

const ManageCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    emergencyNumber: '',
    age: '',
    relation: '',
    bloodGroup: '',
    gender: '',
    village: '',
    tehsil: '',
    district: '',
    state: '',
    allergies: '',
    preExistingIllness: '',
    abhaId: '',
    photo: null
  });

  const [simpleFormData, setSimpleFormData] = useState({
    name: '',
    age: '',
    gender: ''
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
    gender: '',
    village: '',
    tehsil: '',
    district: '',
    state: '',
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

  const handleSimpleFormChange = (e) => {
    const { name, value } = e.target;
    setSimpleFormData({
      ...simpleFormData,
      [name]: value
    });
  };

  const handleAddMember = async () => {
    const formDataToSend = members.length === 0 ? formData : simpleFormData;
    const formDataWithPhoto = new FormData();
    for (const key in formDataToSend) {
      formDataWithPhoto.append(key, formDataToSend[key]);
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
        gender: '',
        village: '',
        tehsil: '',
        district: '',
        state: '',
        preExistingIllness: '',
        abhaId: '',
        photo: null
      });
      setSimpleFormData({
        name: '',
        age: '',
        gender: ''
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
        gender: '',
        village: '',
        tehsil: '',
        district: '',
        state: '',
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
  
    const buttons = cardElement.querySelectorAll('button');
    buttons.forEach(button => button.style.display = 'none');
  
    const imagesLoaded = () => {
      const images = cardElement.getElementsByTagName('img');
      const promises = [];
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        if (!img.complete) {
          promises.push(new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          }));
        }
      }
      return Promise.all(promises);
    };
  
    await document.fonts.ready;
    await imagesLoaded();
  
    const cardStyle = window.getComputedStyle(cardElement);
    const cardWidth = parseFloat(cardStyle.width);
    const cardHeight = parseFloat(cardStyle.height);
  
    const canvas = await html2canvas(cardElement, {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      width: cardWidth,
      height: cardHeight,
      onclone: (clonedDoc) => {
        clonedDoc.getElementById(`card-${member._id}`).style.display = 'block';
      }
    });
  
    // Cropping the canvas to remove the white part
    const context = canvas.getContext('2d');
    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    const croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = canvas.width;
    croppedCanvas.height = canvas.height;
  
    const croppedContext = croppedCanvas.getContext('2d');
    croppedContext.putImageData(imgData, 0, 0);
  
    // Finding the rightmost non-white pixel
    let rightmostNonWhite = 0;
    const imgDataArray = imgData.data;
    for (let y = 0; y < canvas.height; y++) {
      for (let x = canvas.width - 1; x >= 0; x--) {
        const index = (y * canvas.width + x) * 4;
        const alpha = imgDataArray[index + 3];
        if (alpha !== 0) { // checking if pixel is not transparent
          const red = imgDataArray[index];
          const green = imgDataArray[index + 1];
          const blue = imgDataArray[index + 2];
          if (!(red > 240 && green > 240 && blue > 240)) { // checking if pixel is not white
            rightmostNonWhite = Math.max(rightmostNonWhite, x);
            break;
          }
        }
      }
    }
  
    const cropWidth = rightmostNonWhite + 1; // +1 to include the pixel itself
  
    const croppedFinalCanvas = document.createElement('canvas');
    croppedFinalCanvas.width = cropWidth;
    croppedFinalCanvas.height = canvas.height;
    const croppedFinalContext = croppedFinalCanvas.getContext('2d');
    croppedFinalContext.drawImage(canvas, 0, 0, cropWidth, canvas.height, 0, 0, cropWidth, canvas.height);
  
    const finalImgData = croppedFinalCanvas.toDataURL('image/png');
    const imgWidth = croppedFinalCanvas.width / scale;
    const imgHeight = croppedFinalCanvas.height / scale;
  
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: [imgWidth, imgHeight]
    });
  
    pdf.addImage(finalImgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
  
    pdf.save(`${member.name}_card.pdf`);
    buttons.forEach(button => button.style.display = 'block');
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
    <div className="min-h-screen">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Manage Health Cards</h2>
        <p>{planDetails.planName}</p>
        <form>
          {members.length === 0 && (
            <>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Emergency Number</label>
                <input
                  type="text"
                  name="emergencyNumber"
                  value={formData.emergencyNumber}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Age</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Relation</label>
                <input
                  type="text"
                  name="relation"
                  value={formData.relation}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Blood Group</label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Village</label>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Tehsil</label>
                <input
                  type="text"
                  name="tehsil"
                  value={formData.tehsil}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Allergies</label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Pre-Existing Illness</label>
                <input
                  type="text"
                  name="preExistingIllness"
                  value={formData.preExistingIllness}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">ABHA ID</label>
                <input
                  type="text"
                  name="abhaId"
                  value={formData.abhaId}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Photo</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </>
          )}
          {members.length > 0 && members.length < maxMembers && (
            <>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={simpleFormData.name}
                  onChange={handleSimpleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Age</label>
                <input
                  type="text"
                  name="age"
                  value={simpleFormData.age}
                  onChange={handleSimpleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Gender</label>
                <select
                  name="gender"
                  value={simpleFormData.gender}
                  onChange={handleSimpleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </>
          )}
        </form>
        {members.length < maxMembers && (
          <button
            onClick={handleAddMember}
            className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          >
            Add Member
          </button>
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-6">
        <ul>
          {members.map((member, index) => (
            <li key={index} className="mb-6">
              {editingIndex !== index ? (
                <div id={`card-${member._id}`} className="flex flex-col items-center">
                  {planDetails.planName === 'Solo Lite' ? (
                    <PremiumHealthCard member={member} />
                  ) : planDetails.planName === 'Solo Premium' ? (
                    <PremiumHealthCard member={member} />
                  ) : planDetails.planName === 'Solo' ? (
                    <PremiumHealthCard member={member} />
                  ) : planDetails.planName === 'Couple' ? (
                    <HealthCard member={member} />
                  ) : planDetails.planName === 'Family' ? (
                    <HealthCard member={member} />
                  ) : planDetails.planName === 'Family+' ? (
                    <HealthCard member={member} />
                  ) : (
                    <HealthCard member={member} /> // Default to HealthCard
                  )}
                  <div className='flex'>
                      <button
                        onClick={() => handleEditClick(index)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded mt-4 mr-2"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleDownloadCard(member)}
                        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                      >
                        Download Card
                      </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 w-full">
                  <form>
                    <div className="mb-4">
                      <label className="block mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editingFormData.name}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Emergency Number</label>
                      <input
                        type="text"
                        name="emergencyNumber"
                        value={editingFormData.emergencyNumber}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Age</label>
                      <input
                        type="text"
                        name="age"
                        value={editingFormData.age}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Relation</label>
                      <input
                        type="text"
                        name="relation"
                        value={editingFormData.relation}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Blood Group</label>
                      <input
                        type="text"
                        name="bloodGroup"
                        value={editingFormData.bloodGroup}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Gender</label>
                      <select
                        name="gender"
                        value={editingFormData.gender}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Village</label>
                      <input
                        type="text"
                        name="village"
                        value={editingFormData.village}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Tehsil</label>
                      <input
                        type="text"
                        name="tehsil"
                        value={editingFormData.tehsil}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">District</label>
                      <input
                        type="text"
                        name="district"
                        value={editingFormData.district}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={editingFormData.state}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Allergies</label>
                      <input
                        type="text"
                        name="allergies"
                        value={editingFormData.allergies}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Pre-Existing Illness</label>
                      <input
                        type="text"
                        name="preExistingIllness"
                        value={editingFormData.preExistingIllness}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">ABHA ID</label>
                      <input
                        type="text"
                        name="abhaId"
                        value={editingFormData.abhaId}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Photo</label>
                      <input
                        type="file"
                        name="photo"
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="w-full bg-blue-500 text-white p-2 rounded mt-4"
                    >
                      Save
                    </button>
                  </form>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageCard;
