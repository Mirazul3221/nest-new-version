"use client";
import { baseurl } from "@/app/config";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import loderImage from "@/public/wating.gif";
import notFound from "@/public/questions-not-found.jpg";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";
import SuperHeader from "../../components/SuperHeader";
import Monitor from "../../components/examonitor/Monitor";
import ProtectRoute from "@/app/global/ProtectRoute";
import storeContext from "@/app/global/createContex";

const Page = () => {
  const { store } = useContext(storeContext);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [synce, setSynce] = useState("Questions");
  const pram = useParams();
  const searchVal = pram.questions
  useEffect(() => {
    async function fetchData() {
      try {
        setLoader(true);
        const { data } = await axios.get(
          `${baseurl}/allquestionscollection/api/search/${decodeURIComponent(searchVal)}`
        );
        setData(data);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    }
    fetchData();
  }, [searchVal]);

  const fetchUser = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `${baseurl}/auth/publicuser/find/${decodeURIComponent(searchVal)}`
      );
      setData(data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const fetchQuestions = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `${baseurl}/allquestionscollection/api/search/${decodeURIComponent(searchVal)}`
      );
      setData(data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  // console.log(count);

  const targetEle = (e)=>{
    const targetBox = e.target.parentElement.parentElement.parentElement.parentElement.children[2];
    targetBox.classList.remove("max-h-0")
    targetBox.classList.add("h-auto")
    targetBox.classList.add("max-h-[500vh]")
    targetBox.classList.add("duration-1000")
  }

  console.log(store)
  return (
    <ProtectRoute>
          <div className="min-h-[100vh] py-4 px-4 md:px-10 bg-gray-50">
      <div className="border-b-2 px-4 border-white">
        <SuperHeader/>
      </div>
      {loader ? (
        <div className="w-full h-[89vh] flex justify-center bg-white items-center">
          <Image className="w-4/12" src={loderImage} alt="loading image" />
        </div>
      ) : (
        <div className="md:mt-5 min-h-[80vh]">
          <div className="pt-2 px-4">
            {searchVal.length > 0 && (
              <div className="">
                <h2 className="text-2xl text-gray-700 md:mb-4">
                  Result for
                  <span className="font-bold text-violet-700">
                    {" " + decodeURIComponent(searchVal)}
                  </span>
                </h2>
                <h2 className="text-2xl text-gray-700 mb-4">
                  Total search result
                  <span className="font-bold text-violet-700">
                    {" " + data.length}
                  </span>
                </h2>
              </div>
            )}
          </div>
          <div className="flex gap-2 md:gap-4 justify-between w-full mb-2 md:px-0 px-4">
            <div
              onClick={() => (setSynce("Questions"), fetchQuestions())}
              className={`${
                synce == "Questions"
                  ? "text-violet-700 font-bold border-violet-700 duration-500"
                  : ""
              } w-1/2 py-2 cursor-pointer bg-white text-center rounded-md border-b-4`}
            >
              Questions
            </div>
            <div
              onClick={() => (setSynce("Users"), fetchUser())}
              className={`${
                synce == "Users"
                  ? "text-violet-700 font-bold border-violet-700 duration-500"
                  : ""
              } w-1/2 py-2 cursor-pointer bg-white text-center rounded-md border-b-4`}
            >
              Users
            </div>
          </div>
          {data.length > 0 ? (
            <div>
              {synce == "Questions" && (
                <Monitor questions={data} megaQuestions={data} isSave={'yes'} isSaveInHistory = 'on' pagination='no' />
              )}
              {synce == "Users" && (
                <div>
                  {data.map((user, i) => {
                    return (
                      <div key={i} className="md:flex gap-4">
                        <div className="px-4 py-2 bg-white md:w-1/2">
                          <Link href={`/userdashboard/searchusers/${user._id}`}>
                            <div className="flex w-fit pr-10 pl-4 items-center md:gap-4 gap-2 border-b-2 shadow-md rounded-full py-2">
                              <img
                                className="md:w-16 md:h-16 w-10 h-10  rounded-full border border-violet-700"
                                src={`${user.profile}`}
                              />
                              <h2 className="md:text-[24px] text-[16px] font-bold text-gray-700">
                                {user.name}
                              </h2>
                            </div>
                          </Link>
                        </div>
                        <div className="w-1/2 hidden md:block"></div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-[65vh] flex justify-center bg-white items-center">
              <Image className="w-3/12" src={notFound} alt="page not found" />
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
    </ProtectRoute>
  );
};

export default Page; //=========
