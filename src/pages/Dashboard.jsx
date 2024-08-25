import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import Home from '../components/Home';
import ManageCard from '../components/ManageCard';
import Notifications from '../components/Notifications';
import Plans from '../components/Plans';
import { Profile } from '../components/Profile';

export default function Dashboard() {
    // Set 'managecard' as the default selected item
    const [selectedItem, setSelectedItem] = useState('profile');
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [restricted, setRestricted] = useState(false);

    const handleLogout = () => {
        console.log('Logout clicked');
        logout();
        localStorage.removeItem('token');
        navigate('/');
    };

    useEffect(() => {
        const fetchUserData = async () => {
          const tokenString = localStorage.getItem('token');
          if (!tokenString) {
            setRestricted(true);
            return;
          }
        };
    
        fetchUserData();
      }, []);

    const renderContent = () => {
        switch (selectedItem) {
            case 'profile':
                return <Profile/>;
            case 'managecard':
                return <ManageCard />;
            case 'notifications':
                return <Notifications />;
            case 'plans':
                return <Plans />;
            case 'logout':
                handleLogout();
                return null;
            default:
                return <Profile />;
        }
    };

    if (restricted) {
        return<>
        <div className='flex justify-center text-3xl text-red-500 font-bold pt-60'>
          Restricted Access
          </div>
          <div className='flex justify-center text-xl font-bold'>
            <a href="/" className='text-blue-500 pointer' >click here </a>&nbsp;to go to Home Page
          </div>
        </> 
      }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <div className="w-full md:w-64 bg-white shadow-lg">
                <div className="h-16 flex items-center justify-center border-b bg-blue-600 text-white">
                    <span className="text-xl font-semibold">My Dashboard</span>
                </div>
                <ul className="mt-4">
                    {[
                        { id: 'profile', label: 'Profile' },
                        { id: 'managecard', label: 'Manage Card' },
                        { id: 'notifications', label: 'Settings' },
                        // { id: 'plans', label: 'Renew Plans' },
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
            <div className="flex-1 p-6 bg-white shadow-md rounded-lg">
                {renderContent()}
            </div>
        </div>
    );
}
