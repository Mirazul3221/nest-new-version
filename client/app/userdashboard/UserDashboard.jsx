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
// import Image from "next/image";
// import logo from "@/public/bcs-logo.png"
// import { TextEditor } from './components/TextEditor';

const UserDashboard = () => {
  const [me, setMe] = useState({
    name: "",
    profile: "",
  });
  const { store} = useContext(storeContext);

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
  console.log(socket,myActiveFriends)
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
           <h2 className="text-md cursor-pointer font-semibold text-gray-500 text-balance">
               <a href="./userdashboard/timeline/friend-posts"> See what your friend is doing</a>
            </h2>
            <h2 className="text-md cursor-pointer font-semibold text-gray-500 text-balance">Add a post</h2>
            <h2 className="text-md cursor-pointer font-semibold text-gray-500 text-balance">Your post</h2>
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
