"use client";
import ProtectRoute from "@/app/global/ProtectRoute";
import React from "react";
import SuperHeader from "../../components/SuperHeader";
import Footer from "@/app/components/Footer";
import QuestionCard from "./components/QuestionCard";
const Page = () => {
  return (
    <div>
      <ProtectRoute>
        <div className="header px-4 md:px-10 py-3">
          <SuperHeader />
        </div>
        <div className="bg-gray-50 border-t mb-1 min-h-[76vh] flex justify-center pt-4 px-4 md:px-10">
          <div className="md:w-1/2 w-full">
            <h2 className="text-2xl text-center mb-4 font-semibold text-gray-700">
              All the questions you have added
            </h2>
            <QuestionCard/>
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
