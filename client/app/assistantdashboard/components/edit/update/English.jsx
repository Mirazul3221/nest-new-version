"use client";
import React, { useContext, useRef, useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { baseurl } from "@/app/config";
import axios from "axios";
import storeContext from "@/app/global/createContex";
import JoditEditorWrapper from "../../joditEditor";
import { commonLogout } from "@/app/userdashboard/components/common";

const EditEnglish = ({ setSwitcher, editQuestion }) => {
  const editor = useRef(null);
  //=====All state related question value========================
  const { store, dispatch } = useContext(storeContext);
  const [alert, setAlert] = useState("");
  const [loader, setLoader] = useState(false);
  //=============================================================

  const [question, setQuestion] = useState(editQuestion.question);
  const [option_01, setOption_01] = useState(editQuestion.option_01);
  const [option_02, setOption_02] = useState(editQuestion.option_02);
  const [option_03, setOption_03] = useState(editQuestion.option_03);
  const [option_04, setOption_04] = useState(editQuestion.option_04);
  const [content, setContent] = useState(editQuestion.description);

  //=============================================
  const updateQuestion = {
    question: question,
    option_01: option_01,
    option_02: option_02,
    option_03: option_03,
    option_04: option_04,
    description:content
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const { data } = await axios.patch(
        `${baseurl}/allquestionscollection/updatenglish/${editQuestion._id}`,updateQuestion,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      //===================================
      setAlert(data.msg);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      setAlert(error.response.data.message);
      //error.response.data.message
      commonLogout(dispatch)
    }
  };

  return (
    <div className={`f`}>
      <div
        onClick={() => {
          setSwitcher(true);
        }}
        className="back text-gray-500 w-fit cursor-pointer"
      >
        <TiArrowBackOutline size={30} />
      </div>
      <form onSubmit={handleSubmit} className="w-fit mx-auto mt-10">
        <div className="flex justify-between gap-5 mt-2">
          {/* ========================================================================================= */}
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
            className="py-1 px-6 bg-blue-500 text-white"
          >
            {loader ? "Loading..." : "Update"}
          </button>
        </div>
      </form>

      {/* <select name="literature" id="" className='bg-gray-50 w-32 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
     <option value="" selected>--select--</option>
        <option value="Ancient">Ancient</option>
        <option value="Middle-class">Middle-class</option>
        <option value="Modern-class">Modern-class</option>
     </select> */}
    </div>
  );
};

export default EditEnglish;
