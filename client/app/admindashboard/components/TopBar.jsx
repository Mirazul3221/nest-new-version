import Image from 'next/image'
import React from 'react'
import logo from '@/public/bcs-logo.png'

const TopBar = () => {
  return (
    <div className='py-4 px-20 mx-10 bg-white flex justify-between items-center'>
      <Image className='w-28' src={logo} alt="gserees"/>
         <h2>Admin</h2>
    </div>
  )
}

export default TopBar
