"use client";
import loder from "@/public/chunk-loader.webp";
import { baseurl, viewurl } from "@/app/config";
import axios from "axios";
import HTMLReactParser from "html-react-parser";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import waiting from "@/public/wating.gif";
import Image from "next/image";
import { Banner } from "@/app/adsterra/Banner";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import EnglishSiteBar from "./components/EnglishSiteBar";
import Link from "next/link";
const Page = () => {
  const [singleData, setSingleData] = useState([]);
  const [loader, setloader] = useState(true);
  ////////////////////////////////////////////////////////////Logical state for pagination/////////////////////////////////////////////
  const [topic, setTopic] = useState([]);
  const [lazyLoader, setLazyLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [layoutData, switchLayout] = useState(singleData.topic);
  const [count, setCount] = useState(1);
  const limit = 20;
  const pram = useParams();

  const [popup,setPopup] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading
      ) {
        if (popup) return
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  ////////////////////////////////////////////Fetch chunk data from server//////////////////////////////////////

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${baseurl}/allquestionscollection/publicUser/find/${pram.id}`
        );
        setSingleData(data[0]);
        switchLayout(data[0].topic);
        setloader(false);
        fetchChunkData(data[0].topic);
      } catch (error) {
        console.log(error);
        setloader(false);
      }
    }
    fetchData();
  }, []);
  ///////////////////////////////////////function Data set when scroll//////////////////////////////
  const fetchChunkData = async (layoutData) => {
    if (loading) return;
    try {
      if (layoutData !== undefined) {
        const encodedQuery = encodeURIComponent(layoutData);
        setLoading(true);
        console.log("page no", page);
        const { data } = await axios.get(
          `${baseurl}/allquestionscollection/publicUser/findbytopic?page=${page}&limit=${limit}&topic=${encodedQuery}`
        );
        if (data.length > 0) {
          setTopic((prev) => [...prev, ...data]);
          setPage((prev) => prev + 1);
        } else {
          setTopic([]);
          setPage(1);
        }
        setLoading(false);
      }
    } catch (error) {}
  };
  ////////////////////////////////////////////Data load////////////////////////////////
  const dataLoad = (sub) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTopic([]);
    setPage(1);
    switchLayout(sub);
    fetchChunkData(sub);
    setPopup(true)
  };

  const targetElement = (e) => {
    const targetBox =
      e.target.parentElement.parentElement.parentElement.children[3];
    console.log(targetBox);
    targetBox.classList.remove("max-h-0");
    targetBox.classList.add("h-auto");
    targetBox.classList.add("max-h-[500vh]");
    targetBox.classList.add("duration-1000");
  };
  return (
    <>
      <div className="py-2 min-h-screen">
        <Header />
        {loader ? (
          <div className="flex justify-center items-center w-screen mx-auto p-10 rounded-2xl border-2 h-screen fixed top-0 left-0 bg-white">
            <Image className="w-1/3" src={waiting} alt="Loading" />
          </div>
        ) : (
          <div>
            <div className="md:flex gap-2 mb-2 items-center md:mx-20">
              <div className="overflow-hidden flex justify-center bg-white">
                <Banner />
              </div>
              {lazyLoader && (
                <div className=" overflow-hidden w-fit flex justify-center bg-white">
                  <Banner />
                </div>
              )}
            </div>
            <div className="md:px-20 px-4 md:flex">
              <div className="bg-violet-500 sticky min-h-[90vh] h-[90vh] w-2/12 top-20 overflow-y-auto hidden md:block">
                <div className="w-full">
                  <EnglishSiteBar dataLoad={dataLoad} />
                </div>
              </div>
              <div className="md:w-10/12">
                <div>
                  {singleData.topic === layoutData && (
                    <div className={`bg-white border-t-2 px-4`}>
                      <div className="sub_details border-b-2 py-2 text-gray-500">
                        <h2>
                          <span className="font-bold text-gray-700">
                            Subject
                          </span>{" "}
                          :english
                        </h2>
                        <h3>
                          {" "}
                          <span className="font-bold text-gray-700">
                            Topic
                          </span>{" "}
                          : {singleData.topic}
                        </h3>
                        <h4>
                          <span className="font-bold text-gray-700">
                            Previous Exam
                          </span>{" "}
                          : {singleData?.otherExamName}
                        </h4>
                      </div>
                      <div className="question py-2 text-gray-500 border-b-2 mb-4">
                        <h1 className="text-lg mb-2 font-bold">
                          Question : {singleData?.question}
                        </h1>
                        <div className="md:grid grid-cols-2 gap-6">
                          <h4>
                            {" "}
                            <span className="font-bold text-gray-700">
                              A
                            </span> : {singleData?.option_01}
                          </h4>
                          <h4>
                            <span className="font-bold text-gray-700">B</span> :{" "}
                            {singleData?.option_02}
                          </h4>
                          <h4>
                            <span className="font-bold text-gray-700">C</span> :{" "}
                            {singleData?.option_03}
                          </h4>
                          <h4>
                            <span className="font-bold text-gray-700">D</span>:{" "}
                            {singleData?.option_04}
                          </h4>

                          <h5 className="font-bold text-gray-700">
                            <span>Answer</span>:{" "}
                            {singleData?.rightAns == 1
                              ? "A"
                              : singleData?.rightAns == 2
                              ? "B"
                              : singleData?.rightAns == 3
                              ? "C"
                              : singleData?.rightAns == 4
                              ? "D"
                              : ""}
                          </h5>
                        </div>
                      </div>
                      <p className="">
                        {HTMLReactParser(
                          `${singleData.description || "No Data Found"}`
                        )}
                      </p>
                    </div>
                  )}
                  {topic.length > 0 && (
                    <h2 className="md:text-2xl mt-6 bg-violet-500 pb-6 text-gray-50 py-2 rounded-t-lg text-center shadow-md">
                      Read more relevent questions
                    </h2>
                  )}
                </div>
                <div>
                  {topic.length > 0 ? (
                    <div className="grid md:grid-cols-2 -mt-3 gap-4">
                      {topic?.map((item, i) => {
                        return (
                          <div
                            key={i}
                            className={`bg-gray-100 rounded-2xl md:p-4 border-t-2`}
                          >
                            <h2>{i + 1}</h2>
                            <div className="sub_details border-b-2 py-2 text-gray-500">
                              <h3>
                                {" "}
                                <span className="font-bold text-gray-700">
                                  Topic
                                </span>{" "}
                                : {item.topic}
                              </h3>
                              <h4>
                                <span className="font-bold text-gray-700">
                                  Previous Exam
                                </span>{" "}
                                : {item?.otherExamName}
                              </h4>
                            </div>
                            <div className="question py-2 text-gray-500 border-b-2 mb-4">
                              <h2 className="text-lg mb-2 font-bold">
                                Question : {item?.question}
                              </h2>
                              <div className="md:grid grid-cols-2 gap-6">
                                <h4>
                                  {" "}
                                  <span className="font-bold text-gray-700">
                                    A
                                  </span>{" "}
                                  : {item?.option_01}
                                </h4>
                                <h4>
                                  <span className="font-bold text-gray-700">
                                    B
                                  </span>{" "}
                                  : {item?.option_02}
                                </h4>
                                <h4>
                                  <span className="font-bold text-gray-700">
                                    C
                                  </span>{" "}
                                  : {item?.option_03}
                                </h4>
                                <h4>
                                  <span className="font-bold text-gray-700">
                                    D
                                  </span>
                                  : {item?.option_04}
                                </h4>

                                <h5 className="font-bold text-gray-700">
                                  <span>Answer</span>:{" "}
                                  {item?.rightAns == 1
                                    ? "A"
                                    : item?.rightAns == 2
                                    ? "B"
                                    : item?.rightAns == 3
                                    ? "C"
                                    : item?.rightAns == 4
                                    ? "D"
                                    : ""}
                                </h5>
                              </div>
                              <div className="flex mt-2 gap-4">
                                {item.description && (
                                  <h4
                                    onClick={(e) => {
                                      targetElement(e);
                                      setCount(i);
                                    }}
                                    className={`px-4 cursor-pointer ${
                                      i === count ? "hidden" : ""
                                    } bg-violet-700 rounded-lg text-white`}
                                  >
                                    Read more...
                                  </h4>
                                )}
                                <Link
                                  href={`${viewurl}/singlequestion/${item._id}`}
                                >
                                  <h4 className="px-4 bg-violet-700 rounded-lg text-white">
                                    Open in a tab
                                  </h4>
                                </Link>
                              </div>
                            </div>
                            <div className="max-h-0 duration-1000 overflow-hidden">
                              <p>
                                {HTMLReactParser(
                                  `${item.description || "No Data Found"}`
                                )}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="w-full h-[50vh] md:h-[80vh] flex justify-center items-center">
                      {fetchLoading ? "Loading..." : "Data Not Found"}
                    </div>
                  )}
                </div>
                <div
                    onClick={() => {
                      fetchChunkData(layoutData);
                    }}
                    className="bg-violet-700 cursor-pointer shadow-md flex duration-300 justify-center items-center pr-4 border border-violet-700 text-white md:text-lg w-fit mx-auto my-4 rounded-full"
                  >
                    {loading && (
                      <div className="flex justify-center w-20 bg-white rounded-l-full">
                        <Image
                          className="w-6 p-1 md:w-8"
                          src={loder}
                          alt="loading"
                        />
                      </div>
                    )}
                    <h2 className="pl-4">Read more questions</h2>
                  </div>
              </div>
            </div>
          </div>
        )}
        <div className="w-full overflow-hidden flex justify-center"></div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
///
