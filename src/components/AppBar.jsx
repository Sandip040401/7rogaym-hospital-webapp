import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const AppBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const tokenString = localStorage.getItem('token');
        if (tokenString) {
            const token = JSON.parse(tokenString);
            setUserName(token.name);
        }
    }, []);

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
        setMenuOpen(false);
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center lg:px-20 bg-white bg-opacity-60 backdrop-blur-sm">
            <Link to="/">
                <div className="flex items-center">
                    <img className="h-14 mix-blend-multiply" src="/logo1-new.png" alt="Logo 1" />
                    <img className="h-20 mix-blend-multiply" src="/newlogo-new.png" alt="Logo 2" />
                </div>
            </Link>
            <div className="hidden md:flex space-x-6">
                <a href="/" className="font-medium hover:text-blue-800 transition duration-300 cursor-pointer flex justify-center flex-col">Home</a>
                <Link to="/hospitals" className="font-medium hover:text-blue-800 transition duration-300 cursor-pointer flex justify-center flex-col">Hospitals</Link>
                <Link to="/plans" className="font-medium hover:text-blue-800 transition duration-300 cursor-pointer flex justify-center flex-col">Plans</Link>
                <a href="#contact" onClick={handleScroll} className="font-medium hover:text-blue-800 transition duration-300 cursor-pointer flex justify-center flex-col">Contact Us</a>
                <div className="pl-4 cursor-pointer">
                    {userName ? (
                        <div className='flex'>
                            <span className="text-blue-700 font-medium pr-4 flex flex-col justify-center">{`Welcome, ${userName}`}</span>
                            <Link to="/dashboard">
                                <button type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    Dashboard
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <Link to="/signin">
                            <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                Already a member?
                            </button>
                        </Link>
                    )}
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
                <div className="absolute top-16 right-0 bg-white bg-opacity-90 backdrop-blur-md w-full shadow-md md:hidden">
                    <div className="flex flex-col space-y-4 p-4">
                        <a href="#services" onClick={handleScroll} className="font-medium hover:text-blue-800 transition duration-300 cursor-pointer">Services</a>
                        <Link to="/hospitals" className="font-medium hover:text-blue-800 transition duration-300 cursor-pointer">Hospitals</Link>
                        <a href="#contact" onClick={handleScroll} className="font-medium hover:text-blue-800 transition duration-300 cursor-pointer">Contact Us</a>
                        {userName ? (
                            <>
                                <span className="font-medium hover:text-blue-800 transition duration-300 cursor-pointer">{`Welcome, ${userName}`}</span>
                                <Link to="/dashboard" className="font-medium hover:text-blue-800 transition duration-300 cursor-pointer">Dashboard</Link>
                            </>
                        ) : (
                            <Link to="/signup">
                                <button type="button" className="font-medium hover:text-blue-800 transition duration-300 cursor-pointer">
                                    Already a member?
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
