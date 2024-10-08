import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import HealthCard from './HealthCard';
import PremiumHealthCard from './PremiumHealthCard';
import BackCard from './BackCard';
import Plans from './Plans';
import UserForm from '../pages/UserForm';

const initialFormState = {
  name: '',
  emergencyNumber: '',
  age: '',
  fatherName: '',
  bloodGroup: '',
  gender: '',
  village: '',
  tehsil: '',
  district: '',
  state: '',
  allergies: '',
  preExistingIllness: '',
  abhaId: '',
  photo: null,
};

const ManageCard = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [simpleFormData, setSimpleFormData] = useState({ memberName: '', memberAge: '', memberGender: '' });
  const [members, setMembers] = useState([]);
  const [additionalMembers, setAdditionalMembers] = useState([]);
  const [planDetails, setPlanDetails] = useState({ planName: '', amount: 0 });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingFormData, setEditingFormData] = useState(initialFormState);
  const [key, setKey] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state
  const [alert, setAlert] = useState({ message: '', type: '' }); // Alert state
  const [restricted, setRestricted] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setRestricted(true);
      return;
      }

      const { email } = JSON.parse(token);
      setLoading(true);
      try {
        const [planResponse, membersResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/users`, { params: { email }, headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/members`, { params: { email }, headers: { Authorization: `Bearer ${token}` } }),
        ]);
        if(planResponse.data.subscriptionStatus == 'inactive'){
          setActive(true);
        }
        setPlanDetails({ planName: planResponse.data.selectedPlan, amount: planResponse.data.lastPaymentAmount });
        setMembers(membersResponse.data);
        console.log(membersResponse.data);
        
        setAdditionalMembers(membersResponse.data[0].additionalMembers || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setAlert({ message: 'No data Found', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [key]);

  // const handleFormChange = ({ target: { name, value, files } }) => {
  //   setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  // };

  const handleSimpleFormChange = ({ target: { name, value } }) => {
    setSimpleFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleAddMember = async () => {
  //   const formDataToSend = members.length === 0 ? formData : simpleFormData;
  //   const formDataWithPhoto = new FormData();
  //   Object.entries(formDataToSend).forEach(([key, value]) => formDataWithPhoto.append(key, value));
  //   const token = localStorage.getItem('token');
  //   const { email } = JSON.parse(token);
  //   formDataWithPhoto.append('email', email);

  //   setLoading(true);
  //   try {
  //     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/members`, formDataWithPhoto, {
  //       headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
  //     });
  //     setMembers((prev) => [...prev, response.data]);
  //     setFormData(initialFormState);
  //     setSimpleFormData({ memberName: '', memberAge: '', memberGender: '' });
  //     setAlert({ message: 'Member added successfully', type: 'success' });
  //     setKey((prevKey) => prevKey + 1);
  //   } catch (error) {
  //     console.error('Error adding member:', error);
  //     setAlert({ message: 'Failed to add member', type: 'error' });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleDelete = async (memberId) => {
  //   const token = localStorage.getItem('token');

  //   setLoading(true);
  //   try {
  //     await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/members/${memberId}`, { headers: { Authorization: `Bearer ${token}` } });
  //     setMembers((prev) => prev.filter((member) => member._id !== memberId));
  //     setAlert({ message: 'Member deleted successfully', type: 'success' });
  //     setKey((prevKey) => prevKey + 1);
  //   } catch (error) {
  //     console.error('Error deleting member:', error);
  //     setAlert({ message: 'Failed to delete member', type: 'error' });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleDownloadCard = async (member) => {
    const cardElement = document.getElementById(`card-${member._id}`);
    const scale = 6;

    const buttons = cardElement.querySelectorAll('button');
    buttons.forEach((button) => (button.style.display = 'none'));

    const imagesLoaded = () => {
      const images = cardElement.getElementsByTagName('img');
      const promises = [];
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        if (!img.complete) {
          promises.push(
            new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
            })
          );
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
      },
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
        if (alpha !== 0) {
          // checking if pixel is not transparent
          const red = imgDataArray[index];
          const green = imgDataArray[index + 1];
          const blue = imgDataArray[index + 2];
          if (!(red > 240 && green > 240 && blue > 240)) {
            // checking if pixel is not white
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
      format: [imgWidth, imgHeight],
    });

    pdf.addImage(finalImgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');

    pdf.save(`${member.name}_card.pdf`);
    buttons.forEach((button) => (button.style.display = 'block'));
  };

  const planMemberLimits = { 'Solo Lite': 1, 'Solo': 1, 'Solo Premium': 1, 'Couple': 2, 'Family': 4, 'Family+': 6 };
  const maxMembers = planMemberLimits[planDetails.planName] || 0;
  const totalMembers = members.length + additionalMembers.length;
  const remainingMembers = maxMembers - totalMembers;


  if (restricted) {
    return <div className='flex justify-center text-3xl text-red-500 font-bold'>
      Restricted Access
      </div>;
  }

  if (active) {
    return <div>
      <Plans/>
    </div>
  }

  return (

    <div key={key} className="min-h-screen bg-gray-100 py-8">
      {/* <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
  <h2 className="text-2xl font-bold mb-4">Manage Health Cards</h2>
  <p className="mb-4 text-green-600 text-xl font-semibold">Plan: {planDetails.planName}</p>
  <p className="mb-4 text-gray-600">You can add {remainingMembers} more member(s).</p>
  <p className="mb-4 text-red-600 font-bold text-lg">Note: Once added, you can't edit the members. Please add carefully.</p>
  {loading && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-50">
    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
  </div>
)}
{alert.message && (
  <div
    className={`alert ${
      alert.type === 'success'
        ? 'bg-green-100 text-green-700'
        : 'bg-red-100 text-red-700'
    } border px-4 py-3 mb-4 rounded relative`}
    role="alert"
  >
    <span className="block sm:inline">{alert.message}</span>
    <button
      onClick={() => setAlert({ ...alert, message: '' })}
      className="absolute top-0 bottom-0 right-0 px-4 py-3"
    >
      <svg
        className="fill-current h-6 w-6 text-gray-500"
        role="button"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M14.348 14.849a1 1 0 01-1.414 0L10 11.414l-2.933 2.933a1 1 0 01-1.414-1.414L8.586 10 5.653 7.067a1 1 0 011.414-1.414L10 8.586l2.933-2.933a1 1 0 011.414 1.414L11.414 10l2.933 2.933a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  </div>
)}

  <form>
  {members.length === 0 ? (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.keys(initialFormState).map((key) => (
          <div key={key} className="mb-4">
            <label className="block mb-2">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
            <input
              type={key === 'photo' ? 'file' : 'text'}
              name={key}
              value={key === 'photo' ? undefined : formData[key]}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              required
            />
          </div>
        ))}
      </div>
    </>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Object.keys(simpleFormData).map((key) => (
        <div key={key} className="mb-4">
          <label className="block mb-2">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
          <input
            type="text"
            name={key}
            value={simpleFormData[key]}
            onChange={handleSimpleFormChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
            required
          />
        </div>
      ))}
    </div>
  )}
</form>

  {totalMembers < maxMembers && (
    <button onClick={handleAddMember} className="w-full bg-blue-500 text-white p-2 rounded mt-4">
      Add Member
    </button>
  )}
  {totalMembers >= maxMembers && <p className="text-red-500 mt-4">Maximum members reached for your plan.</p>}
</div> */}

      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-6">
        <h3 className="text-xl font-bold mb-4">Existing Members</h3>
        <ul>
          {members.map((member, index) => (
            <li key={member._id} className="mb-6">
              {editingIndex !== index ? (
                <div id={`card-${member._id}`} className="flex flex-col items-center">
                  {planDetails.planName.includes('Solo') ? (
                    <div className='flex'>
                      <PremiumHealthCard member={member} />
                      <BackCard member={member}/>
                    </div>
                  ) : (
                    <div className='flex'>
                      <HealthCard member={member} />
                      <BackCard member={member}/>
                    </div>
                  )}
                  <div className="flex">
                    <button onClick={() => handleDownloadCard(member)} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
                      Download
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.keys(editingFormData).map((key) => (
                      <div key={key} className="mb-4">
                        <label className="block mb-2">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                        <input
                          type={key === 'photo' ? 'file' : 'text'}
                          name={key}
                          value={key === 'photo' ? undefined : editingFormData[key]}
                          onChange={handleEditChange}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mr-2">
                      Save
                    </button>
                    <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded mt-4">
                      Cancel
                    </button>
                  </div>
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




