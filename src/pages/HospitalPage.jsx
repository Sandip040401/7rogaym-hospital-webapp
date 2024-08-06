import React, { useState } from 'react';
import { AppBar } from "../components/AppBar";
import { Hospitals } from "../components/Hospitals";
import { Footer } from "../components/Footer";

export default function HospitalPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <>
            <AppBar />
            <div className="search-container mt-32 px-10 lg:px-20">
                <input
                    type="text"
                    placeholder="Search by district, state, or any keyword"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <Hospitals searchQuery={searchQuery} />
            <Footer />
        </>
    );
}
