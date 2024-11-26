"use client";
import React, { useRef, useState } from "react";
import English from "./select-component-for-topic/English";
import Bangla from "./select-component-for-topic/Bangla";
import Math from "./select-component-for-topic/Math";
import JoditEditorWrapper from "@/app/assistantdashboard/components/joditEditor";

const AddQuestion = () => {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [prevExam, setPrevExm] = useState("");
  const [option_01, setOption_01] = useState("");
  const [option_02, setOption_02] = useState("");
  const [option_03, setOption_03] = useState("");
  const [option_04, setOption_04] = useState("");
  const [content, setContent] = useState();
  const editor = useRef(null);
  return (
    <div className="bg-white rounded-md px-4 py-2">
      <h2 className="text-2xl font-bold text-gray-500 mb-2">
        Add your favourite question
      </h2>
      <div className="gap-2 flex items-center ">
        <div>
          <label htmlFor="title">Subject</label>
          <select
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            name="subje"
            id="Brance"
            className="outline-none flex w-28 py-1 px-2 rounded-md border"
          >
            <option className="text-gray-400" value="" selected>
              --select--
            </option>
            <option value="বাংলা">বাংলা</option>
            <option value="ইংরেজি">ইংরেজি</option>
            <option value="গণিত">গণিত</option>
            <option value="সাধারণ জ্ঞান">সাধারণ জ্ঞান</option>
            <option value="বিজ্ঞান">বিজ্ঞান</option>
            <option value="ভূগোল">ভূগোল</option>
            <option value="আইসিটি">আইসিটি</option>
            <option value="নাগরিক">নাগরিক</option>
          </select>
        </div>
        {/* ------------------------------------------------------------------------------- */}
        {subject === "বাংলা" && <Bangla topic={topic} setTopic={setTopic} />}
        {subject === "ইংরেজি" && <English topic={topic} setTopic={setTopic} />}
        {subject === "গণিত" && <Math topic={topic} setTopic={setTopic} />}
        {/* ------------------------------------------------------------------------------- */}
        <div>
          <label htmlFor="title">Previous exam session</label>
          <input
            onChange={(e) => setPrevExm(e.target.value)}
            value={prevExam}
            type="text"
            name="exam"
            id="exam"
            placeholder="optional"
            required
            className="outline-none flex w-48 py-1 px-2 rounded-md border"
          />
        </div>
      </div>
      {/* ------------------------------------------------------------------------------------- */}
      {/* ------------------------------------------------------------------------------------- */}
      {/* ------------------------------------------------------------------------------------- */}
      {/* ------------------------------------------------------------------------------------- */}
      <div className="">
        <div className="mt-6 w-1/2 pr-4">
          <label htmlFor="title">Question</label>
          <input
            type="text"
            name="question"
            id="question"
            placeholder="question"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {/* ------------------------------------------------------------------------------------- */}
        <div className="md:flex gap-10 mt-2">
          <div className="flex flex-col w-full mb-2">
            <label htmlFor="title">Qusetion Option value 01</label>
            <input
              onChange={(e) => setOption_01(e.target.value)}
              value={option_01}
              type="text"
              name="option_01"
              id="option_01"
              placeholder="option_01"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col w-full mb-2">
            <label htmlFor="title">Qusetion Option value 02</label>
            <input
              onChange={(e) => setOption_02(e.target.value)}
              value={option_02}
              type="text"
              name="option_02"
              id="option_02"
              placeholder="option_02"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="md:flex gap-10 mt-2">
          <div className="flex flex-col w-full mb-2">
            <label htmlFor="title">Qusetion Option value 03</label>
            <input
              onChange={(e) => setOption_03(e.target.value)}
              value={option_03}
              type="text"
              name="option_03"
              id="option_03"
              placeholder="option_03"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col w-full mb-2">
            <label htmlFor="title">Qusetion Option value 02</label>
            <input
              onChange={(e) => setOption_04(e.target.value)}
              value={option_04}
              type="text"
              name="option_04"
              id="option_04"
              placeholder="option_04"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        <div className="text-editor">
        <JoditEditorWrapper
            ref={editor}
            tabIndex={1}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
