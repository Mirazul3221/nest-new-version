import React from "react";
import laptop from "@/public/laptop-view.png";
import Image from "next/image";
const BannerSection = () => {
  return (
    <div className="md:px-20 md:h-screen relative">
      {/* <div className="fixed -z-10 top-0 left-0 overflow-hidden w-screen h-screen">
        <div className="absolute -top-10 md:h-[110vh] h-[70vh] w-[200vw] bg-gray-300 -z-10 rotate-12 -left-20 md:-left-48"></div>
      </div> */}
      <div className="md:flex justify-between md:mt-10 items-center p-4">
        <div className="md:w-1/2 laptop-anim hidden md:block">
          <Image className="md:pt-20" src={laptop} alt="laptop-view" />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl text-gray-700">A New Way to Learn</h2>
          <h2 className="text-lg">
            This is the best platform to help you enhance your skills, expand
            your knowledge and prepare for BCS exam.
          </h2>
        </div>
        <Image
          className="md:pt-20 md:hidden md:w-1/2"
          src={laptop}
          alt="laptop-view"
        />
      </div>
    </div>
  );
};

export default BannerSection;
