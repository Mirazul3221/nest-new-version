import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
const SearchEngin = ({takeValue}) => {
  return (
    <div className='relative w-1/2'>
      <input onChange={(e)=>takeValue(e.target.value)} className='w-full py-2 px-4 pl-10 border rounded-md' type="search" placeholder='Get your fabourite question' />
      <IoSearchOutline size={25} color='#d000ff' className='absolute top-[50%] left-2 -translate-y-[50%]'/>
    </div>
  )
}

export default SearchEngin