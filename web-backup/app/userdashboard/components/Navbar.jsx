"use client";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { GoHistory } from "react-icons/go";
import { MdOutlineMenuBook } from "react-icons/md";
import { RiNotification3Line } from "react-icons/ri";


const Navbar = () => {
  return (
    <div className="flex gap-4 items-center">
      <ul className="md:w-full md:flex hidden justify-center py-4 gap-3">
        <li
          className={`text-lg font-normal bg-slate-50 px-4 py-[4px] hover:bg-white text-gray-700 w-fit cursor-pointer duration-500 rounded-md`}>
        <Link href={"./myfavourite"} className="flex justify-between items-center gap-2">
        <AiOutlineHeart/>  Favourite</Link>
        </li>
        <li
          className={`text-lg font-normal bg-slate-50 px-4 py-[4px] hover:bg-white text-gray-700 w-fit cursor-pointer duration-500 rounded-md`}>
        <Link href={"./myfavourite"} className="flex justify-between items-center gap-2">
        <GoHistory/>  History</Link>
        </li>
        <li
          className={`text-lg font-normal bg-slate-50 px-4 py-[4px] hover:bg-white text-gray-700 w-fit cursor-pointer duration-500 rounded-md`}>
        <Link href={"./myfavourite"} className="flex justify-between items-center gap-2">
        <MdOutlineMenuBook />  BCS Corner</Link>
        </li>
        <li
          className={`text-lg font-normal bg-slate-50 p-2 hover:bg-white text-gray-700 w-fit cursor-pointer duration-500 rounded-md`}>
        <RiNotification3Line size={22}/>
        </li>
        {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
          Contact Info
        </li> */}
      </ul>
    </div>
  );
};

export default Navbar;
