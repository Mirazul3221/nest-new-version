"use client";
import Header from "@/app/components/Header";
import { baseurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import loderImage from "@/public/wating.gif";
import notFound from "@/public/questions-not-found.jpg";
import Image from "next/image";
import HTMLReactParser from "html-react-parser";
import Footer from "@/app/components/Footer";
import Link from "next/link";

const Page = () => {
  const [data, setData] = useState([]);
  const [count,setCount] = useState(null)
  const [loader, setLoader] = useState(false);
  const [synce, setSynce] = useState("Questions");
  const { store } = useContext(storeContext);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        setLoader(true);
        const { data } = await axios.get(
          `${baseurl}/allquestionscollection/api/search/${store.searchReasultFromGeneralUser}`
        );
        setData(data);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    }
    fetchData();
  }, [store.searchReasultFromGeneralUser, searchValue]);

  const fetchUser = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `${baseurl}/auth/publicuser/find/${store.searchReasultFromGeneralUser}`
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
        `${baseurl}/allquestionscollection/api/search/${store.searchReasultFromGeneralUser}`
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
  return (
    <div className="min-w-screen min-h-[100vh] bg-gray-100">
      <div className="header border-b">
        <Header getSearchValue={setSearchValue} />
      </div>
      {loader ? (
        <div className="w-full h-[89vh] flex justify-center bg-white items-center">
          <Image className="w-4/12" src={loderImage} alt="loading image" />
        </div>
      ) : (
        <div className="md:px-20 px-4 md:mt-5 min-h-[80vh]">
          <div className="pt-2">
            {store.searchReasultFromGeneralUser.length > 0 && (
              <div className="">
                <h2 className="text-2xl text-gray-700 md:mb-4">
                  Result for
                  <span className="font-bold text-violet-700">
                    {" " + store.searchReasultFromGeneralUser}
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
          <div className="flex gap-2 md:gap-4 justify-between w-full mb-2 px-[3px] md:px-0">
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
                <div>
                  {data?.map((singleQuestion, i) => {
                    return (
                      <div
                        key={i}
                        className={`relative overflow-auto border-2 rounded-lg bg-white mb-10 p-2`}
                      >
                        <div className="sub_details border-b-2 py-2 text-gray-500">
                          <div className="text-lg flex justify-center items-center shadow-md bg-gray-100 p-2 w-8 h-8 rounded-md">
                            {i + 1}
                          </div>
                          <h2>
                            <span className="font-bold text-gray-700">
                              Subject
                            </span>
                            : {singleQuestion.subject}
                          </h2>
                          <h3>
                            <span className="font-bold text-gray-700">
                              Topic
                            </span>{" "}
                            : {singleQuestion.topic}
                          </h3>
                          <h4>
                            <span className="font-bold text-gray-700">
                              Previous Exam
                            </span>{" "}
                            : {singleQuestion?.otherExamName}
                          </h4>
                        </div>
                        <div className="question py-2 text-gray-500yy mb-4">
                          <h4 className="text-lg mb-2 font-bold">
                            Question : {singleQuestion?.question}
                          </h4>
                          <div className="md:grid grid-cols-2 gap-6">
                            <h4>
                              {" "}
                              <span className="font-bold text-gray-700">
                                A
                              </span>{" "}
                              : {singleQuestion?.option_01}
                            </h4>
                            <h4>
                              <span className="font-bold text-gray-700">B</span>{" "}
                              : {singleQuestion?.option_02}
                            </h4>
                            <h4>
                              <span className="font-bold text-gray-700">C</span>{" "}
                              : {singleQuestion?.option_03}
                            </h4>
                            <h4>
                              <span className="font-bold text-gray-700">D</span>
                              : {singleQuestion?.option_04}
                            </h4>

                         <div className="flex gap-2">
                         <h5 className="font-bold text-gray-700">
                              <span>Answer</span> :{" "}
                              {singleQuestion?.rightAns == 1
                                ? "A"
                                : singleQuestion?.rightAns == 2
                                ? "B"
                                : singleQuestion?.rightAns == 3
                                ? "C"
                                : singleQuestion?.rightAns == 4
                                ? "D"
                                : ""}
                            </h5>
                            {
                              singleQuestion.description  && (<h3 className={`cursor-pointer ${i === count ? "hidden" : ""}`} onClick={(e)=>{
                                setCount(i)
                                targetEle(e)
                              }}>Read more...</h3>)
                            }
                         </div>
                          </div>
                        </div>

                        <div className="border-t-2 max-h-0 duration-1000 overflow-hidden">
                       
                            {HTMLReactParser( `${singleQuestion.description || "No Data Found"}`)}
               
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
              {synce == "Users" && (
                <div>
                  {data.map((user, i) => {
                    return (
                      <div key={i} className="md:flex gap-4">
                        <div className="px-4 py-2 bg-white md:w-1/2">
                          <Link href={`/localuser/${user._id}`}>
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
  );
};

export default Page; //=========
