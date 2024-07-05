import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const AppBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleScroll = (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: "smooth"
            });
        }
        setMenuOpen(false); // Close the menu if it's open
    };

    return (
        <div className="fixed bg-white top-0 left-0 right-0 z-50 flex justify-between items-center p-4 lg:px-40">
            <Link to="/">
                <div className="flex items-center">
                    <img className="h-10" src="/logo1.jpg" alt="Logo 1" />
                    <img className="h-10 ml-4" src="/logo2.png" alt="Logo 2" />
                </div>
            </Link>
            <div className="hidden md:flex space-x-6">
                <a href="#services" onClick={handleScroll} className="font-medium hover:text-blue-800 transition duration-300 cursor-pointer flex justify-center flex-col">Services</a>
                <Link to="/hospitals" className="font-medium hover:text-blue-800 transition duration-300 cursor-pointer flex justify-center flex-col">Hospitals</Link>
                <a href="#contact" onClick={handleScroll} className="font-medium hover:text-blue-800 transition duration-300 cursor-pointer flex justify-center flex-col">Contact Us</a>
                <div className="pl-4 cursor-pointer">
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSfwJAwVYuB0aW5Wiyfrc5uoayvlw6OxRyVOlhgpeGbYyvRU2A/viewform">
                        <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Already a member?
                        </button>
                    </a>
                </div>
            </div>
            <div className="md:hidden flex items-center">
                <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
            {menuOpen && (
                <div className="absolute top-16 right-0 bg-white w-full shadow-md md:hidden">
                    <div className="flex flex-col space-y-4 p-4">
                        <a href="#services" onClick={handleScroll} className="font-medium hover:text-blue-800 transition duration-300 cursor-pointer">Services</a>
                        <Link to="/hospitals" className="font-medium hover:text-blue-800 transition duration-300 cursor-pointer">Hospitals</Link>
                        <a href="#contact" onClick={handleScroll} className="font-medium hover:text-blue-800 transition duration-300 cursor-pointer">Contact Us</a>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfwJAwVYuB0aW5Wiyfrc5uoayvlw6OxRyVOlhgpeGbYyvRU2A/viewform" className="font-medium hover:text-blue-800 transition duration-300 cursor-pointer">
                            Already a member?
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};
