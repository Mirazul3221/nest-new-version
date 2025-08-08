import { viewurl } from '@/app/config'
import React from 'react'
import { formatRelativeTime } from '../../timeline/components/common'
import { HiArrowPath } from "react-icons/hi2";
const QuestionNotificationCard = ({item}) => {
  return (
      <div className='py-2 border-b mb-2 rounded-md'>
        {item?.message[0]?.requesterProfile}
        <a href={`${viewurl}/userdashboard/timeline/${item?.message[0]?.slug}`}>
         {formatRelativeTime(item?.createdAt)}
        <div className='flex gap-4 items-center'>
<div> <div className="w-20 h-20 relative text-gray-700">
        <HiArrowPath className='absolute bg-white rounded-full shadow-md right-0 bottom-0' color="#7305fa" size={25} />
        <img className='rounded-full' src={item?.message[0].requesterProfie} alt={item?.message[0]?.requesterName} />
        </div></div>
        <div>
        <h2><span className='font-bold text-[#7305fa]'>{item?.message[0]?.requesterName}</span> shared a question {` "${item?.message[0]?.question.slice(0,30)}`}..."</h2>
        </div>
    </div>
        </a>
      </div>
  )
}

export default QuestionNotificationCard
