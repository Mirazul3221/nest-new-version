import React from 'react'
import HorizontalCardScroll from '../components/HorizontalCardScroll'

const page = () => {
  return (
    <div>
        <HorizontalCardScroll>
          {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="min-w-[200px] h-[150px] bg-blue-500 text-white flex items-center justify-center rounded-lg shadow"
          >
            Card {i + 1}
          </div>
        ))}
        </HorizontalCardScroll>
    </div>
  )
}

export default page
