import React from 'react';
import { AppBar } from '../components/AppBar';
import { Footer } from '../components/Footer';

export default function Terms() {
    return (
        <>
            <AppBar />
            <div className="px-48 pb-20 pt-36  bg-[url('/background.jpg')] lg:bg-[url('/services.jpg')] bg-repeat bg-contain min-h-screen flex items-center justify-center">
                <div className="bg-white p-10 rounded-xl shadow-2xl ">           
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
                    <li>You may not create a link to this website from another website or document without 7Rogyam Healthcare (P) Ltd's prior consent.</li>
                    <li>Your use of this website and any dispute arising out of such use of the website is subject to the laws of India or other regulatory authority.</li>
                    <li>Credit Card orders will commence on receiving the authorization/confirmation from the Credit Card/respective Payment Gateway companies.</li>
                </ol>

                {/* Add Privacy Policy sections */}
                <h2 className="text-3xl font-bold mt-10 mb-4">Privacy Policy</h2>
                
                <h3 className="text-lg font-semibold mb-2">Retention of Your Personal Data</h3>
                <p className="mb-4">
                    The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
                </p>
                <p className="mb-4">
                    The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.
                </p>

                <h3 className="text-lg font-semibold mb-2">Transfer of Your Personal Data</h3>
                <p className="mb-4">
                    Your information, including Personal Data, is processed at the Company’s operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.
                </p>
                <p className="mb-4">
                    Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.
                </p>
                <p className="mb-4">
                    The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.
                </p>

                <h3 className="text-lg font-semibold mb-2">Disclosure of Your Personal Data</h3>
                <p className="mb-4">
                    <strong>Business Transactions:</strong> If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
                </p>
                <p className="mb-4">
                    <strong>Law enforcement:</strong> Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).
                </p>
                <p className="mb-4">
                    <strong>Other legal requirements:</strong> The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>Comply with a legal obligation</li>
                    <li>Protect and defend the rights or property of the Company</li>
                    <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                    <li>Protect the personal safety of Users of the Service or the public</li>
                    <li>Protect against legal liability</li>
                </ul>

                <h3 className="text-lg font-semibold mb-2">Security of Your Personal Data</h3>
                <p className="mb-4">
                    The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
                </p>

                <h3 className="text-lg font-semibold mb-2">Children’s Privacy</h3>
                <p className="mb-4">
                    Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.
                </p>
                <p className="mb-4">
                    We also may limit how We collect, use, and store some of the information of Users between 13 and 18 years old. In some cases, this means We will be unable to provide certain functionality of the Service to these users.
                </p>
                <p className="mb-4">
                    If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent’s consent before We collect and use that information.
                </p>

                <h3 className="text-lg font-semibold mb-2">Links to Other Websites</h3>
                <p className="mb-4">
                    Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party’s site. We strongly advise You to review the Privacy Policy of every site You visit.
                </p>
                <p className="mb-4">
                    We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
                </p>
            </div>
            </div> 
            <Footer />
        </>
    );
}
