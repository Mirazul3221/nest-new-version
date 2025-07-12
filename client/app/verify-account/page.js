"use client";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useStore } from "../global/DataProvider";
import { useEffect } from "react";
import { baseurl, viewurl } from "../config";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
    const {dispatch} = useStore()
  const searchParams = useSearchParams();
  const getTokenFromURI = searchParams.get("token");
  const [isVarify, setIsVarify] = useState(false);
  console.log(searchParams);
  const handlesubmit = async () => {
    try {
      let uri = `${baseurl}/auth/user/register`;
      
      const { data } = await axios.post(uri, {token:getTokenFromURI});
      if(typeof window !== 'undefined'){
        localStorage.setItem("token", data.token);
      }

      dispatch({ type: "login_success", paylod: { token: data.token } });
      window.location.href = `${viewurl}/userdashboard`
    setIsVarify(true)
    } catch (error) {
      setIsVarify(false)
      console.log(error)
      toast.error(error.response.data.message)
      if(error.response.data.message == 'Account already exists!'){
      setTimeout(() => {
        window.location.href = `${viewurl}`;
      }, 6000);
      } else {
      setTimeout(() => {
         window.location.href = `${viewurl}/register`
      }, 6000);
      }
    }
  };
useEffect(() => {
handlesubmit()
}, []);//
  return (
    <div className="flex relative justify-center items-center w-screen h-screen bg-slate-100">
           <h2 className="text-gray-50 absolute top-5 text-[50px] md:text-[90px] text-center">EDU++ || ONLINE PLATFORM</h2>
      <div className="md:w-1/2 flex justify-center items-center md:h-1/2 bg-white rounded-2xl p-4">
      <div className="">
               {!isVarify ? (
        <h2 className="mx-auto flex text-gray-700 items-center gap-2">
          <AiOutlineLoading3Quarters
            className="animate-spin text-gray-700 hidden md:block text-center"
            size={40}
          />
          <AiOutlineLoading3Quarters
            className="animate-spin text-gray-700 md:hidden text-center"
            size={20}
          />
           <span className="text-3xl ml-2">Processing...</span>
        </h2>
      ) : (
   <div>
                <h2 className="mx-auto flex text-[#68ed97] items-center gap-2">
          <IoCheckmarkDoneSharp
            className=" text-gray-700 hidden md:block text-center"
            size={40} color="#68ed97"
          />
          <IoCheckmarkDoneSharp
            className=" text-gray-700 md:hidden text-center"
            size={20} color="#68ed97"
          />
           <span className="text-3xl">Done!</span>
        </h2>
        <p className="text-center flex items-center justify-center gap-1 text-sm"><AiOutlineLoading3Quarters
            className="animate-spin text-gray-700 text-center"
            size={10}
          /> Just a moment</p>
   </div>
      )}
      </div>
                 
      </div>
      <ToastContainer />
    </div>
  );
};

const Suspen = () => {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
};

export default Suspen;
