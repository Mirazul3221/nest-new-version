"use client";
import React, { useContext, useRef, useState } from "react";
import English from "./select-component-for-topic/English";
import Bangla from "./select-component-for-topic/Bangla";
import Math from "./select-component-for-topic/Math";
import JoditEditorWrapper from "@/app/assistantdashboard/components/joditEditor";
import axios from "axios";
import { baseurl } from "@/app/config";
import loader from "@/public/loading-buffer.gif";
import storeContext from "@/app/global/createContex";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditQuestion = ({Q}) => {
  const [subject, setSubject] = useState(Q.subject);
  const [chapter, setChapter] = useState(Q.chapter);
  const [prevExam, setPrevExm] = useState(Q.prevExam);
  const [question, setQuestion] = useState(Q.question);
  const [option_01, setOption_01] = useState(Q.option_01);
  const [option_02, setOption_02] = useState(Q.option_02);
  const [option_03, setOption_03] = useState(Q.option_03);
  const [option_04, setOption_04] = useState(Q.option_04);
  const [content, setContent] = useState(Q.content);
  const [rightAns, setRightAns] = useState(Q.rightAns);
  const [loading, setloading] = useState(false);
  const { store } = useContext(storeContext);
  const editor = useRef(null);
  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    const questionSchema = {
      subject,
      chapter,
      prevExam,
      question,
      option_01,
      option_02,
      option_03,
      option_04,
      rightAns,
      content,
    };

    try {
      setloading(true);
      const { data } = await axios.post(
        `${baseurl}/userquestions/edit-question/${Q._id}`,
        questionSchema,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      toast('Question Edit Success')
      setloading(false);
    } catch (error) {
      toast.error('Server error')
      setloading(false);
      console.log(error);
    }
  };
  console.log(Q)
  return (
    <div className="rounded-md px-4 py-2">
      <form onSubmit={handleSubmitAnswer}>
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
          {subject === "বাংলা" && (
            <Bangla chapter={chapter} setChapter={setChapter} />
          )}
          {subject === "ইংরেজি" && (
            <English chapter={chapter} setChapter={setChapter} />
          )}
          {subject === "গণিত" && (
            <Math chapter={chapter} setChapter={setChapter} />
          )}
          {/* ------------------------------------------------------------------------------- */}
          <div className="hidden md:block">
            <label htmlFor="title">Previous exam session</label>
            <input
              onChange={(e) => setPrevExm(e.target.value)}
              value={prevExam}
              type="text"
              name="exam"
              id="exam"
              placeholder="optional"
              className="outline-none flex w-48 py-1 px-2 rounded-md border"
            />
          </div>
        </div>

        <div className="mt-2 block md:hidden">
            <label htmlFor="title">Previous exam session</label>
            <input
              onChange={(e) => setPrevExm(e.target.value)}
              value={prevExam}
              type="text"
              name="exam"
              id="exam"
              placeholder="optional"
              className="outline-none flex w-10/12 py-1 px-2 rounded-md border"
            />
          </div>
        {/* ------------------------------------------------------------------------------------- */}
        <div>
          <div className="mt-6 md:w-1/2 md:pr-4">
            <label htmlFor="title">Question</label>
            <input
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
              type="text"
              name="question"
              id="question"
              placeholder="question"
              required
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                placeholder="option 01"
                required
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                placeholder="option 02"
                required
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                placeholder="option 03"
                required
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                placeholder="option 04"
                required
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-between md:justify-start items-center gap-3 my-2">
            <select
              required
              value={rightAns}
              className="outline-none flex w-fit py-1 px-2 rounded-md border"
              onChange={(e) => setRightAns(e.target.value)}
              name="rightans"
              id="rightans"
            >
              <option disabled value="">
                Set a correct Answer
              </option>
              <option value="1">option 01</option>
              <option value="2">option 02</option>
              <option value="3">option 03</option>
              <option value="4">option 04</option>
            </select>
            {loading ? (
             <div className="bg-white rounded-md overflow-hidden border">
               <Image className="w-8" src={loader} alt="Loding image"/>
             </div>
            ) : (
              <button
                type="submit"
                className="px-6 py-1 bg-violet-500 text-white rounded-md"
              >
                Edit
              </button>
            )}
          </div>

          <div className="text-editor">
            <h2>Description</h2>
            <JoditEditorWrapper
              ref={editor}
              tabIndex={1}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default EditQuestion;
