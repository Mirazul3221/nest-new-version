"use client";
import React, { useContext, useRef, useState } from "react";
import { FaCloudUploadAlt, FaRegEdit } from "react-icons/fa";
import { baseurl } from "@/app/config";
import axios from "axios";
import storeContext from "@/app/global/createContex";
import { englishTopicValue, examTypeValue } from "./data";
import JoditEditorWrapper from "./joditEditor";
import Gallery from "./Gallery";
import { toast, ToastContainer } from "react-toastify";

const English = () => {
  const editor = useRef(null);
  //=====All state related question value========================
  const [show, setShow] = useState(false);
  const [isExam, setIsExam] = useState(false);
  const { store } = useContext(storeContext);
  const [alert, setAlert] = useState("");
  const [loader, setLoader] = useState(false);
  //=============================================================
  const [subSubject, setSubSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [isAuthor, setIsAuthor] = useState("");
  const [examType, setExamType] = useState("");
  const [exam, setExam] = useState("");
  const [examSeassion, setExamSeassion] = useState("");
  const [otherExam, setOtherExam] = useState("");
  const [question, setQuestion] = useState("");
  const [rightAns, setRightAns] = useState("");
  const [option_01, setOption_01] = useState("");
  const [option_02, setOption_02] = useState("");
  const [option_03, setOption_03] = useState("");
  const [option_04, setOption_04] = useState("");
  const [content, setContent] = useState();

  //=============================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subject", "English");
    formData.append("subSubject", subSubject);
    formData.append("topic", topic);
    if (exam.length > 0) {
      formData.append("examName", exam);
    }
    if (isAuthor.length > 0) {
      formData.append("isAuthor", isAuthor);
    }
    if (examType.length > 0) {
      formData.append("examType", examType);
    }
    if (examSeassion.length > 0) {
      formData.append("examSeassion", examSeassion);
    }
    if (otherExam.length > 0) {
      formData.append("otherExamName", otherExam);
    }
    formData.append("question", question);
    formData.append("rightAns", rightAns);
    formData.append("option_01", option_01);
    formData.append("option_02", option_02);
    formData.append("option_03", option_03);
    formData.append("option_04", option_04);
    
    if (content.length > 0) {
      formData.append("description", content);
    }
//
    try {
      setLoader(true);
      const { data } = await axios.post(
        `${baseurl}/allquestionscollection/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      //===================================
      // setSubSubject("");
      // setTopic("");
      // setExam("");
      setOtherExam("");
      setQuestion("");
      setRightAns("");
      setOption_01("");
      setOption_02("");
      setOption_03("");
      setOption_04("");
      setContent("");
      setLoader(false);
      toast(data);
    } catch (error) {
      setLoader(false);
      setTimeout(() => {
        setAlert("");
      }, 1000);
      toast.error(error.response.data.message);
      //error.response.data.message
    }
  };

  return (
    <div className={`${show ? "fixed w-screen top-0 left-0 bg-white" : ""}`}>
      <div className={` cursor-pointer font-medium flex justify-end mr-10`}>
        <div className="w-8 h-8 bg-violet-700 flex justify-center items-center text-white rounded-full absolute mt-1">
          <FaRegEdit size={20} />
        </div>
      </div>
      <form className="w-fit mx-auto mt-10" onSubmit={handleSubmit}>
        <div className="flex justify-between gap-5 mt-2">
          <select
            required
            value={subSubject}
            onChange={(e) => setSubSubject(e.target.value)}
            name="Brance"
            id="Brance"
            className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option className="text-gray-400" value="" selected>
              --select--
            </option>
            <option value="Literature">Literature</option>
            <option value="Grammar">Grammar</option>
          </select>
          {/* ======================================================================================= */}
          {subSubject === "Literature" && (
            <select
              required
              onClick={() => setIsExam(true)}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="Literature"
              id="Literature"
            >
              <option className="text-gray-400" value="" selected>
                --select--
              </option>
              {englishTopicValue[0].topic.map((item, i) => {
                return (
                  <option key={i} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          )}
          {/* ======================================================================================= */}
          {subSubject === "Grammar" && (
            <select
              required
              onClick={() => setIsExam(true)}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="gg"
              id="gg"
            >
              <option className="text-gray-400" value="" selected>
                --select--
              </option>

              {englishTopicValue[1].topic.map((item) => {
                return (
                  <>
                    <option className="font-bold text-lg bg-gray-100" value="">
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
          )}
          {/* ======================================================================================= */}

          {isExam && (
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              name="Brance"
              id="brnc"
              className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option className="text-gray-400" value="" selected>
                --Exam Type--
              </option>
              {examTypeValue.map((examType, i) => {
                return (
                  <option key={i} value={examType.type}>
                    {examType.type}
                  </option>
                );
              })}
            </select>
          )}
          {/* ========================================================================================= */}

          {examType == "বিসিএস প্রিলিমিনারি" && (
            <>
              <select
                required
                onChange={(e) => setExam(e.target.value)}
                className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="bcs"
                id="bcs"
              >
                {examTypeValue[0].value.map((bcs) => {
                  return (
                    <>
                      <option value={bcs}>{bcs}</option>
                    </>
                  );
                })}
              </select>
            </>
          )}
          {/* {examType == "শিক্ষক নিয়োগ" && } */}
          {/* {examType == "ব্যাংক জবস" && } */}
          {examType == "ভর্তি পরীক্ষা" && (
            <>
              <select
                onChange={(e) => setExam(e.target.value)}
                className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="bcs"
                id="bcs"
              >
                {examTypeValue[3].value.map((admit) => {
                  return (
                    <>
                      <option value={admit}>{admit}</option>
                    </>
                  );
                })}
              </select>
            </>
          )}
          {/* {examType == "বিভিন্ন মন্ত্রণালয়" && } */}
          {/* {examType == "শিক্ষা অফিসার" && } */}
          {/* {examType == "জুডিসিয়াল সার্ভিস" && } */}

          {/* ========================================================================================= */}
          <input
            value={isAuthor}
            onChange={(e) => setIsAuthor(e.target.value)}
            className="py-2 px-4 border-[1px] border-gray-400 rounded-md w-full"
            type="text"
            placeholder="Author Name (Optional)"
          />
          {/* ======================================================================================= */}

          {examType.length > 0 && (
            <input
              onChange={(e) => setExamSeassion(e.target.value)}
              className="py-2 w-full px-4 border-[1px] border-gray-400 rounded-md"
              type="number"
              placeholder="Exam Seassion"
            />
          )}

          {/* ======================================================================================= */}
          <input
            value={otherExam}
            onChange={(e) => setOtherExam(e.target.value)}
            className="py-2 px-4 border-[1px] border-gray-400 rounded-md w-full"
            type="text"
            placeholder="Other exam name (optional)"
          />
        </div>
        <div className="question-form mt-4">
          <div className="flex justify-between gap-4">
            <input
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="py-2 w-full px-4 border-[1px] border-gray-400 rounded-md"
              type="text"
              placeholder="Question Value"
            />
            <div className="correct ans">
              {/* <input
                onChange={(e) => setRightAns(e.target.value)}
                type="number"
                placeholder="Correct ans value"
                className="px-2 w-48 rounded-md py-2 border-2 border-gray-400"
              /> */}
              <select
                required
                value={rightAns}
                className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setRightAns(e.target.value)}
                name="rightans"
                id="rightans"
              >
                <option value="">--Correct Ans--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              {/* ======================================================================================= */}
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <input
              required
              value={option_01}
              onChange={(e) => setOption_01(e.target.value)}
              className="py-2 w-full px-4 border-[1px] border-gray-400 rounded-md"
              type="text"
              placeholder="Option 01"
            />
            {/* ======================================================================================= */}
            <input
              required
              value={option_02}
              onChange={(e) => setOption_02(e.target.value)}
              className="py-2 w-full px-4 border-[1px] border-gray-400 rounded-md"
              type="text"
              placeholder="Option 02"
            />
            {/* ======================================================================================= */}
          </div>
          <div className="flex gap-4 justify-between mt-4">
            <input
              required
              value={option_03}
              onChange={(e) => setOption_03(e.target.value)}
              className="py-2 w-full px-4 border-[1px] border-gray-400 rounded-md"
              type="text"
              placeholder="Option 03"
            />
            {/* ======================================================================================= */}
            <input
              required
              value={option_04}
              onChange={(e) => setOption_04(e.target.value)}
              className="py-2 w-full px-4 border-[1px] border-gray-400 rounded-md"
              type="text"
              placeholder="Option 04"
            />
            {/* ======================================================================================= */}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div
            onClick={() => {
              setShow(true);
            }}
            className="flex items-center gap-2 cursor-pointer text-gray-600 my-2 py-2 bg-gray-100 w-fit px-4 rounded-md shadow-md"
          >
            <h2>Upload image</h2>
            <span>
              <FaCloudUploadAlt />
            </span>
          </div>
          <div className="flex justify-between mt-2">
            <button
              disabled={loader}
              type="submit"
              className="py-1 px-6 bg-violet-700 rounded-md text-white"
            >
              {loader ? "Loading..." : "Create"}
            </button>
            <p className="text-rose-500">{alert}</p>
          </div>
        </div>
        <div className="mt-4">
          <JoditEditorWrapper
            ref={editor}
            tabIndex={1}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
          {/* ======================================================================================= */}
        </div>
      </form>

      {/* <select name="literature" id="" className='bg-gray-50 w-32 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
     <option value="" selected>--select--</option>
        <option value="Ancient">Ancient</option>
        <option value="Middle-class">Middle-class</option>
        <option value="Modern-class">Modern-class</option>
     </select> */}
      {show && <Gallery setShow={setShow} images={[]} />}
      <ToastContainer />
    </div>
  );
};

export default English;
