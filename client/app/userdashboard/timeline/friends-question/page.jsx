"use client";
import { baseurl, viewurl } from "@/app/config";
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
import { RxCross2 } from "react-icons/rx";
import NearbyUserProfileCard from "../../components/NearbyUserProfileCard";
import { PiBookOpenTextDuotone } from "react-icons/pi";
import { TiDocumentText } from "react-icons/ti";
import { commonLogout } from "../../components/common";
import FloatingMessageContainer from "../../components/messanger/MessageContainer";
import { useSocket } from "../../global/SocketProvider";
import { useRouter } from "next/navigation";
import DisplayMemoryCard from "../components/DisplayMemoryCard";
import FrindSuggestedCard from "../../suggested_card/FrindSuggestedCard";
const Page = () => {
  const router = useRouter();
  const { dispatch, store } = useStore();
  const { socket } = useSocket();
  const [questions, setQuestions] = useState([]); // Store fetched comments
  const [userDetails, setUserDetails] = useState(null);
  const [page, setPage] = useState(0); // Current page index
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true);
  const [tags, setTags] = useState(null);
  const [tag, setTag] = useState(null);
  const [flug, setFlug] = useState("all");
  //////////////////Floating messanger logic////////////////////////
  const [switcher, setSwitcher] = useState(false);
  const [suggestionShown, setSuggestionShown] = useState(false);
  const [gard, setGard] = useState(1);
  useEffect(() => {
    setGard(gard + 1);
    if (window.innerWidth > 900) {
      socket &&
        socket.on("message-from", (data) => {
          const { name, profile, senderId } = data;
          if (gard < 2) {
            new Audio("/notification-soun/openBox.mp3").play();
          }

          setUserDetails({ name, profile, _id: senderId });
        });
    }
    return () => {
      socket && socket.off("message-from");
    };
  }, [socket]);
  ///////////////////////////////////////////////////////////////
  useEffect(() => {
    setSwitcher(true);
  }, [userDetails]);
  useEffect(() => {
    if (!switcher) setUserDetails(null);
  }, [switcher]);
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
        commonLogout(dispatch, error);
      }
    };

    fetchData();
  }, [store.token]);
  const fetchChunkData = useCallback(async () => {
    if (isLoading || !hasMore) return; // Avoid duplicate requests
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${baseurl}/userquestions/all-friends-questions?skip=${
          page * 10
        }&flug=${flug}&tag=${tag}`,
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
      commonLogout(dispatch, error);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  const reFormate = async (sub, val) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsLoading(false);
    setHasMore(true);
    setPage(0);
    setQuestions([]);
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${baseurl}/userquestions/all-friends-questions?skip=${
          0 * 10
        }&flug=${sub}&tag=${val}`,
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
      commonLogout(dispatch, error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const logout = () => {
    dispatch({ type: "logout" });
    router.push("/login");
  };
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="min-h-screen">
      <ProtectRoute>
        {/* Header */}
        <div className="md:px-10 px-2 py-3">
          <SuperHeader />
        </div>

        {/* Main Content */}
        <div className="md:px-6 relative flex md:pt-4 gap-4 bg-gray-100">
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
                  alt={store?.userInfo?.name}
                />
                <h2 className="font-bold">{store?.userInfo?.name}</h2>
              </a>

              {/* Sidebar Links */}
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
                  href={`${viewurl}/userdashboard/setting`}
                  className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300 px-4 py-2"
                >
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
                        setFlug("subject");
                        reFormate("subject", tag.subject);
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
                            setFlug("chapter");
                            reFormate("chapter", chap);
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

          {/* Mobile Sidebar */}
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
            <div className="text-gray-700">
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

          {/* Main Feed */}
          <div className="md:w-6/12">
            <NearbyUserProfileCard />
            <div className="Add_a_question rounded-md border md:mb-4 mt-1 mb-2 shadow-sm hover:shadow-md cursor-pointer duration-150 bg-white flex items-center gap-4 py-2 px-6">
              <img
                className="w-16 rounded-full"
                src={store?.userInfo?.profile}
                alt={store?.userInfo?.name}
              />
              <a
                className="text-gray-700 text-lg md:font-semibold"
                href="/userdashboard/timeline/create-post"
              >
                Share a question with your friends
              </a>
              <p
                onClick={() => setOpenSideMenu(true)}
                className="md:hidden cursor-pointer"
              >
                <span>...</span>
              </p>
            </div>
            {/* =====================================Story sharing from here==================================== */}
            <DisplayMemoryCard />
   {questions?.map((question, i) => (
  <div key={i} className="mx-auto">
    {/* This will render the suggestion card in the middle of the list */}
    {i === Math.floor(questions.length / 2) && <FrindSuggestedCard />}
    {/* {i === Math.floor(questions.length - 2) && <DisplayMemoryCard />} */}
    <QuestionCard
      questionsAfterDelete={questionsAfterDelete}
      myQuestion={question}
      Handler={setUserDetails}
    />
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

          {/* Right Sidebar (e.g., Ads or Extra Info) */}
          <div className="w-3/12 hidden md:block">
            <VerticleBanner />
            {/* Optional: <MobileBanner /> */}
          </div>
        </div>

        {/* Footer */}
        {switcher && userDetails && (
          <div className="fixed bottom-0 left-0 md:left-auto md:right-0 z-30 border w-screen md:h-auto md:w-[25vw] bg-white">
            <FloatingMessageContainer
              id={userDetails._id}
              userDetails={userDetails}
              setSwitcher={setSwitcher}
            />
          </div>
        )}
        <Footer />
      </ProtectRoute>
    </div>
  );
};

export default Page;
