"use client";
import { banglaTopicValue } from "@/app/assistantdashboard/components/data";
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
  //==============API====================
  const { store ,dispatch} = useContext(storeContext);
  const [data, setData] = useState(null);
  // console.log(data)
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${baseurl}/allquestionscollection/banglaforeader`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });

        setData(data);
      } catch (error) {
        console.log(error);
        commonLogout(dispatch)
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
  // console.log(data);
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
              <Monitor questions={filterData} isSave={'no'} isSaveInHistory='on'/>
            ) : (
              <CommingSoom />
            )}
          </>
        ) : (
          <div className="md:flex justify-between gap-4 mx-2">
            <div className="md:w-1/2">
              <h2 className="py-2 bg-violet-700 px-6 text-2xl md:text-3xl text-white">
                বিষয় ভিত্তিক
              </h2>
              <div className="gap-[5px]">
                {banglaTopicValue.map((item) => {
                  return (
                    <>
                      <div className="w-full">
                        <div
                          onClick={() => {
                            headTitle !== item.mainTitle
                              ? setHedTitle(item.mainTitle)
                              : setHedTitle("");
                            setTitle("");
                          }}
                          className={`py-2 flex justify-between items-center px-6 font-bold md:text-lg text-gray-700 mt-[5px] cursor-pointer`}
                        >
                          <h2>{item.mainTitle}</h2>
                          <MdOutlineArrowRight
                            className={`${
                              headTitle === item.mainTitle ? "rotate-90" : ""
                            } duration-100`}
                            size={25}
                          />
                        </div>
                        {item.mainTitle === headTitle && (
                          <div>
                            {item.subTitleName?.map((item2) => {
                              return (
                                <>
                                  <div
                                    onClick={() =>
                                      title !== item2.name
                                        ? setTitle(item2.name)
                                        : setTitle("")
                                    }
                                    className={` py-2 flex justify-between items-center cursor-pointer px-6 ml-6 md:ml-12 text-gray-600 mt-[5px]`}
                                  >
                                    <h2>{item2.name}</h2>
                                    <MdOutlineArrowRight
                                      className={`${
                                        title === item2.name ? "rotate-90" : ""
                                      } duration-100`}
                                      size={20}
                                    />
                                  </div>
                                  {title == item2.name && (
                                    <div className="max-h-[45vh] overflow-auto">
                                      {item2.topic.map((item3, i) => {
                                        return (
                                          <h3
                                            key={i}
                                            onClick={() => {
                                              setGetTopicValue(item3);
                                              setSwitcher(true);
                                            }}
                                            className={`${
                                              title.length > 0
                                                ? "block"
                                                : "hidden"
                                            } py-1 pl-4 text-gray-500 flex justify-between items-center pr-5 mr-2 duration-100 text-sm ml-12 md:ml-20 mb-2 mt-[3px] cursor-pointer`}
                                          >
                                            {item3}
                                            <GiBookmarklet size={15} />
                                          </h3>
                                        );
                                      })}
                                    </div>
                                  )}
                                </>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      {/* <div className="">
                      {item.subTitleName.map((item)=>{
                        <h2>{item.name}</h2>
                      })}
                    </div> */}
                    </>
                  );
                })}
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
            className="bg-gray-200/50 cursor-pointer shadow-lg px-2 md:px-6 py-[3px] md:py-2 rounded-md w-fit fixed bottom-4 right-4 back_bounce"
          >
            <IoArrowBackCircleOutline size={30} />
          </div>
        )}
      </div>
    </ProtectRoute>
  );
};

export default Page;
//=========helo world================dffffffffffff
