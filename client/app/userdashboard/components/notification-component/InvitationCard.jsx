"use client"
import moment from 'moment';
import React, { useState } from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
const InvitationCard = ({item,sayThanks}) => {
    const [closeInvite,setCloseInvite] = useState(false)
  return (
    <div className={`mb-4 ${closeInvite ? "hidden" : ""} border-b py-2`}>
      <p className='mb-2'>{moment(item.createdAt).fromNow()}</p>
    <div className="flex justify-between items-center gap-2 w-10/12 md:w-7/12">
      <div className="relative w-fit">
        <img
          className="w-20 h-20 rounded-full border-2 border-gray-500"
          src={item.message[0].requesterProfie}
          alt={item.message[0].requesterName}
        />
        <h2 className="bg-violet-500 w-10 h-10 rounded-full absolute text-white text-[10px] p-1 border-2 border-white flex justify-center items-center -bottom-4 -right-4">
          {item?.message[0]?.requesterStatus}
        </h2>
      </div>
      <div className="flex justify-center items-center">
        <IoIosArrowRoundForward size={40}/> <IoIosArrowRoundForward size={30}/> <IoIosArrowRoundForward size={20}/>
      </div>
      <div className="relative w-fit">
        <img
          className="w-12 h-12 rounded-full border-2 border-gray-500"
          src={item?.message[0]?.friendProfie}
          alt={item?.message[0]?.friendProfie}
        />
      </div>
    </div>
    <h2 className="text-gray-500 md:text-md mt-4">
      <span className="font-semibold text-gray-700 text-lg">{item.message[0].requesterName}</span> request you to start reading
    </h2>
    <div onClick={()=>{
      setCloseInvite(true)
      sayThanks(item?.message[0]?.requesterId)
    }} className="py-1 cursor-pointer w-fit px-6 bg-violet-700 text-white rounded-lg">
     {`Say "thank you"`}
    </div>
  </div>
  )
}

export default InvitationCard