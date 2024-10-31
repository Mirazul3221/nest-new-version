import React from 'react'

const MyProfile = ({myProfile,setKey}) => {
  return (
    <div className='p-20 md:w-1/2'>
     {myProfile.profile &&  <img className='w-40 h-40 border-4 mx-auto border-gray-400 rounded-full' src={myProfile.profile} alt="My profile" />}
     <h2 className='text-2xl mb-2 font-bold border-b-2 text-center'>{myProfile.name}</h2>
     <div className="flex justify-between gap-3">
     <button onClick={()=>setKey("mailbox")} className='bg-white text-gray-500 duration-500 border py-2 rounded-md w-full flex justify-center items-center'>Cancel</button>
     <button onClick={()=>setKey("otpbox")} className='bg-violet-700 hover:bg-violet-600 text-white duration-500 border py-2 rounded-md w-full flex justify-center items-center'>Continue</button>
     </div>
    </div>
  )
}

export default MyProfile