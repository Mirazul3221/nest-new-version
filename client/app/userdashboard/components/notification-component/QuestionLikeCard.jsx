import { viewurl } from '@/app/config'
import React from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import { formatRelativeTime } from '../../timeline/components/common'

const QuestionLikeCard = ({item}) => {
  return (
      <div className='py-2 border-b mb-2 rounded-md'>
        <a href={`${viewurl}/userdashboard/timeline/${item?.message[0]?.slug}`}>
         {formatRelativeTime(item?.createdAt)}
        <div className='flex gap-4'>
        <div className="w-20 h-20 relative text-gray-700">
        <FaThumbsUp className='absolute right-0 bottom-0' color="#7305fa" size={25} />
        <img className='rounded-full' src={item?.message[0]?.requesterProfile} alt={item?.message[0]?.requesterName} />
        </div>
        <div className='w-9/12'>
        <h2><span className='font-bold text-[#7305fa]'>{item?.message[0]?.requesterName}</span> likes your question {` "${item?.message[0]?.question.slice(0,30)}`}..."</h2>
        </div>
    </div>
        </a>
      </div>
  )
}

export default QuestionLikeCard
