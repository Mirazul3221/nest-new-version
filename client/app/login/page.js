"use client"
import React, { useContext } from "react";
import Image from "next/image";
import register_background from "@/public/register_background.png"
import RegisterScenery from "../components/RegisterScenery";
import InputForm from "../components/Login";
// import storeContext from "../global/createContex";
const page = () => {
  return (
    <div className="md:h-screen h-[94vh] md:flex md:mt-0 mt-10 items-center justify-center relative max-w-[1440px] mx-auto">
      <div className="md:flex bg-white rounded-md md:drop-shadow-2xl shadow-black md:w-2/3">
      <div className="hidden md:block">
      <RegisterScenery />
      </div>
      <InputForm />
      </div>
      <div className="absolute -z-10 left-0 bottom-0 w-full">
        <Image className="h-[30vh] md:h-auto" src={register_background} alt="background"></Image>
      </div>
    </div>
  );
};

export default page;
