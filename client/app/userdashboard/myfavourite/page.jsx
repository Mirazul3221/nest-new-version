"use client";
import React from "react";
import ProtectRoute from "@/app/global/ProtectRoute";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { GoHistory } from "react-icons/go";
// import { usePathname } from 'next/navigation';

const Page = () => {
  //  const filterQuestions = (sub)=>{
  //     const filter = allQuestion.filter((question)=>question.subject == sub)
  //     return filter
  //  }
  //  console.log(filterQuestions("English"), allQuestion)
  //===============================
  // const pathNamme = usePathname()
  // console.log(pathNamme)
  return (
    <div className="min-h-screen">
      <ProtectRoute>
        <div className="md:p-20 p-2 md:w-1/2">
          <Link href={"./myfavourite/bangla"}>
            <h2 className="py-2 px-6 mb-1 bg-violet-700 text-center text-white rounded-lg cursor-pointer text-2xl">
              Bangla
            </h2>
          </Link>
          <Link href={"./myfavourite/english"}>
            <h2 className="py-2 px-6 mb-2 bg-violet-700 text-center text-white rounded-lg cursor-pointer text-2xl">
              English
            </h2>
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 w-full px-10">
          <div className="mobile-responsive flex md:hidden justify-between items-center py-4">
            <div className="">
              <div className="p-2 rounded-full bg-gray-200 shadow-md shadow-gray-500">
                <Link href={"/"}>
                  <IoHomeOutline size={30} />
                </Link>
              </div>
            </div>
            <div className="">
              <div
                className={`text-violet-700 scale-110  shadow-md shadow-fuchsia-500 duration-500 p-2 rounded-full`}
              >
                <Link href={"./myfavourite"}>
                  <AiOutlineHeart size={30} />
                </Link>
              </div>
            </div>
            <div className="">
              <div
                className={` bg-gray-200 shadow-md shadow-gray-500 text-gray-500 p-[11px] rounded-full `}
              >
                <Link href={"./history"}>
                  <GoHistory size={25} />
                </Link>
              </div>
            </div>
            <div className="">
              <div
                className={`p-2 rounded-full bg-gray-200 shadow-md shadow-gray-500`}
              >
                <Link href={"./myprofile"}>
                  <CgProfile size={30} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ProtectRoute>
    </div>
  );
};

export default Page;
