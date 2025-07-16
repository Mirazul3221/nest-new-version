"use client";
import { baseurl, viewurl } from "@/app/config";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import banner from "@/public/banner/profile-banner.jpg";
import { IoPersonAdd } from "react-icons/io5";
import moment from "moment";
import { LuUser2 } from "react-icons/lu";
import RadarChart from "@/app/userdashboard/components/RaderChart";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import ProtectRoute from "@/app/global/ProtectRoute";
import storeContext from "@/app/global/createContex";
import { toast, ToastContainer } from "react-toastify";
import SuperHeader from "../../components/SuperHeader";
import Link from "next/link";
import Messanger from "../../components/messanger/Messanger";
import { useSocket } from "../../global/SocketProvider";
import CallMessageContainer from "../../components/messanger/CallMessageContainer";
import AddAndDeleteFriendRequestButton from "../../components/messanger/components/AddAndDeleteFriendRequestButton";
import { CiUser } from "react-icons/ci";
import { commonLogout } from "../../components/common";

const Page = () => {
  const pram = useParams();
  const user = pram.user;
  const [userDetails, setUserDetails] = useState();
  const [percentage, setPercentage] = useState(0);
  const [myUserId, setMyUserId] = useState(0);
  const [acceptedFriendsId, setAcceptedFriendsId] = useState(null);
  const [loderReq, setLoaderReq] = useState(false);
  const [openMessangerBox, setOpenMessangerBox] = useState(true);
  const [openMessangerBox1, setOpenMessangerBox1] = useState(false);
  const { store, dispatch } = useContext(storeContext);
  const { socket, myActiveFriends } = useSocket();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        //   setLoader(true);
        const { data } = await axios.get(
          `${baseurl}/auth/publicuser/findbyid/${user}`
        );
        setMyUserId(localStorage.getItem("userId"));
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
        // setAllQuestions(totalReadQuestions),
        setPercentage(percentise), setUserDetails(data);
        someUserProAndIds(data?._id);
        //   setLoader(false);
        //===========================================================================
        //===========================================================================
        const allFriendId = await axios.get(
          `${baseurl}/friend-request/get-friend/acceptedFriendId`,
          {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          }
        );
        setAcceptedFriendsId(allFriendId?.data);
        //======================================================================
        //======================================================================
      } catch (error) {
        //   setLoader(false);
        console.log(error);
        commonLogout(dispatch, error);
      }
    };
    fetchUser();
  }, []);
  //=======================================================
  //=======================================================
  const [someFriendProfileAndId, setSomeFriendProfileAndId] = useState(null);
  const someUserProAndIds = async (id) => {
    try {
      const someFriendsProfileAndId = await axios.get(
        `${baseurl}/friend-request/get-your-friend/${id}/somefriendandid`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      someOfMyFriend(id);
      setSomeFriendProfileAndId(someFriendsProfileAndId.data);
    } catch (error) {
      commonLogout(dispatch, error);
    }
  };
  //=======================================================
  //=======================================================
  const [someOfMyFriendDetails, setSomeOfMyFriendDetails] = useState(null);
  const someOfMyFriend = async (id) => {
    try {
      const someFriendsProfileAndId = await axios.get(
        `${baseurl}/friend-request/get-your-friend/${id}/somefriend`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setSomeOfMyFriendDetails(someFriendsProfileAndId.data);
    } catch (error) {
      commonLogout(dispatch, error);
    }
  };

  const hasInList = acceptedFriendsId?.includes(userDetails._id);
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
  ////////////////////////friend request api////////////////////////
  const friendRequestApi = async (recipient) => {
    try {
      //   setLoader(true);
      setLoaderReq(true);
      const { data } = await axios.post(
        `${baseurl}/friend-request/add`,
        { recipient },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setLoaderReq(false);
      handleNotification(recipient);
      // setAllQuestions(totalReadQuestions),
      //   setLoader(false);
    } catch (error) {
      //   setLoader(false);
      setLoaderReq(false);
      toast.error(error.response.data.message);
      commonLogout(dispatch, error);
    }
  };
  ////////////////send message api////////////////////////
  // const sendMessageApi = async (id, name, profile) => {
  //   const { data } = await axios.post(`${baseurl}/messanger/create`, {
  //     message: "Hi",
  //     id,
  //     name,
  //     profile,
  //   });
  // };
  ////////////////notification api////////////////////////
  const handleNotification = async (recipient) => {
    try {
      const { data } = await axios.post(
        `${baseurl}/notification/create`,
        { readerId: recipient, type: "friend-request" },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      socket && (await socket.emit("new-notification", recipient));
    } catch (error) {
      commonLogout(dispatch, error);
    }
  };
  //==================================================================
  const cancleFriendRequest = async (id) => {
    await axios.post(
      `${baseurl}/friend-request/cancel`,
      { ID: id },
      {
        headers: {
          Authorization: `Bearer ${store?.token}`,
        },
      }
    );
  };

  // async function someFriendProfileAndIdd (){
  //   const {data} = await axios.get(
  //      `${baseurl}/friend-request/get-your-friend/${userDetails?._id}`,
  //      {
  //        headers: {
  //          Authorization: `Bearer ${store.token}`,
  //        },
  //      }
  //    );
  //    setSomeFriendProfileAndId(data)
  //   }
  return (
    <ProtectRoute>
      {/* <div onClick={someFriendProfileAndIdd}>jsgdkgjsdkjgjkzdjis</div> */}
      <div className="bg-gray-50">
        <div className="px-10 py-4">
          <SuperHeader />
        </div>

        <ToastContainer />
        <div className="md:flex min-h-[80vh] md:mx-10 my-4 gap-4">
          <div className="md:w-4/12 bg-white shadow-md">
            <div className="md:flex justify-center">
              <div>
                <div className="relative">
                  <Image
                    className="w-full h-full rounded-t-sm"
                    src={banner}
                    alt="Profile cover photo"
                  />

                  {userDetails?.name ? (
                    <div className="absolute bottom-0 translate-y-[50%]">
                      <div className="relative">
                        <h4 className="absolute bottom-[40%] md:bottom-[50%] right-0 translate-x-[50%] p-2 bg-violet-500 w-12 h-12 rounded-full flex justify-center items-center border-r-2 border-t-2 border-white text-center text-[10px] md:translate-y-[50%] text-white translate-y-[20%]">
                          {userDetails.status}
                        </h4>
                        <img
                          className="w-[150px] h-[150px] border-4 rounded-full border-white"
                          src={`${userDetails?.profile}`}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="absolute bottom-0 translate-y-[50%]">
                      <div className="w-[150px] bg-gray-100 animate-pulse h-[150px] border-4 rounded-full border-white"></div>
                    </div>
                  )}
                </div>
                <div className="px-2 border-t-2 border-red-500">
                  {userDetails?.name ? (
                    <div className="mt-20 text-gray-500 px-4 py-2 border-t">
                      <h2 className="font-bold text-2xl">
                        {userDetails?.name}
                      </h2>
                      <div className="flex">
                        <div className="relative w-3/12">
                          {someFriendProfileAndId?.profile?.map((item, i) => {
                            return (
                              <div
                                className={`absolute top-0 left-0 ml-${i * 6}`}
                                key={i}
                              >
                                <div>
                                  <img
                                    className="w-10 h-10 border-[3px] border-gray-300 rounded-full"
                                    src={item.profile}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {someFriendProfileAndId?.profile?.length > 0 && (
                          <h2 className="flex gap-2 mt-2">
                            Total Friends : {someFriendProfileAndId?.totalUsers}
                          </h2>
                        )}
                      </div>
                      <h2 className="text-sm mt-3">{userDetails?.title}</h2>
                      {userDetails?.isOnline ? (
                        <div className="flex gap-2 items-center mt-2">
                          <div className="flex">Online Status : </div>
                          <div className="border border-green-500 flex gap-1 justify-center items-center py-1 px-5 rounded-full">
                            <div className="h-3 w-3 bg-green-500 rounded-full"></div>{" "}
                            <p className="text-green-500 text-[12px]">Active</p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex gap-2 items-center mt-2">
                            <div className="flex">Online Status : </div>
                            <div className="border border-[#e7523a] flex gap-1 justify-center items-center py-1 px-5 rounded-full">
                              <div className="h-3 w-3 bg-[#e7523a] rounded-full"></div>{" "}
                              <p className="text-[#e7523a] text-[12px]">{`Inactive`}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center mt-2">
                            <div className="flex">Last moment : </div>
                            <p className="text-[#e7523a] text-[12px]">
                              {moment(userDetails.updatedAt).fromNow()}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="md:flex items-center gap-4">
                        <div className="flex items-center gap-1 mt-2 text-gray-700">
                          <CiUser />
                          <h3>
                            Member since{" "}
                            <span className="font-semibold">
                              {moment(userDetails.createdAt).format("MMM YYYY")}
                            </span>
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <AddAndDeleteFriendRequestButton
                          id={userDetails?._id}
                        />
                        <CallMessageContainer
                          id={userDetails?._id}
                          userDetails={userDetails}
                        />
                      </div>
                      {/* ---------------------------------------------Messanger Box System-------------------------------------------- */}
                    </div>
                  ) : (
                    <div className="p-4 mt-20 space-y-2">
                      <div className="animate-pulse w-48 h-8 bg-gray-100 rounded-md"></div>
                      <div className="animate-pulse w-36 h-6 bg-gray-100 rounded-md"></div>
                      <div className="animate-pulse w-52 h-6 bg-gray-100 rounded-md"></div>
                    </div>
                  )}
                  {userDetails?.name ? (
                    <div className="mt-4 p-4 border-t">
                      <h2 className="font-bold text-md text-gray-500">
                        About me
                      </h2>
                      {userDetails?.description?.length == 0 && (
                        <div className="mt-10 text-[14px] text-center">
                          No data found
                        </div>
                      )}
                      <div className="mt-2">{userDetails?.description}</div>
                    </div>
                  ) : (
                    <div className="p-2 mt-2 space-y-2">
                      <div className="animate-pulse w-28 h-4 bg-gray-100 rounded-md"></div>
                      <div className="animate-pulse w-72 h-2 bg-gray-100 rounded-md"></div>
                      <div className="animate-pulse w-full h-2 bg-gray-100 rounded-md"></div>
                      <div className="animate-pulse w-full h-2 bg-gray-100 rounded-md"></div>
                      <div className="animate-pulse w-full h-2 bg-gray-100 rounded-md"></div>
                      <div className="animate-pulse w-full h-2 bg-gray-100 rounded-md"></div>
                      <div className="animate-pulse w-full h-2 bg-gray-100 rounded-md"></div>
                      <div className="animate-pulse w-full h-2 bg-gray-100 rounded-md"></div>
                      <div className="animate-pulse w-full h-2 bg-gray-100 rounded-md"></div>
                      <div className="animate-pulse w-full h-2 bg-gray-100 rounded-md"></div>
                    </div>
                  )}
                  {/* {
                userDetails?.name ? '':""
               }
               {
                userDetails?.name ? '':""
               } */}
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-8/12 bg-white rounded-md mt-10 md:mt-0 shadow-md px-10 py-6">
            <h2 className="text-center text-violet-700">
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
        </div>
        <div className="grid md:grid-cols-3 gap-2 px-4 pb-5">
          {someOfMyFriendDetails &&
            someOfMyFriendDetails
              .filter((user) => user._id !== store.userInfo.id)
              .map((item, i) => {
                return (
                  <div key={i} className="bg-gray-50">
                    <div
                      key={i}
                      className="mt-4 bg-gray-100 p-2 flex gap-4 justify-between items-center rounded-lg border"
                    >
                      <div className="flex items-center gap-2">
                        <div className="relative rounded-full w-fit mx-auto">
                          {myActiveFriends &&
                          myActiveFriends?.some((O) => O === item._id) ? (
                            <div className="w-3 h-3 border-2 border-white bg-green-500 absolute rounded-full right-3 bottom-1"></div>
                          ) : (
                            <div className="w-3 h-3 border-2 border-white bg-gray-400 absolute rounded-full right-3 bottom-1"></div>
                          )}
                          <img
                            className="w-20 mx-auto border md:border-4 rounded-full"
                            src={item.profile}
                          />
                        </div>
                        <div>
                          <Link
                            href={`${viewurl}/userdashboard/q/${item._id}`}
                          >
                            <h2 className="text-md font-semibold text-gray-700 mt-2">
                              {item.name}
                            </h2>
                          </Link>
                          <h4 className=" text-gray-700 mt-2">
                            Reader Type :{" "}
                            <span className="text-violet-700">
                              {item.status}
                            </span>
                          </h4>
                        </div>
                      </div>
                      <div className="mt-2 space-y-3">
                        <AddAndDeleteFriendRequestButton id={item?._id} />
                        <CallMessageContainer
                          id={item?._id}
                          userDetails={item}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

          <div className="bg-gray-100 mt-4 flex justify-center items-center font-bold text-gray-500">
            View All your Friends
          </div>
        </div>
        <div className="hidden  md:block">
          <Footer />
        </div>
      </div>
    </ProtectRoute>
  );
};

export default Page;
