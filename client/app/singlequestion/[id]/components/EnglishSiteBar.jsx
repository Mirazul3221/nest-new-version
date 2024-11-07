import { englishTopicValue } from '@/app/assistantdashboard/components/data'
import { baseurl } from '@/app/config';
import axios from 'axios';
import React from 'react'

const EnglishSiteBar = ({passTopicTitle,setTopic,setPage}) => {
  const handleFunc =async (topic) => {
    passTopicTitle(topic); 
    try {
      setTopic([])
      const encodedQuery = encodeURIComponent(topic);
      const { data } = await axios.get(
        `${baseurl}/allquestionscollection/publicUser/findbytopic?page=1&limit=10&topic=${encodedQuery}`
      );
       setPage(2)
      setTopic(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='py-2 mb-8'>
        <h3 className='md:text-3xl text-white border-b-4 border-white p-4'>Literature</h3>
      {
        englishTopicValue[0]?.topic.map((val,i)=>{
           return <h4 onClick={()=>handleFunc(val.name)} key={i} className='text-white text-sm md:text-md py-2 px-4 hover:bg-gray-100/10 cursor-pointer duration-150'>{val.name}</h4>
        })
      }

<h3 className='md:text-3xl text-white border-b-4 border-white p-4'>Grammar</h3>
{
    englishTopicValue[1]?.topic.map((val)=>{
       return val.subTopic.map((data,i)=>{
           return <h4  onClick={()=>handleFunc(data)} key={i} className='text-white text-sm md:text-md py-2 px-4 hover:bg-gray-100/10 cursor-pointer duration-150'>{data}</h4> 
        })
   })
      }
    </div>
  )
}

export default EnglishSiteBar
