'use client'
import React from 'react'

const Page = () => {


  return (
       <>
       <main className='h-[20px] bg-green-50'>
           page 1
       </main>
       <div>
        <div className='container mx-auto flex justify-between w-full py-[20px]'>
               <h2 className='h-[300px] bg-fuchsia-400 sticky top-[10px]'>
                vlf ksdajl vadwfa
               </h2>
               <div className='flex flex-col gap-[100px]'>
                   <div className='w-[400px] h-[300px] bg-amber-300'>sdf</div>
                   <div className='w-[400px] h-[300px] bg-green-300'>sdf</div>
                   <div className='w-[400px] h-[300px] bg-rose-300'>sdf</div>
                   <div className='w-[400px] h-[300px] bg-gray-300'>sdf</div>
                   <div className='w-[400px] h-[300px] bg-violet-300'>sdf</div>
                   <div className='w-[400px] h-[300px] bg-amber-300'>sdf</div>
               </div>
        </div>
       </div>
       <main className='h-screen bg-amber-500'>
           page 1
       </main>
       </>
  )
}

export default Page