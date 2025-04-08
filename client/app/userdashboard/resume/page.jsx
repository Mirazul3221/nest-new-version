'use client'
import React, { useState } from 'react'
import AddExperience from './components/AddExperience'
import ProtectRoute from '@/app/global/ProtectRoute';
import SuperHeader from '../components/SuperHeader';
import AddBio from './components/AddBio';
import Education from './components/Education';

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
<div className="bg-[#fcf7f8] min-h-screen">
<ProtectRoute>
   <div className="md:mx-10 mx-4">
   <SuperHeader/>
  <div className='md:px-20 px-4 py-4'>
      <div className="progres py-[2px] px-1 rounded-full bg-gray-200">
        <div className="inner bg-violet-500 rounded-full duration-500 h-[3px]" style={{width:`${percentage}%`}}></div>
      </div>
      <h2 className='md:text-2xl mt-4 font-semibold text-center text-gray-700 text-ennter'>{
         currentStape === 1 ? "Primary Biodata" :  currentStape === 2 ? "Education" : ""
        
        }</h2>
      {
        currentStape === 1 && <AddBio/>
      }
      {
        currentStape === 2 && <Education/>
      }
      {
        currentStape === 3 &&  <AddExperience/>
      }
     
      <div className="w-full flex justify-between">
            <div onClick={prevStap} className="next">Prev</div>
            <div onClick={nextStap} className="next">Next</div>
      </div>
    </div>
   </div>
 </ProtectRoute>
</div>
  )
}

export default page
