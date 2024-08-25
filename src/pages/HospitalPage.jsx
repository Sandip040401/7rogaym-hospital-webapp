import React, { useState, useEffect } from 'react';
import { AppBar } from "../components/AppBar";
import { Hospitals } from "../components/Hospitals";
import { Footer } from "../components/Footer";

export default function HospitalPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [stateQuery, setStateQuery] = useState('');
    const [districtQuery, setDistrictQuery] = useState('');
    const [userLocation, setUserLocation] = useState({ lat: null, lon: null });

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleStateChange = (e) => {
        setStateQuery(e.target.value);
    };

    const handleDistrictChange = (e) => {
        setDistrictQuery(e.target.value);
    };

    useEffect(() => {
        // Fetch user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (error) => {
                    console.error('Error fetching location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    return (
        <>
            <AppBar />
            <div className="search-container mt-32 px-10 lg:px-20">
                <div className="flex flex-col lg:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search by keyword"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full lg:w-1/3 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Filter by state"
                        value={stateQuery}
                        onChange={handleStateChange}
                        className="w-full lg:w-1/3 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Filter by district"
                        value={districtQuery}
                        onChange={handleDistrictChange}
                        className="w-full lg:w-1/3 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <Hospitals
                searchQuery={searchQuery}
                stateQuery={stateQuery}
                districtQuery={districtQuery}
                userLocation={userLocation}
            />
            <Footer />
        </>
    );
}
