import { banglaTopicValue } from "@/app/assistantdashboard/components/data";
import React from "react";

const Bangla = ({ setTopic, topic }) => {
  return (
    <div>
      <label htmlFor="chapter">Chapter</label>
      <select
        required
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="outline-none flex w-28 py-1 px-2 rounded-md border"
        name="সাহিত্য"
        id="সাহিত্য"
      >
        <option className="text-gray-400" value="" selected>
          --select--
        </option>
        <option className="font-bold text-center text-gray-950 bg-gray-200 text-2xl" value="" disabled>
        সাহিত্য
        </option>
        {banglaTopicValue[0].subTitleName.map((item) => {
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
        <option className="font-bold text-center text-gray-950 bg-gray-200 text-2xl" value="" disabled>
          ব্যাকরণ
        </option>

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
  );
};

export default Bangla;
