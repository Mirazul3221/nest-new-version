"use client";
import Logo from "@/app/components/Logo";
import { baseurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { GoHistory } from "react-icons/go";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoNotificationsOffOutline } from "react-icons/io5";
import Profile from "./Profile";
import Search from "./Search";
import { RiLogoutCircleRLine } from "react-icons/ri";
import InvitationCard from "./notification-component/InvitationCard";
import moment from "moment";

const SuperHeader = () => {
  const { store,dispatch } = useContext(storeContext);
  const [me, setMe] = useState({
    name: "",
    profile: "",
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${baseurl}/auth/find`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });
        setMe({
          id:data._id,
          isOnline: data.isOnline,
          name: data.name,
          profile: data.profile,
          balance: data.balance,
        });
        localStorage.setItem("userId", data._id);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const route = useRouter();
  const logout = () => {
    dispatch({ type: "logout" });
    route.push("/login");
  };

  //==============================notification logic=====================
  const [loader,setLoader] = useState(0)
  // setInterval(() => {
  //   setLoader(()=> loader+1 )
  // },15 * 1000);
  const [notificationList, setNotificationList] = useState(null);
  useEffect(() => {
    const handleNotification = async () => {
      try {
        const { data } = await axios.get(`${baseurl}/notification/find`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });
        setNotificationList(data);
      } catch (error) {}
    };
    handleNotification();
  }, [loader]);
  const unseenNotification = notificationList?.filter(
    (item) => item.seen === false
  );

  const [openNotif, setOpenNotif] = useState(false);
  const [removeNotif, setRemoveNotif] = useState(false);
  //====================================================================
  //====================================================================
  //====================================================================
  const seenAndDeleteNotif = async () => {
    try {
      await axios.get(`${baseurl}/notification/seen-and-delete`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sayThanks =async (id) => {
    try {
      const { data } = await axios.post(
        `${baseurl}/notification/create`,
        { readerId: id, type: "respond-from-invitation" },
        {
          headers: {
            Authorization: `Bearer ${store?.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  const fullName = me.name?.split(" ");
  const firstname = fullName[0];
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="md:w-20 w-16">
          <Link href="/">
            {/* <Image src={logo} alt="bffd" /> */}
            <Logo w={100} />
          </Link>
        </div>
        <div className="w-5/12 hidden md:block">
          <Search />
        </div>
        <div className="flex gap-4 items-center">
          <div className="hidden md:block">
            <div className="flex gap-4 items-center">
              <ul className="md:w-full md:flex hidden justify-center py-4 gap-3">
                <li
                  className={`text-lg font-normal px-4 py-[4px] text-gray-700 w-fit cursor-pointer duration-500 rounded-md`}
                >
                  <Link
                    href={"/userdashboard/myfavourite"}
                    className="flex justify-between items-center gap-2"
                  >
                    <AiOutlineHeart /> Favourite
                  </Link>
                </li>
                <li
                  className={`text-lg font-normal px-4 py-[4px] text-gray-700 w-fit cursor-pointer duration-500 rounded-md`}
                >
                  <Link
                    href={"/userdashboard/myfavourite"}
                    className="flex justify-between items-center gap-2"
                  >
                    <GoHistory /> History
                  </Link>
                </li>
                <li
                  className={`text-lg font-normal px-4 py-[4px] text-gray-700 w-fit cursor-pointer duration-500 rounded-md`}
                >
                  <Link
                    href={"/userdashboard/myfavourite"}
                    className="flex justify-between items-center gap-2"
                  >
                    <MdOutlineMenuBook /> BCS Corner
                  </Link>
                </li>
                <li
                  onClick={() => {
                    setOpenNotif(!openNotif);
                    setRemoveNotif(!removeNotif);
                    seenAndDeleteNotif();
                  }}
                  className={`text-lg font-normal border relative text-gray-700 p-1 w-fit cursor-pointer duration-500 rounded-full`}
                >
                  <div
                    className={`absolute ${
                      removeNotif ? "hidden" : "block"
                    } -top-1 -right-1`}
                  >
                    {unseenNotification?.length > 0 && (
                      <div
                        className={`bg-[#ff0000] w-[16px] h-[16px] rounded-full flex justify-center items-center`}
                      >
                        <p className="text-white text-[10px]">
                          {unseenNotification.length}
                        </p>
                      </div>
                    )}
                  </div>
                  <IoIosNotificationsOutline size={26} />
                </li>
                {/* ==================Open and close notification==================== */}

                {openNotif && (
                  <div className="bg-gray-50 shadow-md absolute z-50 top-[90px] md:w-4/12 overflow-hidden right-12">
                    <div className="text-center rounded-t-lg py-3 bg-gray-200 flex justify-center items-center">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  <div className="overflow-y-scroll h-[70vh]">
                  {notificationList?.length > 0 ? (
                      <div className="rounded-md px-6 w-full">
                        {notificationList?.map((item, i) => {
                          // -------------------------------------------------------------------------------------------------
                          if (item.type === "friend-request") {
                            return (
                              <div key={i} className="mb-4 border-b py-2">
                                <p>{moment(item.createdAt).fromNow()}</p>
                                <div className="flex gap-2">
                                  <img
                                    className="w-20 h-20 rounded-full border-2 border-gray-500"
                                    src={item.message[0].requesterProfie}
                                    alt={item.message[0].requesterName}
                                  />
                                  <div className="">
                                    <h2 className="font-semibold md:text-lg">
                                      {item.message[0].requesterName}
                                    </h2>
                                    <p>
                                      You have got a friend request from{" "}
                                      <span className="text-fuchsia-500">
                                        {item.message[0].requesterName}
                                      </span>{" "}
                                      . Please click{" "}
                                      <Link
                                        className="text-fuchsia-500"
                                        href={"/userdashboard/myprofile"}
                                      >
                                        here
                                      </Link>{" "}
                                      and accept
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          //---------------------------------------------------------------------------------------------------------------
                          if (item.type === "accept-request") {
                            return (
                              <div key={i} className="mb-4 border-b py-2">
                                <p>{moment(item.createdAt).fromNow()}</p>
                                <div className="flex gap-2">
                                  <img
                                    className="w-20 h-20 rounded-full border-2 border-gray-500"
                                    src={item.message[0].requesterProfie}
                                    alt={item.message[0].requesterName}
                                  />
                                  <div className="">
                                    <h2 className="font-semibold md:text-lg">
                                      {item.message[0].requesterName}
                                    </h2>
                                    <p>
                                      <span className="text-fuchsia-500">
                                        {item.message[0].requesterName}
                                      </span>{" "}
                                      Accept your request
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          //-------------------------------------------------------------------------------------------------------------------
                          if (item.type === "invite-friend") {
                            return (
                                <div className="bg-gray-100" key={i}>
                                  <p>{moment(item.createdAt).fromNow()}</p>
                                   <InvitationCard item={item} sayThanks={sayThanks}/>
                                </div>
                            );
                          }

                          if (item.type === "respond-from-invitation") {
                            return (
                              <div key={i} className="mb-4 border-b py-2">
                                  <p>{moment(item.createdAt).fromNow()}</p>
                                <div className=" gap-2 flex">
                                  <div className="w-1/2">
                                  <div className="relative w-fit">
                                    <img
                                      className="w-20 h-20 rounded-full border-2 border-gray-500"
                                      src={item.message[0].requesterProfie}
                                      alt={item.message[0].requesterName}
                                    />
                                    <h2 className="bg-fuchsia-300 w-10 h-10 rounded-full absolute text-white text-[10px] p-1 border-2 border-white flex justify-center items-center -bottom-2 -right-3">
                                      {item?.message[0]?.requesterStatus}
                                    </h2>
                                  </div>
                                  </div>
                                  <div className="">
                                    <h2 className="font-semibold md:text-lg ml-2 text-gray-700">
                                      {item?.message[0]?.requesterName}
                                    </h2>
                                    <p className="ml-2 text-gray-600">
                                    Thank you {item?.message[0]?.responderName} for the invitation. I am happy as you remember me and inform for  reading
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          }


                          if (item.type === "reading-notification") {
                            return (
                              <div key={i} className="mb-4 border-b py-2">
                                  <p>{moment(item.createdAt).fromNow()}</p>
                                <div className=" gap-2 flex">
                                  <div className="w-1/2">
                                  <div className="relative w-fit">
                                    <img
                                      className="w-20 h-20 rounded-full border-2 border-gray-500"
                                      src={item.message[0].requesterProfie}
                                      alt={item.message[0].requesterName}
                                    />
                                    <h2 className="bg-fuchsia-300 w-10 h-10 rounded-full absolute text-white text-[10px] p-1 border-2 border-white flex justify-center items-center -bottom-2 -right-3">
                                      {item?.message[0]?.requesterStatus}
                                    </h2>
                                  </div>
                                  </div>
                                  <div className="">
                                    <h2 className="font-semibold md:text-lg ml-2 text-gray-700">
                                      {item?.message[0]?.requesterName}
                                    </h2>
                                    <p className="ml-2 text-gray-600">
                                      {`${item.message[0].requesterName} has already completed 50+ question from "${item.message[0].topic}"`}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          //-------------------------------------------------------------------------------------------------------------------------
                        })}
                      </div>
                    ) : (
                      <div className="h-full w-full text-gray-300 flex justify-center items-center">
                        <div>
                          <IoNotificationsOffOutline
                            className="w-fit mx-auto"
                            size={40}
                          />
                          <p className="mt-2">Notification Not Found</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="py-3 bg-gray-200"></div>
                  </div>
                )}

                {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
          Contact Info//
        </li> */}
              </ul>
            </div>
          </div>
          <div className="group relative duration-100">
            {me.profile.length > 0 ? (
              <div className="relative">
                <Profile profile={me.profile} myId={me.id}/>
                {me.balance === 0 ? (
                  <h2 className="text-center flex justify-center items-center gap-1">
                    0.00 <span className="font-bold text-[12px]">৳</span>{" "}
                  </h2>
                ) : (
                  <h2 className="text-center text-gray-700">
                    {me.balance.toFixed(2) + " ৳"}
                  </h2>
                )}{" "}
              </div>
            ) : (
              <div className="w-16 h-16 animate-pulse border-4 bg-gray-100 rounded-full"></div>
            )}
            <div className="space-y-1 hidden group-hover:block py-2 absolute z-10 duration-200 bg-white p-2 rounded-md shadow-md -left-4">
              <Link href={"/userdashboard/myprofile"}>
                <h2 className="flex items-center gap-1 text-fuchsia-500">
                  <CgProfile /> Profile
                </h2>
              </Link>
              <h2
                onClick={logout}
                className="cursor-pointer text-white text-sm flex items-center gap-1 px-2 rounded-md bg-[#ff8d85]"
              >
                <RiLogoutCircleRLine /> Logout
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div className="gap-1 justify-between md:flex my-3">
          <h2 className="text-md font-semibold text-gray-500 text-balance">
            Hi <span className="text-[#d000ff]">{firstname + " "}</span> Welcome
            back
          </h2>
        </div>
        <Search />
      </div>
    </div>
  );
};

export default SuperHeader;
