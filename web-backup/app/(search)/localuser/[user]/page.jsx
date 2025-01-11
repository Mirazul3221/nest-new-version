"use client";
import Header from "@/app/components/Header";
import { baseurl } from "@/app/config";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import banner from "@/public/banner/profile-banner.jpg";
import moment from "moment";
import { LuUser2 } from "react-icons/lu";
import RadarChart from "@/app/userdashboard/components/RaderChart";
import Footer from "@/app/components/Footer";
import Image from "next/image";

const Page = () => {
  const pram = useParams();
  const user = pram.user;
  const [userDetails, setUserDetails] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        //   setLoader(true);
        const { data } = await axios.get(
          `${baseurl}/auth/publicuser/findbyid/${user}`
        );

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
        console.log(data);
        //   setLoader(false);
      } catch (error) {
        //   setLoader(false);
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  //  console.log(userDetails?.profile)
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
  return (
    <div className="bg-gray-50">
      <Header getSearchValue={setSearchValue} />
      <div className="md:flex min-h-[80vh] md:mx-20 my-4 gap-4">
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
                      <h4 className="absolute bottom-[40%] md:bottom-[50%] right-0 translate-x-[50%] p-2 bg-violet-500 w-12 h-12 rounded-full flex justify-center items-center border-r-2 border-t-2 border-white text-center text-sm md:translate-y-[50%] text-white translate-y-[20%]">
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
               {
                userDetails?.name ? <div className="mt-20 text-gray-500 px-4 py-2 border-t">
                  <h2 className="font-bold text-2xl">{userDetails?.name}</h2>
                  <h2 className="text-sm mt-3">{userDetails?.title}</h2>
                  <div className="flex items-center gap-2 w-full mt-2 text-gray-700">
              <LuUser2 />
              <h3>
                {" "}
                Member since{" "}
                <span className="font-semibold">
                  {moment(userDetails.createdAt).format("MMM YYYY")}
                </span>
              </h3>
            </div>
                </div> : <div className="p-4 mt-20 space-y-2">
                  <div className="animate-pulse w-48 h-8 bg-gray-100 rounded-md"></div>
                  <div className="animate-pulse w-36 h-6 bg-gray-100 rounded-md"></div>
                  <div className="animate-pulse w-52 h-6 bg-gray-100 rounded-md"></div>
                </div>
               }
               {
                userDetails?.name ? <div className="mt-4 p-4 border-t">
                  <h2 className="font-bold text-md text-gray-500">About me</h2>
                  {
                    userDetails?.description?.length == 0 && (
                      <div className="mt-10 text-[14px] text-center">No data found</div>
                    )
                  }
                  <div className="mt-2">
                    {userDetails?.description}
                  </div>
                </div>: <div className="p-2 mt-2 space-y-2">
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
               }
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
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
