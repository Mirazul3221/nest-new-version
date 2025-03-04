import { baseurl } from '@/app/config';
import { useStore } from '@/app/global/DataProvider';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddAndDeleteFriendRequestButton from './messanger/components/AddAndDeleteFriendRequestButton';

const NearbyUserProfileCard = () => {
    const {store} = useStore()
    const [loading,setLoading] = useState(false)
    const [nearby,setNearby] = useState(null)
    useEffect(() => {
        const nearbyUsers = async () => {
          setLoading(true)
          try {
            const { data } = await axios.get(`${baseurl}/auth/user/nearby`, {
              headers: {
                Authorization: `Bearer ${store.token}`,
              },
            });
            setLoading(false)
            console.log(data)
            setNearby(data)
          } catch (error) {
            console.log(error);

          }
        };
        nearbyUsers();
      }, []);
  return (
    <div className='flex gap-4 items-center'>{
      nearby?.map(u=>{
        return (
          <div className="flex gap-6 items-center border rounded-xl bg-white py-1 px-3">
              <div className="profile flex gap-2 items-center">
                <img className='w-12 rounded-full' src={u?.profile} alt={u?.name} />
                <div className="details">
                  <h3 >{u?.name}</h3>
                  <h3 className='text-sm'>{u?.status}</h3>
                </div>
              </div>
              <AddAndDeleteFriendRequestButton id={u?._id}/>
          </div>
        )
      })
    }</div>
  )
}

export default NearbyUserProfileCard