import React from 'react';

const getCurrentMonthYear = () => {
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${month}/${year}`;
};

const capitalizeFirstLetter = (string) => {
  return string ? string.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()) : 'null';
};

const formatGender = (gender) => {
  return gender ? gender.charAt(0).toUpperCase() : 'null';
};

const HealthCard = ({ member }) => {
  const currentMonthYear = getCurrentMonthYear();

  return (
    <div className='h-60 w-96 border-2 overflow-hidden' id={`card-${member?._id || 'null'}`}>
      <div className='flex justify-between'>
        <img src="/cardlogo.png" alt="logo1" className='h-10 m-2' />
        <img src="/cardlogo2.png" alt="logo2" className='h-24' />
      </div>
      <div className='relative'>
        <div className='absolute -rotate-90 text-custom font-medium text-slate-400' style={{ left: '-25px', top: '20px' }}>
          Issued on: &nbsp;{currentMonthYear}
        </div>
        {member?.photo ? (
          <img src={member.photo} className='h-24 w-20 absolute border-2 border-slate-50' style={{ left: '30px', bottom: '-70px' }} alt="" />
        ) : (
          <div className='h-24 w-20 absolute border-2 border-slate-50' style={{ left: '30px', bottom: '-70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>No Photo</span>
          </div>
        )}
          <div className='absolute max-w-36 h-32' style={{ left: '125px', bottom: '-95px' }}>
            <p className='text-custom font-medium text-slate-500 mt-1'>Covers</p>
            <p className='text-custom2 font-medium'>{capitalizeFirstLetter(member?.name)} &nbsp; {`${formatGender(member?.gender)}/${member?.age || 'null'} Yrs`}</p>
            {member?.additionalMembers?.length > 0 ? (
              member.additionalMembers.map((additionalMember, index) => (
                <p key={index} className='text-custom2 font-medium'>
                  {capitalizeFirstLetter(additionalMember.memberName)} ({`${formatGender(additionalMember.memberGender)}/${additionalMember.memberAge || 'null'} Yrs`})
                </p>
              ))
            ) : (
              <p className='text-custom1 font-medium'>No Additional Members</p>
            )}
          </div>
          <div className='flex items-center mt-2 absolute max-w-36' style={{ left: '270px', bottom: '-40px' }}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            </div>
            <p className='text-custom font-medium pb-2'>{capitalizeFirstLetter(member?.emergencyNumber)}</p>
          </div>
          <div className='flex items-center absolute max-w-36' style={{ left: '270px', bottom: '-60px' }}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <p className='text-custom font-medium'>{`${capitalizeFirstLetter(member?.village)}, ${capitalizeFirstLetter(member?.tehsil)}, ${capitalizeFirstLetter(member?.district)}, ${capitalizeFirstLetter(member?.state)}`}</p>
          </div>
        <div className='absolute' style={{ left: '260px' }}>
          <img src="/logo1.jpg" alt="" className='h-20 opacity-25' />
        </div>
        <div className='absolute' style={{ left: '270px', top: '68px' }}>
          <p className='text-custom1 font-medium'>7&nbsp;007&nbsp;007</p>
        </div>
        <div className='absolute' style={{ top: '90px', left: '230px' }}>
          <img src="/barcode.png" className='h-6' alt="" />
        </div>
        <div className='absolute' style={{ top: '118px' }}>
          <img src="/cardfooter.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default HealthCard;
