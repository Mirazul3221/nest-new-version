'use client'
import ProtectRoute from "@/app/global/ProtectRoute";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SuperHeader from "../components/SuperHeader";
import { useStore } from "@/app/global/DataProvider";
import QuestionCard from "../timeline/components/QuestionCard";
import { baseurl } from "@/app/config";
import { commonLogout } from "../components/common";
import axios from "axios";

const page = () => {
  const { store , dispatch} = useStore();
  const [subject, setSubject] = useState("বাংলা");
  const [questions, setQuestions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const isFetchingRef = useRef(false); // Track ongoing fetch request

  const fetchChunkData = useCallback(async () => {
    if (isFetchingRef.current || isLoading) return; // Prevent duplicate requests
    isFetchingRef.current = true; // Mark as fetching
    setIsLoading(true);

    try {
      const { data } = await axios.get(
        `${baseurl}/auth/get-all-read-questions?type=${subject}&page=${page}`,
        {
          headers: { Authorization: `Bearer ${store.token}` },
        }
      );

      if (data.length === 0) {
        setHasMore(false); // No more data
        isFetchingRef.current = false; // Reset flag
      } else {
        setQuestions((prev) => [...prev, ...data]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      isFetchingRef.current = false; // Reset flag
      commonLogout(dispatch, error);
    } finally {
      isFetchingRef.current = false; // Reset flag
      setIsLoading(false);
    }
  }, [baseurl, store.token, subject, page, isLoading]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !isFetchingRef.current &&
      !isLoading &&
      hasMore
    ) {
      fetchChunkData();
    }
  }, [isLoading, fetchChunkData, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const fetchFirstTime = async () => {
      setQuestions([]);
      setPage(1);
      setHasMore(true);
      setIsLoading(true);

      try {
        isFetchingRef.current = true;
        const { data } = await axios.get(
          `${baseurl}/auth/get-all-read-questions?type=${subject}&page=1`,
          {
            headers: { Authorization: `Bearer ${store.token}` },
          }
        );
        setQuestions(data);
        setPage(2);
        isFetchingRef.current = false;
      } catch (error) {
        commonLogout(dispatch, error);
        console.error("Error fetching initial questions:", error);
        isFetchingRef.current = false;
      } finally {
        setIsLoading(false);
      }
    };

    fetchFirstTime();
  }, [subject, baseurl, store.token]);
    const questionsAfterDelete = (question) => {
    const filteredQuestions = questions?.filter((q) => q._id !== question._id);
    setQuestions(filteredQuestions);
  };
  return (
    <div>
      <ProtectRoute>
        <SuperHeader />
        <div className="">
          {questions && (
            <div className="mx-auto md:px-20 w-full h-full">
              <div className="flex gap-2 my-2">
                <div
                  onClick={() => {
                    setSubject("বাংলা");
                  }}
                  className={`${
                    subject === "বাংলা"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100"
                  } shadow-md rounded-md px-4 text-sm border cursor-pointer`}
                >
                  Bangla
                </div>
                <div
                  onClick={() => {
                    setSubject("ইংরেজি");
                  }}
                  className={`${
                    subject === "ইংরেজি"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100"
                  } shadow-md rounded-md px-4 text-sm border cursor-pointer`}
                >
                  English
                </div>
                <div
                  onClick={() => {
                    setSubject("গণিত");
                  }}
                  className={`${
                    subject === "গণিত"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100"
                  } shadow-md rounded-md px-4 text-sm border cursor-pointer`}
                >
                  Math
                </div>
              </div>
              {questions?.map((question, i) => {
                return (
                  <div className="md:w-2/3" key={i}>
                    <QuestionCard
                      questionsAfterDelete={questionsAfterDelete}
                      myQuestion={question}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {isFetchingRef.current === true && (
            <h2 className="md:ml-20 mt-4 text-lg">Loading...</h2>
          )}
        </div>
      </ProtectRoute>
    </div>
  );
};

export default page;
