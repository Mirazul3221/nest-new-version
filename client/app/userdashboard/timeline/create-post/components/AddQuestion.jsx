"use client";
import React, { useContext, useRef, useState } from "react";
import Math from "./select-component-for-topic/Math";
import JoditEditorWrapper from "@/app/assistantdashboard/components/joditEditor";
import axios from "axios";
import { baseurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { commonLogout } from "@/app/userdashboard/components/common";
import HtmlBodyParsarWithMathExp from "../../components/HtmlBodyParsarWithMathExp";
import { RiDeleteBack2Line } from "react-icons/ri";
import { useSocket } from "@/app/userdashboard/global/SocketProvider";
import Bangla1 from "./select-component-for-topic/Bangla1";
import English1 from "./select-component-for-topic/English1";
import Bangla2 from "./select-component-for-topic/Bangla2";
import English2 from "./select-component-for-topic/Englisg2";
import Math1 from "./select-component-for-topic/Math1";
import Math2 from "./select-component-for-topic/Math2";
import Math3 from "./select-component-for-topic/Math3";
import Math4 from "./select-component-for-topic/Math4";
import Math5 from "./select-component-for-topic/Math5";
import Bangladesh from "./select-component-for-topic/Bangladesh";
import International from "./International";
import { scrollToTop } from "@/app/assistantdashboard/components/data";
import Science1 from "./select-component-for-topic/Science1";
import Science2 from "./select-component-for-topic/Science2";
import Science3 from "./select-component-for-topic/Science3";
import Computer from "./select-component-for-topic/Computer";
import MentalAbility from "./select-component-for-topic/MentalAbility";

const AddQuestion = () => {
  const {socket} = useSocket();
  const [stage,setStage] = useState(1)
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [prevExam, setPrevExm] = useState("");
  const [question, setQuestion] = useState("");
  const [option_01, setOption_01] = useState("");
  const [option_02, setOption_02] = useState("");
  const [option_03, setOption_03] = useState("");
  const [option_04, setOption_04] = useState("");
  const [content, setContent] = useState("");
  const [rightAns, setRightAns] = useState("");
  const [loading, setloading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setShowPreviewContent] = useState("");
  const { store, dispatch } = useContext(storeContext);
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
        `${baseurl}/userquestions/create-question`,
        questionSchema,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );

        const ids = await axios.post(
      `${baseurl}/notification/alert-to-all-friends-when-question-added`,{slug:data.slug,question:data.question},
      {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      }
    );
    
    const payload = {
      title: `${store.userInfo.name} shared a question!`,
      body: `"${data.question}"`,
      icon: store.userInfo.profile?.replace('http://', 'https://'),
      // url: `./userdashboard/messanger/${receivedUser.name}/${req.user._id}`,
    };
        
await socket.emit('question_push_notification',{ids:ids.data,payload})
      toast(data.alert);
      setloading(false);
      setQuestion("");
      setPrevExm("");
      setOption_01("");
      setOption_02("");
      setOption_03("");
      setOption_04("");
      setRightAns("");
      setContent("");
      setSubject("");
      setChapter("");
      setStage(1)
    } catch (error) {
      toast.error(error?.response?.data);
      setloading(false);
      console.log(error);
      commonLogout(dispatch, error);
    }
  };

  const handleChatboat = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${baseurl}/userquestions/generate-description-by-ai`,
        { subject, chapter, question, content },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setIsLoading(false);
      setContent(data);
      if(subject == "গণিত") {
       setShowPreviewContent(data);
       setShowPreview(true) 
      }
    } catch (error) {
      setIsLoading(false);
      commonLogout(dispatch, error);
    }
  };
  return (
    <div className="rounded-md px-4 py-2">
      <h2 className="md:text-2xl font-bold text-gray-500 mb-2">
        Add your favourite question
      </h2>
<div className="border-b mb-2 pb-2 md:hidden">      {
        subject && <span onClick={()=>{
          setChapter("");
          setStage(1)
        }}>✔️{subject}</span>
      }
      {
        chapter && <span onClick={()=>{
          setStage(2)
        }}> /✔️{chapter}</span>
      }
      {
        stage==3 && <span> /✔️near to pbulish</span>
      }
      </div>
      <form onSubmit={handleSubmitAnswer}>
        {/* ////////////////////////////////////////For Mobile////////////////////////////////////// */}
        {
          stage == 1 && <div className="flex gap-2 flex-wrap md:hidden">
          <h2 className="bg-rose-500 w-fit text-white px-2 text-sm py-1 rounded-md cursor-pointer" onClick={(e)=>{setStage(2); setSubject(e.target.innerText);scrollToTop()}}>
            বাংলা সাহিত্য
          </h2>
          <h2 className="bg-rose-500 w-fit text-white px-2 text-sm py-1 rounded-md cursor-pointer" onClick={(e)=>{setStage(2); setSubject(e.target.innerText);scrollToTop()}}>
            বাংলা ব্যাকরণ
          </h2>
          <h2 className="bg-amber-500 w-fit text-white px-2 text-sm py-1 rounded-md cursor-pointer" onClick={(e)=>{setStage(2); setSubject(e.target.innerText);scrollToTop()}}>
            ইংরেজি সাহিত্য
          </h2>
          <h2 className="bg-amber-500 w-fit text-white px-2 text-sm py-1 rounded-md cursor-pointer" onClick={(e)=>{setStage(2); setSubject(e.target.innerText);scrollToTop()}}>
            ইংরেজি ব্যাকরণ
          </h2>
          <h2 className="bg-green-500 w-fit text-white px-2 text-sm py-1 rounded-md cursor-pointer" onClick={(e)=>{setStage(2); setSubject(e.target.innerText);scrollToTop()}}>
            গাণিতিক যুক্তি (পাটিগণিত)
          </h2>
          <h2 className="bg-green-500 w-fit text-white px-2 text-sm py-1 rounded-md cursor-pointer" onClick={(e)=>{setStage(2); setSubject(e.target.innerText);scrollToTop()}}>
            গাণিতিক যুক্তি (বীজগণিত)
          </h2>
          <h2 className="bg-green-500 w-fit text-white px-2 text-sm py-1 rounded-md cursor-pointer" onClick={(e)=>{setStage(2); setSubject(e.target.innerText);scrollToTop()}}>
            গাণিতিক যুক্তি (জ্যামিতি)
          </h2>
          <h2 className="bg-green-500 w-fit text-white px-2 text-sm py-1 rounded-md cursor-pointer" onClick={(e)=>{setStage(2); setSubject(e.target.innerText);scrollToTop()}}>
            গাণিতিক যুক্তি (বিচ্ছিন্ন গণিত)
          </h2>
          <h2 className="bg-green-500 w-fit text-white px-2 text-sm py-1 rounded-md cursor-pointer" onClick={(e)=>{setStage(2); setSubject(e.target.innerText);scrollToTop()}}>
            গাণিতিক যুক্তি (গতিবিদ্যা)
          </h2>
          <h2 className="bg-green-500 w-fit text-white px-2 text-sm py-1 rounded-md cursor-pointer" onClick={(e)=>{setStage(2); setSubject(e.target.innerText);scrollToTop()}}>
            গাণিতিক যুক্তি (অন্যান্য)
          </h2>
          <h2 className="bg-[#0398fc] w-fit text-white px-2 text-sm py-1 rounded-md cursor-pointer" onClick={(e)=>{setStage(2); setSubject(e.target.innerText);scrollToTop()}}>
            বাংলাদেশ বিষয়াবলি
          </h2>
          <h2 className="bg-[#0398fc] w-fit text-white px-2 text-sm py-1 rounded-md cursor-pointer" onClick={(e)=>{setStage(2); setSubject(e.target.innerText);scrollToTop()}}>
            আন্তর্জাতিক বিষয়াবলি
          </h2>
          <h2 className="bg-[#0ce9ed] w-fit text-white px-2 text-sm py-1 rounded-md cursor-pointer" onClick={(e)=>{setStage(2); setSubject(e.target.innerText);scrollToTop()}}>
            সাধারণ বিজ্ঞান(ভৌত বিজ্ঞান)
          </h2>
          <h2 className="bg-[#0ce9ed] w-fit text-white px-2 text-sm py-1 rounded-md cursor-pointer" onClick={(e)=>{setStage(2); setSubject(e.target.innerText);scrollToTop()}}>
            সাধারণ বিজ্ঞান(জীববিজ্ঞান)
          </h2>
          <h2 className="bg-[#0ce9ed] w-fit text-white px-2 text-sm py-1 rounded-md cursor-pointer" onClick={(e)=>{setStage(2); setSubject(e.target.innerText);scrollToTop()}}>
            সাধারণ বিজ্ঞান(আধুনিক বিজ্ঞান)
          </h2>
          <h2 className="bg-[#840ced] w-fit text-white px-2 text-sm py-1 rounded-md cursor-pointer" onClick={(e)=>{setStage(2); setSubject(e.target.innerText);scrollToTop()}}>
            মানসিক দক্ষতা
          </h2>
          <h2 className="bg-[#ed0cb9] w-fit text-white px-2 text-sm py-1 rounded-md cursor-pointer" onClick={(e)=>{setStage(2); setSubject(e.target.innerText);scrollToTop()}}>
            ভূগোল, পরিবেশ ও দুর্যোগ ব্যবস্থাপনা
          </h2>
          <h2 className="bg-[#ed350c] w-fit text-white px-2 text-sm py-1 rounded-md cursor-pointer" onClick={(e)=>{setStage(2); setSubject(e.target.innerText);scrollToTop()}}>
           কম্পিউটার ও তথ্য প্রযুক্তি
          </h2>
          <h2 className="bg-[#0c10ed] w-fit text-white px-2 text-sm py-1 rounded-md cursor-pointer" onClick={(e)=>{setStage(2); setSubject(e.target.innerText);scrollToTop()}}>
           নৈতিকতা, মূল্যবোধ ও সুশাসন
          </h2>
        </div>
        }
        {/* ////////////////////////////////////////For Mobile////////////////////////////////////// */}

        <div className="gap-2 md:flex items-center">
          <div className="hidden md:block">
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
              <option value="বাংলা সাহিত্য">বাংলা সাহিত্য</option>
              <option value="বাংলা ব্যাকরণ">বাংলা ব্যাকরণ</option>
              <option value="ইংরেজি সাহিত্য">ইংরেজি সাহিত্য</option>
              <option value="ইংরেজি ব্যাকরণ">ইংরেজি ব্যাকরণ</option>
              <option value="গাণিতিক যুক্তি (পাটিগণিত)">গাণিতিক যুক্তি (পাটিগণিত)</option>
              <option value="গাণিতিক যুক্তি (বীজগণিত)">গাণিতিক যুক্তি (বীজগণিত)</option>
              <option value="গাণিতিক যুক্তি (জ্যামিতি)">গাণিতিক যুক্তি (জ্যামিতি)</option>
              <option value="গাণিতিক যুক্তি (বিচ্ছিন্ন গণিত)">গাণিতিক যুক্তি (বিচ্ছিন্ন গণিত)</option>
              <option value="গাণিতিক যুক্তি (গতিবিদ্যা)">গাণিতিক যুক্তি (গতিবিদ্যা)</option>
              <option value="গাণিতিক যুক্তি (অন্যান্য)">গাণিতিক যুক্তি (অন্যান্য)</option>
              <option value="বাংলাদেশ বিষয়াবলি">বাংলাদেশ বিষয়াবলি</option>
              <option value="আন্তর্জাতিক বিষয়াবলি">আন্তর্জাতিক বিষয়াবলি</option>
              <option value="সাধারণ বিজ্ঞান(ভৌত বিজ্ঞান)">সাধারণ বিজ্ঞান(ভৌত বিজ্ঞান)</option>
              <option value="সাধারণ বিজ্ঞান(জীববিজ্ঞান)">সাধারণ বিজ্ঞান(জীববিজ্ঞান)</option>
              <option value="সাধারণ বিজ্ঞান(আধুনিক বিজ্ঞান)">সাধারণ বিজ্ঞান(আধুনিক বিজ্ঞান)</option>
              <option value="মানসিক দক্ষতা">মানসিক দক্ষতা</option>
              <option value="ভূগোল, পরিবেশ ও দুর্যোগ ব্যবস্থাপনা">ভূগোল, পরিবেশ ও দুর্যোগ ব্যবস্থাপনা</option>
              <option value="কম্পিউটার ও তথ্য প্রযুক্তি">কম্পিউটার ও তথ্য প্রযুক্তি</option>
              <option value="নৈতিকতা, মূল্যবোধ ও সুশাসন">নৈতিকতা, মূল্যবোধ ও সুশাসন</option>
            </select>
          </div>
          {/* -------------------------------------------------------------------------------- */}
          {subject === "বাংলা সাহিত্য" && (
            <Bangla1 stage={stage} setStage={setStage} chapter={chapter} setChapter={setChapter} />
          )}
          {subject === "বাংলা ব্যাকরণ" && (
            <Bangla2 stage={stage} setStage={setStage} chapter={chapter} setChapter={setChapter} />
          )}
          {subject === "ইংরেজি সাহিত্য" && (
            <English1 stage={stage} setStage={setStage} chapter={chapter} setChapter={setChapter} />
          )}
          {subject === "ইংরেজি ব্যাকরণ" && (
            <English2 stage={stage} setStage={setStage} chapter={chapter} setChapter={setChapter} />
          )}
          {subject === "গাণিতিক যুক্তি (পাটিগণিত)" && (
            <Math stage={stage} setStage={setStage} chapter={chapter} setChapter={setChapter} />
          )}
          {subject === "গাণিতিক যুক্তি (বীজগণিত)" && (
            <Math1 stage={stage} setStage={setStage} chapter={chapter} setChapter={setChapter} />
          )}
          {subject === "গাণিতিক যুক্তি (জ্যামিতি)" && (
            <Math2 stage={stage} setStage={setStage} chapter={chapter} setChapter={setChapter} />
          )}
          {subject === "গাণিতিক যুক্তি (বিচ্ছিন্ন গণিত)" && (
            <Math3 stage={stage} setStage={setStage} chapter={chapter} setChapter={setChapter} />
          )}
          {subject === "গাণিতিক যুক্তি (গতিবিদ্যা)" && (
            <Math4 stage={stage} setStage={setStage} chapter={chapter} setChapter={setChapter} />
          )}
          {subject === "গাণিতিক যুক্তি (অন্যান্য)" && (
            <Math5 stage={stage} setStage={setStage} chapter={chapter} setChapter={setChapter} />
          )}
          {subject === "বাংলাদেশ বিষয়াবলি" && (
            <Bangladesh stage={stage} setStage={setStage} chapter={chapter} setChapter={setChapter} />
          )}
          {subject === "আন্তর্জাতিক বিষয়াবলি" && (
            <International stage={stage} setStage={setStage} chapter={chapter} setChapter={setChapter} />
          )}
          {subject === "সাধারণ বিজ্ঞান(ভৌত বিজ্ঞান)" && (
            <Science1 stage={stage} setStage={setStage} chapter={chapter} setChapter={setChapter} />
          )}
          {subject === "সাধারণ বিজ্ঞান(জীববিজ্ঞান)" && (
            <Science2 stage={stage} setStage={setStage} chapter={chapter} setChapter={setChapter} />
          )}
          {subject === "সাধারণ বিজ্ঞান(আধুনিক বিজ্ঞান)" && (
            <Science3 stage={stage} setStage={setStage} chapter={chapter} setChapter={setChapter} />
          )}


          {subject === "মানসিক দক্ষতা" && (
            <MentalAbility stage={stage} setStage={setStage} chapter={chapter} setChapter={setChapter} />
          )}

          {subject === "কম্পিউটার ও তথ্য প্রযুক্তি" && (
            <Computer stage={stage} setStage={setStage} chapter={chapter} setChapter={setChapter} />
          )}
          {/* ------------------------------------------------------------------------------- */}
          <div className={`hidden md:block`}>
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
<div className={`${stage==3 ? "block" : "hidden"} md:block`}>
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
              <label htmlFor="title">Option 01</label>
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
              <label htmlFor="title">Option 02</label>
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
              <label htmlFor="title">Option 03</label>
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
              <label htmlFor="title">Option 04</label>
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
          <div className="md:flex space-y-2 md:space-y-0 flex-wrap justify-between md:justify-start items-center gap-3 my-2">
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
            <div
              onClick={handleChatboat}
              className="px-6 w-fit hidden md:block py-1 cursor-pointer bg-[#3e19fa] text-white rounded-md"
            >
              {isLoading ? (
                <div className="flex items-center gap-2 ">
                  <AiOutlineLoading3Quarters
                    className="animate-spin text-white text-center"
                    size={20}
                  />{" "}
                  Loading...
                </div>
              ) : (
                "Use AI to generate description"
              )}
            </div>
            <div
              onClick={handleChatboat}
              className="px-6 md:hidden w-fit py-1 cursor-pointer bg-[#3e19fa] text-white rounded-md"
            >
              {isLoading ? (
                <div className="flex items-center gap-2 ">
                  <AiOutlineLoading3Quarters
                    className="animate-spin text-white text-center"
                    size={20}
                  />{" "}
                  Loading...
                </div>
              ) : (
                "Click to assist"
              )}
            </div>
            {subject == "গণিত" && content && (
              <h2
                onClick={() => {
                  setShowPreviewContent(content);
                  setShowPreview(true);
                }}
                className="px-6 py-1 bg-[#3e19fa] w-fit text-white cursor-pointer rounded-md"
              >
                Preview Math
              </h2>
            )}

            {loading ? (
              <AiOutlineLoading3Quarters
                className="animate-spin text-white text-center"
                size={20}
              />
            ) : (
              <button
                type="submit"
                className="px-6 py-1 bg-[#3e19fa] text-white rounded-md"
              >
                Submit
              </button>
            )}
          </div>

          <div className="text-editor">
            <h2>Description</h2>
            <JoditEditorWrapper
              ref={editor}
              tabIndex={1}
              value={content}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>
        </div>
</div>
      </form>
      <ToastContainer />
      {showPreview && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-white z-50 p-2 md:p-8">
          <h2
            onClick={() => {
              setShowPreview(false);
            }}
            className="fixed top-4 cursor-pointer right-4"
          >
            <RiDeleteBack2Line size={30} />
          </h2>
          <div className="w-fit mx-auto p-4 border shadow-md overflow-auto h-[90vh]">
           <HtmlBodyParsarWithMathExp content={previewContent}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddQuestion;
