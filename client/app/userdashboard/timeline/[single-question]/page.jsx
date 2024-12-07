import ProtectRoute from '@/app/global/ProtectRoute'
import React from 'react'
import SuperHeader from '../../components/SuperHeader'
import Footer from '@/app/components/Footer'

const Page = () => {
  return (
    <div>
        <ProtectRoute>
            <SuperHeader/>
            <Footer/>
        </ProtectRoute>
    </div>
  )
}

export default Page