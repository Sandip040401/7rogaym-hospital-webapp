import React from 'react';
import { AppBar } from '../components/AppBar';
import { Footer } from '../components/Footer';

export default function Terms() {
    return (
        <>
            <AppBar />
            <div className="container mt-24  mx-auto px-10 py-10">
                <h1 className="text-4xl flex justify-center font-bold mb-4">Terms & Conditions</h1>
                <p className='text-lg'>
                    Welcome, if you continue to browse and use this website you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern 7Rogyam Healthcare (P) Ltd's relationship with you in relation to this website.
                    The term ‘7Rogyam Healthcare (P) Ltd’ or ‘us’ or ‘we’ refers to the owner of the website. The term ‘you’ refers to the user or viewer of our website.
                </p>
                <p className='text-lg flex justify-center mt-2 font-semibold'>The use of this website is subject to the following terms of use:</p>
                <ol className="list-decimal ml-10 mt-2">
                    <li>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</li>
                    <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose.</li>
                    <li>You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
                    <li>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable.</li>
                    <li>It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.</li>
                    <li>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics.</li>
                    <li>Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>
                    <li>All trademarks reproduced in this website which is not the property of, or licensed to, the operator is acknowledged on the website.</li>
                    <li>Unauthorized use of this website by you may give rise to a claim for damages and/or be a criminal offense. From time to time this website may also include links to other websites.</li>
                    <li>These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We take no responsibility for the content of the linked website(s).</li>
                    <li> You may not create a link to this website from another website or document without 7Rogyam Healthcare (P) Ltd's prior consent.Your use of this website and any dispute arising out of such use of the website is subject to the laws of India or other regulatory authority.</li>
                    <li>Other Terms: Credit Card orders will commence on receiving the authorization/confirmation from the Credit Card/respective Payment Gateway companies.</li>
                </ol>
            </div>
            <Footer/>
        </>
    )}
