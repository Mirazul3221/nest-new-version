'use client'
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect } from 'react'
import { useStore } from '../global/DataProvider';
import { baseurl, viewurl } from '../config';
import axios from 'axios';
import ProtectRoute from '../global/ProtectRoute';
import { commonLogout } from '../userdashboard/components/common';

const Page = () => {
    const {store,dispatch} = useStore()
      const searchParams = useSearchParams();
      const val = searchParams.get("id");
      const fetchData = async () => {
        try {
          const { data } = await axios.get(
            `${baseurl}/auth/check-short-link`,
            {
              headers: {
                Authorization: `Bearer ${store.token}`,
              },
            }
          );
         if(data) window.location.href = `${viewurl}/userdashboard/q/${data}`
          // Do something with `data` here (e.g., update state)
        } catch (error) {
          console.error("Error fetching data:", error);
          commonLogout(dispatch, error);
        }
      }
      useEffect(() => {
       if(val) fetchData()
      }, []);
      if(val){
        //  window.location.href = ''
      } else {
        window.location.href = ''
      }

      return <>
       <ProtectRoute>
        <div className='w-screen h-screen flex justify-center items-center overflow-hidden'>
           <p>Loading...</p>
        </div>
       </ProtectRoute>
      </>
}

const Suspen = () => {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
};

export default Suspen;