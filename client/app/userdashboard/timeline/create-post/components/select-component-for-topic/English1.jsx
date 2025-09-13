'use client'
import { englishTopicValue, scrollToTop } from "@/app/assistantdashboard/components/data";
import React, { useState } from "react";

const English1 = ({ stage, setStage, chapter, setChapter}) => {
  return (
    <>
    <div className="hidden md:block">
       <label htmlFor="chapter">Chapter</label>
      <select
        required
        value={chapter}
        onChange={(e) => setChapter(e.target.value)}
        className="outline-none flex w-28 py-1 px-2 rounded-md border"
        name="Literature"
        id="Literature"
      >
 <option value="others">others</option>
        {englishTopicValue[0].topic.map((item, i) => {
          return (
            <option key={i} value={item.name}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
    
              {
            stage == 2 && <div className="flex gap-3 flex-wrap mt-4 mb-8">
    
              {englishTopicValue[0].topic.map((item,i) => {
                return (
    <h3 onClick={(e) => { setChapter(e.target.innerText); setStage(3);scrollToTop()}} className="bg-amber-500 text-white px-2 w-fit text-sm rounded-md cursor-pointer" key={i}>
                          {item.name}
                        </h3>
                );
              })}
            </div>
          }
    </>
  );
};

export default English1;
