"use client";
import { baseurl } from "@/app/config";
import ProtectRoute from "@/app/global/ProtectRoute";
import axios from "axios";
import loder from '@/public/loading-buffer.gif'
import React, { useCallback, useContext, useEffect, useState } from "react";
import SuperHeader from "../../components/SuperHeader";
import QuestionCard from "../components/QuestionCard";
import Image from "next/image";
import { useStore } from "@/app/global/DataProvider";
const Page = () => {
    const {dispatch,store} = useStore()
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

      if (data.length === 0) {
        setHasMore(false); // No more comments to fetch
      } else {
        setQuestions(prev=> [...prev,...data])
        setPage((prev) => prev + 1); // Increment page
      }


    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setIsLoading(false);
    }
  },[page, isLoading, hasMore])



  // Infinite Scroll Event Listener//
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !isLoading
      ) {
        fetchChunkData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, [fetchChunkData, isLoading]);


    // Initial Fetch
    useEffect(() => {
      fetchChunkData();
    }, []); // Only once on component mount

  const questionsAfterDelete = (question) => {
    const filteredQuestions = questions?.filter((q) => q._id !== question._id);
    setQuestions(filteredQuestions);
  };
  return (
    <div>
      <ProtectRoute>
        <div className="md:px-10 px-4 py-3">
          <SuperHeader />
        </div>
        <div className="md:px-10 flex md:pt-4 gap-4 bg-gray-50">
          <div className="w-3/12">
            <div className="">
              <div className="">About</div>
              <div className="">Bcs Question</div>
              <div className="">Setting</div>
              <div className="">Log out</div>
            </div>
          </div>
            <div className=" md:w-6/12">
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
          {isLoading && <div className="flex bg-white justify-center"><div className="flex items-center gap-2"><Image src={loder}/> <h2 className="text-center text-gray-500">Loading...</h2></div></div>}
            </div>
            <div className="w-3/12">Right site</div>
        </div>
      </ProtectRoute>
    </div>
  );
};

export default Page;
