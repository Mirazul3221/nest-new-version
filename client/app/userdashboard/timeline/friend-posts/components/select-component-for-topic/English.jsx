'use client'
import { englishTopicValue } from "@/app/assistantdashboard/components/data";
import React, { useState } from "react";

const English = ({setTopic, topic}) => {
  return (
    <div>
       <label htmlFor="chapter">Chapter</label>
      <select
        required
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="outline-none flex w-28 py-1 px-2 rounded-md border"
        name="Literature"
        id="Literature"
      >
        <option className="text-gray-400" value="" selected>
          --select--
        </option>
        <option disabled className="font-bold text-lg text-gray-900 bg-gray-200">Literature</option>
        {englishTopicValue[0].topic.map((item, i) => {
          return (
            <option key={i} value={item.name}>
              {item.name}
            </option>
          );
        })}
    <option disabled className="font-bold bg-gray-200 text-gray-900 text-lg">Grammer</option>
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
  );
};

export default English;
