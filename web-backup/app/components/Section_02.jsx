import React from 'react'
import { section2_data } from '../global/appData'

const Section_02 = () => {
  return (
    <div className='bg-gray-100 py-10 min-h-screen w-full border-t'>
      <h3 className='md:text-[32px] mb-6 text-center'>জনপ্রিয় কিছু ফিচার/গুণাবলী</h3>
       <div className="card space-y-10 md:space-y-0 px-4 md:grid mx-auto grid-cols-3 gap-4 md:px-20">
       
       <div className="item-01 hover:bg-violet-100 duration-100 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 relative rounded-2xl p-6 shadow-md overflow-hidden">
        <div className="h-1 text-gray-700 w-full bg-violet-500 left-0 bottom-0 absolute"></div>
            <span className='text-violet-400'>{section2_data[0].emoji}</span>
            <h2 className='py-2 mt-2 text-lg font-semibold'>{section2_data[0].title}</h2>
            <p className='mb-4'>{section2_data[0].description}</p>
            <a className='py-2 px-4 rounded-md text-white bg-violet-400' href="#">Read more</a>
       </div>
       {/* ---------------------------------------------------- */}
       <div className="item-02 hover:bg-[#bde4fc]/50 duration-100 bg-gradient-to-r from-[#ccebff]/50 via-[#f3fade]/50 to-[#faebde]/50 relative rounded-2xl p-6 shadow-md overflow-hidden">
        <div className="h-1 text-gray-700 w-full bg-[#47b2f5] left-0 bottom-0 absolute"></div>
            <span className='text-[#47b2f5]'>{section2_data[1].emoji}</span>
            <h2 className='py-2 mt-2 text-lg font-semibold'>{section2_data[1].title}</h2>
            <p className='mb-4'>{section2_data[1].description}</p>
            <a className='py-2 px-4 rounded-md text-white bg-[#47b2f5]' href="#">Read more</a>
       </div>
       {/* ---------------------------------------------------- */}
       <div className="item-02 hover:bg-[#fcc2f9]/50 duration-100 bg-gradient-to-r from-[#fcdcfa]/50 via-[#f1fcdc]/50 to-[#dcddfc]/50 relative rounded-2xl p-6 shadow-md overflow-hidden">
        <div className="h-1 text-gray-700 w-full bg-[#f75eed] left-0 bottom-0 absolute"></div>
            <span className='text-[#f75eed]'>{section2_data[2].emoji}</span>
            <h2 className='py-2 mt-2 text-lg font-semibold'>{section2_data[2].title}</h2>
            <p className='mb-4'>{section2_data[2].description}</p>
            <a className='py-2 px-4 rounded-md text-white bg-[#f75eed]' href="#">Read more</a>
       </div>

       {/* ---------------------------------------------------- */}
       <div className="item-02 hover:bg-[#fcc2f9]/50 duration-100 bg-gradient-to-r from-[#617eff]/20 via-[#f7e5c8]/50 to-[#dcddfc]/50 relative rounded-2xl p-6 shadow-md overflow-hidden">
        <div className="h-1 text-gray-700 w-full bg-[#617eff] left-0 bottom-0 absolute"></div>
            <span className='text-[#617eff]'>{section2_data[3].emoji}</span>
            <h2 className='py-2 mt-2 text-lg font-semibold'>{section2_data[3].title}</h2>
            <p className='mb-4'>{section2_data[3].description}</p>
            <a className='py-2 px-4 rounded-md text-white bg-[#617eff]' href="#">Read more</a>
       </div>

       {/* ---------------------------------------------------- */}
       <div className="item-02 hover:bg-[#f7ac34]/30 duration-100 bg-gradient-to-r from-[#f7ac34]/20 via-[#f7e5c8]/50 to-[#f7f7ad]/50 relative rounded-2xl p-6 shadow-md overflow-hidden">
        <div className="h-1 text-gray-700 w-full bg-[#f7ac34] left-0 bottom-0 absolute"></div>
            <span className='text-[#f7ac34]'>{section2_data[4].emoji}</span>
            <h2 className='py-2 mt-2 text-lg font-semibold'>{section2_data[4].title}</h2>
            <p className='mb-4'>{section2_data[4].description}</p>
            <a className='py-2 px-4 rounded-md text-white bg-[#f7ac34]' href="#">Read more</a>
       </div>

       {/* ---------------------------------------------------- */}
       <div className="item-02 hover:bg-[#62d17c]/30 duration-100 bg-gradient-to-r from-[#62d17c]/20 via-[#a4d6f5]/50 to-[#a4f5d7]/50 relative rounded-2xl p-6 shadow-md overflow-hidden">
        <div className="h-1 text-gray-700 w-full bg-[#62d17c] left-0 bottom-0 absolute"></div>
            <span className='text-[#62d17c]'>{section2_data[5].emoji}</span>
            <h2 className='py-2 mt-2 text-lg font-semibold'>{section2_data[5].title}</h2>
            <p className='mb-4'>{section2_data[5].description}</p>
            <a className='py-2 px-4 rounded-md text-white bg-[#62d17c]' href="#">Read more</a>
       </div>
         {/* {
            section2_data.map((item,i)=>{
                return (
                    <div key={i} className={`px-6 py-8 shadow-sm border rounded-sm ${i===1 || i === 3 || i === 5 ? "bg-violet-500 text-white" : "bg-white text-gray-700"}`}>
                      <div className={`p-2 border shadow-lg ${i===1 || i === 3 || i === 5 ? "bg-gray-100 text-gray-700 " : 'bg-gray-100 text-gray-700' } w-fit rounded-full`}>{item?.emoji}</div>
                        <h3 className='font-semibold mb-2'>{item.title}</h3>
                        <p>{item.description}</p>
                        <button className={`${i===1 || i === 3 || i === 5 ? "bg-gray-100 text-gray-700" : " bg-violet-500 text-gray-100"} shadow-md px-4 py-1 mt-4 rounded-md`}>Read more</button>

                    </div>
                )
            })
         } */}
       </div>

    </div>
  )
}

export default Section_02
