"use client";
import React, { memo, useCallback, useContext, useEffect, useState } from "react";
import loveAnim from "@/public/love.gif";
import { CiCircleQuestion } from "react-icons/ci";
import { LiaClipboardListSolid, LiaHandPointUpSolid } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";
import { GiCheckMark } from "react-icons/gi";
import { FaBookReader } from "react-icons/fa";
import { PiEye } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";
import "../../components/cssfiles/scrolling_bar.css";
import "../../components/cssfiles/marksmcq.css";
import HTMLReactParser from "html-react-parser";
// import SearchEngin from "@/app/components/SearchEngin";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { baseurl, viewurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import Image from "next/image";
import { RiShareLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import {
  EmailShareButton,
  FacebookMessengerShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaRegCopy, FaWhatsapp } from "react-icons/fa6";
import CopyToClipboard from "react-copy-to-clipboard";
// import correct from "@/public/mediaresource/music_button/right.mp3"
//==================Import Audio Sound=============================
// import correct from "../mediaresource/music_button/right.mp3";
// import wrong from "../mediaresource/music_button/error.mp3";
import messanger from "@/public/share-icone/messanger.png"
import whatsapp from "@/public/share-icone/whatsapp.png"
import linkedin from "@/public/share-icone/linkedin.png"
import gmail from "@/public/share-icone/gmail.png"
import telegram from "@/public/share-icone/telegram.png"
import twitter from "@/public/share-icone/twitter.png"
import pinterest from "@/public/share-icone/pinterast.png"

const Controller = ({
  getLocalVal,
  getRobot,
  questionsData,
  grid,
  allQuestion,
  megaQuestions,
  isSave,
  isSaveInHistory,
  setMark
}) => {
  const { store } = useContext(storeContext);
  const [selectAll, setSelectAll] = useState(0);
  const [countReadingQuestion, setCountReadingQuestion] = useState(0);
  //Here is the statement about correct and inCorrect ans
  const [correctMcq, setCorrectMcq] = useState(0);
  const [wrongAns, setWrongAns] = useState(0);
  //Here is thatement about negitive and positive marks
  const [positiveMarks, setPositiveMarks] = useState(0);
  const [negitiveMarks, setNegitiveMarks] = useState(0);
  const heyRobot = getRobot;
  //=======================================
  // const volumeSound = localStorage.getItem("volume");
  // const correctVolume = new Audio(correct);
  //   const wrongVolume = new Audio(wrong);
  //  console.log(singleUserData)
  //====================================================================
  //====================================================
  //=====================================
  const checkAns = useCallback((e, ans, index, singleQuestion) => {
    setMark.sub(singleQuestion.topic)
    let selectedData = questionsData[index].rightAns;
    const currentTerget = e.target;
    const tergetBox = e.target.parentElement.parentElement.children; // This tergetbox refers to the childer elements
    const tergetExp =
      e.target.parentElement.parentElement.parentElement.children[2]; // This tergetbox refers to the explanation elements
    //=============================================================
    const parentBox = e.target.parentElement.parentElement;
    const getAttribute = parentBox.getAttribute("data-select");
    const getAtterIntoNumber = parseInt(getAttribute);
    setTimeout(() => {
      parentBox.setAttribute("data-select", getAttribute + 1);
    }, 100);
    //=============================================================
    const allOpton = [tergetBox[0], tergetBox[1], tergetBox[2], tergetBox[3]];
    const mainTerget = questionsData[index].rightAns;
    if (heyRobot === "on") {
      if (getAtterIntoNumber === selectedData) {
        if (questionsData[index].rightAns === ans) {
          increaseBalanceByperQuestionRead()
          currentTerget.classList.add("true");
          currentTerget.children[1].classList.remove("hidden")
          setMark.rf(setMark.r + 1)
          setCorrectMcq(correctMcq + 1);
          setSelectAll(selectAll + 1);

          localStorage.setItem("crossBtn", "true");
          setPositiveMarks(positiveMarks + 1);
          if (isSaveInHistory == 'on') {
            allRightQuestionsCollection(singleQuestion)
          }
        } else {
          currentTerget.classList.add("false");
          currentTerget.children[0].classList.remove("hidden")
          allOpton[mainTerget - 1].children[1].classList.add("true");
          allOpton[mainTerget - 1].children[1].children[1].classList.remove("hidden");
          //   if (volumeSound === "on") {
          //     wrongVolume.play();
          //   }
          setMark.wf(setMark.w + 1)
          setWrongAns(wrongAns + 1);
          setTimeout(() => {
            tergetExp?.classList.add("scale-110");
            tergetExp?.classList.remove("scale-0");
          }, 100);
          tergetExp?.classList.remove("hidden");
          setSelectAll(selectAll + 1);
          setNegitiveMarks(negitiveMarks + 0.25);
          if (isSaveInHistory == 'on') {
            allWrongQuestionsCollection(singleQuestion)
          }
        }
      }
    }

  
    // useEffect(() => {
    //   // localStorage.stringify()
    // }, []);
    //tish function has been set for counting reading questions
    const checkReadingQuestion = () => {
      // localStorage.setItem("")
      const uniqueId = singleQuestion._id;
      const questionId = localStorage.getItem("UUID")
        ? JSON.parse(localStorage.getItem("UUID"))
        : [];
      //Find ID from localstorage =================

      questionId.push(uniqueId);



      localStorage.setItem("UUID", JSON.stringify(questionId));
    };
    checkReadingQuestion();
  },[])


//Here the collection of all questions function that is called in checkAns function call
  const allRightQuestionsCollection =async (singleQuestion)=> {
    const manageQuestion = {
      status:"right",
      subject:singleQuestion.subject
    }
   const {data} = await axios.post(`${baseurl}/auth/collect-all-questions`,manageQuestion,{
    headers: {
      Authorization: `Bearer ${store.token}`,
    },
  })
    const question = {
      time:new Date(),
      id:singleQuestion._id,
      sub : singleQuestion.subject,
      question:singleQuestion.question,
      option_01: singleQuestion.option_01,
      option_02: singleQuestion.option_02,
      option_03: singleQuestion.option_03,
      option_04: singleQuestion.option_04,
      rightAns:singleQuestion.rightAns
    }
    const collectQuestions = localStorage.getItem("collectedRightQuestions") ? JSON.parse(localStorage.getItem("collectedRightQuestions")) : []
        collectQuestions.push(singleQuestion)
    localStorage.setItem("collectedRightQuestions", JSON.stringify(collectQuestions));
 }

 //============= Dynamic balance add with per click =======================
 const increaseBalanceByperQuestionRead =async ()=>{
  try {
    await axios.get(`${baseurl}/auth/updatedynamicbalance`,{
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    })
  } catch (error) {
    console.log(error)
  }
  
    }
  const allWrongQuestionsCollection =async (singleQuestion)=> {
    const manageQuestion = {
      status:"wrong",
      subject:singleQuestion.subject
    }
    const {data} = await axios.post(`${baseurl}/auth/collect-all-questions`,manageQuestion,{
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    })
    const question = {
      time:new Date(),
      id:singleQuestion._id,
      sub : singleQuestion.subject,
      question:singleQuestion.question,
      option_01: singleQuestion.option_01,
      option_02: singleQuestion.option_02,
      option_03: singleQuestion.option_03,
      option_04: singleQuestion.option_04,
      rightAns:singleQuestion.rightAns
    }
    const collectQuestions = localStorage.getItem("collectedWrongQuestions") ? JSON.parse(localStorage.getItem("collectedWrongQuestions")) : []
        collectQuestions.push(singleQuestion)
    localStorage.setItem("collectedWrongQuestions", JSON.stringify(collectQuestions));
 }
  const getReadQuestion = JSON.parse(localStorage.getItem("UUID"));
  const exactReadQuestion = getReadQuestion?.filter((item, index) => {
    return index === getReadQuestion?.findIndex((item2) => item2 === item);
  });
  function readQuestion() {
    const finelResult = [];
    for (let i = 0; i < exactReadQuestion?.length; i++) {
      const filterData = allQuestion?.filter((singleQue) => {
        const filterLength = singleQue._id === exactReadQuestion[i];
        return filterLength;
      });

      filterData?.map((que) => {
        if (que._id !== undefined) {
          finelResult.push(que._id);
          // console.log(que._id);
        }
      });
      // console.log(filterData[0]?._id)
    }
    setTimeout(() => {
      setCountReadingQuestion(finelResult.length);
    }, 100);
  }
  readQuestion();

  //shuffle the exam question
  if (getLocalVal === "true") {
    questionsData.sort((a, b) => 0.5 - Math.random());
  }

  const correctAns = (ans) => {
    if (ans === 1) {
      return "A";
    }
    if (ans === 2) {
      return "B";
    }
    if (ans === 3) {
      return "C";
    }
    if (ans === 4) {
      return "D";
    }
  };

  //========================================
  const removeExp = (e) => {
    e.target.parentElement.parentElement.classList.add("scale-0");
    e.target.parentElement.parentElement.classList.remove("scale-110");
    setTimeout(() => {
      e.target.parentElement.parentElement.classList.add("hidden");
    }, 100);
  };

  function countReadTime(id) {
    const result = getReadQuestion?.filter((uuId) => uuId === id);
    if (result?.length > 0) {
      return result.length;
    }
    return null;
  }

  //=====================Questions save intigration and show description with point=================
  const [showPoint1, setShowPoint1] = useState(false);
  const [showPoint, setShowPoint] = useState(false);
  const [showPointDesc, setShowPointDesc] = useState([]);
  const [saveQue, setSaveQue] = useState([]);
  const [saveQLoader, setSaveQueLoader] = useState(false);
  const [justifyid, setJustifyId] = useState("");
  // console.log(justifyid)
  const saveQuestion = async (id, i) => {
    const justifiedId = questionsData[i]._id;
    setJustifyId(justifiedId);
    try {
      setSaveQueLoader(true);
      const { data } = await axios.post(
        `${baseurl}/savequestions/create`,
        { question_id: id },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setSaveQueLoader(false);
      console.log(data);
    } catch (error) {
      setSaveQueLoader(false);
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${baseurl}/savequestions/all`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });

        setSaveQue(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [store.token, saveQLoader]);

  const checkSaveQuestion = (id) => {
    const filterQue = saveQue.filter((questionId) => {
      return questionId.question_id === id;
    });
    //  console.log(filterQue[0].question_id)
    if (filterQue[0]?.question_id === id) {
      return <AiFillHeart size={20} color="#c602db" />;
    } else {
      return <AiOutlineHeart size={20} color="#c602db" />;
    }
  };
  //===================================================
  const [share, setShare] = useState(false);
  const handleShare = () => {
    setShare(true);
  };
  //====================================
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("shairBlankPoint")) {
        setShare(false);
      }
      // if (e.target.classList.contains("updateDesc")) {
      //   setControlDesc(true)
      // } else {
      //   setControlDesc(false)
      // }
    }); //
  }, []);
  //   console.log(showPoint)
  //   showPoint ? document.body.style.overflow = "hidden" :  document.body.style.overflow = "auto"
  // //  share ? document.body.style.overflow = "hidden" :  document.body.style.overflow = "auto"
  if (share || showPoint) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  const pathname = usePathname();
  const [copy,setCopy] = useState("copy")
  return (
    <div className={`pb-12 md:pb-0`}>
      <div className="flex gap-10 items-center">
        <div className="flex items-center ml-6 md:ml-0 gap-2 text-gray-700">
          <FaBookReader size={20} />
          <h2 className="my-2 text-[11px] md:text-lg">
            এই পর্যন্ত আপনি (
            <span className="font-bold text-violet-700">
              {" " + countReadingQuestion + " "}
            </span>
            ) টি প্রশ্ন পড়ছেন।
          </h2>
        </div>
        {/* <SearchEngin takeValue={setSearch} /> */}
      </div>

      <div
        className={`grid ${
          grid == 1
            ? "md:grid-cols-1"
            : grid == 2
            ? "md:grid-cols-2"
            : grid == 3
            ? "md:grid-cols-3"
            : grid == 4
            ? "md:grid-cols-4"
            : grid == 5
            ? "md:grid-cols-5"
            : ""
        } gap-4`}
      >
        {/* =============================================
              ==================Justify Answer=============
              ============================================= */}
        {questionsData?.map((value, index) => {
          return (
            <div
              key={index}
              className={`bg-gray-100 question_box relative p-2 md:mx-0 md:p-6 rounded-md shadow-md border-2`}
            >
              <div key={index} className="md:mb-10 mb-10">
                <div>
                  <div className="flex gap-2 bg-white px-4 py-2 rounded-md shadow-sm">
                    <div>
                      <div className="rounded-full w-fit p-[1px] flex justify-center items-center border-2 relative">
                        <CiCircleQuestion color="gray" size={20} />
                      </div>
                    </div>
                    <h2 className="text-[12px] md:text-[15px]">
                      {value.question}
                    </h2>
                  </div>

                  <h2 className="text-[9px] flex mt-2 md:text-[10px] ml-1 text-violet-700">
                    {value.examName ? (
                      <span>
                        {" "}
                        <LiaClipboardListSolid color="gray" size={16} />
                      </span>
                    ) : value.otherExamName ? (
                      <span>
                        {" "}
                        <LiaClipboardListSolid color="gray" size={16} />
                      </span>
                    ) : null}
                    {value.examName}
                    {value?.examSeassion && (
                      <span className="text-[9px] md:text-[10px]">
                        {value.examSeassion}
                      </span>
                    )}
                    {value?.otherExamName && (
                      <span className="text-[9px] md:text-[10px] ml-1">
                        {value.otherExamName}
                      </span>
                    )}
                  </h2>
                </div>
                <div
                  data-select={value.rightAns}
                  className="option_box space-y-2 mt-2"
                >
                  <div className="relative">
                    <div className="__option_number__ absolute left-5 border-2 border-white top-[5px] text-white rounded-full bg-gray-400 w-6 h-6 flex justify-center items-center">
                      {value.subject === "বাংলা"
                        ? "ক"
                        : value.subject === "English"
                        ? "A"
                        : "ক"}
                    </div>

                    <p
                      onClick={(e) => {
                        checkAns(e, 1, index, value);
                      }}
                      className="__option_value__ cursor-pointer ml-8 w-[90%] rounded-full px-4 py-[5px] mx-5 text-[12px] md:text-[14px] flex justify-between items-center"
                    >
                      {value.option_01} <span className="hidden"><RxCross2 color="red" size={22}/></span> <span className="hidden"><GiCheckMark color="green" /></span>
                    </p>
                  </div>
                  <div className="relative">
                    <div className="__option_number__ absolute left-5 border-2 border-white top-[5px] text-white rounded-full bg-gray-400 w-6 h-6 flex justify-center items-center">
                      {value.subject === "বাংলা"
                        ? "খ"
                        : value.subject === "English"
                        ? "B"
                        : "খ"}
                    </div>

                    <p
                      onClick={(e) => {
                        checkAns(e, 2, index, value);
                      }}
                      className="__option_value__ cursor-pointer ml-8 w-[90%] rounded-full px-4 py-[5px] mx-5 text-[12px] md:text-[14px] flex justify-between items-center"
                    >
                      {value.option_02} <span className="hidden"><RxCross2 color="red" size={22}/></span> <span className="hidden"><GiCheckMark color="green" /></span>
                    </p>
                  </div>
                  <div className="relative">
                    <div className="__option_number__ absolute left-5 border-2 border-white top-[5px] text-white rounded-full bg-gray-400 w-6 h-6 flex justify-center items-center">
                      {value.subject === "বাংলা"
                        ? "গ"
                        : value.subject === "English"
                        ? "C"
                        : "গ"}
                    </div>

                    <p
                      onClick={(e) => {
                        checkAns(e, 3, index, value);
                      }}
                      className="__option_value__ cursor-pointer ml-8 w-[90%] rounded-full px-4 py-[5px] mx-5 text-[12px] md:text-[14px] flex justify-between items-center"
                    >
                      {value.option_03} <span className="hidden"><RxCross2 color="red" size={22}/></span> <span className="hidden"><GiCheckMark color="green" /></span>
                    </p>
                  </div>
                  <div className="relative">
                    <div className="__option_number__ absolute left-5 border-2 border-white top-[5px] text-white rounded-full bg-gray-400 w-6 h-6 flex justify-center items-center">
                      {value.subject === "বাংলা"
                        ? "ঘ"
                        : value.subject === "English"
                        ? "D"
                        : "ঘ"}
                    </div>

                    <p
                      onClick={(e) => {
                        checkAns(e, 4, index, value);
                      }}
                      className="__option_value__ cursor-pointer ml-8 w-[90%] rounded-full px-4 py-[5px] mx-5 text-[12px] md:text-[14px] flex justify-between items-center"
                    >
                      {value.option_04} <span className="hidden"><RxCross2 color="red" size={22}/></span> <span className="hidden"><GiCheckMark color="green" /></span>
                    </p>
                  </div>
                </div>
                {heyRobot === "on" ? (
                  <></>
                ) : (
                  <>
                    <div className="flex justify-end">
                      <div className="ans text-right w-8 h-8 flex justify-center items-center font-semibold text-gray-500 rounded-full border-2 border-gray-500">
                        {correctAns(value.rightAns, value.subject)}
                      </div>
                    </div>
                  </>
                )}
                {/* ==================Adding Explanation with click===================== */}

                {heyRobot === "on" ? (
                  <></>
                ) : (
                  <div
                    className={`explanation relative hidden_scroll pt-2 mt-4 px-4 md:px-12 transform duration-500 bg-white max-h-[40vh] overflow-y-scroll`}
                  >
                    <p className="text-[12px] p-2 md:p-10">
                      {HTMLReactParser(`${value.description}`)}
                    </p>
                  </div>
                )}

                {value?.description?.length > 0 ? (
                  <div
                    className={`explanation relative hidden_scroll pt-2 hidden mt-4 px-4 md:px-12 transform scale-0 duration-500 max-h-[40vh] overflow-y-scroll`}
                  >
                    <div
                      onClick={(e) => {
                        removeExp(e);
                      }}
                      className="fixed cursor-pointer w-4 h-4 top-2 right-2 md:right-8 flex justify-center items-center rounded-full bg-rose-300/50"
                    >
                      <RxCross2 color="red" size={10} />
                    </div>
                    <div>
                      <p className="text-[12px] mt-2">
                        {HTMLReactParser(value.description)}
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="absolute bottom-2 w-full -ml-6 md:px-10">
                {heyRobot !== "on" ? (
                  ""
                ) : (
                  <>
                    <div className="flex justify-end">
                      <div className="flex gap-2">
                        {heyRobot !== "on" ? (
                          ""
                        ) : (
                          <>
                            {value.description?.length > 0 && (
                              <div
                                onClick={() => {
                                  setShowPointDesc(value);
                                  setShowPoint1(true);
                                  setTimeout(() => {
                                    setShowPoint(true);
                                  }, 50);
                                }}
                                className="details px-4 py-2 rounded-full border cursor-pointer border-violet-700"
                              >
                                <LiaHandPointUpSolid
                                  size={20}
                                  color="#c602db"
                                />
                              </div>
                            )}
                          </>
                        )}
                        {isSave == "yes" && (
                          <div
                            onClick={() => saveQuestion(value._id, index)}
                            className="px-4 py-2 rounded-full border cursor-pointer border-violet-700"
                          >
                            {saveQLoader && justifyid == value._id ? (
                              <Image
                                className="w-6"
                                src={loveAnim}
                                alt="love"
                              />
                            ) : (
                              checkSaveQuestion(value._id)
                            )}
                          </div>
                        )}

                        <div className="flex items-center gap-[1px] right-2 shadow-sm px-4 py-2 rounded-full border border-violet-700">
                          {value._id ===
                          getReadQuestion?.find((id) => id === value._id) ? (
                            <PiEye color="#c602db" />
                          ) : (
                            <PiEyeSlash color="#a8a8a8" />
                          )}
                          <h2
                            className={`text-[8px] text-violet-700 md:text-[10px]  rounded-full ${
                              countReadTime(value._id) === null ? "" : ""
                            } flex justify-center items-center`}
                          >
                            {countReadTime(value._id)}
                          </h2>
                        </div>
                        <div
                          onClick={() => {
                            handleShare(), setShowPointDesc(value);
                          }}
                          className="flex items-center gap-[1px] cursor-pointer right-2 shadow-sm px-4 py-2 rounded-full border border-violet-700"
                        >
                          <RiShareLine size={20} color="#c602db" />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {/* ========================share button layout========================== */}
                <div
                  className={`fixed shairBlankPoint z-50 top-0 left-0 w-screen h-screen bg-gray-500/10 items-end flex justify-start md:justify-center md:items-center ${
                    share ? "scale-100" : "scale-0"
                  } duration-100`}
                >
                  <div
                    className={`md:w-1/2 w-full ${
                      share ? "translate-y-0" : "translate-y-96"
                    } md:translate-y-0 duration-500 bg-white rounded-md p-4 md:p-10`}
                  >
                    <h2 className="text-center pb-2 border-b-[1px]">
                      Share With Your Friends
                    </h2>
                    <div className="grid grid-cols-3 w-2/3 md:w-full mx-auto md:grid-cols-7 pt-2 justify-center">
                      <div>
                        <FacebookMessengerShareButton
                          url={`https://bcs-prep.vercel.app/singlequestion/${showPointDesc?.slug ? showPointDesc.slug : showPointDesc._id}`}
                        >
                         <Image className="w-16 h-16" src={messanger} alt="Facebook-messanger"/>
                        </FacebookMessengerShareButton>
                      </div>
                      <div>
                        <WhatsappShareButton
                          url={`https://bcs-prep.vercel.app/singlequestion/${showPointDesc?.slug ? showPointDesc.slug : showPointDesc._id}`}
                        >
                           <Image className="w-16 h-16" src={whatsapp} alt="Whatsapp"/>
                        </WhatsappShareButton>
                      </div>
                      <div>
                        <EmailShareButton
                          url={`https://bcs-prep.vercel.app/singlequestion/${showPointDesc?.slug ? showPointDesc.slug : showPointDesc._id}`}
                        >
                         <Image className="w-16 h-16" src={gmail} alt="gmail"/>
                        </EmailShareButton>
                      </div>
                      <div>
                        < LinkedinShareButton
                          url={`https://bcs-prep.vercel.app/singlequestion/${showPointDesc?.slug ? showPointDesc.slug : showPointDesc._id}`}
                        >
                         <Image className="w-16 h-16" src={linkedin} alt="Linkedin"/>
                        </ LinkedinShareButton>
                      </div>
                      <div>
                        < TwitterShareButton
                          url={`https://bcs-prep.vercel.app/singlequestion/${showPointDesc?.slug ? showPointDesc.slug : showPointDesc._id}`}
                        >
                         <Image className="w-16 h-16" src={twitter} alt="Twitter"/>
                        </ TwitterShareButton>
                      </div>
                      <div>
                        < TelegramShareButton
                          url={`https://bcs-prep.vercel.app/singlequestion/${showPointDesc?.slug ? showPointDesc.slug : showPointDesc._id}`}
                        >
                         <Image className="w-16 h-16" src={telegram} alt="Telegram"/>
                        </ TelegramShareButton>
                      </div>
                      <div>
                        < TelegramShareButton
                          url={`https://bcs-prep.vercel.app/singlequestion/${showPointDesc?.slug ? showPointDesc.slug : showPointDesc._id}`}
                        >
                         <Image className="w-16 h-16" src={pinterest} alt="pinterest"/>
                        </ TelegramShareButton>
                      </div>
                      <div className="md:hidden w-16 h-16 bg-violet-700 rounded-full flex justify-center items-center">
                      <CopyToClipboard text={`https://bcs-prep.vercel.app/singlequestion/${showPointDesc?.slug ? showPointDesc.slug : showPointDesc._id}`}>
                        <button className="p-4 text-white" onClick={()=>{setCopy('Copied!');setTimeout(() => {
                          setCopy('copy')
                        }, 1000);}}>{ copy=="copy" ? <FaRegCopy size={30} color="fff" /> : copy }</button>
                      </CopyToClipboard>
                      </div>
                    </div>

                    <div className="mt-4 hidden py-2 px-4 border border-violet-700 rounded-md text-violet-700 md:flex gap-2 justify-between items-center">
                      <div >https://bcs-prep.vercel.app/singlequestion/{showPointDesc?.slug ? showPointDesc.slug : showPointDesc._id}</div>
                      <CopyToClipboard text={`${viewurl}/singlequestion/${showPointDesc?.slug ? showPointDesc.slug : showPointDesc._id}`}>
                        <button className="p-4" onClick={()=>{setCopy('Copied!');setTimeout(() => {
                          setCopy('copy')
                        }, 1000);}}>{ copy=="copy" ? <FaRegCopy size={25} /> : copy }</button>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
                {/* ==================Adding Explanation with click===================== */}
                {showPoint1 && (
                  <div className="w-screen fixed top-0 left-0 h-screen duration-500 bg-gray-500/5 flex z-50 justify-center items-center p-4 md:p-0">
                    <div
                      className={`${
                        showPoint
                          ? "duration-500 md:translate-x-[20%]"
                          : " duration-500 md:translate-x-[210%]"
                      } duration-500 rounded-md md:rounded-2xl bg-white md:h-screen md:p-20 px-4 py-10 relative md:w-9/12 md:max-h-[99vh] max-h-[90vh] overflow-auto`}
                    >
                      <span
                        onClick={() => {
                          setTimeout(() => {
                            setShowPoint1(false);
                          }, 50);
                          setShowPoint(false);
                        }}
                        className="cursor-pointer absolute top-5 left-5"
                      >
                        <RxCross2 size={30} />
                      </span>
                      <div className="sub_details border-b-2 py-2 text-gray-500">
                        <h2>
                          <span className="font-bold text-gray-700">
                            Subject
                          </span>
                          : {showPointDesc.subject}
                        </h2>
                        <h3>
                          {" "}
                          <span className="font-bold text-gray-700">
                            Topic
                          </span>{" "}
                          : {showPointDesc.topic}
                        </h3>
                        <h4>
                          {" "}
                          <span className="font-bold text-gray-700">
                            Previous Exam
                          </span>{" "}
                          : {showPointDesc?.otherExamName}
                        </h4>
                      </div>
                      <div className="question py-2 text-gray-500 border-b-2 mb-4">
                        <h4 className="text-lg mb-2 font-bold">
                          Question : {showPointDesc?.question}
                        </h4>
                        <div className="md:grid grid-cols-2 gap-6">
                          <h4>
                            {" "}
                            <span className="font-bold text-gray-700">
                              A
                            </span> : {showPointDesc?.option_01}
                          </h4>
                          <h4>
                            <span className="font-bold text-gray-700">B</span> :{" "}
                            {showPointDesc?.option_02}
                          </h4>
                          <h4>
                            <span className="font-bold text-gray-700">C</span> :{" "}
                            {showPointDesc?.option_03}
                          </h4>
                          <h4>
                            <span className="font-bold text-gray-700">D</span>:{" "}
                            {showPointDesc?.option_04}
                          </h4>

                          <h5 className="font-bold text-gray-700">
                            <span>Answer</span>:{" "}
                            {showPointDesc?.rightAns == 1
                              ? "A"
                              : showPointDesc?.rightAns == 2
                              ? "B"
                              : showPointDesc?.rightAns == 3
                              ? "C"
                              : showPointDesc?.rightAns == 4
                              ? "D"
                              : ""}
                          </h5>
                        </div>
                      </div>
                      <p className="">
                        {HTMLReactParser(showPointDesc.description)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {/* {heyRobot !== "on" ? "" : <>
           {
            showPoint && () 
           }
        </>} */}
      </div>
    </div>
  );
};

export default memo(Controller);
