"use client";
import ProtectRoute from "@/app/global/ProtectRoute";
import React, { useContext, useEffect, useState } from "react";
import SuperHeader from "../../components/SuperHeader";
import Footer from "@/app/components/Footer";
import QuestionCard from "../components/QuestionCard";
import storeContext from "@/app/global/createContex";
import axios from "axios";
import { baseurl } from "@/app/config";
const Page = () => {
  const { store } = useContext(storeContext);
  const [allQuestions, setAllQuestions] = useState();
  const fetchMyData = async () => {
    try {
      const { data } = await axios.get(`${baseurl}/userquestions/myquestions`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setAllQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyData();
  }, []);
  console.log(allQuestions)
  const questionsAfterDelete =(question)=>{
    const filteredQuestions = allQuestions?.filter(q=>q._id !== question._id)
     setAllQuestions(filteredQuestions)
  }
  return (
    <div>
      <ProtectRoute>
        <div className="header px-4 md:px-10 py-3">
          <SuperHeader />
        </div>
        <div className="bg-gray-50 border-t mb-1 min-h-[76vh] flex justify-center pt-4 px-4 md:px-10">
          <div className="md:w-1/2 w-full">
            <h2 className="text-2xl text-center mb-4 font-semibold text-gray-700">
              Your MCQ
            </h2>
            {
              allQuestions?.map((question,i)=> {
                return <div key={i} className="">
                         <QuestionCard questionsAfterDelete={questionsAfterDelete} myQuestion={question}/>
                </div>
              })
            }
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </ProtectRoute>
    </div>
  );
};

export default Page;
