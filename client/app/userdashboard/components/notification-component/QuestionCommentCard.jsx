import { viewurl } from "@/app/config";
import React from "react";
import { FaComment } from "react-icons/fa";
const QuestionCommentCard = ({ item }) => {
  return (
    <div>
      <div className="py-2 border-b">
        <a href={`${viewurl}/userdashboard/timeline/${item?.message[0]?.slug}`}>
          <div className="flex gap-4">
            <div className="w-20 relative text-gray-700">
              <FaComment
                className="absolute right-0 bottom-0"
                color="#7305fa"
                size={25}
              />
              <img
                className="rounded-full"
                src={item?.message[0]?.requesterProfile}
                alt={item?.message[0]?.requesterName}
              />
            </div>
            <div className="w-9/12">
              <h2>
                <span className="font-bold text-[#7305fa]">
                  {item?.message[0]?.requesterName}
                </span>{" "}
                comments {`"${item?.message[0]?.comment}"`} your question {` "${item?.message[0]?.question}"`}
              </h2>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default QuestionCommentCard;
