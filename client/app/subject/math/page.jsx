"use client";
import {
  englishTopicValue,
  mathTopicValue,
} from "@/app/assistantdashboard/components/data";
import { MdOutlineArrowRight } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { GiBookmarklet } from "react-icons/gi";
import Logo from "@/app/components/Logo";
import { baseurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import Monitor from "@/app/userdashboard/components/examonitor/Monitor";
// import Navbar from "@/app/userdashboard/components/Navbar";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import "../../userdashboard/components/cssfiles/marksmcq.css";
import CommingSoom from "../conponents/CommingSoom";
import { ExamBasedQuestion } from "../conponents/ExamBased";
import ProtectRoute from "@/app/global/ProtectRoute";
import { commonLogout } from "@/app/userdashboard/components/common";
const Page = () => {
  // const [navValue, setNaveValue] = useState("home");
  const [title, setTitle] = useState("");
  const [headTitle, setHedTitle] = useState("");
  const [getTopicValue, setGetTopicValue] = useState("");
  const [switcher, setSwitcher] = useState(false);
  const [subSwitcher, setSubSwitcher] = useState(false);
  //==============API====================
  const { store } = useContext(storeContext);
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${baseurl}/english/find`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });

        setData(data);
      } catch (error) {
        console.log(error);
        commonLogout(dispatch,route)
      }
    }
    fetchData();
  }, [store.token]);

  const filterValue = (val) => {
    const returnFilterValue = data?.filter((question) => {
      return question.topic === val || question.examName === val;
    });
    return returnFilterValue;
  };
  const filterData = filterValue(getTopicValue);
  console.log(data);
  //==============End API====================
  return (
   <ProtectRoute>
        <div className="md:px-10">
      <div className="flex justify-between items-center">
        <div className="md:w-20 w-16">
          <Link href="/">
            {/* <Image src={logo} alt="bffd" /> */}
            <Logo />
          </Link>
        </div>
        {/* <Navbar value={navValue} setValue={setNaveValue} /> */}
      </div>

      {switcher ? (
        <>
          {filterData?.length > 0 ? (
            <Monitor questions={filterData} />
          ) : (
            <CommingSoom />
          )}
        </>
      ) : (
        <div
          className={`md:flex justify-between gap-4 mx-2 ${
            subSwitcher ? "hidden" : ""
          }`}>
          <div className="md:w-1/2">
            <h2 className="py-2 bg-[#3e19fa] px-6 text-2xl md:text-3xl text-white">
              বিষয় ভিত্তিক
            </h2>
            <div className="gap-[5px]">
              <div className="w-full">
                {mathTopicValue.map((singleValue) => {
                  return (
                    <>
                      <div
                        onClick={() => {
                          headTitle !== singleValue.name
                            ? setHedTitle(singleValue.name)
                            : setHedTitle("");
                          setTitle("");
                        }}
                        className={`py-2 flex justify-between items-center px-6 font-bold md:text-lg text-gray-700 mt-[5px] cursor-pointer`}>
                        <h2>{singleValue.name}</h2>
                        <MdOutlineArrowRight
                          className={`${
                            headTitle === singleValue.name ? "rotate-90" : ""
                          } duration-100`}
                          size={25}
                        />
                      </div>
                      {headTitle === singleValue.name &&
                        singleValue.value.map((item) => {
                          return (
                            <>
                              <div
                                onClick={() => {
                                  title !== item
                                    ? setTitle(item)
                                    : setTitle("");
                                  setSwitcher(true);
                                  setGetTopicValue(item);
                                }}
                                className={` py-2 flex justify-between items-center cursor-pointer px-6 ml-6 md:ml-12 text-gray-600 mt-[5px]`}>
                                <h2>{item}</h2>
                                <MdOutlineArrowRight
                                  className={`${
                                    title === item ? "rotate-90" : ""
                                  } duration-100`}
                                  size={20}
                                />
                              </div>
                            </>
                          );
                        })}
                    </>
                  );
                })}
              </div>
              {/* <div className="">
                      {item.subTitleName.map((item)=>{
                        <h2>{item.name}</h2>
                      })}
                    </div> */}
            </div>
          </div>
          <ExamBasedQuestion
            setGetTopicValue={setGetTopicValue}
            setHedTitle={setHedTitle}
            headTitle={headTitle}
            setSwitcher={setSwitcher}
          />
        </div>
      )}
      {switcher && (
        <div
          onClick={() => setSwitcher(false)}
          className="bg-gray-200/50 cursor-pointer shadow-lg px-2 md:px-6 py-[3px] md:py-2 rounded-md w-fit fixed bottom-4 right-4 back_bounce">
          <IoArrowBackCircleOutline size={30} />
        </div>
      )}
    </div>
   </ProtectRoute>
  );
};

export default Page;
//=========helo world================
