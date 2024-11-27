'use client'
import ProtectRoute from '@/app/global/ProtectRoute'
import React, { useContext } from 'react'
import SuperHeader from '../../components/SuperHeader'
import Footer from '@/app/components/Footer'
import { useEffect } from 'react'
import { baseurl } from '@/app/config'
import axios from 'axios'
import storeContext from '@/app/global/createContex'

const Page = () => {
    const { store } = useContext(storeContext);
    const fetchMyData = async () => {
        try {
            const { data } = await axios.get(
              `${baseurl}/userquestions/myquestions`,
              {
                headers: {
                  Authorization: `Bearer ${store.token}`,
                },
              }
            );
      console.log(data)
          } catch (error) {
           console.log(error)
          }
    }
    useEffect(() => {
        fetchMyData()
    }, []);
  return (
    <div>
        <ProtectRoute>
            <div className="header md:px-10 py-3">
                <SuperHeader/>
            </div>
            <div className="bg-gray-50 border-t mb-1 min-h-[76vh]">
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </ProtectRoute>
    </div>
  )
}

export default Page