import React from 'react';

export const Card = () => {
  return (
    <div className='flex justify-center mt-20'>
        <div className='h-60 w-96 border-2 overflow-hidden'>
            <div className='flex justify-between'>
                <img src="/cardlogo.png" alt="logo1" className='h-10 m-2' />
                <img src="/cardlogo2.png" alt="logo2" className='h-24' />
            </div>
            <div className='relative'>
                <div className='absolute -rotate-90 text-xs font-medium text-slate-400' style={{ left: '-20px', top: '20px' }}>Issued on : &nbsp;July/2024</div>
                <img src="/photo.png" className='h-24 absolute' style={{left: '25px', bottom:'-70px'}} alt="" />
                <div className='absolute' style={{left: '125px', bottom:'-80px'}}>
                    <div>
                        <p className='text-custom font-medium text-slate-500'>Name</p>
                        <p className='text-custom1 font-medium'>Raj Singh</p>
                    </div>
                    <div>
                        <p className='text-custom font-medium text-slate-500'>Father/Husband</p>
                        <p className='text-custom1 font-medium'>N S Singh</p>
                    </div>
                    <div>
                        <p>6002180629</p>
                    </div>
                    <div>
                        <p>address</p>
                    </div>
                </div>
                <div className='absolute' style={{left:'250px'}}>
                        <p className='text-custom font-medium text-slate-500'>Gender</p>
                        <p className='text-custom1 font-medium'>Male/26 Yrs</p>
                </div>
                <div className='absolute' style={{left:'260px'}}>
                    <img src="/logo1.jpg" alt="" className='h-20 opacity-25' />  
                </div>
                <div className='absolute' style={{left:'270px', top:'75px'}}>
                    <p className='text-custom1 font-medium'>7007007</p>
                </div>
                <div className='absolute' style={{top:'90px',left:'230px'}}>
                    <img src="/barcode.png" className='h-6' alt="" />
                </div>
                <div className='absolute' style={{top:'118px'}}>
                    <img src="/cardfooter.png" alt="" />
                </div>
            </div>
        </div>

    </div>

  );
};
