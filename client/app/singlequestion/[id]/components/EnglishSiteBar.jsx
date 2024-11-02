import { englishTopicValue } from '@/app/assistantdashboard/components/data'
import React from 'react'

const EnglishSiteBar = () => {
  return (
    <div className='py-2'>
        <h3 className='text-3xl text-white border-b-4 border-white p-4'>Literature</h3>
      {
        englishTopicValue[0]?.topic.map((val,i)=>{
           return <h4 key={i} className='text-white py-2 px-4 hover:bg-gray-100/10 cursor-pointer duration-150'>{val.name}</h4>
        })
      }

<h3 className='text-3xl text-white border-b-4 border-white p-4'>Grammar</h3>
{
    englishTopicValue[1]?.topic.map((val)=>{
       return val.subTopic.map((data,i)=>{
           return <h4 key={i} className='text-white py-2 px-4 hover:bg-gray-100/10 cursor-pointer duration-150'>{data}</h4> 
        })
   })
      }
    </div>
  )
}

export default EnglishSiteBar
