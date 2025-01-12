"use client";
import SuperHeader from "@/app/userdashboard/components/SuperHeader";
import React, { useRef, useState } from "react";
import MessageBox from "../../components/MessageContainerLeft";
import { useParams } from "next/navigation";
import Middle from "../../components/MessageContainerMiddle";
import { useEffect } from "react";
import axios from "axios";
import { baseurl } from "@/app/config";
import { useContext } from "react";
import storeContext from "@/app/global/createContex";
import "@/app/userdashboard/components/cssfiles/scrolling_bar.css";
import ProtectRoute from "@/app/global/ProtectRoute";
const Page = () => {
  const { store } = useContext(storeContext);
  const [userDetails, setUserDetails] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const path = useParams();
  const [id, setId] = useState(path.id);
  const fetchUser = async (id) => {
    try {
      const { data } = await axios.get(`${baseurl}/auth/get-profile/${id}`);
      setUserProfile(data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchUser(id);
  }, [id]);

  console.log(userDetails)
  return (
    <ProtectRoute>
        <div className=" w-screen h-screen fixed top-0 left-0">
      <div className="border-b bg-white px-8 py-2">
        <SuperHeader />
      </div>
      <div className="messanger-container px-8 flex gap-2 justify-between mt-4">
        <div className="left w-3/12 bg-white">
          <div className="head pl-4 pt-4 flex gap-2 items-center">
            <div>
              <h2 className="w-full">All message</h2>
            </div>
            <input
              className="border px-2 outline-none rounded-md"
              type="text"
              placeholder="Search user"
            />
          </div>
          <div>
            <MessageBox setId={setId} setUserDetails={setUserDetails} />
          </div>
        </div>
        <div className="border middle rounded-2xl middle w-6/12 h-[82vh]">
          <div className=" bg-white border-gray-300">
            <Middle id={id} userDetails={userProfile} />
          </div>
        </div>
        <div className="write w-3/12 bg-white">
          <div className="overflow-y-auto h-20 text-center">
            Coming Soon
          </div>
        </div>
      </div>
    </div>
    </ProtectRoute>
  );
};

export default Page;
