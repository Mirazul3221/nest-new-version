import React from 'react'
import { TbDeviceDesktopCog } from "react-icons/tb";
import { GiArchiveResearch } from "react-icons/gi";
import { BiBook } from "react-icons/bi";
const GridSection = () => {
  return (
    <div>
      <div className="text-center mt-10">
        <h2 className="md:text-2xl text-lg">HOW IT WORKS</h2>
        <h3 className="md:text-5xl text-3xl font-medium md:w-5/12 mx-auto">
          Build your job-winning resume with AI assistance in three simple steps
        </h3>
      </div>
      <div className="md:grid grid-cols-3 gap-10 mt-20">
        <Item
          icone={<TbDeviceDesktopCog size={50} color="#f76da9" />}
          heading={"Step 1"}
          text={"Choose one of our professionally designed resumes."}
          color="bg-rose-100"
        />
        <Item
          icone={<GiArchiveResearch size={50} color="#75fad4" />}
          heading={"Step 1"}
          text={"Choose one of our professionally designed resumes."}
          color="bg-[#e8fff8]"
        />
        <Item
          icone={<BiBook size={50} color="#cd5dfc" />}
          heading={"Step 1"}
          text={"Choose one of our professionally designed resumes."}
          color="bg-[#f7e3ff]"
        />
      </div>
    </div>
  )
}

export default GridSection


export const Item = ({ icone, heading, text, color }) => {
    return (
      <div className="flex relative flex-col bg-white px-8 py-10 group cursor-pointer duration-1000 hover:-translate-y-2">
        <div className="absolute top-0 -z-10 left-0 w-0 group-hover:w-full h-full duration-500 group-hover:bg-[#5D61BF]"></div>
        <div
          className={`icone w-20 h-20 rounded-full ${color} group-hover:bg-white duration-500 group-hover:rotate-[360deg] flex justify-center items-center`}
        >
          {icone}
        </div>
        <div className="">
          <h3 className="text-3xl group-hover:text-white mt-6 font-medium">
            {heading}
          </h3>
          <p className="mt-4 font-medium  group-hover:text-white">{text}</p>
        </div>
      </div>
    );
  };
