'use client'
import { englishTopicValue, scrollToTop } from "@/app/assistantdashboard/components/data";
import React, { useState } from "react";

const English2 = ({ stage, setStage, chapter, setChapter }) => {
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
                {englishTopicValue[1].topic.map((item) => {
                    return (
                        <>
                            <option disabled className="font-bold" value="">
                                {item.name}
                            </option>
                            {item.subTopic.map((item, i) => {
                                return (
                                    <option key={i} value={item}>
                                        {item}
                                    </option>
                                );
                            })}
                        </>
                    );
                })}
            </select>
        </div>

                  {
            stage == 2 && <div>
              {englishTopicValue[1].topic.map((item) => {
                return (
                  <>
                    <h2 disabled className="font-bold px-4 py-1 rounded-md bg-amber-500 text-gray-50" value="">
                      {item.name}
                    </h2>
                    <div className="flex gap-2 flex-wrap mt-4 mb-8">
                      {item.subTopic.map((topic, i) => (
                        <h3 onClick={(e) => { setChapter(e.target.innerText); setStage(3);scrollToTop()}} className="bg-amber-500 text-white px-2 w-fit text-sm rounded-md cursor-pointer" key={i} value={topic}>
                          {topic}
                        </h3>
                      ))}
                    </div>
                  </>
                );
              })}
            </div>
          }
        </>
    );
};

export default English2;
