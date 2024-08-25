import React, { useState, useEffect } from 'react';
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
  const [restricted, setRestricted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  
  const { planName, amount } = location.state?.planDetails || { planName: '', amount: 0 };

  const maxMembers = planMemberLimits[planName] || 0;
  const totalMembers = 1 + additionalMembers.length;
  const remainingMembers = maxMembers - totalMembers;

  useEffect(() => {
    const fetchUserData = async () => {
      const tokenString = localStorage.getItem('token');
      if (!tokenString) {
        setAlert({ type: 'error', message: 'No token found' });
        setRestricted(true);
        return;
      }
      const decodedToken = JSON.parse(tokenString);
      const userEmail = decodedToken.email;

      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users`, {
          params: { email: userEmail }
        });
        const user = response.data;
        setFormData({
          name: user.name || '',
          emergencyNumber: user.emergencyNumber || '',
          age: user.age || '',
          fatherName: user.fatherName || '',
          bloodGroup: user.bloodGroup || '',
          gender: user.gender || '',
          village: user.village || '',
          tehsil: user.tehsil || '',
          district: user.district || '',
          state: user.state || '',
          allergies: user.allergies || '',
          preExistingIllness: user.preExistingIllness || '',
          abhaId: user.abhaId || '',
          photo: null,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setAlert({ type: 'error', message: 'Error fetching user data' });
      }
    };

    fetchUserData();
  }, []);

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
                <path d="M14.348 5.652a.6.6 0 010 .849L10.707 10l3.641 3.498a.6.6 0 01-.848.849L10 10.707l-3.498 3.641a.6.6 0 01-.849-.848L9.293 10 5.652 6.352a.6.6 0 01.849-.849L10 9.293l3.641-3.498a.6.6 0 01.707-.143.6.6 0 01.707.143z" />
              </svg>
            </button>
          </div>
        )}

        {restricted ? (
          <p className="text-red-600 text-center">
            Access Denied: You need to sign in to fill out the form.
          </p>
        ) : (
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {formFields.map(({ label, name, type, placeholder, options }) => (
              <div key={name} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {label}
                </label>
                {type === 'select' ? (
                  <select
                    name={name}
                    value={formData[name]}
                    onChange={handleFormChange}
                    className="form-select w-full border border-gray-300 p-2 rounded-md"
                    required
                  >
                    <option value="">Select {label}</option>
                    {options.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={type !== 'file' ? formData[name] : undefined}
                    onChange={handleFormChange}
                    placeholder={placeholder}
                    className="form-input w-full border border-gray-300 p-2 rounded-md"
                    required
                  />
                )}
              </div>
            ))}

            {additionalMembers.map((member, index) => (
              <div key={index} className="mb-4 border-t-2 pt-4">
                <h3 className="text-lg font-semibold mb-2">
                  Additional Member {index + 1}
                </h3>
                {additionalMemberFields.map(({ label, name, type, placeholder, options }) => (
                  <div key={name} className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      {label}
                    </label>
                    {type === 'select' ? (
                      <select
                        name={name}
                        value={member[name]}
                        onChange={e => handleAdditionalMemberChange(index, e)}
                        className="form-select w-full border border-gray-300 p-2 rounded-md"
                        required
                      >
                        <option value="">Select {label}</option>
                        {options.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={type}
                        name={name}
                        value={member[name]}
                        onChange={e => handleAdditionalMemberChange(index, e)}
                        placeholder={placeholder}
                        className="form-input w-full border border-gray-300 p-2 rounded-md"
                        required
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}

            {remainingMembers > 0 && (
              <button
                type="button"
                onClick={handleAddMember}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Add Additional Member
              </button>
            )}

            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-6"
              disabled={loading}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserForm;
