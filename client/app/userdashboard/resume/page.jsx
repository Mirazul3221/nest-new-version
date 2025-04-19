"use client";
import React, { useState } from "react";
import AddExperience from "./components/AddExperience";
import ProtectRoute from "@/app/global/ProtectRoute";
import SuperHeader from "../components/SuperHeader";
import AddBio from "./components/AddBio";
import Education from "./components/Education";
import AddOther from "./components/AddProject";
import StarRating from "./components/StarRating";

const page = () => {
  const defaultStape = 5;
  const [currentStape, setCurrentStape] = useState(1);
  const nextStap = () => {
    if (currentStape < defaultStape) {
      setCurrentStape(currentStape + 1);
    }
  };

  const prevStap = () => {
    if (currentStape > 1) {
      setCurrentStape(currentStape - 1);
    }
  };
  const percentage = (currentStape / defaultStape) * 100;
  return (
    <div className="bg-[#fcf7f8] min-h-[100vh]">
      <ProtectRoute>
        <div className="md:mx-10 mx-4">
          <SuperHeader />
          <div className="md:px-20 px-4 py-4">
            <h2 className="md:text-2xl mt-4 font-semibold text-center text-gray-700 text-ennter">
              {currentStape === 1
                ? "PRIMARY BIO"
                : currentStape === 2
                ? "EDUCATION"
                : currentStape === 3
                ? "EXPERIENCE"
                : ""}
            </h2>
            <div className="progres py-[2px] px-1 rounded-full bg-gray-200">
              <div
                className="inner bg-violet-500 rounded-full duration-500 h-[3px]"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            {currentStape === 1 && <AddBio />}
            {currentStape === 2 && <Education />}
            {currentStape === 3 && <AddExperience />}
            {currentStape === 4 && <AddOther />}

            <div className="ml-auto w-fit gap-4 flex mt-10">
              <div
                onClick={prevStap}
                class="text-white bg-violet-500 hover:bg-violet-600 ring-[2px] cursor-pointer w-fit focus:outline-none ring-violet-300 font-medium rounded-lg px-2 text-center"
              >
                Prev
              </div>
              <div
                onClick={nextStap}
                class="text-white bg-violet-500 hover:bg-violet-600 ring-[2px] cursor-pointer w-fit focus:outline-none ring-violet-300 font-medium rounded-lg px-2 text-center"
              >
                Next
              </div>
            </div>
            <StarRating percentage={70}/>
            <StarRating percentage={60}/>
          </div>
        </div>
      </ProtectRoute>
    </div>
  );
};

export default page;
