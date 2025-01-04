"use client";
import React from "react";
import Image from "next/image";
import register_background from "@/public/register_background.png";
import InputForm from "../components/Register";
import RegisterScenery from "../components/RegisterScenery";
const page = () => {
  return (
    <div className="h-screen flex items-center justify-center relative max-w-[1440px] mx-auto">
      <div className="md:flex items-center md:p-10 rounded-md bg-white md:drop-shadow-2xl shadow-black md:w-2/3 md:h-[90vh] overflow-hidden w-full p-8">
        <div className="hidden md:block">
          <RegisterScenery />
        </div>
        <InputForm />
      </div>
      <div className="absolute -z-10 left-0 bottom-0 w-full">
        <Image
          className="h-[30vh] md:h-auto"
          src={register_background}
          alt="background"></Image>
      </div>
    </div>
  );
};

export default page;
//
