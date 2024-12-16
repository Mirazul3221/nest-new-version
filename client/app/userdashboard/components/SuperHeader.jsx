"use client";
import Logo from "@/app/components/Logo";
import { baseurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { GoHistory } from "react-icons/go";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiOutlineEnvelope } from "react-icons/hi2";
import Profile from "./Profile";
import Search from "./Search";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useSocket } from "../global/SocketProvider";
import NotificationContainer from "./notification-component/NotificationContainer";
import MessageBox from "./messanger/MessageBox";

const SuperHeader = () => {
  const { store, dispatch } = useContext(storeContext);
  const { socket } = useSocket();
  const [me, setMe] = useState({
    name: "",
    profile: store.userInfo.profile,
    balance:0
  });

  console.log(me)
  useEffect(() => {
    async function fetchData() {
      try {
        const myDetails =JSON.parse(localStorage.getItem('myDetails'))
        setMe({
          id: myDetails._id,
          isOnline: myDetails.isOnline,
          name: myDetails.name,
          profile: myDetails.profile,
          balance: myDetails.balance,
        });
        localStorage.setItem("userId", myDetails._id);
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
  const [loader, setLoader] = useState(0);
  const [notificationList, setNotificationList] = useState(null);

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
  /////////////////////////////Here is the logic for new message come/////////////////////////////////
    const [openMessage,setOpenMessage] = useState(false)
  /////////////////////////////Here is the logic for new notification come//////////////////////////////
  const [openNotif, setOpenNotif] = useState(false);
  useEffect(() => {
    socket &&
      socket.on("new-notification", (id) => {
        console.log(id)
        if (openNotif === true) {
          handleNotification();
          seenAndDeleteNotif();
        } else {
          handleNotification();
        }
      });
    return () => {
      socket && socket.off();
    };
  }, [socket, openNotif]);
  useEffect(() => {
    openNotif && handleNotification();
  }, [openNotif]);


  useEffect(() => {
    handleNotification();
  }, []);
  //  openNotif && seenAndDeleteNotif();
  //////////////////////////////////////////////////////////////////////////////
  const unseenNotification = notificationList?.filter(
    (item) => item.seen === false
  );


  const sayThanks = async (id) => {
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
      socket && (await socket.emit("new-notification", id));
    } catch (error) {
      console.log(error);
    }
  };

  const fullName = me.name?.split(" ");
  const firstname = fullName[0];
  const handleHeaderBox = useCallback((e) => {

    const targetBox = e.target.classList.contains('header-box')
    if (!targetBox) {
    setOpenNotif(false)
    setOpenMessage(false)
    }
  },[])
  useEffect(() => {
    window.addEventListener("click",handleHeaderBox)
    return () => {
      window.removeEventListener('click',handleHeaderBox)
    };
  }, []);

 //=============set scroll for header================
 const [header,setHeader] = useState(false)
 const scrollHeader = ()=>{
    if (window.scrollY >= 40) {
      setHeader(true)
    } else {
      setHeader(false)
    }
 }
 useEffect(() => {
  window.addEventListener("scroll",scrollHeader)
  return () => {
    window.removeEventListener("scroll",scrollHeader)
  };
 }, []);
  return (
    <div className={`${header ? 'fixed top-0 left-0 w-screen z-50 bg-white/50 backdrop-blur-md px-4 md:px-20 py-2' : ''}`}>
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
                    setOpenMessage(!openMessage);
                    setOpenNotif(false);
                  }}
                  className={`text-lg header-box font-normal border relative text-gray-700 p-1 w-fit cursor-pointer duration-500 rounded-full`}
                >
                  {/* <div className={`absolute  -top-1 -right-1`}>
                    {unseenNotification?.length > 0 && (
                      <div
                        className={`bg-[#ff0000] w-[16px] h-[16px] rounded-full flex justify-center items-center`}
                      >
                        <p className="text-white text-[10px]">
                          {unseenNotification.length}
                        </p>
                      </div>
                    )}
                  </div> */}
                  <HiOutlineEnvelope className="header-box" size={26} />
                </li>
                <li
                  onClick={() => {
                    setOpenNotif(!openNotif);
                    setOpenMessage(false)
                    seenAndDeleteNotif();
                  }}
                  className={`text-lg header-box font-normal border relative text-gray-700 p-1 w-fit cursor-pointer duration-500 rounded-full`}
                >
                  <div className={`absolute -top-1 -right-1`}>
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
                  <IoIosNotificationsOutline className="header-box" size={26} />
                </li>
                {/* ==================Open and close message==================== */}

                {openMessage && (
                   <MessageBox/>
                )}
                {/* ==================Open and close notification==================== */}

                {openNotif && (
                   <NotificationContainer notificationList={notificationList} sayThanks={sayThanks}/>
                )}

                {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
          Contact Info//
        </li> */}
              </ul>
            </div>
          </div>
          {/* ///////////////////////////////////////////////////////////////////Notification box for mobile from here///////////////////////////////////////////// */}
          <div
            onClick={() => {
              setOpenNotif(!openNotif);
              seenAndDeleteNotif();
            }}
            className={`text-lg header-box font-normal md:hidden border relative text-gray-700 p-1 w-fit cursor-pointer duration-500 rounded-full`}
          >
            <div className={`absolute -top-1 -right-1`}>
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
            <IoIosNotificationsOutline className="header-box" size={26} />
          </div>
          {openNotif && (
                   <NotificationContainer notificationList={notificationList} sayThanks={sayThanks} setOpenNotif={setOpenNotif}/>
                )}
          {/* ////////////////////////////////////////////////////////////// */}
          <div className="group relative duration-100">
            {me.profile.length > 0 ? (
              <div className="relative">
                <Profile profile={me.profile} myId={me.id} />
                 <div className="absolute w-full">
                 {me?.balance === 0 ? (
                  <h2 className="text-center flex justify-center items-center gap-1">
                    0.00 <span className="font-bold text-[12px]">৳</span>{" "}
                  </h2>
                ) : (
                  <h2 className="text-center text-gray-700">
                    {me?.balance?.toFixed(2) + " ৳"}
                  </h2>
                )}
                 </div>
              </div>
            ) : (
              <div className="w-16 h-16 animate-pulse border-4 bg-gray-100 rounded-full"></div>
            )}
            <div className="space-y-1 hidden group-hover:block py-2 absolute z-10 duration-200 bg-white p-2 rounded-md shadow-md -left-4">
              <Link href={"/userdashboard/myprofile"}>
                <h2 className="flex items-center gap-1 text-violet-700">
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
            Hi <span className="text-violet-700">{firstname + " "}</span>{" "}
            Welcome back
          </h2>
        </div>
        <Search />
      </div>
    </div>
  );
};

export default SuperHeader;
