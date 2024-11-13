'use client'
import SuperHeader from '@/app/userdashboard/components/SuperHeader'
import React, { useState } from 'react'
import MessageBox from '../../components/MessageContainerLeft'
import { useParams } from 'next/navigation'
import Middle from '../../components/MessageContainerMiddle'

const Page = () => {
  const [userDetails,setUserDetails] = useState(null)
  const path = useParams()
  const [id,setId] = useState(path.id)
  console.log(userDetails)
  return (
    <div className=' w-screen h-screen fixed top-0 left-0'>
      <div className='border-b bg-white px-8 py-2'><SuperHeader/></div>
       <div className='messanger-container h-[75vh] px-8 flex gap-2 justify-between mt-8'>
        <div className='left w-3/12 bg-white'>
           <div className='head pl-4 pt-4 flex gap-2 items-center'>
               <div> <h2 className='w-full'>All message</h2> </div>
              <input className='border px-2 outline-none rounded-md' type='text' placeholder='Search user'/>
           </div>
           <div>
                <MessageBox setId={setId} setUserDetails={setUserDetails}/>
           </div>
        </div>
        <div className='middle w-6/12 bg-white h-full overflow-y-scroll rounded-2xl shadow-sm border-gray-300 border p-4'>
         <Middle id={id}/>
        </div>
        <div className='write w-3/12 bg-white'>right</div>
       </div>
    </div>
  )
}

export default Page