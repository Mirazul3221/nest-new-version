'use client'
import { baseurl, viewurl } from '@/app/config'
import storeContext from '@/app/global/createContex';
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';

const MessageBox = ({}) => {
  const { store } = useContext(storeContext);
  const [messangerFriends,setMessangerFriends] = useState(null)
  const fetchAllFriendsByMessage =async ()=>{
     try {
      const {data} =await axios.get(`${baseurl}/messanger/my-friends-by-message`,{
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      })

      setMessangerFriends(data)
     } catch (error) {
      
     }
  }

  useEffect(() => {
    fetchAllFriendsByMessage()
  }, []);

const onlyMyfriends =   messangerFriends?.filter(friend => {
    return friend._id !== store.userInfo.id
  })

  return (
    <div className='absolute top-20 right-20 bg-gray-100 md:w-3/12 md:h-[50vh] border-4 rounded-2xl z-50'>
      {
        onlyMyfriends && onlyMyfriends.map((friend,i)=>{
          return <div key={i}>
            <a target='_blank'  href={`${viewurl}/userdashboard/messanger/${friend.name}/${friend._id}`}>
             <div className="px-6 rounded-2xl py-2 border-b hover:bg-white duration-100">
           <div className="">
                <img src={friend.profile} alt={friend.name}/>
              </div>
              <h2 className='mt-2 text-2xl text-slate-700'>{friend.name}</h2>
             </div>
          </a>
          </div>
        })
      }
        </div>
  )
}

export default MessageBox