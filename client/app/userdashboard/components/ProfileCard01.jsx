"use client";
import storeContext from "@/app/global/createContex";
import React, { useContext, useRef, useState } from "react";
import { commonLogout } from "./common";
import axios from "axios";
import { baseurl, viewurl } from "@/app/config";
import AddAndDeleteFriendRequestButton from "./messanger/components/AddAndDeleteFriendRequestButton";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ProfileCard01 = ({ children, id, Handler = null,smt='translate-x-[0%]',lgt="md:-translate-x-[50%]" }) => {
  const { store, dispatch } = useContext(storeContext);
  const [loading, setLoading] = useState(false);
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
      if (store.userInfo.id == id) return;
      const { data } = await axios.get(
        `${baseurl}/auth/get-half-user-data/findbyid/${id}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setUserData(data);
    } catch (error) {
      commonLogout(dispatch, error);
      console.log(error);
    }
  };

  const callData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${baseurl}/auth/get-half-user-data/findbyid/${id}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      Handler(data);
      setLoading(false);
    } catch (error) {
      commonLogout(dispatch, error);
      setLoading(false);
    }
  };

  const viewDetails = () => {
    window.location.href = `${viewurl}/userdashboard/searchusers/${id}`;
  };
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
          className={`absolute hidden group-hover:block z-10 p-2 md:p-6 bg-white ${smt} ${lgt} left-[50%] rounded-2xl shadow-md border 
    md:max-w-[30vw] md:w-max max-w-[80vw]
    ${position === "bottom" ? "top-full" : "bottom-full"}`}
        >
          <div>
            <div className="flex gap-4">
              <div className="md:w-32 w-28">
                <img
                  onClick={viewDetails}
                  className="w-full cursor-pointer border rounded-full"
                  src={userData?.profile}
                  alt={userData?.name}
                />
              </div>
              <div className="w-9/12">
                <h2 className="text-2xl font-semibold">
                  <span className="cursor-pointer" onClick={viewDetails}>
                    {userData?.name}
                  </span>
                  <sup className="text-[12px] -mt-1">({userData?.status})</sup>
                </h2>
                {userData?.title && (
                  <h2 className="text-lg">{userData?.title}</h2>
                )}
                {userData?.description && (
                  <div>
                    <p className="hidden md:block">
                      {userData?.description.slice(0, 150)} ...
                    </p>
                    <p className="md:hidden block">
                      {userData?.description.slice(0, 60)} ...
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center mt-5 gap-4">
              <AddAndDeleteFriendRequestButton
                px="md:px-8"
                py="md:py-2"
                id={id}
              />
              <button
                disabled={loading}
                onClick={callData}
                className="md:px-8 px-3 md:py-2 rounded-md bg-violet-500 text-white"
              >
                {loading ? (
                  <h2 className="mx-auto flex items-center gap-2">
                    <AiOutlineLoading3Quarters
                      className="animate-spin text-gray-700 text-center"
                      size={20}
                    />{" "}
                    Processing...
                  </h2>
                ) : (
                  <p>Message</p>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard01;
