"use client";
import ProtectRoute from "@/app/global/ProtectRoute";
import React, { useCallback, useContext, useEffect, useState } from "react";
import SuperHeader from "../../components/SuperHeader";
import Footer from "@/app/components/Footer";
import QuestionCard from "../components/QuestionCard";
import storeContext from "@/app/global/createContex";
import axios from "axios";
import { baseurl } from "@/app/config";
const Page = () => {
  const { store } = useContext(storeContext);
  const [allQuestions, setAllQuestions] = useState([]);
   const [page, setPage] = useState(0);
     const [isLoading, setIsLoading] = useState(false); // Loading state
       const [hasMore, setHasMore] = useState(true);

       
  const fetchMyData = useCallback(async () => {
    if (isLoading || !hasMore) return; // Avoid duplicate requests
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${baseurl}/userquestions/myquestions?skip=${page * 10}`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });

      if (data.length === 0) {
        setHasMore(false); // No more comments to fetch
      } else {
        setAllQuestions(prev => [...prev,...data]);
        setPage((prev) => prev + 1); // Increment page
      }
    } catch (error) {
      console.log(error);
    }finally {
      setIsLoading(false);
    }
  },[page, isLoading, hasMore]);

  useEffect(() => {
    fetchMyData();
  }, []);




  // Infinite Scroll Event Listener//
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !isLoading
      ) {
        fetchMyData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, [fetchMyData, isLoading]);


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
