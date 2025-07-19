"use client";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import ProtectRoute from "../global/ProtectRoute";
import SuperHeader from "../userdashboard/components/SuperHeader";
import Logo from "../components/Logo";
import axios from "axios";
import { baseurl } from "../config";
import { useStore } from "../global/DataProvider";
import { useEffect } from "react";
import QuestionCard from "../userdashboard/timeline/components/QuestionCard";

const Home = () => {
      const [initLoading, setInitLoading] = useState(false);
      const [questions,setQuestions] = useState(null)
  const param = useSearchParams();
  const {store} = useStore()
  const name = param.get("collection");
  const collectionId = param.get("id");
  const findQuestions = async () => {
    try {
        setInitLoading(true)
      const { data } = await axios.post(
        `${baseurl}/saveuserquestionincollections/find-collected-questions`,
        { collectionId},
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );

      setQuestions(data)
      setInitLoading(false)
    } catch (error) {setInitLoading(false)}
  };

  useEffect(() => {
findQuestions()
  }, []);

    const questionsAfterDelete = (question) => {
    const filteredQuestions = questions?.filter((q) => q._id !== question._id);
    setQuestions(filteredQuestions);
  }; //
  return (
    <div className="md:px-10 px-2 py-2">
      <ProtectRoute>
        <div className="flex justify-between items-center">
          <Logo />{" "}
          <div className="text-violet-700 font-semibold md:text-2xl">{name}</div>
        </div>
         
         <div>
           {
            initLoading && <h2 className="ml-auto mt-10">Loading...</h2>
           } 

            {questions?.map((question, i) => (
              <div key={i} className="mx-auto">
                {/* {i === Math.floor(questions.length - 2) && <DisplayMemoryCard />} */}
                <QuestionCard
                  questionsAfterDelete={questionsAfterDelete}
                  myQuestion={question}
                />
              </div>
            ))}
         </div>

      </ProtectRoute>
    </div>
  );
};

const Suspen = () => {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
};

export default Suspen;
