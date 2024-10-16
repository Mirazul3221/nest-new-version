'use client'
// import { useRouter } from 'next/router';
import React from 'react'
import { useEffect } from 'react'

const Effect = () => {
    // const router = useRouter()
    useEffect(() => {
        console.log("effect is opened")
        return () => {
            console.log("effect is closed")
        };
    }, []);
  return (
    <div>Effect</div>
  )
}

export default Effect