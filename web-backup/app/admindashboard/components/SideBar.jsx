"use client";
import storeContext from '@/app/global/createContex';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { FaPlus, FaUserPlus, FaUsers } from 'react-icons/fa'
import { RiLogoutCircleRLine } from "react-icons/ri";

const SideBar = ({nav,setNav}) => {
    //get userinfo from global data====================
    const {store, dispatch } = useContext(storeContext);
  const route = useRouter()
  const logout = () => {
    dispatch({ type: "logout"})
    // localStorage.removeItem('token')
    route.push("/login")
   }
   console.log(store)
  return (
    <div className='bg-white px-8 py-6 h-[83vh] min-w-60'>
        <ul>
        <li onClick={()=>setNav("addQuestion")} className={`flex cursor-pointer gap-2 items-center py-2 px-4 ${nav==="addQuestion" ? "bg-gray-100" : ""} rounded-md font-medium text-gray-600`}><FaPlus/> Add Question</li>
        <li onClick={()=>setNav("addUser")} className={`flex cursor-pointer gap-2 items-center py-2 px-4 ${nav==="addUser" ? "bg-gray-100" : ""} rounded-md font-medium text-gray-600`}><FaUserPlus/> Add User</li>
        <li onClick={()=>setNav("userList")} className={`flex cursor-pointer gap-2 items-center py-2 px-4 ${nav==="userList" ? "bg-gray-100" : ""} rounded-md font-medium text-gray-600`}><FaUsers/> User List</li>
        <li onClick={()=>logout()} className={`flex gap-2 cursor-pointer items-center py-2 px-4 rounded-md font-medium text-gray-600`}><RiLogoutCircleRLine/>Logout</li>
      </ul>
    </div>
  )
}

export default SideBar
