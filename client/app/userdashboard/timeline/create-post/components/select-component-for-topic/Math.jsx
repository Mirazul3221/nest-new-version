import { mathTopicValue } from "@/app/assistantdashboard/components/data";
import React from "react";

const Math = ({ chapter, setChapter }) => {
  return (
    <div>
       <label htmlFor="chapter">Chapter</label>
      <select
        required
        value={chapter}
        onChange={(e) => setChapter(e.target.value)}
        className="outline-none flex w-28 py-1 px-2 rounded-md border"
      >
        <option className="text-gray-400" value="" selected>
          --select--
        </option>
        <option
          className="font-bold text-center text-gray-950 bg-gray-200 text-md"
          value=""
          disabled
        >
          পাটি গণিত
        </option>
        {mathTopicValue[0].value.map((item, i) => (
          <option key={i}>{item}</option>
        ))}
        <option
          className="font-bold text-center text-gray-950 bg-gray-200 text-md"
          value=""
          disabled
        >
          বীজগণিত
        </option>
        {mathTopicValue[1].value.map((item, i) => (
          <option key={i}>{item}</option>
        ))}

        <option
          className="font-bold text-center text-gray-950 bg-gray-200 text-md"
          value=""
          disabled
        >
          জ্যামিতি
        </option>
        {mathTopicValue[2].value.map((item, i) => (
          <option key={i}>{item}</option>
        ))}

        <option
          className="font-bold text-center text-gray-950 bg-gray-200 text-md"
          value=""
          disabled
        >
          বিচ্ছিন্ন গণিত
        </option>

        {mathTopicValue[3].value.map((item, i) => (
          <option key={i}>{item}</option>
        ))}
        <option
          className="font-bold text-center text-gray-950 bg-gray-200 text-md"
          value=""
          disabled
        >
          গতিবিদ্যা
        </option>
        {mathTopicValue[4].value.map((item, i) => (
          <option key={i}>{item}</option>
        ))}
        <option
          className="font-bold text-center text-gray-950 bg-gray-200 text-md"
          value=""
          disabled
        >
          অন্যান্য
        </option>
        {mathTopicValue[5].value.map((item, i) => (
          <option key={i}>{item}</option>
        ))}
      </select>
    </div>
  );
};

export default Math;
