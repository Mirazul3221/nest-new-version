import Image from 'next/image'
import React from 'react'
import registerImg from "@/public/register.png"

const RegisterScenery = () => {
  return (
    <div className=' h-full'>
       <Image className='h-full' src={registerImg} alt='Register your account'/>
    </div>
  )
}

export default RegisterScenery
