"use client";
import { baseurl } from "@/app/config";
import ProtectRoute from "@/app/global/ProtectRoute";
import axios from "axios";
import loder from "@/public/loading-buffer.gif";
import React, { useCallback, useContext, useEffect, useState } from "react";
import SuperHeader from "../../components/SuperHeader";
import QuestionCard from "../components/QuestionCard";
import Image from "next/image";
import { useStore } from "@/app/global/DataProvider";
import Footer from "@/app/components/Footer";
import { IoMdSettings } from "react-icons/io";
import { FiFileText } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { BsCardText } from "react-icons/bs";
import VerticleBanner from "@/app/adsterra/VerticleBanner";
import MobileBanner from "@/app/adsterra/MobileBanner320";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import NearbyUserProfileCard from "../../components/NearbyUserProfileCard";
import { PiBookOpenTextDuotone } from "react-icons/pi";
import { TiDocumentText } from "react-icons/ti";
const Page = () => {
  const { dispatch, store } = useStore();
  const [questions, setQuestions] = useState([]); // Store fetched comments
  const [page, setPage] = useState(0); // Current page index
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true);
  //
  const fetchChunkData = useCallback(async () => {
    if (isLoading || !hasMore) return; // Avoid duplicate requests
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${baseurl}/userquestions/all-friends-questions?skip=${page * 10}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      console.log(data);
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
  }, [page, isLoading, hasMore]);

  // Infinite Scroll Event Listener//
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !isLoading
      ) {
        fetchChunkData();
      }
    };
    //
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, [fetchChunkData, isLoading]);

  // Initial Fetch
  useEffect(() => {
    fetchChunkData();
  }, []); // Only once on component mount

  const questionsAfterDelete = (question) => {
    const filteredQuestions = questions?.filter((q) => q._id !== question._id);
    setQuestions(filteredQuestions);
  }; //

  const [myDetails, setMyDetails] = useState();
  useEffect(() => {
    setMyDetails(JSON.parse(localStorage.getItem("myDetails")));
  }, []);

  const route = useRouter();
  const logout = () => {
    dispatch({ type: "logout" });
    route.push("/login");
  };
  const [openSideMenu, setOpenSideMenu] = useState(false);

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
    <div>
      <ProtectRoute>
        <div className="md:px-10 px-4 py-3">
          <SuperHeader />
        </div>
        <div className="md:px-6 flex md:pt-4 gap-4 bg-gray-50">
          <div className="w-3/12 h-[60vh] sticky hidden md:block top-24">
            <div className=" text-gray-700">
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
         <div className="bg-white border mt-2">
         <a
                href="#"
                className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300 px-4 py-2"
              >
                <BsCardText /> About
              </a>
              <a
                href="#"
                className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300 px-4 py-2"
              >
                <FiFileText /> Bcs Question
              </a>
              <a
                href="#"
                className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300 px-4 py-2"
              >
                <IoMdSettings /> Setting
              </a>
         </div>

              <div className="px-4 py-2 bg-white border mt-2">
                <p className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300">
                  <PiBookOpenTextDuotone /> Subject Based Query
                </p>
                {tags &&
                  tags?.map((tag, i) => {
                    return (
                      <h3 key={i} className="mt-2">{tag.subject}</h3>
                    );
                  })}
              </div>
              <div className="px-4 py-2 bg-white border mt-2">
                <p className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300">
                  <TiDocumentText /> Topic Based Query
                </p>
                {tags &&
                  tags?.map((tag, i) => {
                    return (
                      <div key={i} className="">
                        <h3 className="mt-2 font-semibold">{tag.subject}</h3>
                        {tag.chapter.map((chap, i) => {
                          return <p key={i} className="ml-2">{chap}</p>;
                        })}
                      </div>
                    );
                  })}
              </div>
              <div
                onClick={logout}
                className="flex gap-2 mt-2 bg-rose-100 border cursor-pointer items-center hover:bg-rose-200/60 rounded-md duration-300 px-4 py-2"
              >
                <LuLogOut /> Log out
              </div>
            </div>
          </div>

          {/* ================================for mobile=================================================== */}
          <div
            className={`w-1/2 duration-150 fixed z-50 ${
              openSideMenu ? "-translate-x-[0%]" : "-translate-x-[110%]"
            } md:hidden bg-white`}
          >
            <div
              onClick={() => setOpenSideMenu(false)}
              className="ml-4 flex justify-end w-full"
            >
              <RxCross2 size={22} />
            </div>
            <div className=" text-gray-700">
              <a
                href="#"
                className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300 px-4 py-2"
              >
                <BsCardText /> About
              </a>
              <a
                href="#"
                className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300 px-4 py-2"
              >
                <FiFileText /> Bcs Question
              </a>
              <a
                href="#"
                className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300 px-4 py-2"
              >
                <IoMdSettings /> Setting
              </a>
              <div
                onClick={logout}
                className="flex gap-2 cursor-pointer items-center hover:bg-gray-200/60 rounded-md duration-300 px-4 py-2"
              >
                <LuLogOut /> Log out
              </div>
            </div>
          </div>

          <div className=" md:w-6/12">
            <div className="">
              <NearbyUserProfileCard />
            </div>
            <div className="Add_a_question rounded-md border md:mb-4 mt-1 mb-2 shadow-sm hover:shadow-md cursor-pointer duration-150 bg-white flex items-center gap-4 py-2 px-6">
              <img
                className="w-16 rounded-full"
                src={store.userInfo.profile}
                alt={store.userInfo.name}
              />
              <a
                className="text-gray-700 text-lg font-semibold"
                href="/userdashboard/timeline/create-post"
              >
                Share a question with your friends
              </a>
              <p
                onClick={() => setOpenSideMenu(true)}
                className=" md:hidden cursor-pointer"
              >
                {" "}
                <span>...</span>
              </p>
            </div>
            {questions?.map((question, i) => {
              return (
                <div key={i} className="mx-auto">
                  <QuestionCard
                    questionsAfterDelete={questionsAfterDelete}
                    myQuestion={question}
                  />
                </div>
              );
            })}
            {isLoading && (
              <div className="flex bg-white justify-center">
                <div className="flex items-center gap-2">
                  <Image src={loder} />{" "}
                  <h2 className="text-center text-gray-500">Loading...</h2>
                </div>
              </div>
            )}
          </div>
          <div className="w-3/12 hidden md:block">
            <div className="">
              <VerticleBanner />
            </div>
            {/* <div className="">
               <MobileBanner/>
            </div> */}
          </div>
        </div>

        <Footer />
      </ProtectRoute>
    </div>
  );
};

export default Page;
