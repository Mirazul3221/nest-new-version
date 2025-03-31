'use client'
import React, { useState } from 'react'
import AddExperience from './components/AddExperience'
import ProtectRoute from '@/app/global/ProtectRoute';
import SuperHeader from '../components/SuperHeader';
import AddBio from './components/AddBio';

const page = () => {
    const defaultStape = 5;
    const [currentStape,setCurrentStape] = useState(1)
   const nextStap = () => {
    if (currentStape < defaultStape){
      setCurrentStape(currentStape + 1)
    }
   }


   const prevStap = () => {
    if (currentStape > 1){
      setCurrentStape(currentStape - 1)
    }
   }

console.log(currentStape)
const percentage = (currentStape/defaultStape) * 100
  return (
 <ProtectRoute>
  <SuperHeader/>
  <div className='px-20 py-4'>
      <div className="progres py-1 px-1 rounded-full bg-gray-200">
        <div className="inner bg-violet-500 rounded-full duration-500 h-[5px]" style={{width:`${percentage}%`}}></div>
      </div>
      <AddBio/>
      {/* <AddExperience/> */}
      <div className="w-full flex justify-between">
            <div onClick={prevStap} className="next">Prev</div>
            <div onClick={nextStap} className="next">Next</div>
      </div>
    </div>
 </ProtectRoute>
  )
}

export default page
