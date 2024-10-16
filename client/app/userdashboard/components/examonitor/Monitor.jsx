"use client";
import React, { useContext, useEffect, useState } from "react";
import Controller from "./Controller";
import "../../components/cssfiles/responsive.css";
import ControllerForExam from "./ControllerForExam";
import { devider } from "@/app/subject/conponents/devider";
import PaginationNumber from "./PaginationNumber";
import axios from "axios";
import { baseurl } from "@/app/config";
import storeContext from "@/app/global/createContex";


const Monitor = ({ questions,megaQuestions,isSave ,isSaveInHistory,pagination = 'yes' }) => {
  const [navigate, setNavigate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(pagination == "yes" ? 21 : 250);
  const [grid, setGrid] = useState(3);
  const [val, setVal] = useState(false);
  const [random, setRandom] = useState(true);
  const [localData, setLocalData] = useState();
  //=============================================================
  const [wright,setWright] = useState(0)
  const [wrong,setWrong] = useState(0)
  const [sub,setSub] = useState("")
  const [getLocalVal,setGetLocalVal] = useState('')
const [getRobot,setGetRobotic] = useState('on')
const { store } = useContext(storeContext);
  useEffect(() => {
    setGetLocalVal(localStorage.getItem("setrandom"))
    setGetRobotic(localStorage.getItem("robot"))
  }, [random,val]);
  
  const getPageNumber = (number) => setCurrentPage(number);
  //==================================
  const handleClick = () => {
    setVal(!val);
    setLocalData(!val);
    if(typeof window !== 'undefined'){
      localStorage.setItem("setrandom", localData);
    }
  };
  const handleClickForRobot = () => {
    setRandom(!random);
    if(typeof window !== 'undefined'){
      localStorage.setItem("robot", random ? "off" : "on");
    }
  };

//  useEffect(() => {
  
//  }, []);
  const devidedQuestions = devider(questions, +itemsPerPage);

  ///===================================================
  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
//==================================================================
//==================================================================
//==================================================================
   const setNotificationToAllReadersWhenThayRead =async ()=>{
    try {
      const { data } = await axios.get(
        `${baseurl}/notification/notification-to-all-readers/${sub}`,{
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
     } catch (error) {
      
     }
   }//

  //=========================================
  //============grid control system==============
  if ((wright + wrong) === 10) {
    setNotificationToAllReadersWhenThayRead()
   }
  return (
    <>
      {navigate ? (
        <ControllerForExam questionsData={questions} />
      ) : (
        <div className="mx-2">
          <div>
            <div className="flex justify-between items-center responsive_title my-2 mt-3">
              <div className="flex gap-2 main_box">
                <div className="mail md:flex justify-center hidden">
                  <div className="sub narrow_btn flex justify-center items-center gap-2 w-fit px-2 md:px-4 py-2 bg-gray-200 rounded-full">
                    <p className="text-[12px] md:text-[16px] font-medium ">
                      Set Random
                    </p>
                    <div
                      onClick={handleClick}
                      className={`md:w-6 w-4 h-4 cursor-pointer md:h-6 ${
                        getLocalVal === "true" ? "bg-fuchsia-500" : "bg-white"
                      } rounded-full`}
                    ></div>
                  </div>
                </div>
                <div className="mail flex justify-center">
                  <div className="sub narrow_btn flex justify-center items-center gap-2 w-fit px-2 md:px-4 py-2 bg-gray-200 rounded-full">
                    <p className="text-[12px] md:text-[16px] font-medium">
                      Set Roboticx
                    </p>
                    <div
                      onClick={handleClickForRobot}
                      className={`md:w-6 w-4 h-4 cursor-pointer md:h-6 ${
                        getRobot === "on" ? "bg-fuchsia-500" : "bg-white"
                      } rounded-full`}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 md:gap-4 justify-center items-center">
                <div className="flex md:gap-2 items-center">
                  <select
                    onChange={(e) => setGrid(e.target.value)}
                    className="py-[10px] hidden md:inline-block px-4 border rounded-full bg-gray-100"
                    name="grid_ctrl"
                    id="ctrl"
                  >
                    <option value="">Show grid</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <select
                    onChange={(e) => setItemsPerPage(e.target.value)}
                    className="md:py-[10px] py-[7px] text-sm md:px-4 border rounded-full bg-gray-100"
                    name="item-per-page"
                    id="ctrl-item"
                  >
                    <option value="">Show items</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <div className="mail flex justify-center">
                    <>
                      <div
                        className={`sub narrow_btn flex ${
                          getRobot === "on"
                            ? "transform scale-110 duration-500"
                            : "transform scale-0 duration-500"
                        } justify-center items-center gap-2 w-fit px-2 md:px-4 py-2 bg-gray-100 rounded-full`}
                      >
                        <p className="text-[12px] md:text-[16px] font-medium">
                          Get Start
                        </p>

                        <div
                          onClick={() => setNavigate(true)}
                          className={`md:w-5 w-4 h-4 cursor-pointer md:h-5 bounce_btn ${
                            getRobot === "on"
                              ? "animate-ping bg-fuchsia-500"
                              : "bg-white"
                          } rounded-full`}
                        ></div>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={`flex md:pb-20 pb-4`}>
                {devidedQuestions.question.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className={`${
                        i + 1 === currentPage ? "visible" : "hidden"
                      }`}
                    >
                      <Controller
                        getLocalVal={getLocalVal}
                        getRobot={getRobot}
                        questionsData={item}
                        grid={grid}
                        allQuestion={questions}
                        megaQuestions={megaQuestions}
                        isSave={isSave}
                        isSaveInHistory={isSaveInHistory}
                        setMark={{rf:setWright,r:wright,wf:setWrong,w:wrong,sub:setSub}}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="fixed bottom-0 w-full md:px-40 py-3 md:py-5">
                <div className="w-full flex justify-center md:justify-end items-center">
                    <PaginationNumber
                    totalPost={questions?.length}
                    postPerPage={itemsPerPage}
                    getPageNumber={getPageNumber}
                    scrollToTop={scrollToTop}
                  />
                </div>
               </div>
            </div>
          </div>

          {wrong > 0 ? (
          <div className="fixed opacity-60 right-2 md:right-14 bottom-[85px] md:bottom-12 bg-rose-300 w-10 h-10 p-[12px] rounded-full flex items-center justify-center">
            {wrong}
          </div>
        ) : (
          ""
        )}
        {wright > 0 ? (
          <div className="fixed opacity-60 right-2 md:right-14 bottom-12 md:bottom-20 w-10 h-10 p-[12px] bg-green-300 rounded-full flex items-center justify-center">
            {wright}
          </div>
        ) : (
          ""
        )}
        </div>
      )}
    </>
  );
};

export default Monitor;
