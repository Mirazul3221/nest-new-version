"use client";
import { englishTopicValue } from "@/app/assistantdashboard/components/data";
import { MdOutlineArrowRight, MdOutlineDoubleArrow } from "react-icons/md";
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
import { ExamBasedQuestion } from "../conponents/ExamBased";
import ProtectRoute from "@/app/global/ProtectRoute";
import { devider } from "../conponents/devider";
import QuestionLoader from "../conponents/QuestionLoader";
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
  const [count, setCount] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${baseurl}/allquestionscollection/englishforeader`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });

        setData(data);
      } catch (error) {
        console.log(error);
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
  //==============End API====================

  // const suffeArrey = randomArrrey(filterData)
  // console.log(suffeArrey)
  // console.log(filterData)

    // filterData?.sort((a, b) => 0.5 - Math.random())//
  const getQuestion = devider(filterData, 100);
  //==========================
  
  return (
    <ProtectRoute>
      <div className="md:px-10 px-2">
        <div className="flex justify-between items-center my-4">
          <div className="md:w-20 w-16">
            <Link href="/">
              {/* <Image src={logo} alt="bffd" /> */}
              <Logo />
            </Link>
          </div>
          {/* <Navbar value={navValue} setValue={setNaveValue} /> */}
        </div>

        {switcher ? (
          <div>
            <div className={`${subSwitcher ? "hidden" : ""}`}>
              {getQuestion.question.length > 0 ? (
                <div className="md:flex gap-2 justify-center">
               <div className="md:w-1/2">
               {getQuestion?.indexNumber?.map((item, i) => {
                    return (
                      <div key={i}>
                        <h2
                          onClick={() => {
                            setSubSwitcher(true);
                            setCount(i);
                          }}
                          className="cursor-pointer flex justify-between items-center bg-violet-700 rounded-lg border-fuchsia-600 mb-2 text-white md:text-lg font-bold px-8 py-2"
                        >
                          {item}  <MdOutlineDoubleArrow />
                        </h2>
                      </div>
                    );
                  })}
               </div>
            <div className="hidden md:block w-1/2">
            <ExamBasedQuestion
              setGetTopicValue={setGetTopicValue}
              setHedTitle={setHedTitle}
              headTitle={headTitle}
              setSwitcher={setSwitcher}
            />
            </div>
                </div>
              ) : (
                <QuestionLoader/>
              )}
              <div
                onClick={() => setSwitcher(false)}
                className="bg-gray-200/50 cursor-pointer shadow-lg px-2 md:px-6 py-[3px] md:py-2 rounded-md w-fit fixed bottom-4 right-4 back_bounce"
              >
                <IoArrowBackCircleOutline size={30} />
              </div>
            </div>
            {subSwitcher && (
              <div>
                <Monitor questions={getQuestion.question[count]} megaQuestions={filterData} isSave={'no'} />
                <div
                  onClick={() => setSubSwitcher(false)}
                  className="md:bg-gray-200/50 cursor-pointer shadow-lg md:px-6 py-[3px] md:py-2 rounded-md w-fit fixed bottom-2 md:bottom-4 right-4 back_bounce"
                >
                  <IoArrowBackCircleOutline size={30} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className={`md:flex justify-between gap-4 mx-2 ${
              subSwitcher ? "hidden" : ""
            }`}
          >
            <div className="w-full">
              <h2 className="py-2 bg-violet-700 px-6 text-2xl md:text-3xl text-white">
                বিষয় ভিত্তিক
              </h2>
              <div className="gap-[5px]">
                <div className="w-full">
                  <div
                    onClick={() => {
                      headTitle !== englishTopicValue[0].name
                        ? setHedTitle(englishTopicValue[0].name)
                        : setHedTitle("");
                      setTitle("");
                    }}
                    className={`py-2 flex justify-between items-center px-6 font-bold md:text-lg text-gray-700 mt-[5px] cursor-pointer`}
                  >
                    <h2>{englishTopicValue[0].name}</h2>
                    <MdOutlineArrowRight
                      className={`${
                        headTitle === englishTopicValue[0].name
                          ? "rotate-90"
                          : ""
                      } duration-100`}
                      size={25}
                    />
                  </div>
                  {englishTopicValue[0].name === headTitle && (
                    <div>
                      {englishTopicValue[0].topic?.map((item2) => {
                        return (
                          <>
                            <div
                              onClick={() => {
                                title !== item2.name
                                  ? setTitle(item2.name)
                                  : setTitle("");
                                setSwitcher(true);
                                setGetTopicValue(item2.name);
                              }}
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
                          </>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <div
                    onClick={() => {
                      headTitle !== englishTopicValue[1].name
                        ? setHedTitle(englishTopicValue[1].name)
                        : setHedTitle("");
                      setTitle("");
                    }}
                    className={`py-2 flex justify-between items-center px-6 font-bold md:text-lg text-gray-700 mt-[5px] cursor-pointer`}
                  >
                    <h2>{englishTopicValue[1].name}</h2>
                    <MdOutlineArrowRight
                      className={`${
                        headTitle === englishTopicValue[1].name
                          ? "rotate-90"
                          : ""
                      } duration-100`}
                      size={25}
                    />
                  </div>
                  {englishTopicValue[1].name === headTitle && (
                    <div>
                      {englishTopicValue[1].topic?.map((item2) => {
                        return (
                          <>
                            <div
                              onClick={() =>
                                title !== item2.name
                                  ? setTitle(item2.name)
                                  : setTitle("")
                              }
                              className={`py-2 flex justify-between items-center cursor-pointer px-6 ml-6 md:ml-6 font-bold text-gray-600 mt-[5px]`}
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
                                {item2.subTopic?.map((item3, i) => {
                                  return (
                                    <h3
                                      key={i}
                                      onClick={() => {
                                        setGetTopicValue(item3);
                                        setSwitcher(true);
                                      }}
                                      className={`${
                                        title.length > 0 ? "block" : "hidden"
                                      } py-1 pl-4 text-gray-500 flex justify-between items-center pr-5 mr-2 duration-100 text-sm ml-10 md:ml-16 mb-2 mt-[3px] cursor-pointer`}
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
      </div>
{/* <script type="text/javascript" src="//www.topcreativeformat.com/1e4c448d5eee38ea6fe4d00ccc81e2f1/invoke.js"></script> */}
    </ProtectRoute>
  );
};

export default Page;
//=========helo world=============
