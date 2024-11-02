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
const Page = () => {
  const [data, setData] = useState([]);
  const [loader, setloader] = useState(true);
  const pram = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${baseurl}/allquestionscollection/singleUser/find/${pram.id}`
        );
        setData(data[0]);
        setloader(false);
      } catch (error) {
        console.log(error);
        setloader(false);
      }
    }
    fetchData();
  }, []);

  async function name(params) { 
  const res = await fetch(`${baseurl}/allquestionscollection/findall`);
  const data =await res.json()
  const dynamicUrl = data.map((m)=>({
    url: `${viewurl}/singlequestion/${m.slug ? m.slug : m._id}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1,
  }))

  console.log(dynamicUrl)
  }
  return (
     <>
    <div className="bg-gray-100 py-2 min-h-screen">
    <div className="flex justify-center items-center w-20 h-20 p-2 md:p-0 md:w-36 md:h-36 bg-white rounded-full mx-auto border-2">
      <Logo w={100} />
    </div>
    {loader ? (
      <div className="flex justify-center items-center md:w-2/3 mx-auto p-10 rounded-2xl border-2 h-[80vh]">
        <Image className="w-40 h-40" src={waiting} alt="Loading" />
      </div>
    ) : (
      <div className={`md:w-2/3 mx-auto bg-white p-10 rounded-2xl border-2`}>
        <div className="sub_details border-b-2 py-2 text-gray-500">
          <h2>
            <span className="font-bold text-gray-700">Subject</span> :english
          </h2>
          <h3>
            {" "}
            <span className="font-bold text-gray-700">Topic</span> :{" "}
            {data.topic}
          </h3>
          <h4>
            <span className="font-bold text-gray-700">Previous Exam</span> :{" "}
            {data?.otherExamName}
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
    )}
    <div className="w-full overflow-hidden flex justify-center">
      <Banner className="w-full" />
    </div>
  </div></>
  );
};

export default Page;