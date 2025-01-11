"use client";
import React, { useContext, useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import parse from "html-react-parser";
import { baseurl } from "@/app/config";
import axios from "axios";
import storeContext from "@/app/global/createContex";
import {examTypeValue, mathTopicValue } from "./data";
import JoditEditorWrapper from "./joditEditor";
import Gallery from "./Gallery";

const Math = () => {
  const editor = useRef(null);
  //=====All state related question value========================
  const [show,setShow] = useState(false)
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
  const [content, setContent] = useState("");
  console.log(subSubject, topic, examType, exam);
  //=============================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subSubject", subSubject);
    formData.append("topic", topic);
    formData.append("examName", exam);
    formData.append("examType", examType);
    formData.append("examSeassion", examSeassion);
    formData.append("otherExamName", otherExam);
    formData.append("question", question);
    formData.append("rightAns", rightAns);
    formData.append("option_01", option_01);
    formData.append("option_02", option_02);
    formData.append("option_03", option_03);
    formData.append("option_04", option_04);
    formData.append("description", content);

    try {
      setLoader(true);
      const { data } = await axios.post(`${baseurl}/math/add`, formData, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
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
      //===================================
      setAlert(data.msg);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      setAlert(error.response.data.message);
      setTimeout(() => {
        setAlert("");
      }, 1000);
      //error.response.data.message
    }
  };

  return (
    <div className={`${show ? "fixed w-screen top-0 left-0 bg-white" : ""}`}>
      <form className="w-fit mx-auto mt-10" onSubmit={handleSubmit}>
        <div className="flex justify-between gap-5 mt-2">
          <select
            required
            value={subSubject}
            onChange={(e) => setSubSubject(e.target.value)}
            name="Brance"
            id="Brance"
            className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option className="text-gray-400" value="" selected>
              --select--
            </option>
             {mathTopicValue.map((sub,i)=> <option key={i} className="text-md" value={sub.name}>{sub.name}</option>)}
          </select>
          {/* ======================================================================================= */}
          {subSubject === "পাটি গণিত" && (
            <select
              required
              onClick={() => setIsExam(true)}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="Literature"
              id="Literature">
              <option className="text-gray-400" value="" selected>
                --select--
              </option>
              {
                mathTopicValue[0].value.map((item,i)=><option key={i}>{item}</option>)
              }
            </select>
          )}
          {/* ======================================================================================= */}
          {subSubject === "বীজগণিত" && (
            <select
              required
              onClick={() => setIsExam(true)}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="gg"
              id="gg">
              <option className="text-gray-400" value="" selected>
                --select--
              </option>
              {
                mathTopicValue[1].value.map((item,i)=><option key={i}>{item}</option>)
              }
            </select>
          )}
          {/* ======================================================================================= */}
          {subSubject === "জ্যামিতি" && (
            <select
              required
              onClick={() => setIsExam(true)}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="gg"
              id="gg">
              <option className="text-gray-400" value="" selected>
                --select--
              </option>
              {
                mathTopicValue[2].value.map((item,i)=><option key={i}>{item}</option>)
              }
            </select>
          )}
          {/* ======================================================================================= */}
          {subSubject === "বিচ্ছিন্ন গণিত" && (
            <select
              required
              onClick={() => setIsExam(true)}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="gg"
              id="gg">
              <option className="text-gray-400" value="" selected>
                --select--
              </option>
              {
                mathTopicValue[3].value.map((item,i)=><option key={i}>{item}</option>)
              }
            </select>
          )}
          {/* ======================================================================================= */}
          {subSubject === "গতিবিদ্যা" && (
            <select
              required
              onClick={() => setIsExam(true)}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="gg"
              id="gg">
              <option className="text-gray-400" value="" selected>
                --select--
              </option>
              {
                mathTopicValue[4].value.map((item,i)=><option key={i}>{item}</option>)
              }
            </select>
          )}
          {/* ======================================================================================= */}
          {subSubject === "অন্যান্য" && (
            <select
              required
              onClick={() => setIsExam(true)}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="gg"
              id="gg">
              <option className="text-gray-400" value="" selected>
                --select--
              </option>
              {
                mathTopicValue[5].value.map((item,i)=><option key={i}>{item}</option>)
              }
            </select>
          )}
          {/* ======================================================================================= */}

          {isExam && (
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              name="Brance"
              id="brnc"
              className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option className="text-gray-400" value="" selected>
                --Exam Type--
              </option>
              {examTypeValue.map((examType,i) => {
                return <option key={i} value={examType.type}>{examType.type}</option>;
              })}
            </select>
          )}
          {/* ========================================================================================= */}

          {examType == "বিসিএস প্রিলিমিনারি" && (
            <>
              <select required
                onChange={(e) => setExam(e.target.value)}
                className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="bcs"
                id="bcs">
                    <option value="">--Exam Name--</option>
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
              <select required
                onChange={(e) => setExam(e.target.value)}
                className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="bcs"
                id="bcs">
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

          {examType.length > 0 && (
            <input
              required
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
                id="rightans">
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
        <div onClick={()=>{setShow(true)}} className="flex items-center gap-2 cursor-pointer text-gray-600 my-2 bg-gray-100 w-fit px-4 rounded-md shadow-md">
          <h2>Upload image</h2> <span><FaCloudUploadAlt/></span>
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
        <div className="flex justify-between mt-2">
          <p className="text-rose-500">{alert}</p>
          <button
            disabled={loader}
            type="submit"
            className="py-1 px-6 bg-blue-500 text-white">
            {loader ? "Loading..." : "Create"}
          </button>
        </div>
      </form>

      {/* <select name="literature" id="" className='bg-gray-50 w-32 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
     <option value="" selected>--select--</option>
        <option value="Ancient">Ancient</option>
        <option value="Middle-class">Middle-class</option>
        <option value="Modern-class">Modern-class</option>
     </select> */}
             {
         show && <Gallery setShow={setShow} images={[]}/>
     }
    </div>
  );
};

export default Math;
