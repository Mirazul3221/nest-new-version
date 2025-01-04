"use client";
import React, { useState } from "react";
import Image from "next/image";
import register_background from "@/public/register_background.png"
import RegisterScenery from "../components/RegisterScenery";
import ForgetPass from "../components/ForgetPass";
import Otp from "../components/Otp";
import RecoveryPass from "../components/RecoveryPass";
import MyProfile from "../components/MyProfile";
const Page = () => {
    const [key,setKey] = useState("mailbox")
    const [mail,setMail] = useState('')
    const [myProfile,getMyProfile] = useState(null)
    // const getProfilePicFromApi = async ()=>{

    // }
  return (
    <div className="h-screen md:flex md:mt-0 mt-10 items-center justify-center relative max-w-[1440px] mx-auto">
      <div className="md:flex overflow-hidden bg-white rounded-md md:drop-shadow-2xl shadow-black">
      <div className="hidden md:block">
     <img className="h-full" src="/recoverypass.jpg" alt="recoverypass" />
      </div>
      {key == "mailbox" && <ForgetPass setKey={setKey} setMail={setMail} getMyProfile={getMyProfile} />}
      {key ==='myprofile' && <MyProfile myProfile={myProfile} setKey={setKey} mail={mail}/>}
      {key == "otpbox" && <Otp setKey={setKey} mail={mail}/>}
      {key == "setpass" && <RecoveryPass mail={mail}/>}
      </div>
      <div className="absolute -z-10 left-0 bottom-0 w-full">
        <Image className="h-[30vh] md:h-auto" src={register_background} alt="background"></Image>
      </div>
    </div>
  );
};

export default Page;
//
