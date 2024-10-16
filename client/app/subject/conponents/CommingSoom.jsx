import Image from 'next/image'
import React from 'react'
import cmc from '@/public/comming-soon.jpg'
import "../../userdashboard/components/cssfiles/marksmcq.css"

const CommingSoom = () => {
  return (
    <div>
      <div className="min-w-screen min-h-[80vh] flex justify-center items-center">
        <div className="w-1/2 h-1/2 rounded-md flex justify-center items-center">
             <Image className='up_bounce' src={cmc} alt='comming soon alert' />
        </div>
      </div>
    </div>
  )
}

export default CommingSoom
