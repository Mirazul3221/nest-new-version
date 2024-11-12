'use client'
import React from 'react'

const Page = () => {
    const handleData = () => {
        window.history.pushState(null, '', '/new-url'); // You can specify a new path here
    }

  return (
    <div>
        <h3 onClick={handleData}>click</h3>
    </div>
  )
}

export default Page