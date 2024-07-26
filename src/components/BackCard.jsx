import React from 'react';

const BackCard = ({member}) => {
  return (
    <div className="h-60 w-96 relative bg-white border border-gray-300 p-4" id={`card-${member._id}`}>
      <div className="text-center text-lg font-bold mb-2">सुविधाएँ:-</div>
      <div className="text-center text-gray-700 mb-1">
        <p className='text-custom1 font-semibold'>रजिस्टर्ड अस्पतालों, मेडिकल और पैथोलॉजी पर</p>
        <p className='text-custom1 font-semibold'>10-30% तक डिस्काउंट</p>
      </div>
      <div className="flex justify-center mb-2">
        <img src="/frame.png" alt="QR Code" className="w-16 h-16"/>
      </div>
      <div className="text-center text-gray-700 mb-1 px-2">
        <p className='text-custom1 font-semibold'>रजिस्टर्ड अस्पतालों की जानकारी के लिए <strong>QR Code</strong> स्कैन करें।</p>
        <p className='text-custom1 font-semibold'>नया कार्ड बनाने या रिन्यू करने के लिए विजिट करें।</p>
      </div>
      <div className="text-center text-gray-700">
        <a href="http://www.7Rogyam.com" className="underline font-bold text-black-600">www.7Rogyam.com</a>
      </div>
      <div className="absolute w-20 rotate-90 text-gray-700 font-bold text-custom1" style={{top:'110px', left:"325px"}}>वैधता: 2 वर्ष</div>
      <div className="absolute w-60 -rotate-90 text-gray-700 font-bold text-custom1" style={{top:'70px', left:"-105px"}}>7Rogyam Healthcare Pvt. Ltd.</div>
    </div>
  );
};

export default BackCard;
