// Admin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserManagement from '../components/UserManagement';
import AdminGallery from '../components/AdminGallery';
import AdminTestimonials from '../components/AdminTestimonials';

const Admin = () => {
  const [view, setView] = useState('userManagement'); // State to track current view
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem('admintoken');

  const handleLogout = () => {
    localStorage.removeItem('admintoken');
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-150">
          Logout
        </button>
      </div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setView('userManagement')}
          className={`px-4 py-2 rounded transition duration-150 ${view === 'userManagement' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          User Management
        </button>
        <button
          onClick={() => setView('adminGallery')}
          className={`px-4 py-2 rounded transition duration-150 ${view === 'adminGallery' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Admin Gallery
        </button>
        <button
          onClick={() => setView('adminTestimonials')}
          className={`px-4 py-2 rounded transition duration-150 ${view === 'adminTestimonials' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Admin Testimonials
        </button>
      </div>
      {view === 'userManagement' && <UserManagement baseUrl={baseUrl} token={token} />}
      {view === 'adminGallery' && <AdminGallery />}
      {view === 'adminTestimonials' && <AdminTestimonials baseUrl={baseUrl} token={token} />}
    </div>
  );
};

export default Admin;
