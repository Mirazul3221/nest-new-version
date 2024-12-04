import HTMLReactParser from 'html-react-parser';
import moment from 'moment';
import React, { useCallback } from 'react'
import { GiCheckMark } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';

const OnlyCard = ({question}) => {
    const checkAns = useCallback((e, ans, question) => {
        /////////////////////////////////////////////////////////////////////////////////////////
        // const mainTerget = questionsData[index].rightAns;
        const getAtter =
          e.target.parentElement.parentElement.getAttribute("data-select");
        const getAtterIntoNumber = parseInt(getAtter);
        setTimeout(() => {
          e.target.parentElement.parentElement.setAttribute(
            "data-select",
            getAtter + 1
          );
        }, 100);
    
        const tergetContainer = e.target.parentElement.parentElement.children;
        const tergetContainers = [
          tergetContainer[0],
          tergetContainer[1],
          tergetContainer[2],
          tergetContainer[3],
        ];
        if (e.target.classList.contains("__target_option__")) {
          if (getAtterIntoNumber == question.rightAns) {
            if (ans === question.rightAns) {
              e.target.parentElement.classList.add("bg-green-100");
              e.target.parentElement.classList.add("border-green-500");
              e.target.parentElement.children[1].children[1].classList.remove(
                "hidden"
              );
            } else {
              const tergetDescBox =
                e.target.parentElement.parentElement.parentElement.parentElement
                  .children[2];
              e.target.parentElement.classList.add("bg-rose-100");
              e.target.parentElement.classList.add("border-rose-500");
              e.target.parentElement.children[1].children[0].classList.remove(
                "hidden"
              );
              tergetContainers[question.rightAns - 1].classList.add("bg-green-100");
              tergetContainers[question.rightAns - 1].classList.add(
                "border-green-500"
              );
              tergetContainers[
                question.rightAns - 1
              ].children[1].children[1].classList.remove("hidden");
              tergetDescBox.classList.remove("hidden");
              setTimeout(() => {
                tergetDescBox.classList.remove("scale-0");
                tergetDescBox.classList.add("scale-100");
                tergetDescBox.classList.add("duration-500");
              }, 100);
            }
          }
        }
      }, []);

      const dateFormate = (createdAt) => {
        const currentYear = moment().year();
        const postYear = moment(createdAt).year();
        const format =
          currentYear === postYear ? "D MMM h:mm A" : "D MMMM h:mm A YYYY";
        const formattedDate = moment(createdAt).format(format);
        return formattedDate;
      };
  return (
    <div>
    {question && (
      <div className="py-4 text-gray-700 px-6 bg-white">
        <div className="flex justify-between">
          <div className="top flex items-center gap-2">
            <img
              className="w-10"
              src={question.userProfile}
              alt={question.userName}
            />
            <div className="">
              <h2 className="font-semibold text-md">{question.userName}</h2>
              <p className="text-sm">{dateFormate(question.createdAt)}</p>
            </div>
          </div>
        </div>
        <div className="middle mt-2">
          <h2 className="mb-2 border-b pb-2">
            <span className="px-2 mr-2 rounded-lg bg-gray-50 border">
              {question.subject}
            </span>
            | {question.chapter}
          </h2>
          <h2>Question: {question.question}</h2>
          {/* ////////////////////////////////////////Here Start all Question options//////////////////////////////////////////////// */}
          <div data-select={question.rightAns} className="py-2 space-y-2">
            <div
              onClick={(e) => checkAns(e, 1, question)}
              className="flex items-center gap-2 border bg-gray-50 pl-2 rounded-md cursor-pointer"
            >
              <h2 className="border rounded-full w-4 h-4 flex justify-center items-center">
                {question.subject === "বাংলা"
                  ? "ক"
                  : question.subject === "ইংরেজি"
                  ? "A"
                  : "ক"}
              </h2>
              <h3 className="__target_option__ w-full flex justify-between items-center pr-2">
                {question.option_01}{" "}
                <span className="hidden">
                  <RxCross2 color="red" size={22} />
                </span>{" "}
                <span className="hidden">
                  <GiCheckMark color="green" />
                </span>
              </h3>
            </div>
            <div
              onClick={(e) => checkAns(e, 2, question)}
              className="flex items-center gap-2 bg-gray-50 border pl-2 rounded-md cursor-pointer"
            >
              <h2 className="border rounded-full w-4 h-4 flex justify-center items-center">
                {question.subject === "বাংলা"
                  ? "ক"
                  : question.subject === "ইংরেজি"
                  ? "B"
                  : "ক"}
              </h2>
              <h3 className="__target_option__ w-full flex justify-between items-center pr-2">
                {question.option_02}{" "}
                <span className="hidden">
                  <RxCross2 color="red" size={22} />
                </span>{" "}
                <span className="hidden">
                  <GiCheckMark color="green" />
                </span>
              </h3>
            </div>
            <div
              onClick={(e) => checkAns(e, 3, question)}
              className="flex items-center gap-2 bg-gray-50 border pl-2 rounded-md cursor-pointer"
            >
              <h2 className="border rounded-full w-4 h-4 flex justify-center items-center">
                {question.subject === "বাংলা"
                  ? "ক"
                  : question.subject === "ইংরেজি"
                  ? "C"
                  : "ক"}
              </h2>
              <h3 className="__target_option__ w-full flex justify-between items-center pr-2">
                {question.option_03}{" "}
                <span className="hidden">
                  <RxCross2 color="red" size={22} />
                </span>{" "}
                <span className="hidden">
                  <GiCheckMark color="green" />
                </span>
              </h3>
            </div>
            <div
              onClick={(e) => checkAns(e, 4, question)}
              className="flex items-center gap-2 bg-gray-50 border pl-2 rounded-md cursor-pointer"
            >
              <h2 className="border rounded-full w-4 h-4 flex justify-center items-center">
                {question.subject === "বাংলা"
                  ? "ক"
                  : question.subject === "ইংরেজি"
                  ? "D"
                  : "ক"}
              </h2>
              <h3 className="__target_option__ w-full flex justify-between items-center pr-2">
                {question.option_04}{" "}
                <span className="hidden">
                  <RxCross2 color="red" size={22} />
                </span>{" "}
                <span className="hidden">
                  <GiCheckMark color="green" />
                </span>
              </h3>
            </div>
          </div>
          {/* ////////////////////////////////////////Here end all Question options//////////////////////////////////////////////// */}
        </div>
         {
          question.content && <div className="desc border-t scale-0 mt-2 pt-2 hidden duration-500 overflow-hidden">
          <h2> {HTMLReactParser(`${question.content}`)}</h2>
        </div>
         }
        {/* <div className="mt-2 duration-300">
          <CommentBox question={question} />
        </div> */}
      </div>
    )}
  </div>
  )
}

export default OnlyCard