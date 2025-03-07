"use client";
import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import storeContext from "@/app/global/createContex";
import { PiPenLight } from "react-icons/pi";
import { baseurl, viewurl } from "@/app/config";
import Logo from "@/app/components/Logo";
import ProtectRoute from "@/app/global/ProtectRoute";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { GrFormEdit } from "react-icons/gr";
import Footer from "@/app/components/Footer";
import moment from "moment";
import "../components/cssfiles/scrolling_bar.css";
import loaderImage from "@/public/loader.gif";
import waitingImg from "@/public/wating.gif";
import Image from "next/image";
import { ImCamera, ImGit } from "react-icons/im";
import RadarChart from "../components/RaderChart";
import AvatarWrapper from "../components/profileWrapper";
import { GoHistory } from "react-icons/go";
import { FaFacebook } from "react-icons/fa";
import { useSocket } from "../global/SocketProvider";
import SuperHeader from "../components/SuperHeader";
import { RiUserReceived2Line } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import AddAndDeleteFriendRequestButton from "../components/messanger/components/AddAndDeleteFriendRequestButton";
import CallMessageContainer from "../components/messanger/CallMessageContainer";
import { CiUser } from "react-icons/ci";
const Page = () => {
  // SocketInvocation(4356786)
  const [loader, setLoader] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const [controltitle, setControlTitle] = useState(false);
  const [controlDesc, setControlDesc] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(userDetails?.title);
  const [updateDesc, setUpdateDesc] = useState(userDetails?.description);
  const [facebookLink, setFacebookLink] = useState(userDetails?.fblink);
  const [link, setLink] = useState(false);
  const [openMOdel, setOpenModel] = useState(false);
  // const isBrowser = typeof window !== undefined;
  const [percentage, setPercentage] = useState(0);
  const { store } = useContext(storeContext);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${baseurl}/auth/find`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });
        // console.log(data)
        //================================================
        //================ LEVEL SECTION =================
        //================================================
        const bangla_r = data?.totalCountQuestions[0]?.rightAns;
        const bangla_w = data?.totalCountQuestions[0]?.wrongAns;
        const english_r = data?.totalCountQuestions[1]?.rightAns;
        const english_w = data?.totalCountQuestions[1]?.wrongAns;
        const totalReadQuestions = bangla_r + bangla_w + english_r + english_w;
        const percentise = Math.floor(
          ((bangla_r + english_r) / totalReadQuestions) * 100
        );
        setPercentage(percentise), setUserDetails(data);
        setUpdateTitle(data?.title);
        setUpdateDesc(userDetails?.description);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [store.token, controltitle, controlDesc, loader]);
  //========================================
  // if (isBrowser) {
  // }
  if (typeof window !== "undefined") {
    if (openMOdel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  const updateProfile = async () => {
    try {
      setLoader(true);
      await axios.patch(
        `${baseurl}/auth/updateProfile`,
        { profile: preview },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setLoader(false);
      setOpenModel(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
      setOpenModel(false);
    }
  };

  ///===============Update Status===============
  const updateUserTitle = async () => {
    try {
      await axios.post(
        `${baseurl}/auth/updatemyprofile`,
        { key: "title", value: updateTitle },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
    } catch (error) {}
  };

  const updateUserDescription = async () => {
    try {
      await axios.post(
        `${baseurl}/auth/updatemyprofile`,
        { key: "desc", value: updateDesc },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
    } catch (error) {}
  };

  const updateFacebookLink = async () => {
    try {
      await axios.post(
        `${baseurl}/auth/updatemyprofile`,
        { key: "link", value: facebookLink },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );

      setLink(false);
    } catch (error) {}
  };
  const popup = () => {
    setOpenModel(true);
  };

  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(0);

  const onCrop = (view) => {
    setPreview(view);
  };
  const onClose = () => {
    setPreview(0);
  };
  console.log(preview);
  function bytesToKB(bytes) {
    if (typeof bytes !== "number" || isNaN(bytes) || bytes < 0) {
      throw new Error("Invalid value: Must be a non-negative number");
    }
    return bytes / 1024;
  }
  const fileLength = Math.floor(bytesToKB(preview.length || 1) + 3);

  //=======================================================
  const [resize, setResize] = useState(0);
  useEffect(() => {
    const r = window.innerWidth;
    if ((r >= 320 || r >= 375) && r < 425) {
      setResize(240);
    }
    if (r >= 425 && r < 768) {
      setResize(350);
    }
    if (r >= 768 && r < 1024) {
      setResize(350);
    }
    if (r >= 1024 && r < 1440) {
      setResize(350);
    }
    if (r >= 1440 && r < 2560) {
      setResize(350);
    }
    if (r >= 2560) {
      setResize(400);
    }
  }, []);
  const [getAllPendingFriend, setGetAllPendingFriend] = useState(null);
  const [getAllAcceptedFriend, setGetAllAcceptedFriend] = useState(null);
  //////////////////////////////////////////////////////////////////////////////
  console.log(getAllPendingFriend?.length);
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
        setGetAllPendingFriend(data);
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
        setGetAllAcceptedFriend(accepted.data);
      } catch (error) {
        //   setLoader(false);
      }
    }

    getAllFriends();
  }, []);

  //=============================================================
  //=============================================================
  const [accptReq, setAcceptReq] = useState(false);
  const handleAcceptRequest = async (user) => {
    try {
      await axios.get(`${baseurl}/friend-request/${user._id}/respond`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      socket && (await socket.emit("new-notification", user._id));
      handleNotification(user);
      setAcceptReq(true);
    } catch (error) {
      console.log(error);
    }
  };

  //==================================================
  //================================================
  const handleNotification = async (user) => {
    try {
      const { data } = await axios.post(
        `${baseurl}/notification/create`,
        { readerId: user._id, type: "accept-request" },
        {
          headers: {
            Authorization: `Bearer ${store?.token}`,
          },
        }
      );
      await axios.get(`${baseurl}/notification/delete-one/${user.name}`, {
        headers: {
          Authorization: `Bearer ${store?.token}`,
        },
      });
    } catch (error) {}
  };
  const inviteYourFriend = async (id) => {
    try {
      const { data } = await axios.post(
        `${baseurl}/notification/create`,
        { readerId: id, type: "invite-friend" },
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
  const { socket, myActiveFriends } = useSocket();

  const [randNum, setRandNum] = useState();
  useEffect(() => {
    setRandNum(Math.floor(Math.random() * 15) + 1);
  }, []);
  console.log(randNum);
  return (
    <ProtectRoute>
      <div className="md:px-10 px-4 md:py-5 py-2">
        <SuperHeader />
      </div>
      <div className="w-full">
        <img
          className="rounded-t-5xl"
          src={`/cover-photo/background-${randNum}.jpg`}
          alt=""
        />
      </div>
      <div className="md:w-10/12 md:-translate-y-20 md:border md:rounded-t-2xl mx-auto bg-white shadow-md px-5 pb-5">
        <div className="md:-translate-y-[7%] -translate-y-[4%]">
          <div>
            <div className="---profile---">
              <div className="md:w-[200px] w-[120px] md:mx-auto relative">
                {userDetails?.profile?.length > 0 ? (
                  <div className="relative flex justify-center">
                    <div onClick={popup}>
                      <div className="relative group">
                        <div className="absolute w-[120px] md:w-[200px] h-[120px] md:h-[200px] p-0 left-0 rounded-full bg-black/50 duration-100 cursor-pointer flex justify-center items-center scale-0 group-hover:scale-100">
                          <ImCamera color="white" size={50} />
                        </div>
                        {preview.length > 0 ? (
                          <div className="w-[120px] md:w-[200px] h-[120px] md:h-[200px] border-4 border-white rounded-full">
                            <Image
                              width={200}
                              height={200}
                              src={preview}
                              alt={userDetails.name}
                            />
                          </div>
                        ) : (
                          <img
                            className="w-[120px] md:w-[200px] h-[120px] md:h-[200px] border-4 border-white rounded-full"
                            src={userDetails.profile}
                            alt={userDetails.name}
                          />
                        )}
                        <h4 className="absolute bottom-0 right-0 md:right-8 p-2 bg-violet-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex justify-center items-center border-2 md:border-4 border-white text-center text-sm translate-x-[10%] md:translate-x-[30%] text-white translate-y-[20%]">
                          {/* <Image className="rounded-full" src={levelUp} alt="level" /> */}
                          {userDetails.status}
                        </h4>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute md:-translate-y-[45%] w-[200px] h-[200px] bg-white left-0 border-4 border-white rounded-full flex justify-center items-center overflow-hidden">
                    <Image src={waitingImg} alt="loading image" />
                  </div>
                )}
              </div>

              <h1 className="text-center text-2xl text-gray-700 md:text-5xl font-semibold mt-8">
                {userDetails.name}
              </h1>
              <div className="py-2 mx-auto md:w-3/12">
                {controltitle ? (
                  <>
                    <input
                      id="updatetitle"
                      value={updateTitle}
                      className="outline-none updateTitle w-full px-2 py-[3px]"
                      type="text"
                      onChange={(e) => {
                        setUpdateTitle(e.target.value);
                      }}
                      // value={userDetails.title}
                      placeholder="Update your title"
                    />
                    <div className="flex justify-between items-center gap-2 mt-2">
                      <div
                        onClick={() => setControlTitle(false)}
                        className="updateTitle w-1/2 cursor-pointer px-2 bg-gray-200 text-center rounded-md"
                      >
                        Cancel
                      </div>
                      <div
                        onClick={() => {
                          updateUserTitle(), setControlTitle(false);
                        }}
                        className="updateTitle w-1/2 cursor-pointer text-white px-2 bg-violet-700 hover:bg-violet-600 duration-200 text-center rounded-md"
                      >
                        Update
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative w-full text-2xl group">
                      <h2
                        className={`updateTitle ${
                          userDetails.title?.length <= 30
                            ? "text-center text-violet-700"
                            : "text-rose-500"
                        } `}
                      >
                        {userDetails.title?.length <= 0
                          ? "Untitled User"
                          : userDetails.title}
                      </h2>
                      <label
                        onClick={() => setControlTitle(true)}
                        htmlFor="updatetitle"
                      >
                        <div className="group-hover:flex hidden bg-white cursor-pointer w-5 h-5 rounded-full absolute right-0 top-0 justify-center items-center shadow-md">
                          <PiPenLight />
                        </div>
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
            {userDetails && (
              <div>
                <div className="flex gap-2 items-center mt-10">
                  <div className="flex">Online Status : </div>
                  <div className="border border-green-500 flex gap-1 justify-center items-center py-1 px-5 rounded-full">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>{" "}
                    <p className="text-green-500 text-[12px]">Active</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 w-full mt-4 text-gray-700">
                <CiUser />
                  <h3>
                    Member since
                    <span className="font-semibold">
                      {moment(userDetails.createdAt).format("MMM YYYY")}
                    </span>
                  </h3>
                </div>
                <div className="mt-3">
                  <h2 className=" text-gray-600 font-bold">About Me</h2>
                  {controlDesc ? (
                    <>
                      <textarea
                        value={updateDesc}
                        className="updateDesc outline-none w-full border-[1px] p-2"
                        onChange={(e) => {
                          setUpdateDesc(e.target.value);
                        }}
                        rows="5"
                        placeholder="Update description"
                        name="text"
                        id=""
                      ></textarea>
                      <div className="md:flex justify-end pr-4">
                        <div className="flex justify-between items-center md:w-2/12 gap-4 mt-2">
                          <div
                            onClick={() => setControlDesc(false)}
                            className="updateTitle w-1/2 cursor-pointer py-1 px-6 text-center bg-gray-200 rounded-md"
                          >
                            Cancel
                          </div>
                          <div
                            onClick={() => {
                              updateUserDescription(), setControlDesc(false);
                            }}
                            className="updateTitle w-1/2 cursor-pointer text-white py-1 px-6 bg-violet-700 hover:bg-violet-600 duration-200 text-center rounded-md"
                          >
                            Update
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative w-full group">
                        <p
                          className={`updateDesc ${
                            userDetails.description?.length <= 0
                              ? "font-semibold"
                              : ""
                          }`}
                        >
                          {userDetails.description?.length <= 0
                            ? "Write Something about you."
                            : userDetails.description}
                        </p>
                        <div
                          onClick={() => setControlDesc(true)}
                          className="group-hover:flex descriptionValue cursor-pointer hidden bg-white w-8 h-8 rounded-full absolute right-0 top-0 justify-center items-center shadow-md"
                        >
                          <PiPenLight size={22} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {userDetails?.fblink && !link ? (
                  <div className="mt-4 border-t py-2">
                    <div>
                      <h2 className="text-gray-600 font-bold mb-2">
                        Varified facebook profile
                      </h2>
                      <div className="w-fit relative">
                        <label htmlFor="fblink">
                          <div
                            onClick={() => setLink(true)}
                            className="absolute w-5 h-5 hover:scale-150 cursor-pointer duration-300 flex justify-center items-center bottom-0 right-0 bg-white rounded-full"
                          >
                            <GrFormEdit size={20} />
                          </div>
                        </label>
                        <Link
                          className="w-20 h-20"
                          target="blaunk"
                          href={`${userDetails.fblink}`}
                        >
                          <FaFacebook size={80} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mt-4 border-t-2 py-4">
                      <h2 className="text-gray-600 font-bold">
                        Set your facebook profile link
                      </h2>

                      <label
                        className={`cursor-pointer w-fit ${
                          link ? "hidden" : "block"
                        }`}
                        onClick={() => setLink(true)}
                        htmlFor="fblink"
                      >
                        <FaFacebook size={30} />
                      </label>

                      <div className={`mt-2 ${link ? "block" : "hidden"}`}>
                        <input
                          id="fblink"
                          value={facebookLink}
                          onChange={(e) => setFacebookLink(e.target.value)}
                          className="py-2 px-4 w-full"
                          type="text"
                          placeholder="Put your facebook profile link"
                        />
                        <div className="flex md:w-2/12 justify-between items-center gap-4 mt-2">
                          <div
                            onClick={() => setLink(false)}
                            className=" w-1/2 cursor-pointer text-center py-1 px-6 bg-gray-200 rounded-md"
                          >
                            Cancel
                          </div>
                          <div
                            onClick={updateFacebookLink}
                            className=" w-1/2 cursor-pointer text-white py-1 px-6 bg-violet-700 hover:bg-violet-600 duration-200 text-center rounded-md"
                          >
                            Update
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {userDetails ? (
            <div className="md:w-10/12 mx-auto bg-white mt-10 md:mt-0 md:px-10 py-6">
              <h2 className="text-center md:text-3xl text-violet-700 mb-2">
                All The Questions You Have read
              </h2>
              <div>
                <RadarChart resize={resize} userDetails={userDetails} />
              </div>
              <div className="progress_bar relative duration-300 mt-4 w-full bg-gray-200 rounded-full p-[5px]">
                {percentage > 0 && (
                  <div
                    style={{ width: percentage + "%" }}
                    className={`duration-300 ${
                      percentage < 60 ? "bg-[#fc0303]" : "bg-green-500"
                    } h-[3px] rounded-full relative`}
                  >
                    <div
                      className={`absolute -right-[14px] text-white ${
                        percentage < 60 ? "bg-[#fc0303]" : "bg-green-500"
                      } rounded-full -top-12 w-8 h-8 text-[11px] flex justify-center items-center`}
                    >
                      {percentage + "%"}
                      <div
                        className={`w-[3px] ${
                          percentage < 60 ? "bg-[#fc0303]" : "bg-green-500"
                        } h-4 absolute top-6 left-[43%]`}
                      ></div>
                    </div>
                  </div>
                )}
                <div className="flex absolute -bottom-4 justify-between w-full left-0 text-[10px]">
                  <span>0</span>
                  <span>10</span>
                  <span>20</span>
                  <span>30</span>
                  <span>40</span>
                  <span>50</span>
                  <span>60</span>
                  <span>70</span>
                  <span>80</span>
                  <span>90</span>
                  <span>100</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 w-full h-[50vh] flex justify-center items-center animate-pulse">
              Loading...
            </div>
          )}
        </div>

        <div className="bg-white mt-5">
          {getAllPendingFriend?.length > 0 && (
            <div className="box1 mb-4 md:mb-10">
              <h2 className="md:text-2xl flex gap-2 items-center font-semibold">
                <RiUserReceived2Line /> Incoming Friends
              </h2>
              <div className="md:grid grid-cols-3 gap-4">
                {getAllPendingFriend !== null &&
                  getAllPendingFriend?.map((item, i) => (
                    <div
                      key={i}
                      className={`mt-4 bg-gray-100 p-4 ${
                        accptReq ? "hidden" : ""
                      }`}
                    >
                      <img
                        className="w-48 mx-auto border-2 md:border-4 rounded-full"
                        src={item.profile}
                      />
                      <h2 className="text-center text-2xl mt-2">{item.name}</h2>
                      <div className="flex gap-2 mt-2 justify-center items-center">
                        <h2
                          onClick={() => setAcceptReq(true)}
                          className="py-2 px-4 cursor-pointer bg-white rounded-md"
                        >
                          Cancel
                        </h2>
                        <h2
                          onClick={() => {
                            handleAcceptRequest(item);
                          }}
                          className="py-2 px-4 cursor-pointer bg-violet-700 rounded-md text-white"
                        >
                          Accept
                        </h2>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          <div className="box2">
            <h2 className="md:text-2xl flex gap-2 items-center font-semibold">
              <HiOutlineUserGroup /> Friends
            </h2>
            <div className="md:grid grid-cols-3 gap-4">
              {getAllAcceptedFriend !== null &&
                getAllAcceptedFriend?.map((item, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 p-4 rounded-lg border"
                  >

                    <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <div className="relative rounded-full w-fit">
                        {myActiveFriends &&
                        myActiveFriends?.some((O) => O === item._id) ? (
                          <div className="w-3 h-3 border border-white bg-green-500 absolute rounded-full right-3 bottom-1"></div>
                        ) : (
                          <div className="w-3 h-3 border border-white bg-gray-400 absolute rounded-full right-3 bottom-1"></div>
                        )}
                        <img
                          className="w-20 border-2 rounded-full"
                          src={item.profile}
                        />
                      </div>
                      <div>
                        <a
                          href={`${viewurl}/userdashboard/searchusers/${item._id}`}
                        >
                          <h2 className="hover:underline duration-200 font-semibold text-gray-700 mt-2">
                            {item.name}
                          </h2>
                        </a>
                        <h2 className="text-gray-700">
                          Status : {item.status}
                        </h2>
                      </div>
                    </div>
                    {/* <CallMessageContainer id={item?._id} userDetails={item} /> */}
                    <div>
                      <AddAndDeleteFriendRequestButton id={item._id} />
                      {myActiveFriends &&
                        myActiveFriends?.some((O) => O === item._id) && (
                          <h2
                            onClick={() => {
                              inviteYourFriend(item._id);
                            }}
                            className="py-1 px-2 cursor-pointer bg-violet-700 rounded-md text-sm text-white"
                          >
                            Invite
                          </h2>
                        )}
                    </div>
                    </div>
 
                  </div>
                ))}
            </div>
            <button className="text-gray-700 py-2 border bg-gray-100 hover:bg-gray-200 w-full text-center duration-100 rounded-md mt-2">See all your friends</button>
          </div>
        </div>
        <div className="mb-24">
          {userDetails.totalCountQuestions?.map((item, i) => {
            return (
              <div
                key={i}
                className="mt-4 md:hidden border-b items-center gap-2"
              >
                <h2 className="mt-2 mb-1 text-violet-700">{item.sub} : </h2>
                <h2>Correct Answer : {item.rightAns}</h2>
                <h2>Wrong Answer : {item.wrongAns}</h2>
              </div>
            );
          })}
        </div>
        <div className="fixed bottom-0 left-0 w-full">
          <div className="mobile-responsive flex md:hidden justify-around rounded-t-3xl items-center py-4 w-full bg-white">
            <div>
              <div className="p-2 rounded-full bg-gray-200 shadow-md shadow-gray-500">
                <Link href={"/"}>
                  <IoHomeOutline size={30} />
                </Link>
              </div>
            </div>
            <div className="">
              <div
                className={`p-2 rounded-full bg-gray-200 shadow-md shadow-gray-500 scale-110`}
              >
                <Link href={"./myfavourite"}>
                  <AiOutlineHeart size={30} />
                </Link>
              </div>
            </div>
            <div className="">
              <div
                className={` bg-gray-200 shadow-md shadow-gray-500 text-gray-500 p-[11px] rounded-full `}
              >
                <Link href={"./history"}>
                  <GoHistory size={25} />
                </Link>
              </div>
            </div>
            <div className="">
              <div
                className={`shadow-md text-violet-700 shadow-fuchsia-500 duration-500 p-2 rounded-full`}
              >
                <Link href={"./myprofile"}>
                  <CgProfile size={30} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* //======================================MODEL====================================// */}
      <div
        className={`w-screen h-screen top-0 left-0 overflow-hidden bg-black/30 backdrop-blur-sm duration-100 ${
          openMOdel ? "scale-1" : "scale-0"
        } fixed top-0 left-0 z-50 flex justify-center items-center`}
      >
        <div className="max-h-[90vh] h-auto w-screen flex justify-center">
          <div
            style={{ width: resize + 90 }}
            className="hidden_scroll bg-white overflow-auto shadow-lg p-10"
          >
            <div className=" rounded-full w-full flex justify-center items-center">
              <div className="border-2 rounded-full">
                <AvatarWrapper
                  width={200}
                  height={200}
                  imageWidth={resize}
                  onCrop={onCrop}
                  onClose={onClose}
                  borderStyle={{ borderRadius: 10 }}
                  cropRadius={60}
                  minCropRadius={60}
                  labelStyle={{
                    marginLeft: 27,
                    fontWeight: "bold",
                    fontSize: 20,
                    cursor: "pointer",
                    color: "gray",
                  }}
                  label="Select a image"
                  src={src}
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-4 mt-4">
              <div
                onClick={() => setOpenModel(false)}
                className="updateTitle w-1/2 cursor-pointer py-1 px-6 bg-gray-200 text-center rounded-md"
              >
                Cancel
              </div>
              <div
                onClick={() => {
                  if (fileLength > 30 && fileLength < 200) {
                    updateProfile();
                  }
                }}
                className={`updateTitle w-1/2 py-1 px-6 ${
                  loader
                    ? "bg-white text-gray-700 hover:bg-slate-100"
                    : "bg-violet-700 text-white cursor-pointer"
                } hover:bg-violet-600 duration-200 text-center rounded-md`}
              >
                <div className="flex justify-center items-center gap-2">
                  <p>Update</p>{" "}
                  {loader ? (
                    <Image className="w-5" src={loaderImage} alt="loader" />
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={`mt-4 ${
                fileLength > 30 && fileLength < 200
                  ? "text-green-800"
                  : fileLength == 3
                  ? "text-gray-600"
                  : "text-rose-600"
              }`}
            >
              <h2>File size must be between 30.00kb to 200.00kb</h2>
              {fileLength > 10 && (
                <h3>
                  You resize your profile that contains {fileLength}
                  .00kb
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <Footer />
      </div>
      {/* 
      <Avatar
          width={300}
          height={300}
          onCrop={onCrop}
          onClose={onClose}
          cropRadius={90}
          minCropRadius={90}
          src={src}
        />
        <img src={preview} alt="ds" /> */}
    </ProtectRoute>
  );
};

export default Page;
