import React from "react";
import laptop from "@/public/laptop-view.png";
import Image from "next/image";
const BannerSection = () => {
  return (
    <div className="md:px-20 px-4 mt-20 md:mt-0 h-[80vh] relative">
      <div className="w-52 hidden md:block absolute top-0 blur-[120px] h-52 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      <div className="w-52 hidden md:block absolute bottom-0 right-0 blur-[120px] h-52 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-[#011852]"></div>
      <div className="md:w-[500px] md:h-[200px] w-[250px] h-[80px] absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] blur-[180px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      {/* <div className="fixed -z-10 top-0 left-0 overflow-hidden w-screen h-screen">
        <div className="absolute -top-10 md:h-[110vh] h-[70vh] w-[200vw] bg-gray-300 -z-10 rotate-12 -left-20 md:-left-48"></div>
      </div> */}
      <div className="md:flex justify-center h-full items-center">
        {/* <div className="md:w-1/2 laptop-anim hidden md:block">
          <Image className="md:pt-20" src={laptop} alt="laptop-view" />
        </div> */}
        <div className="text-white">
          <h2 className="md:text-[70px] md:block hidden font-semibold text-center">
            {"Let's start A New Way to Learn"}
          </h2>
          <h2 className="text-[28px] md:hidden font-semibold text-center">
          {"Let's start A New Way to Learn"}
          </h2>
          <h2 className="text-lg text-center md:w-9/12 mx-auto">
            This is the best platform to help you enhance your skills, expand
            your knowledge and prepare for BCS and other exam.
          </h2>
        </div>
        <Image className="md:hidden mt-10" src={laptop} alt="laptop-view" />
      </div>
    </div>
  );
};

export default BannerSection;
