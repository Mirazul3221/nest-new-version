import Image from 'next/image'
import React from 'react'
import registerImg from "@/public/register.jpg"

const RegisterScenery = () => {
  return (
    <Image className='w-full' src={registerImg} alt='Register your account'/>
  )
}

export default RegisterScenery
