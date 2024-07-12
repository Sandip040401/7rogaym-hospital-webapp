import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Home from '../components/Home';
import ManageCard from '../components/ManageCard';
import Notifications from '../components/Notifications';
import Plans from '../components/Plans';

export default function Dashboard() {
    const [selectedItem, setSelectedItem] = useState('home');
    const { logout } = useAuth();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        console.log('Logout clicked');
        logout(); // Call the logout function from AuthContext
        localStorage.removeItem('token'); // Remove the token
        navigate('/'); // Redirect to the home page
    };

    const renderContent = () => {
        switch (selectedItem) {
            case 'home':
                return <Home />;
            case 'managecard':
                return <ManageCard />;
            case 'notifications':
                return <Notifications />;
            case 'plans':
                return <Plans />;
            case 'logout':
                handleLogout();
                return null; // No need to render Logout component
            default:
                return <Home />;
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <div className="w-full md:w-64 bg-white shadow-lg">
                <div className="h-16 flex items-center justify-center border-b bg-white text-black">
                    <span className="text-xl font-semibold">My Dashboard</span>
                </div>
                <ul className="mt-4">
                    {[
                        { id: 'home', label: 'Home' },
                        { id: 'managecard', label: 'Manage Card' },
                        { id: 'notifications', label: 'Notifications' },
                        { id: 'plans', label: 'Plans' },
                        { id: 'logout', label: 'Logout', action: handleLogout },
                    ].map((item) => (
                        <li key={item.id} className={`px-6 py-2 hover:bg-gray-200 ${selectedItem === item.id ? 'bg-gray-200' : ''}`}>
                            <button
                                onClick={() => item.action ? item.action() : setSelectedItem(item.id)}
                                className="block w-full text-left text-gray-700 transition-colors duration-200 ease-in-out"
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-1 p-6">
                {renderContent()}
            </div>
        </div>
    );
}
