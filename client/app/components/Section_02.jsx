import React from 'react'
import { section2_data } from '../global/appData'

const Section_02 = () => {
  return (
    <div className='bg-gray-50 h-screen w-full border-t flex justify-center items-center'>
       <div className="card md:grid grid-cols-3 items-center gap-4 w-10/12">
         {
            section2_data.map((item,i)=>{
                return (
                    <div key={i} className={`px-6 py-8 shadow-sm border rounded-sm ${i===1 || i === 3 || i === 5 ? "bg-violet-500 text-white" : "bg-white text-gray-700"}`}>
                        <h3 className='font-semibold mb-2'>{item.title}</h3>
                        <p>{item.description}</p>
                        <button className={`${i===1 || i === 3 || i === 5 ? "bg-gray-100 text-gray-700" : " bg-violet-500 text-gray-100"} shadow-md px-4 py-1 mt-4 rounded-md`}>Read more</button>

                    </div>
                )
            })
         }
       </div>

    </div>
  )
}

export default Section_02
