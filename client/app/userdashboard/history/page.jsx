"use client";
import React, { useEffect, useState } from "react";
import Monitor from "../components/examonitor/Monitor";
import { devider } from "@/New folder/subject/conponents/devider";
import { MdOutlineDoubleArrow } from "react-icons/md";
import Link from "next/link";
import { IoArrowBackCircleOutline, IoHomeOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { GoHistory } from "react-icons/go";
// import Link from "next/link";
// import { IoHomeOutline } from "react-icons/io5";
// import { AiOutlineHeart } from "react-icons/ai";
// import { FaBookReader } from "react-icons/fa";
// import { CgProfile } from "react-icons/cg";
const Page = () => {
  const [level, setLevel] = useState("R");
  const [count, setCount] = useState(0);
  const [rightQuestions, setRightQuestions] = useState([]);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [switcher, setSwitcher] = useState(false);

  useEffect(() => {
    setRightQuestions(
      JSON.parse(localStorage.getItem("collectedRightQuestions"))
    );
    setWrongQuestions(
      JSON.parse(localStorage.getItem("collectedWrongQuestions"))
    );
  }, []);
  const devidedQuestionsR = devider(rightQuestions, 120);
  const devidedQuestionsW = devider(wrongQuestions, 120);
  return (
    <div className="min-h-screen py-4 px-2">
      <h2 className="text-fuchsia-500 font-bold text-2xl mb-2">History</h2>
      <div className="flex gap-3 mb-3">
        <h2
          onClick={() => {
            setLevel("R")
            level === "R" ? null : setSwitcher(false)
          }}
          className={`px-6 py-2 w-1/2 ${
            level == "R" ? "bg-fuchsia-500 duration-300 text-white" : ""
          } text-center rounded-md  cursor-pointer`}
        >
          Right Ans
        </h2>
        <h2
          onClick={() => {
            setLevel("W")
            level === "W" ? null : setSwitcher(false)
          }}
          className={`px-6 py-2 w-1/2 ${
            level == "W" ? "bg-fuchsia-500 duration-300 text-white" : ""
          } text-center rounded-md cursor-pointer`}
        >
          Wrong Ans
        </h2>
      </div>
      {level == "W" && (
        <div className="">
          <div className="md:w-1/2">
            {devidedQuestionsW?.indexNumber?.map((item, i) => {
              return (
                <div key={i}>
                  {!switcher && (
                    <h2
                      onClick={() => {
                        // setSubSwitcher(true);
                        setCount(i);
                        setSwitcher(true);
                      }}
                      className="cursor-pointer flex justify-between items-center bg-fuchsia-500 rounded-lg border-fuchsia-600 mb-2 text-white md:text-lg font-bold px-8 py-2"
                    >
                      {item} <MdOutlineDoubleArrow />
                    </h2>
                  )}
                </div>
              );
            })}
          </div>
          {switcher && (
            <Monitor
              questions={devidedQuestionsW?.question[count]}
              megaQuestions={rightQuestions}
              isSave={"yes"}
              isSaveInHistory="off"
            />
          )}
        </div>
      )}
      {level == "R" && (
        <div className="">
          <div className="md:w-1/2">
            {devidedQuestionsR?.indexNumber?.map((item, i) => {
              return (
                <div key={i}>
                  {!switcher && (
                    <h2
                      onClick={() => {
                        setCount(i);
                        setSwitcher(true);
                      }}
                      className="cursor-pointer flex justify-between items-center bg-fuchsia-500 rounded-lg border-fuchsia-600 mb-2 text-white md:text-lg font-bold px-8 py-2"
                    >
                      {item} <MdOutlineDoubleArrow />
                    </h2>
                  )}
                </div>
              );
            })}
          </div>
          {switcher && (
            <Monitor
              questions={devidedQuestionsR?.question[count]}
              megaQuestions={rightQuestions}
              isSave={"yes"}
              isSaveInHistory="off"
            />
          )}
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
      {!switcher && (
        <div className="fixed bottom-0 md:hidden left-0 w-full px-10 py-4 bg-white rounded-t-md">
          <div className="mobile flex w-full justify-between">
            <div className="">
              <div className="text-fuchsia-500 scale-110  shadow-md shadow-fuchsia-500 duration-500 p-2 rounded-full">
                <Link href={"/"}>
                  <IoHomeOutline size={30} />
                </Link>
              </div>
            </div>
            <div className="">
              <div
                className={` bg-gray-200 shadow-md shadow-gray-500 text-gray-500 p-2 rounded-full `}
              >
                <Link href={"./myfavourite"}>
                  <AiOutlineHeart size={30} />
                </Link>
              </div>
            </div>
            <div>
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
                className={`p-2 rounded-full bg-gray-200 shadow-md shadow-gray-500 text-gray-500`}
              >
                <Link href={"./myprofile"}>
                  <CgProfile size={30} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
