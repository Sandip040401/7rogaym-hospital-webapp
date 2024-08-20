import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiUser, FiImage, FiMessageSquare, FiLogOut } from 'react-icons/fi';
import UserManagement from '../components/UserManagement';
import AdminGallery from '../components/AdminGallery';
import AdminTestimonials from '../components/AdminTestimonials';

const Admin = () => {
  const [view, setView] = useState('userManagement');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem('admintoken');

  const handleLogout = () => {
    localStorage.removeItem('admintoken');
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? 'w-16' : 'w-64'
        } bg-gray-100 text-gray-800 flex flex-col transition-all duration-300`}
      >
        <div className="p-4 flex justify-between items-center">
          {!isCollapsed && <h1 className="text-xl font-bold">Admin</h1>}
          <button onClick={toggleSidebar} className="text-gray-600 focus:outline-none">
            {isCollapsed ? <FiChevronRight size={24} /> : <FiChevronLeft size={24} />}
          </button>
        </div>
        <div className="flex flex-col space-y-2 p-4">
          <button
            onClick={() => setView('userManagement')}
            className={`w-full flex items-center text-left px-4 py-2 rounded transition duration-150 ${
              view === 'userManagement' ? 'bg-gray-300 text-gray-800' : 'bg-gray-200 text-gray-600'
            } ${isCollapsed ? 'justify-center px-0' : 'justify-start'}`}
          >
            <FiUser size={24} />
            {!isCollapsed && <span className="ml-4">User Management</span>}
          </button>
          <button
            onClick={() => setView('adminGallery')}
            className={`w-full flex items-center text-left px-4 py-2 rounded transition duration-150 ${
              view === 'adminGallery' ? 'bg-gray-300 text-gray-800' : 'bg-gray-200 text-gray-600'
            } ${isCollapsed ? 'justify-center px-0' : 'justify-start'}`}
          >
            <FiImage size={24} />
            {!isCollapsed && <span className="ml-4">Admin Gallery</span>}
          </button>
          <button
            onClick={() => setView('adminTestimonials')}
            className={`w-full flex items-center text-left px-4 py-2 rounded transition duration-150 ${
              view === 'adminTestimonials' ? 'bg-gray-300 text-gray-800' : 'bg-gray-200 text-gray-600'
            } ${isCollapsed ? 'justify-center px-0' : 'justify-start'}`}
          >
            <FiMessageSquare size={24} />
            {!isCollapsed && <span className="ml-4">Admin Testimonials</span>}
          </button>
        </div>
        <div className="mt-auto p-4">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-150 ${
              isCollapsed ? 'justify-center px-0' : 'justify-start'
            }`}
          >
            <FiLogOut size={24} />
            {!isCollapsed && <span className="ml-4">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white">
        {view === 'userManagement' && <UserManagement baseUrl={baseUrl} token={token} />}
        {view === 'adminGallery' && <AdminGallery />}
        {view === 'adminTestimonials' && <AdminTestimonials baseUrl={baseUrl} token={token} />}
      </div>
    </div>
  );
};

export default Admin;
