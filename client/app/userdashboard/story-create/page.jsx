"use client";
import React from 'react'
import ProtectRoute from '@/app/global/ProtectRoute'
import SuperHeader from '../components/SuperHeader'

const Page = () => {
  const { store } = [];
  return (
    <div className='h-screen w-screen bg-gray-100'>
   <ProtectRoute>
    <div className="px-4">
        <SuperHeader/>
    </div>
     {/* <div className="md:flex justify-between h-full">
        <div className="w-3/12 bg-white h-full p-4">
           <h2 className='md:text-2xl mt-4 font-semibold text-gray-700'>Your memory</h2>
                   <div className="Add_a_question rounded-md border md:mb-4 mt-1 mb-2 shadow-sm hover:shadow-md cursor-pointer duration-150 bg-white flex items-center gap-4 py-2 px-6">
              <img
                className="w-16 rounded-full"
                src={store?.userInfo?.profile}
                alt={store?.userInfo?.name}
              />
              <a
                className="text-gray-700 text-lg md:font-semibold"
                href="/userdashboard/timeline/create-post"
              >
               {store?.userInfo?.name}
              </a>
              <p
                className="md:hidden cursor-pointer"
              >
                <span>...</span>
              </p>
            </div>
        </div>
        <div className="w-9/12 h-full">fasf</div>
     </div> */}
   </ProtectRoute>
    </div>
  )
}

export default Page
