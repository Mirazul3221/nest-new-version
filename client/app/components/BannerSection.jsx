import React from "react";
import laptop from "@/public/laptop-view.png";
import Image from "next/image";
import Search from "./Search";
import { isWebGLAvailable } from "../userdashboard/components/common";
import MackBookContainer from "./MackBookContainer";
import Downloadapp from "./Downloadapp";
const BannerSection = () => {
  const webGLAvailable = isWebGLAvailable()
  return (
    <div className="px-4 md:px-10 relative mt-6 md:mt-10">
      {/* <div className="w-52 hidden md:block absolute top-0 blur-[120px] h-52 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div> */}
      <div className="w-52 hidden md:block absolute bottom-0 right-0 blur-[120px] h-52 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-[#011852]"></div>
      <div className="md:w-[500px] md:h-[200px] w-[250px] h-[80px] absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] blur-[180px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      {/* <div className="fixed -z-10 top-0 left-0 overflow-hidden w-screen h-screen">
        <div className="absolute -top-10 md:h-[110vh] h-[70vh] w-[200vw] bg-gray-300 -z-10 rotate-12 -left-20 md:-left-48"></div>
      </div> */}
      <div className="md:flex justify-between gap-8 items-center h-full">
        {/* <div className="md:w-1/2 laptop-anim hidden md:block">
          <Image className="md:pt-20" src={laptop} alt="laptop-view" />
        </div> */}
        <div className="md:w-5/12">
        <div className="hidden md:block">
           <Search py={4} px={6}/>
        </div>
        <div className="text-white">
          <h2 className="md:text-[38px] md:block hidden font-semibold">
            {"Let's start A New Way to Learn"}
          </h2>
          <h2 className="text-[26px] mt-4 md:hidden font-semibold text-center">
          {"Let's start A New Way to Learn"}
          </h2>
          <h2 className="md:text-lg md:w-8/12 px-4 mt-1  md:mt-2 md:px-0 text-center md:text-left mb-4">
            Eduplusplus is a community based MCQ sharing platform to help you enhance your skills, expand
            your knowledge and prepare for BCS and other exam.
          </h2>
          <Downloadapp/>
        </div>
        </div>
        <div className="md:w-7/12 hidden md:block">
            <img className="w-full border-[20px] border-slate-800 rounded-2xl" src="/desktop_view.jpg" alt="eduplusplus" />
        </div>
        <img className="w-full md:hidden border-[20px] border-slate-800 rounded-2xl" src="/mobile_view.jpg" alt="eduplusplus_mobile_view" />
        {/* <Image className="md:hidden mt-10" src={laptop} alt="laptop-view" /> */}

        {/* //////Disable threeD from here/////////// */}

        {/* {
              webGLAvailable ?     <div className="md:w-1/2 h-full -mt-20 md:mt-0"><MackBookContainer/></div> : 'No support threeD'
            } */}
      </div>
    </div>
  );
};

export default BannerSection;
