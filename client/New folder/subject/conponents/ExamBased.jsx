import { examTypeValue } from "@/app/assistantdashboard/components/data";
import { FaRegClipboard } from "react-icons/fa";
import { MdOutlineArrowRight } from "react-icons/md";

export const ExamBasedQuestion = ({ setGetTopicValue,setHedTitle,headTitle,setSwitcher }) => {
    return (
      <div className="w-full">
        <h2 className="py-2 bg-violet-700 px-6 text-2xl md:text-3xl text-white">
          বিষয় ভিত্তিক
        </h2>
        <div>
          {examTypeValue.map((item,i) => {
            return (
              <div key={i}>
                <h2 
                  onClick={() => {
                    headTitle !== item.type
                      ? setHedTitle(item.type)
                      : setHedTitle("");
                  }}
                  className="py-2 px-6 font-bold md:text-lg text-gray-700 flex justify-between items-center mt-[5px] cursor-pointer">
                  {item.type}
                  <MdOutlineArrowRight className={`${headTitle===item.type ? "rotate-90":""} duration-100`} size={25}/>
                </h2>
               {
                item.type ===headTitle && (
                  <div className="max-h-[60vh] md:max-h-[40vh] overflow-auto">
                  {item.value.map((list,i) => {
                    return (
                      <h2 key={i} onClick={()=>{setGetTopicValue(list);setSwitcher(true)}}
                        className={` py-1 p-6 pr-[29px] text-gray-500 duration-100 ml-4 mb-2 mt-[3px] cursor-pointer flex justify-between items-center`}>
                        {list}
                        <FaRegClipboard/>
                      </h2>
                    );
                  })}
                </div>
                )
               }
              </div>
            );
          })}
        </div>
      </div>
    );
  };