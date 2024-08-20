import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: '',
        success: false
    });

    useEffect(() => {
        if (formState.success) {
            const timer = setTimeout(() => {
                setFormState({ ...formState, success: false });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [formState.success]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormState({ ...formState, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setTimeout(() => {
            setFormState({
                name: '',
                email: '',
                message: '',
                success: true
            });
        }, 500);
    };

    return (
        <footer className="bg-gray-900 text-white py-10 px-6 lg:px-20" id="contact">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-10 lg:space-y-0 lg:space-x-10">

                    {/* Contact Us */}
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="name">Name</label>
                                <input
                                    className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                    value={formState.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">Email</label>
                                <input
                                    className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Your Email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="message">Message</label>
                                <textarea
                                    className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                    id="message"
                                    rows="5"
                                    placeholder="Your Message"
                                    value={formState.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                                    type="submit"
                                >
                                    Send Message
                                </button>
                            </div>
                            {formState.success && (
                                <div className="mt-4 p-4 text-green-500 rounded">
                                    Your message has been sent successfully!
                                </div>
                            )}
                        </form>
                    </div>

                    <div>
                     {/* Company Info */}
                     <div>
                        <h2 className="text-3xl font-bold mb-4">7Rogyam Healthcare (P) Ltd</h2>
                        <p className="mb-2 text-gray-400">CIN: U85320MP2023PTC064383</p>
                        <p className="mb-2 text-gray-400">GST: 23AACCZ1326M1ZB</p>
                        <p className="mb-2 text-gray-400">Gx 14, Varun Nagar, Kolar Road, Bhopal, Madhya Pradesh 462042</p>
                        <p className="mb-2 text-gray-400">Phone: <a href="tel:8181819718" className="text-yellow-500">8181819718</a></p>
                        <p className="mb-2 text-gray-400">Email: <a href="mailto:Contact@7Rogyam.com" className="text-yellow-500">Contact@7Rogyam.com</a></p>
                        <div className="mt-4">
                            <Link to="/tnc" className="text-yellow-500 hover:text-white transition duration-300">Terms & Conditions</Link>
                            <span className="mx-2 text-gray-500">|</span>
                            <Link to="/privacy-policy" className="text-yellow-500 hover:text-white transition duration-300">Privacy Policy</Link>
                            <span className="mx-2 text-gray-500">|</span>
                            <Link to="/refund" className="text-yellow-500 hover:text-white transition duration-300">Refund & Cancellation</Link>
                        </div>
                    </div>

                    {/* Follow Us */}
                    <div className='mt-2'>
                        <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/7Rogyam" className="text-gray-500 hover:text-white" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.675 0H1.325C.594 0 0 .594 0 1.325v21.351C0 23.406.594 24 1.325 24h11.488v-9.294H9.69v-3.622h3.122V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.243l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.309h3.588l-.467 3.622h-3.121V24h6.116c.73 0 1.324-.594 1.324-1.324V1.325C24 .594 23.406 0 22.675 0z" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/7Rogyam" className="text-gray-500 hover:text-white" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.316 3.608 1.291.975.975 1.229 2.242 1.291 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.316 2.633-1.291 3.608-.975.975-2.242 1.229-3.608 1.291-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.316-3.608-1.291-.975-.975-1.229-2.242-1.291-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.316-2.633 1.291-3.608.975-.975 2.242-1.229 3.608-1.291 1.265-.058 1.645-.07 4.849-.07zM12 0C8.741 0 8.332.014 7.052.072 5.769.13 4.621.337 3.675.98c-.946.643-1.686 1.384-2.329 2.329-.643.946-.85 2.094-.908 3.377C.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.058 1.283.265 2.431.908 3.377.643.946 1.384 1.686 2.329 2.329.946.643 2.094.85 3.377.908 1.28.058 1.689.072 4.948.072s3.668-.014 4.948-.072c1.283-.058 2.431-.265 3.377-.908.946-.643 1.686-1.384 2.329-2.329.643-.946.85-2.094.908-3.377.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.058-1.283-.265-2.431-.908-3.377-.643-.946-1.384-1.686-2.329-2.329-.946-.643-2.094-.85-3.377-.908C15.668.014 15.259 0 12 0z" />
                                    <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.162 12 18.162 18.162 15.403 18.162 12 15.403 5.838 12 5.838zm0 10.324c-2.292 0-4.162-1.87-4.162-4.162S9.708 7.838 12 7.838s4.162 1.87 4.162 4.162S14.292 16.162 12 16.162zm6.406-11.845c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.441-1.441-1.441z" />
                                </svg>
                            </a>
                            <a href="https://x.com/7Rogyam" className="text-gray-500 hover:text-white" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.954 4.569c-.885.39-1.83.656-2.825.775 1.014-.608 1.794-1.569 2.163-2.724-.951.564-2.005.978-3.127 1.197-.897-.957-2.178-1.555-3.594-1.555-2.722 0-4.926 2.204-4.926 4.926 0 .39.045.765.127 1.124C7.69 8.094 4.067 6.13 1.64 3.161c-.427.733-.666 1.581-.666 2.475 0 1.71.87 3.216 2.188 4.099-.807-.026-1.566-.247-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.848.171-1.296.171-.314 0-.621-.03-.921-.086.631 1.953 2.445 3.377 4.604 3.416-1.68 1.318-3.809 2.104-6.102 2.104-.397 0-.789-.023-1.175-.068 2.179 1.397 4.768 2.213 7.548 2.213 9.056 0 14.009-7.496 14.009-13.986 0-.21 0-.423-.015-.634.961-.695 1.8-1.562 2.46-2.549z" />
                                </svg>
                            </a>
                            <a href="https://www.youtube.com/@7Rogyam" className="text-gray-500 hover:text-white" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186c-.266-1.032-1.04-1.849-2.06-2.147C19.464 3.526 12 3.526 12 3.526s-7.464 0-9.438.513c-1.02.298-1.794 1.115-2.06 2.147C.5 8.28.5 12.001.5 12.001s0 3.721.502 5.815c.266 1.032 1.04 1.849 2.06 2.147 1.974.513 9.438.513 9.438.513s7.464 0 9.438-.513c1.02-.298 1.794-1.115 2.06-2.147.502-2.094.502-5.815.502-5.815s0-3.721-.502-5.815zM9.75 15.019V8.981l5.978 3.019-5.978 3.019z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="text-center mt-10">
                    <p className="text-gray-500">© 2024 7Rogyam Healthcare. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
