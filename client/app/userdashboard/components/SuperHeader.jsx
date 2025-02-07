"use client";
import Logo from "@/app/components/Logo";
import { baseurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { fetchAllFriendsByMessage } from "../messanger/components/fetchdata";
import CurrentWindowChecker from "../global/CurrentWindowChecker";

const SuperHeader = () => {
  CurrentWindowChecker()
  const path = usePathname();
  const { store, dispatch } = useContext(storeContext);
  const { socket } = useSocket();
  const [me, setMe] = useState({
    name: "",
    profile: store.userInfo.profile,
    balance: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const myDetails = JSON.parse(localStorage.getItem("myDetails"));
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
  const [openMessage, setOpenMessage] = useState(false);
  const messangerBoxRef = useRef(null);
  useEffect(() => {
    console.log(messangerBoxRef.current);
    function handleClickOutside(event) {
      console.log(event.target);
      console.log(messangerBoxRef.current.contains(event.target));
      if (
        messangerBoxRef.current &&
        !messangerBoxRef.current.contains(event.target)
      ) {
        setOpenMessage(false);
      }
    }

    if (openMessage) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMessage]);

  const [messangerFriends, setMessangerFriends] = useState(null);
  const handleUrl = (friend) => {
    window.open(
      `${viewurl}/userdashboard/messanger/${friend.userName}/${friend.userId}`
    );
    //
  };

  useEffect(() => {
    async function loadmessage() {
      const data = await fetchAllFriendsByMessage(store.token);
      setMessangerFriends(data);
    }
    loadmessage();
  }, []);
  const sortedMessages = messangerFriends?.sort(
    (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
  );

  const unreadMessage = sortedMessages?.reduce((acc, qb) => {
    return acc + qb?.unseenMessageCount;
  }, 0);
  /////////////////////////////Here is the logic for new notification come//////////////////////////////
  const [openNotif, setOpenNotif] = useState(false);
  useEffect(() => {
    socket &&
      socket.on("new-notification", (id) => {
        console.log(id);
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
  //=============set scroll for header================
  const [header, setHeader] = useState(false);
  const scrollHeader = () => {
    if (window.scrollY >= 40) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);
    return () => {
      window.removeEventListener("scroll", scrollHeader);
    };
  }, []);

  const [countUnreadMessage, setCountUnreadMessage] = useState(0);
  async function countMessage() {
    try {
      const { data } = await axios.get(
        `${baseurl}/messanger/count-all-unseen-message`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setCountUnreadMessage(data);
    } catch (error) {}
  }

  useEffect(() => {
    countMessage();
    socket &&
      socket.on("message-from", () => {
        countMessage();
      });
  }, []);

    /////////////////////////////////Here is the logic to check current message window or not//////////////////////////////////////////
  // useEffect(() => {
  //   socket &&
  //     socket.on("get-seen-validation", (data) => {
  //       console.log(data);
  //       // if (data.senderId == id) {
  //       //   console.log("yes");
  //       //   socket &&
  //       //     socket.emit("validation-status", {
  //       //       sender: data.senderId,
  //       //       status: true,
  //       //     });
  //       // }
  //     });
  //   return () => {
  //     socket && socket.off("get-seen-validation");
  //   };
  // }, [socket]);

  const [isOpenMessage, setIsOpenMessage] = useState(false);
  const messageContainerRef = useRef(null);
  const toggleMessage = () => setIsOpenMessage(!isOpenMessage);
  useEffect(() => {
    const handleMessage = (e) => {
      if (
        messageContainerRef.current &&
        !messageContainerRef.current.contains(e.target)
      ) {
        setIsOpenMessage(false);
      }
    };

    if (isOpenMessage) {
      document.addEventListener("mousedown", handleMessage);
    } else {
      document.removeEventListener("mousedown", handleMessage);
    }
    return () => {
      document.removeEventListener("mousedown", handleMessage);
    };
  }, [isOpenMessage]);

  return (
    <div
      className={`font-title ${
        header
          ? "fixed top-0 left-0 w-screen z-50 bg-white/50 backdrop-blur-md px-4 md:px-10 py-2"
          : ""
      }`}
    >
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
                    href={"#"}
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
                {!path.includes("userdashboard/messanger") && (
                  <li
                    onClick={() => {
                      toggleMessage();
                      setOpenNotif(false);
                    }}
                    className={`text-lg header-box font-normal relative text-gray-700 p-1 w-fit cursor-pointer duration-500`}
                  >
                    <div className={`absolute top-1 right-[0px]`}>
                      {countUnreadMessage > 0 && (
                        <div
                          className={`bg-[#ff0000]/90 header-box w-[15px] h-[15px] rounded-full flex justify-center items-center`}
                        >
                          <p className="text-white header-box text-[10px]">
                            {countUnreadMessage > 9
                              ? 9 + "+"
                              : countUnreadMessage}
                          </p>
                        </div>
                      )}
                    </div>
                    <HiOutlineEnvelope className="header-box" size={26} />
                  </li>
                )}
                <li
                  onClick={() => {
                    setOpenNotif(!openNotif);
                    seenAndDeleteNotif();
                  }}
                  className={`text-lg header-box font-normal relative text-gray-700 p-1 w-fit cursor-pointer duration-500`}
                >
                  <div className={`absolute top-1 right-[3px]`}>
                    {unseenNotification?.length > 0 && (
                      <div
                        className={`bg-[#ff0000]/90 header-box w-[15px] h-[15px] rounded-full flex justify-center items-center`}
                      >
                        <p className="text-white header-box text-[10px]">
                          {unseenNotification.length}
                        </p>
                      </div>
                    )}
                  </div>
                  <IoIosNotificationsOutline className="header-box" size={26} />
                </li>
                {/* ==================Open and close message in desktop==================== */}
                {isOpenMessage && (
                  <MessageBox
                    sortedMessages={sortedMessages}
                    setCountUnreadMessage={setCountUnreadMessage}
                    messageContainerRef={messageContainerRef}
                    toggleMessage = {toggleMessage}
                  />
                )}
                {/* ==================Open and close notification in desktop==================== */}

                {openNotif && (
                  <NotificationContainer
                    notificationList={notificationList}
                    sayThanks={sayThanks}
                  />
                )}

                {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
          Contact Info//
        </li> */}
              </ul>
            </div>
          </div>
          {/* ///////////////////////////////////////////////////////////////////message box for mobile from here///////////////////////////////////////////// */}
          {!path.includes("userdashboard/messanger") && (
            <div
              onClick={() => {
                setOpenMessage(!openMessage);
                setOpenNotif(false);
              }}
              className={`text-lg header-box font-normal md:hidden relative text-gray-700 p-1 w-fit cursor-pointer duration-500`}
            >
              <div className={`absolute top-1 right-1`}>
                {unseenNotification?.length == 0 && (
                  <div
                    className={`bg-[#ff0000] w-[16px] h-[16px] rounded-full flex justify-center items-center`}
                  >
                    <p className="text-white text-[10px]">
                      {unseenNotification.length}
                    </p>
                  </div>
                )}
              </div>
              <HiOutlineEnvelope className="header-box" size={26} />
            </div>
          )}
          {openMessage && <MessageBox sortedMessages={sortedMessages} />}
          {/* ///////////////////////////////////////////////////////////////////Notification box for mobile from here///////////////////////////////////////////// */}
          <div
            onClick={() => {
              setOpenNotif(!openNotif);
              seenAndDeleteNotif();
            }}
            className={`text-lg header-box font-normal md:hidden relative text-gray-700 p-1 w-fit cursor-pointer duration-500`}
          >
            <div className={`absolute top-1 right-1`}>
              {unseenNotification?.length == 0 && (
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
            <NotificationContainer
              notificationList={notificationList}
              sayThanks={sayThanks}
              setOpenNotif={setOpenNotif}
            />
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
