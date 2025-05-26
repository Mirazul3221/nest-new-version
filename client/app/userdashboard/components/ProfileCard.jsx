"use client";
import storeContext from "@/app/global/createContex";
import React, { useContext, useRef, useState } from "react";
import { commonLogout } from "./common";
import axios from "axios";
import { baseurl } from "@/app/config";
import AddAndDeleteFriendRequestButton from "./messanger/components/AddAndDeleteFriendRequestButton";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ProfileCard = ({ children, id, Handler= null}) => {
  const { store, dispatch } = useContext(storeContext);
  const [loading,setLoading] = useState(false)
  const profileRef = useRef(null);
  const windowHeight = window.innerHeight;
  const [position, setPosition] = useState("");
  const [userData, setUserData] = useState(null);
  const knowPosition = async () => {
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      console.log(windowHeight / 2);
      console.log(rect.top);
      if (windowHeight / 2 > rect.top) {
        setPosition("bottom");
        console.log("bottom");
      }
      if (windowHeight / 2 < rect.top) {
        setPosition("top");
        console.log("top");
      }
    }
    try {
      const { data } = await axios.get(
        `${baseurl}/auth/publicuser/findbyid/${id}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setUserData(data);
    } catch (error) {
      commonLogout(dispatch, error);
    }
  };

 const callData = async ()=>{
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${baseurl}/auth/publicuser/findbyid/${id}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      Handler(data)
      setLoading(false)
    } catch (error) {
        commonLogout(dispatch, error);
        setLoading(false)
    }
 }
  return (
    <div
      ref={profileRef}
      onMouseEnter={knowPosition}
      onMouseLeave={() => {
        setPosition("");
        setUserData(null);
      }}
      className="relative w-fit group"
    >
      {children}

      {userData && (
        <div
          className={`absolute hidden group-hover:block z-10 p-6 bg-white md:-translate-x-[30%] rounded-md border 
    md:max-w-[30vw] w-max 
    ${position === "bottom" ? "top-full" : "bottom-full"}`}
        >
          <div>
            <div className="flex gap-4">
              <div className="w-32">
                <img
                  className="w-full rounded-full"
                  src={userData?.profile}
                  alt={userData?.name}
                />
              </div>
              <div className="w-9/12">
                <h2 className="text-2xl font-semibold">
                  {userData?.name}{" "}
                  <sup className="text-[12px] -mt-1">({userData?.status})</sup>
                </h2>
                {userData?.title && (
                  <h2 className="text-lg">{userData?.title}</h2>
                )}
                {userData?.description && (
                  <p>
                    {userData?.description.slice(0, 150)} ...
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center mt-5 gap-4">
               <AddAndDeleteFriendRequestButton px="px-8" py="py-2" id={id} />
               <button disabled={loading} onClick={callData} className="px-8 py-2 rounded-md bg-violet-500 text-white">
                                    {
                                      loading ? <h2 className="mx-auto flex items-center gap-2"><AiOutlineLoading3Quarters className="animate-spin text-gray-700 text-center" size={20} /> Processing...</h2> :   <p>Message</p>
                                    }
               </button>
            </div>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
