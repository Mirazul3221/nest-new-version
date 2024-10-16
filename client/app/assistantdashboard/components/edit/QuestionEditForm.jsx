"use client";
import React, { useState } from "react";
import Bangla from "./Bangla";
import English from "./English";
import Math from "./Math";

const QuestionEditForm = () => {
  const [selected, setSelected] = useState("বাংলা");
  console.log(selected);
  return (
    <div className="w-full px-4">
      <div className="flex justify-center">
        <div className="">
          <h2 className="text-center text-2xl">Question Insert Form</h2>
          <div className="md:flex gap-[2px]">
            <div
              onClick={(e) => setSelected(e.target.innerText)}
              className={`py-[3px] px-6 ${selected === 'বাংলা' ? "bg-rose-500 text-white border-none" : ""} text-gray-500 border cursor-pointer font-medium`}>
              বাংলা
            </div>
            <div
              onClick={(e) => setSelected(e.target.innerText)}
              className={`py-[3px] px-6 ${selected === "ইংরেজি"? "bg-blue-500 text-white border-none" : ""} text-gray-500 border cursor-pointer font-medium`}>
              ইংরেজি
            </div>
            <div
              onClick={(e) => setSelected(e.target.innerText)}
              className={`py-[3px] px-6 ${selected === "গণিত"? "bg-amber-500 text-white border-none" : ""} text-gray-500 border cursor-pointer font-medium`}>
              গণিত
            </div>
            <div
              onClick={(e) => setSelected(e.target.innerText)}
              className={`py-[3px] px-6 ${selected === "সাধারণ জ্ঞান"? "bg-green-500 text-white border-none" : ""} text-gray-500 border cursor-pointer font-medium`}>
              সাধারণ জ্ঞান
            </div>
            <div
              onClick={(e) => setSelected(e.target.innerText)}
              className={`py-[3px] px-6 ${selected === "বিজ্ঞান"? "bg-black text-white border-none" : ""} text-gray-500 border cursor-pointer font-medium`}>
              বিজ্ঞান
            </div>
            <div
              onClick={(e) => setSelected(e.target.innerText)}
              className={`py-[3px] px-6 ${selected === "ভূগোল"? "bg-[#bc32fc] text-white border-none" : ""} text-gray-500 border cursor-pointer font-medium`}>
              ভূগোল
            </div>
            <div
              onClick={(e) => setSelected(e.target.innerText)}
              className={`py-[3px] px-6 ${selected === "আইসিটি"? "bg-[#185850] text-white border-none" : ""} text-gray-500 border cursor-pointer font-medium`}>
              আইসিটি
            </div>
            <div
              onClick={(e) => setSelected(e.target.innerText)}
              className={`py-[3px] px-6 ${selected === "নাগরিক"? "bg-[#ff0015] text-white border-none" : ""} text-gray-500 border cursor-pointer font-medium`}>
              নাগরিক
            </div>
          </div>
        </div>
      </div>
      <div className="border-b pb-2"></div>
      {selected === "বাংলা" && <Bangla />}
      {selected === "ইংরেজি" && <English/>}
      {selected === "গণিত" && <Math/>}
    </div>
  );
};

export default QuestionEditForm;
