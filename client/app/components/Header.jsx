import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import Search from "./Search";
import { usePathname, useRouter } from "next/navigation";
const Header = ({}) => {
  const [switcher, setSwitcher] = useState(false);
  const [switcher1, setSwitcher1] = useState(false);
  const route = usePathname()
 //=============set scroll for header================
 const [header,setHeader] = useState(false)
 const scrollHeader = ()=>{
    if (window.scrollY >= 200) {
      setHeader(true)
    } else {
      setHeader(false)
    }
 }
 useEffect(() => {
  window.addEventListener("scroll",scrollHeader)
  return () => {
    window.removeEventListener("scroll",scrollHeader)
  };
 }, []);

  return (
    <div className={`md:p-0 md:px-20 px-4 ${header ? "fixed max-w-[1440px] mx-auto w-full left-0 top-0 bg-white/50 shadow-lg duration-500 z-50 backdrop-blur-md" : ""}`}>
      <div className={`flex justify-between items-center py-3 ${header ? "duration-100" : ""}`}>
        <FaBars
          onClick={() => {
            setSwitcher(true);
            setTimeout(() => {
              setSwitcher1(true);
            }, 200);
          }}
          className={`md:hidden ${header? 'text-black' : 'text-white'}`}
          size={20}
        />

        <div className="hidden sm:3/12 w-7/12 md:flex gap-5 items-center">
          <Logo w={100} />
          <div className="w-1/2">
           {
            route !== '/' && <Search/>
           }
          </div>
        </div>
        <div className="md:hidden block">
          <Logo w={60} />
        </div>
        <div
          className={`md:hidden ${
            switcher ? "left-0" : "-left-[9900px]"
          } bg-black/80 top-0 h-screen fixed w-screen z-50 duration-200`}
        >
          <ul
            className={`bg-white w-2/3 h-full relative ${
              switcher1 ? "left-0" : "-left-[400px]"
            } duration-200 p-4`}
          >
            <div className="absolute right-4 top-4">
              <RxCross2 color="gray"
                onClick={() => {
                  setSwitcher(false);
                  setTimeout(() => {
                    setSwitcher1(false);
                  }, 100);
                }}
                size={30}
              />
            </div>
            <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
              About Us
            </li>
            {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
            Our Team
          </li> */}
            <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
              Service
            </li>
            {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
            Blogs
          </li> */}
            <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
              BCS corner
            </li>
            {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
            Recent News
          </li>
          <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
            Job Circular
          </li> */}
            <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
              Contact Info
            </li>
          </ul>
        </div>

        {/* ============================================================ */}
        <ul className={`md:flex ${header? 'text-gray-700' : 'text-white'} items-center hidden`}>
        <div>
        <li className="text-lg font-normal px-4 py-[4px] w-fit cursor-pointer duration-500 rounded-md">
            About Us
          </li>
        </div>

          {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
            Our Team
          </li> */}
          {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
            Service
          </li> */}
          {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
            Blogs
          </li> */}
          <div>
          <li className={`text-lg font-normal px-4 py-[4px]  ${header? 'text-gray-700' : 'text-white'} w-fit cursor-pointer duration-500 rounded-md`}>
            BCS corner
          </li>
          </div>
          {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
            Recent News
          </li> */}
          {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
            Job Circular
          </li> */}
          
          <div>
            <li className={`text-lg font-normal px-4 py-[4px]  ${header? 'text-gray-700' : 'text-white'} w-fit cursor-pointer duration-500 rounded-md`}>
              Contact Info
            </li>
          </div>
          <Link href={"/register"}>
            <li className="text-lg font-normal px-4 ml-2 py-[2px] text-gray-700 bg-white w-fit cursor-pointer duration-500 rounded-md">
              Join
            </li>
          </Link>
        </ul>
        <Link className="md:hidden" href={"/register"}>
          <div className=" font-normal px-2 ml-2 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] bg-white">
            Join
          </div>
        </Link>
      </div>
       <div className="py-3 md:hidden"> <Search /></div>
    </div>
  );
};

export default Header;
