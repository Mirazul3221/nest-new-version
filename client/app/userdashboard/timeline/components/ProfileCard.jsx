import { baseurl } from '@/app/config';
import storeContext from '@/app/global/createContex';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'

const ProfileCard = ({id}) => {
    const { store} = useContext(storeContext);
    const [loader,setLoader] = useState(false)
    const [user,setUser] = useState()
    console.log(id)
    useEffect(() => {
      async function fetchData() {
        try {
            setLoader(true)
          const { data } = await axios.get(`${baseurl}/auth/publicuser/findbyid/${id}`, {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          });
          setLoader(false)
          setUser(data)
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }, []);

    console.log(user)
  return (
    <div className='bg-white shadow-lg rounded-2xl border py-4 px-2'>
        {
            loader ? "Loading..." : <div className="max-w-[400px] p-5">
               <div className='flex justify-center items-center gap-2'>
                 <img className='w-[100px]' src={user?.profile} alt={user?.name}/>
                <div className="">
                <h2 className='text-2xl font-semibold'>{user?.name.split(' ')[0]}</h2>
                <h2 className=''>{user?.title}</h2>
                <h2 className=''>{user?.description.slice(0,60)}...</h2>
                </div>
               </div>
               <div className="mt-3 flex justify-center gap-3 items-center">
                <div className="py-2 px-6 cursor-pointer rounded-lg bg-violet-500 text-white">Add friend</div>
                <div className="py-2 px-6 cursor-pointer rounded-lg bg-violet-500 text-white">Message</div>
               </div>
            </div>
        }
    </div>
  )
}

export default ProfileCard