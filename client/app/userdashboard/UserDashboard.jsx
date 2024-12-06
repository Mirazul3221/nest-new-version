"use client";
import React, { useContext, useEffect, useState } from "react";
import ProtectRoute from "../global/ProtectRoute";
import Link from "next/link";
import storeContext from "../global/createContex";
import Layout from "./components/Slider1";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { GoHistory } from "react-icons/go";
import { Banner } from "../adsterra/Banner";
import Footer from "../components/Footer";
import axios from "axios";
import { baseurl } from "../config";
import Bcs from "./components/Slider2";
import SuperHeader from "./components/SuperHeader";
import { useSocket } from "./global/SocketProvider";

import { HiOutlineDocumentAdd } from "react-icons/hi";
import { GrDocumentText } from "react-icons/gr";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { useStore } from "../global/DataProvider";
// import Image from "next/image";
// import logo from "@/public/bcs-logo.png"
// import { TextEditor } from './components/TextEditor';

const UserDashboard = () => {
  const [me, setMe] = useState({
    name: "",
    profile: "",
  });
  
  const {dispatch,store} = useStore()
  const [show,setShow] = useState(false)
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const { data } = await axios.get(`${baseurl}/bangla/find`, {
  //         headers: {
  //           Authorization: `Bearer ${store.token}`,
  //         },
  //       });

  //       setData(data)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, [store.token]);
  // const filterValue = (val) => {
  //   const returnFilterValue = data?.filter((question) => {
  //     return question.topic === val;
  //   });
  //   return returnFilterValue;
  // };

  // console.log(filterValue('বাঙালি জাতি'))
  const fullName = store.userInfo.name.split(" ");
  const firstname = fullName[0];

  //====================Send data for add balance and level===========================
  useEffect(() => {
    const updateUserData = async (incomingLevel, fund) => {
      try {
        await axios.get(`${baseurl}/auth/updatebalanceandlevel`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });
      } catch (error) {}
    };
    updateUserData();
  }, []);

  const {socket,myActiveFriends} = useSocket()

  //////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    async function getAllFriends() {
      try {
        const { data } = await axios.get(
          `${baseurl}/friend-request/get-friend/pending`,
          {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          }
        );
    console.log(data)
        dispatch({type:'PendingFriend', payload:data})
        //====================================================================================
        //====================================================================================
        //====================================================================================
        const accepted = await axios.get(
          `${baseurl}/friend-request/get-friend/accepted`,
          {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          }
        );
       dispatch({type:'AcceptedFriend', payload:accepted.data})
      } catch (error) {
        //   setLoader(false);
      }
    }

    getAllFriends();
  }, []);
  return (
    <ProtectRoute>
      {/* <Script
        type="text/javascript"
        src="//pl23641250.highrevenuenetwork.com/9d/dd/06/9ddd062e14b034f4d6043be8bf0a1f91.js"
      /> */}
      <div className="min-h-screen max-w-screen overflow-hidden bg-gray-50">
        <div className="bg-white border-b px-10 py-4">
          <SuperHeader/>
          <div className="gap-1 mt-8 hidden md:flex justify-between items-center my-3 px-4">
            <h2 className="md:text-2xl text-md font-semibold text-gray-500 text-balance">
              Hi <span className="text-violet-700">{firstname + " "}</span>{" "}
              Welcome back
            </h2>
           <div className="md:flex items-center gap-4">
            <h2 className="text-md cursor-pointer font-semibold text-gray-500 text-balance"> <a href="./userdashboard/timeline/friends-question">{`Questions added by friends`}</a></h2>
            <h2 className="text-md cursor-pointer font-semibold text-gray-500 text-balance"> <a href="./userdashboard/timeline/create-post">Add a post</a></h2>
            <h2 className="text-md cursor-pointer font-semibold text-gray-500 text-balance"> <a href="./userdashboard/timeline/my-questions">Your post</a> </h2>
           </div>
          </div>
          {/* /////////////mobile Responsive///////////////// */}
          <div className="md:hidden duration-500 text-gray-700 space-y-1">
          <div className="flex justify-end mt-2">
            {
              show ? <div onClick={()=>setShow(false)} className="p-1 w-fit bg-gray-50 border border-gray-100 rounded-md"><LuMinus size={25}/></div> : <div onClick={()=>setShow(true)} className="p-1 w-fit bg-gray-50 border border-gray-100 rounded-md"> <GoPlus size={25}/></div>
            }
          </div>
        <div className={`overflow-hidden ${show ? "max-h-[300px] duration-500" : "max-h-0 duration-500"}`}>
        <div className="flex items-center gap-1 bg-gray-50 mt-2 border border-gray-100 rounded-md w-fit py-1 px-3">
              <GrDocumentText/>
               {"Friend's Questions"}
            </div>
            <a href="/userdashboard/timeline/my-questions">
                <p className="flex items-center gap-1  bg-gray-50 mt-2 border border-gray-100 rounded-md w-fit py-1 px-3" >
                <GrDocumentText/>
                 {"Friend's Questions"}
                </p>
              </a>
              <a href="/userdashboard/timeline/my-questions">
                <p className="flex items-center gap-1  bg-gray-50 mt-2 border border-gray-100 rounded-md w-fit py-1 px-3" >
                <GrDocumentText/>
                My Questions
                </p>
              </a>
              <a href="/userdashboard/timeline/create-post">
                <p className="flex items-center gap-1  bg-gray-50 mt-2 border border-gray-100 rounded-md w-fit py-1 px-3" >
                <HiOutlineDocumentAdd/>
                Add a Questions
                </p>
              </a>
        </div>
          </div>
        </div>
        <div className="wrapper md:px-10 px-4 md:py-4 pt-4">
          <div className="p-4">
            <h2 className="text-violet-700 md:text-2xl font-bold">
              Subject Based Study
            </h2>
            <Layout />
          </div>
          <div className="p-4">
            <h2 className="text-violet-700 md:text-2xl font-bold">
              Previous BCS Questions
            </h2>
            {/* <BcsLayout/> */}
            <Bcs />
          </div>
          <div className="hidden md:block">
            <Banner />
          </div>
        </div>
        <div className="fixed bottom-0 md:hidden left-0 w-full px-10 py-4 bg-white rounded-t-md">
          <div className="mobile flex w-full justify-between">
            <div className="">
              <div className="text-violet-700 scale-110  shadow-md shadow-fuchsia-500 duration-500 p-2 rounded-full">
                <Link href={"/"}>
                  <IoHomeOutline size={30} />
                </Link>
              </div>
            </div>
            <div className="">
              <div
                className={` bg-gray-200 shadow-md shadow-gray-500 text-gray-500 p-2 rounded-full `}
              >
                <Link href={"./userdashboard/myfavourite"}>
                  <AiOutlineHeart size={30} />
                </Link>
              </div>
            </div>
            <div>
              <div
                className={` bg-gray-200 shadow-md shadow-gray-500 text-gray-500 p-[11px] rounded-full `}
              >
                <Link href={"./userdashboard/history"}>
                  <GoHistory size={25} />
                </Link>
              </div>
            </div>
            <div className="">
              <div
                className={`p-2 rounded-full bg-gray-200 shadow-md shadow-gray-500 text-gray-500`}
              >
                <Link href={"./userdashboard/myprofile"}>
                  <CgProfile size={30} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        {" "}
        <Footer />
      </div>
    </ProtectRoute>
  );
};
export default UserDashboard;
