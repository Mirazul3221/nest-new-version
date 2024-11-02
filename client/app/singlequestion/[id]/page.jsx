"use client";
import Logo from "@/app/components/Logo";
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
const Page = () => {
  const [data, setData] = useState([]);
  const [topic, setTopic] = useState(null);
  const [loader, setloader] = useState(true);
  const pram = useParams();
  useEffect(() => {
    async function releventQuestions(topic) {
      try {
        const { data } = await axios.get(
          `${baseurl}/allquestionscollection/publicUser/findbytopic/${topic}`
        );
        setTopic(data);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${baseurl}/allquestionscollection/publicUser/find/${pram.id}`
        );
        setData(data[0]);
        setloader(false);
        await releventQuestions(data[0].topic);
      } catch (error) {
        console.log(error);
        setloader(false);
      }
    }
    fetchData();
  }, []);

  console.log(topic);
  return (
    <>
      <div className="py-2 min-h-screen">
        <Header />
        {loader ? (
          <div className="flex justify-center items-center w-screen mx-auto p-10 rounded-2xl border-2 h-screen fixed top-0 left-0 bg-white">
            <Image className="w-1/3" src={waiting} alt="Loading" />
          </div>
        ) : (
          <div className="md:container mx-auto flex">
            <div className="bg-violet-500 sticky min-h-screen h-screen w-2/12 top-20 overflow-y-auto">
              <div className="w-full">
                {data.subject === "English" ? <EnglishSiteBar /> : ""}
              </div>
            </div>
            <div className="md:px-10 px-4 w-10/12">
              <div className={`bg-white border-t-2`}>
                <div className="sub_details border-b-2 py-2 text-gray-500">
                  <h2>
                    <span className="font-bold text-gray-700">Subject</span>{" "}
                    :english
                  </h2>
                  <h3>
                    {" "}
                    <span className="font-bold text-gray-700">
                      Topic
                    </span> : {data.topic}
                  </h3>
                  <h4>
                    <span className="font-bold text-gray-700">
                      Previous Exam
                    </span>{" "}
                    : {data?.otherExamName}
                  </h4>
                </div>
                <div className="question py-2 text-gray-500 border-b-2 mb-4">
                  <h4 className="text-lg mb-2 font-bold">
                    Question : {data?.question}
                  </h4>
                  <div className="md:grid grid-cols-2 gap-6">
                    <h4>
                      {" "}
                      <span className="font-bold text-gray-700">A</span> :{" "}
                      {data?.option_01}
                    </h4>
                    <h4>
                      <span className="font-bold text-gray-700">B</span> :{" "}
                      {data?.option_02}
                    </h4>
                    <h4>
                      <span className="font-bold text-gray-700">C</span> :{" "}
                      {data?.option_03}
                    </h4>
                    <h4>
                      <span className="font-bold text-gray-700">D</span>:{" "}
                      {data?.option_04}
                    </h4>

                    <h5 className="font-bold text-gray-700">
                      <span>Answer</span>:{" "}
                      {data?.rightAns == 1
                        ? "A"
                        : data?.rightAns == 2
                        ? "B"
                        : data?.rightAns == 3
                        ? "C"
                        : data?.rightAns == 4
                        ? "D"
                        : ""}
                    </h5>
                  </div>
                </div>
                <p className="">
                  {HTMLReactParser(`${data.description || "No Data Found"}`)}
                </p>
              </div>
              <h2 className="text-2xl mt-6 bg-violet-500 text-gray-50 py-2 rounded-md text-center shadow-md">
                Read more relevent questions
              </h2>
              <div className="grid md:grid-cols-2">
                {topic?.map((item, i) => {
                  return (
                    <div key={i} className={`bg-white border-t-2`}>
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
                        <h4 className="text-lg mb-2 font-bold">
                          Question : {item?.question}
                        </h4>
                        <div className="md:grid grid-cols-2 gap-6">
                          <h4>
                            {" "}
                            <span className="font-bold text-gray-700">
                              A
                            </span> : {item?.option_01}
                          </h4>
                          <h4>
                            <span className="font-bold text-gray-700">B</span> :{" "}
                            {item?.option_02}
                          </h4>
                          <h4>
                            <span className="font-bold text-gray-700">C</span> :{" "}
                            {item?.option_03}
                          </h4>
                          <h4>
                            <span className="font-bold text-gray-700">D</span>:{" "}
                            {item?.option_04}
                          </h4>

                          <h5 className="font-bold text-gray-700">
                            <span>Answer</span>:{" "}
                            {item?.rightAns == 1
                              ? "A"
                              : data?.rightAns == 2
                              ? "B"
                              : data?.rightAns == 3
                              ? "C"
                              : data?.rightAns == 4
                              ? "D"
                              : ""}
                          </h5>
                        </div>
                      </div>
                      <p className="">
                        {HTMLReactParser(
                          `${item.description || "No Data Found"}`
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <div className="w-full overflow-hidden flex justify-center">
          <Banner className="w-full" />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
