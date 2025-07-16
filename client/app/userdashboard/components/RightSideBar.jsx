"use client";
import { baseurl, viewurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiOutlineLink } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { LuDatabaseZap, LuLogOut } from "react-icons/lu";
import { PiBookOpenTextDuotone, PiShareNetworkLight } from "react-icons/pi";
import { RiFileEditLine, RiHistoryFill } from "react-icons/ri";
import { RxCopy } from "react-icons/rx";
import { TiDocumentText } from "react-icons/ti";
import { toast, ToastContainer } from "react-toastify";
import { commonLogout } from "./common";
const RightSideBar = ({ me ,rightSideBarData }) => {
  const { store, dispatch } = useStore();
  const [uri, setUri] = useState(null);
  const route = useRouter();
  useEffect(() => {
     const getLink =   JSON.parse(localStorage.getItem('sortLink')) || null;
     setUri(getLink.shortId)
  }, []);
  const share = ()=> {
if (navigator.share) {
  navigator.share({
    title: `Share a link`,
    text: 'Check out this profile link!',
    url: `${viewurl}/u?id=${uri}`
  })
  .then(() => console.log('Successfully shared'))
  .catch((error) => console.error('Share failed:', error));
} else {
  alert('Sharing not supported on this browser');
}
  }
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Link copied to clipboard!');
  } catch (err) {
    toast.error('Failed to copy link.');
  }
};


  const logout = () => {
    dispatch({ type: "logout" });
    route.push("/login");
  };

  function goToQueryPage(val, type) {
    window.location.href = `/userdashboard/q?value=${val}&type=${type}`;
  }

  const redirect = ()=> {
     window.location.href = `/userdashboard/myprofile`; 
  };
  return (
    <div className="w-full h-full md:p-4 p-2 max-h-[dvh] overflow-y-auto">
      <div className="mx-auto border p-4 rounded-md text-center">
        <img onClick={redirect}
          className="w-20 cursor-pointer rounded-full mx-auto border"
          src={me.profile}
          alt={me.name}
        />
        <h3 onClick={redirect} className="md:text-lg cursor-pointer font-semibold">
          {me.name} ({me.status})
        </h3>
        <p>{me.email}</p>
      </div>
          <div className="flex justify-between gap-2 mt-2">
                  <a
        href={`${viewurl}/userdashboard/timeline/create-post`}
        className="flex justify-center gap-1 items-center bg-gray-100  hover:bg-gray-200/60 rounded-md duration-300 md:px-4 px-2 md:py-1 w-full"
      >
        <RiFileEditLine /> Add new
      </a>
            <a
        href={`${viewurl}/userdashboard/timeline/my-questions`}
        className="flex justify-center gap-1 items-center bg-gray-100 hover:bg-gray-200/60 rounded-md duration-300 px-4 py-1 w-full"
      >
        <LuDatabaseZap /> My Store
      </a>

          </div>
    <div className=" bg-gray-100 mt-2 hover:bg-gray-200/60 rounded-md duration-300 px-4 py-1 w-full">
      <div className="flex items-center justify-between">
      <div onClick={share} className="flex cursor-pointer justify-center gap-1 items-center">
        <PiShareNetworkLight size={20} />
        <p className="hidden md:block">Share with your friends</p>
        <p className="md:hidden">Share profile</p>
      </div>
      <div onClick={()=>copyToClipboard(`${viewurl}/u?id=${uri}`)} className="flex cursor-pointer justify-center gap-1 items-center">
       <RxCopy />
        <p>Copy</p>
      </div>
      </div>
      <div className="hidden md:flex gap-1 mt-1">
      <HiOutlineLink />
        <a className="w-full" href={`${viewurl}/u?id=${uri}`}>edu++.vercel.app/u?id={uri}</a>
      </div>
    </div>
      <div className="mt-4">
        {/* Subject & Topic Filters */}
        <div>
          <div className="px-4 py-2 bg-white border mt-2 rounded-md">
            <p className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300">
              <PiBookOpenTextDuotone /> Subject Based Query
            </p>
            {rightSideBarData && rightSideBarData?.map((tag, i) => (
              <h3
                key={i}
                onClick={() => {
                  goToQueryPage(tag.subject, "subject");
                }}
                className="mt-2 space-y-1 hover:text-black duration-200 cursor-pointer"
              >
                {tag.subject}
              </h3>
            ))}
          </div>

          <div className="px-4 py-2 bg-white border mt-2 rounded-md">
            <p className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300">
              <TiDocumentText /> Topic Based Query
            </p>
            {rightSideBarData && rightSideBarData?.map((tag, i) => (
              <div key={i}>
                <h3 className="font-semibold">{tag.subject}</h3>
                {[...tag.chapter].reverse().map((chap, i) => (
                  <p
                    key={i}
                    onClick={() => {
                      goToQueryPage(chap, "chapter");
                    }}
                    className="ml-2 space-y-1 hover:text-black duration-200 cursor-pointer"
                  >
                    {chap}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <a
        href={`${viewurl}/userdashboard/archaiv`}
        className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300 px-4 py-2 mt-2"
      >
        <RiHistoryFill /> History
      </a>
      <a
        href={`${viewurl}/userdashboard/setting`}
        className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300 px-4 py-2"
      >
        <IoMdSettings /> Setting
      </a>
      <div
        onClick={logout}
        className="flex gap-2 mt-2 bg-rose-100 border cursor-pointer items-center hover:bg-rose-200/60 rounded-md duration-300 px-4 py-2"
      >
        <LuLogOut /> Log out
      </div>
          <ToastContainer />
    </div>
  );
};

export default RightSideBar;
