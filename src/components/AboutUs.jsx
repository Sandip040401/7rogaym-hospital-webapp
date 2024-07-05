import React from 'react';

export const AboutUs = () => {
    return (
        <div className="h-full w-full py-10 px-6 md:px-20 bg-gradient-to-r from-cyan-700 to-teal-500">
            <div className="flex justify-center text-4xl font-bold text-white mb-6">
                <span className='pr-2 text-teal-200'>About</span>  Us
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed">
                    <span className="font-bold">7Rogyam Healthcare (P) Ltd.</span> was founded with a mission to provide affordable healthcare to everyone. We believe that quality healthcare is a basic human right and should be accessible to everyone, regardless of their income or social status. Our health card program is designed to make healthcare more affordable for our members while also supporting hospitals and healthcare providers by increasing patient volume and reducing hospital burdens, such as scheduling appointments.
                </p>
            </div>
        </div>
    );
};
