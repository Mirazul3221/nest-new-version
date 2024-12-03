"use client";
import { baseurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import ProtectRoute from "@/app/global/ProtectRoute";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import SuperHeader from "../../components/SuperHeader";
import QuestionCard from "../components/QuestionCard";

const page = () => {
  const [questions, setQuestions] = useState();
  const [allQuestions, setAllQuestions] = useState();
  const { store } = useContext(storeContext);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const fetchChunkData = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${baseurl}/userquestions/all-friends-questions?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      if (data.questions.length > 0) {
        setQuestions((prev) => [...prev, ...data.questions]);
        setPage((prev) => prev + 1);
      }
      setLoading(false);
    } catch (error) {}
  };

  const fetchFirstData = async () => {
    try {
      const { data } = await axios.get(
        `${baseurl}/userquestions/all-friends-questions?page=1&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setQuestions(data.questions);
      setAllQuestions(data.totalQuestions)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (allQuestions == undefined) {
      fetchFirstData();
    }
    const handleScroll = () => {
      // console.log( document.body.offsetHeight)
      // console.log(window.innerHeight + window.scrollY);
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 800 &&
        !loading
      ) {
        if(allQuestions - 5 > questions.length){
          fetchChunkData();
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading,allQuestions]);
  const questionsAfterDelete =(question)=>{
    const filteredQuestions = questions?.filter(q=>q._id !== question._id)
     setQuestions(filteredQuestions)
  }
  return (
    <div>
      <ProtectRoute>
         <div className="md:px-10 px-4 py-3"> <SuperHeader /></div>
        <div className="md:px-10 bg-gray-50">
          {questions?.map((question, i) => {
            return (
              <div key={i} className="pt-4 md:w-1/2 mx-auto">
                <QuestionCard questionsAfterDelete={questionsAfterDelete} myQuestion={question} />
                {
                  loading &&  <h2>Loading...</h2>
                }
              </div>
            );
          })}
        </div>
      </ProtectRoute>
    </div>
  );
};

export default page;
