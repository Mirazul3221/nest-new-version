"use client";
import { baseurl } from "@/app/config";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import loderImage from "@/public/wating.gif";
import notFound from "@/public/questions-not-found.jpg";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ProtectRoute from "@/app/global/ProtectRoute";
import storeContext from "@/app/global/createContex";
import SuperHeader from "../components/SuperHeader";
import Monitor from "../components/examonitor/Monitor";
import { BsCardText } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { PiBookOpenTextDuotone } from "react-icons/pi";
import { TiDocumentText } from "react-icons/ti";
import { LuLogOut } from "react-icons/lu";
import QuestionCard from "../timeline/components/QuestionCard";

const Page = () => {
  const { store } = useContext(storeContext);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [synce, setSynce] = useState("Questions");
    const [questions, setQuestions] = useState([]); // Store fetched comments
    const [page, setPage] = useState(0); // Current page index
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [hasMore, setHasMore] = useState(true);
    const [tag,setTag] = useState(null);
    const [flug,setFlug] = useState('all')
    const searchParams = useSearchParams();
  const searchVal = searchParams.get('q');
    const route = useRouter();
    const logout = () => {
      dispatch({ type: "logout" });
      route.push("/login");
    };
  useEffect(() => {
    async function fetchData() {
      try {
        setLoader(true);
        const { data } = await axios.get(
          `${baseurl}/userquestions/api/search/${decodeURIComponent(searchVal)}`
        );

        console.log(searchVal)
        setQuestions(data);
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
      setQuestions(data);
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
      setQuestions(data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const [myDetails, setMyDetails] = useState();
  useEffect(() => {
    setMyDetails(JSON.parse(localStorage.getItem("myDetails")));
  }, []);
  const reFormate = async (sub,val)=>{
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsLoading(false);
    setHasMore(true)
    setPage(0);
    setQuestions([]);
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${baseurl}/userquestions/all-friends-questions?skip=${0 * 10}&flug=${sub}&tag=${val}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      if (data.length === 0) {
        setHasMore(false); // No more comments to fetch
      } else {
        setQuestions((prev) => [...prev, ...data]);
        setPage((prev) => prev + 1); // Increment page
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setIsLoading(false);
    }
  }

    const questionsAfterDelete = (question) => {
    const filteredQuestions = questions?.filter((q) => q._id !== question._id);
    setQuestions(filteredQuestions);
  }; //

  const [tags, setTags] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${baseurl}/userquestions/get-tag/subject/chapter`,
          {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          }
        );
        setTags(data);
        console.log(data);
        // Do something with `data` here (e.g., update state)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [store.token]);
  return (
    <ProtectRoute>
   <div className="min-h-[100vh] py-4 px-4 md:px-10 bg-gray-50">
      <div className="border-b-2 px-4 border-white">
        <SuperHeader/>
      </div>

       <div className="md:px-6 relative flex md:pt-4 gap-4 bg-gray-50">
     {/* Sidebar (Sticky - Desktop Only) */}
      <div className="w-3/12 h-fit sticky top-24 hidden md:block">
        <div className="text-gray-700">
          {/* User Profile Link */}
          <a
            className="hover:bg-gray-200/60 rounded-md duration-300 bg-white border px-4 py-2 flex gap-2 items-center"
            href="https://bcs-prep.vercel.app/userdashboard/myprofile"
          >
            <img
              className="w-10 rounded-full"
              src={myDetails?.profile}
              alt={store.userInfo.name}
            />
            <h2 className="font-bold">{store.userInfo.name}</h2>
          </a>

          {/* Sidebar Links */}
          <div className="bg-white border mt-2">
            <a href="#" className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300 px-4 py-2">
              <BsCardText /> About
            </a>
            <a href="#" className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300 px-4 py-2">
              <FiFileText /> Bcs Question
            </a>
            <a href="#" className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300 px-4 py-2">
              <IoMdSettings /> Setting
            </a>
          </div>

          {/* Subject & Topic Filters */}
          <div className="max-h-[48vh] overflow-auto">
            <div className="px-4 py-2 bg-white border mt-2">
              <p className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300">
                <PiBookOpenTextDuotone /> Subject Based Query
              </p>
              {tags?.map((tag, i) => (
                <h3
                  key={i}
                  onClick={() => {
                    setTag(tag.subject);
                    setFlug('subject');
                    reFormate('subject', tag.subject);
                  }}
                  className="mt-2 space-y-1 hover:text-black duration-200 cursor-pointer"
                >
                  {tag.subject}
                </h3>
              ))}
            </div>

            <div className="px-4 py-2 bg-white border mt-2">
              <p className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300">
                <TiDocumentText /> Topic Based Query
              </p>
              {tags?.map((tag, i) => (
                <div key={i}>
                  <h3 className="mt-2 font-semibold">{tag.subject}</h3>
                  {[...tag.chapter].reverse().map((chap, i) => (
                    <p
                      key={i}
                      onClick={() => {
                        setTag(chap);
                        setFlug('chapter');
                        reFormate('chapter', chap);
                      }}
                      className="ml-2 space-y-1 hover:text-black duration-200 cursor-pointer"
                    >
                      {chap}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Logout Button */}
          <div
            onClick={logout}
            className="flex gap-2 mt-2 bg-rose-100 border cursor-pointer items-center hover:bg-rose-200/60 rounded-md duration-300 px-4 py-2"
          >
            <LuLogOut /> Log out
          </div>
        </div>
      </div>



      <div className="md:w-9/12">
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
                    {" " + searchVal}
                  </span>
                </h2>
                <h2 className="text-2xl text-gray-700 mb-4">
                  Total search result
                  <span className="font-bold text-violet-700">
                    {" " + questions.length}
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
          {questions.length > 0 ? (
            <div>
              {synce == "Questions" && (
                <div>
                          {/* Questions */}
                          {questions?.map((question, i) => (
                            <div key={i} className="mx-auto">
                              <QuestionCard questionsAfterDelete={questionsAfterDelete} myQuestion={question} />
                            </div>
                          ))}
                          {isLoading && (
                            <div className="flex bg-white justify-center">
                              <div className="flex items-center gap-2">
                                <Image src={loder} />
                                <h2 className="text-center text-gray-500">Loading...</h2>
                              </div>
                            </div>
                          )}
                </div>
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
      </div>

       </div>
      <Footer />
    </div>
    </ProtectRoute>
  );
};

export default Page; //=========
