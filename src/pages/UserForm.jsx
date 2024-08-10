import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

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

const planMemberLimits = {
  'Solo Lite': 1,
  'Solo': 1,
  'Solo Premium': 1,
  'Couple': 2,
  'Family': 4,
  'Family+': 6,
};

const UserForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [additionalMembers, setAdditionalMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const navigate = useNavigate();
  const location = useLocation();

  const { planName, amount } = location.state?.planDetails || { planName: '', amount: 0 };

  const maxMembers = planMemberLimits[planName] || 0;
  const totalMembers = 1 + additionalMembers.length;
  const remainingMembers = maxMembers - totalMembers;

  const handleFormChange = ({ target: { name, value, files } }) => {
    setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleAddMember = () => {
    if (remainingMembers > 0) {
      setAdditionalMembers([...additionalMembers, {
        name: '',
        age: '',
        gender: '',
      }]);
    } else {
      setAlert({ message: `You can add up to ${maxMembers} members only.`, type: 'error' });
    }
  };

  const handleAdditionalMemberChange = (index, { target: { name, value } }) => {
    const updatedMembers = additionalMembers.map((member, i) =>
      i === index ? { ...member, [name]: value } : member
    );
    setAdditionalMembers(updatedMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const field in initialFormState) {
      if (initialFormState.hasOwnProperty(field)) {
        if (!formData[field]) {
          setAlert({ message: `Please fill out the ${field} field.`, type: 'error' });
          return;
        }
      }
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setAlert({ message: 'User not authenticated. Please sign in.', type: 'error' });
      return;
    }

    const { email } = JSON.parse(token);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => formDataToSend.append(key, value));
    formDataToSend.append('email', email);
    formDataToSend.append('additionalMembers', JSON.stringify(additionalMembers));

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/members`, formDataToSend, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      setAlert({ message: 'Form submitted successfully!', type: 'success' });
      navigate('/payment', { state: { planDetails: { planName, amount } } });
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlert({ message: 'Failed to submit form.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter your name' },
    { label: 'Emergency Number', name: 'emergencyNumber', type: 'tel', placeholder: 'Enter emergency number' },
    { label: 'Age', name: 'age', type: 'number', placeholder: 'Enter your age' },
    { label: 'Father\'s Name', name: 'fatherName', type: 'text', placeholder: 'Enter father\'s name' },
    { label: 'Blood Group', name: 'bloodGroup', type: 'text', placeholder: 'Enter blood group' },
    { label: 'Gender', name: 'gender', type: 'select', placeholder: 'Select gender', options: ['Male', 'Female'] },
    { label: 'Village', name: 'village', type: 'text', placeholder: 'Enter village name' },
    { label: 'District', name: 'district', type: 'text', placeholder: 'Enter district name' },
    { label: 'State', name: 'state', type: 'text', placeholder: 'Enter state name' },
    { label: 'Tehsil', name: 'tehsil', type: 'text', placeholder: 'Enter tehsil name' },
    { label: 'Allergies', name: 'allergies', type: 'text', placeholder: 'Enter any allergies' },
    { label: 'Pre-existing Illness', name: 'preExistingIllness', type: 'text', placeholder: 'Enter pre-existing illnesses' },
    { label: 'ABHA ID', name: 'abhaId', type: 'text', placeholder: 'Enter ABHA ID' },
    { label: 'Photo', name: 'photo', type: 'file', placeholder: '' },
  ];

  const additionalMemberFields = [
    { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter additional member\'s name' },
    { label: 'Age', name: 'age', type: 'number', placeholder: 'Enter additional member\'s age' },
    { label: 'Gender', name: 'gender', type: 'select', placeholder: 'Select additional member\'s gender', options: ['Male', 'Female'] },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">User Details</h2>
        <p className="mb-4 text-green-600 text-xl font-semibold text-center">
          Selected Plan: {planName || 'N/A'}
        </p>
        <p className="mb-4 text-gray-600 text-center">
          Please fill out the form below to proceed with the payment.
        </p>
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
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 5.652a.5.5 0 10-.707-.707l-3.641 3.641-3.641-3.641a.5.5 0 10-.707.707l3.641 3.641-3.641 3.641a.5.5 0 10.707.707l3.641-3.641 3.641 3.641a.5.5 0 10.707-.707l-3.641-3.641 3.641-3.641z" />
              </svg>
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formFields.map(({ label, name, type, placeholder, options }) => (
              <div key={name}>
                <label className="block mb-1 text-gray-600" htmlFor={name}>
                  {label}
                </label>
                {type === 'select' ? (
                  <select
                    className="w-full border border-gray-300 p-2 rounded"
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleFormChange}
                  >
                    <option value="">{placeholder}</option>
                    {options.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="w-full border border-gray-300 p-2 rounded"
                    type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={type !== 'file' ? formData[name] : undefined}
                    onChange={handleFormChange}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Additional Members</h3>
            <button
              type="button"
              onClick={handleAddMember}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Member
            </button>
            <p className="mt-2 text-gray-600">
              You can add {remainingMembers} more member{remainingMembers > 1 ? 's' : ''}.
            </p>
            {additionalMembers.map((member, index) => (
              <div key={index} className="mt-4 p-4 bg-gray-50 rounded border border-gray-300">
                <h4 className="text-lg font-semibold mb-2">Member {index + 1}</h4>
                {additionalMemberFields.map(({ label, name, type, placeholder, options }) => (
                  <div key={name} className="mb-2">
                    <label className="block mb-1 text-gray-600" htmlFor={`${name}-${index}`}>
                      {label}
                    </label>
                    {type === 'select' ? (
                      <select
                        className="w-full border border-gray-300 p-2 rounded"
                        id={`${name}-${index}`}
                        name={name}
                        value={member[name]}
                        onChange={(e) => handleAdditionalMemberChange(index, e)}
                      >
                        <option value="">{placeholder}</option>
                        {options.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        className="w-full border border-gray-300 p-2 rounded"
                        type={type}
                        id={`${name}-${index}`}
                        name={name}
                        placeholder={placeholder}
                        value={member[name]}
                        onChange={(e) => handleAdditionalMemberChange(index, e)}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
