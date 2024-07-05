import React from 'react';
import { Disclosure } from '@headlessui/react';

const faqs = [
    {
        question: "What is 7Rogyam Healthcare?",
        answer: "7Rogyam Healthcare (P) Ltd. is a company dedicated to providing affordable healthcare to everyone. We offer a health card program that makes healthcare more affordable for our members while supporting hospitals and healthcare providers by increasing patient volume and reducing hospital burdens."
    },
    {
        question: "How does the health card program work?",
        answer: "Our health card program allows members to access healthcare services at discounted rates. Members can use their health card at our partner hospitals and clinics to receive these discounts."
    },
    {
        question: "Who can join the health card program?",
        answer: "The health card program is open to everyone. There are no restrictions based on income or social status. Anyone looking for affordable healthcare can join."
    },
    {
        question: "How do I register my hospital or clinic?",
        answer: "If you are a hospital or healthcare provider, you can register with us by filling out the registration form on our website. One of our representatives will get in touch with you to discuss the registration process."
    },
    {
        question: "What are the benefits of partnering with 7Rogyam Healthcare?",
        answer: "Partnering with us increases patient volume for hospitals and healthcare providers, reduces administrative burdens, and helps make healthcare more affordable for everyone."
    }
];

export const FAQ = () => {
    return (
        <div className="h-full w-full rounded-b-3xl py-10 px-6 md:px-20 bg-gradient-to-r from-teal-50 to-cyan-50">
            <div className="flex justify-center text-4xl font-bold text-teal-900 mb-6">
                Frequently Asked Questions
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <Disclosure key={index}>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-teal-900 bg-teal-100 rounded-lg hover:bg-teal-200 focus:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-75">
                                        <span>{faq.question}</span>
                                        <span className="ml-2 text-teal-900">{open ? '-' : '+'}</span>
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                        {faq.answer}
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    ))}
                </div>
            </div>
        </div>
    );
};
