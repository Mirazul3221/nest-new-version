import { banglaTopicValue, scrollToTop } from "@/app/assistantdashboard/components/data";
import React from "react";

const Bangla2 = ({ stage, setStage, chapter, setChapter }) => {
  return (
    <>
    <div className="hidden md:block">
      <label htmlFor="chapter">Chapter</label>
      <select
        required
        value={chapter}
        onChange={(e) => setChapter(e.target.value)}
        className="outline-none flex w-28 py-1 px-2 rounded-md border"
        name="সাহিত্য"
        id="সাহিত্য"
      >
       <option value="others">others</option>
              {banglaTopicValue[1].subTitleName.map((item) => {
                return (
                    <>
                    <option disabled className="font-bold pl-4 text-gray-700" value="">
                      {item.name}
                    </option>
                    ;
                    {item.topic.map((topic, i) => (
                      <option className="text-gray-500" key={i} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </>
                );
              })}
      </select>
    </div>
          {
            stage == 2 && <div>
    
              {banglaTopicValue[1].subTitleName.map((item) => {
                return (
                  <>
                    <h2 disabled className="font-bold px-4 py-1 rounded-md bg-rose-500 text-gray-50" value="">
                      {item.name}
                    </h2>
                    <div className="flex gap-2 flex-wrap mt-4 mb-8">
                      {item.topic.map((topic, i) => (
                        <h3 onClick={(e) => { setChapter(e.target.innerText); setStage(3);scrollToTop()}} className="bg-rose-400 text-white px-2 w-fit text-sm rounded-md cursor-pointer" key={i} value={topic}>
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

export default Bangla2;
