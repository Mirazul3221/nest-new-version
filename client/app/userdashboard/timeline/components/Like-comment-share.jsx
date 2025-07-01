'use client'
import { baseurl } from '@/app/config';
import { useStore } from '@/app/global/DataProvider';
import axios from 'axios';
import React, { useCallback, useState } from 'react'
import {
    FaComments,
    FaRegCommentDots,
    FaRegThumbsUp,
    FaThumbsUp,
  } from "react-icons/fa";
import { LuShare2 } from 'react-icons/lu';
import '../components/likeButtonAnimation.css'
import { commonLogout } from '../../components/common';
import ShareAPI from './ShareApi';
const LikeCommentShare = ({question,handleShare}) => {
    const [putLike, setPutLike] = useState(false); 
    const {store,dispatch} = useStore();
    //////////////////////////////////////////////////////////////////////
      ////////////////notification api////////////////////////
  const handleNotification = async (type) => {
    try {
      const { data } = await axios.post(
        `${baseurl}/notification/create`,
        type === "like-question"
          ? {
              readerId: question.userId,
              question: question.question,
              slug: question.slug,
              type,
            }
          : {
              readerId: question.userId,
              question: question.question,
              slug: question.slug,
              comment: message,
              type,
            },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      socket && (await socket.emit("new-notification", question.userId));
    } catch (error) {commonLogout(dispatch,error)}
  };

  const handleSendLike = useCallback(async () => {
    new Audio("/like-justify-sound/pick-92276.mp3").play();
    try {
      const { data } = await axios.post(
        `${baseurl}/userquestions/create-like`,
        { questionId: question._id },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      store.userInfo.id !== question.userId &&
        handleNotification("like-question");
    } catch (error) {
      console.log(error);
      commonLogout(dispatch,error)
    }
  }, []);
  return (
    <div className="relative px-4 mb-4">
    <div
      className={`border-b flex ${
        question?.likes?.length === 0 ? "justify-end" : "justify-between"
      } items-center py-2 text-gray-400`}
    >
      {putLike ? (
        <div className="w-full">
          {question?.likes?.length == 0 ? (
            <h4>You like the question</h4>
          ) : (
            <h4>{`You and ${question?.likes?.length} people like the question`}</h4>
          )}
        </div>
      ) : (
        <div>
          {question?.likes?.length > 0 && (
            <div className="countcomments gap-2 flex items-center">
              <h4>{question.likes.length}</h4>
              <FaThumbsUp size={18} />
            </div>
          )}
        </div>
      )}
      {question?.comments?.length > 0 && (
        <div className="countcomments gap-2 flex items-center">
          <h4>{question.totalComments}</h4>
          <FaComments size={18} />
        </div>
      )}
    </div>
    <div>
      {/* <div onClick={()=>setPutLike(!putLike)} className="">gdsg</div> */}
      <div className="footer flex justify-between items-center text-gray-500 mt-2">
        {putLike === false && (
          <div>
            {question?.likes?.includes(store.userInfo.id) ? (
              <div className="like mb-2 flex items-center gap-2 hover:bg-gray-100 duration-150 rounded-full cursor-pointer p-2">
                <FaThumbsUp color="#292929" size={22} /> <span>Like</span>
              </div>
            ) : (
              <div
                onClick={() => {
                  setPutLike(true);
                  handleSendLike();
                }}
                className="like mb-2 flex items-center gap-2 hover:bg-gray-100 duration-150 rounded-full cursor-pointer p-2"
              >
                <FaRegThumbsUp size={22} /> <span>Like</span>
              </div>
            )}
          </div>
        )}
        {putLike && (
          <div className="like mb-2 flex items-center gap-2 hover:bg-gray-100 duration-150 rounded-full cursor-pointer p-2">
            <div className={`${putLike ? "likeButtonAnimation" : ""}`}>
              <FaThumbsUp color="#292929" size={22} />
            </div>
            <span>Like</span>
          </div>
        )}

        {question?.comments?.length > 0 ? (
          <div >
             <label className="comment flex items-center gap-2 hover:bg-gray-100 duration-150 rounded-full cursor-pointer p-2" htmlFor="comment">
             <FaRegCommentDots size={22} />
             <span>Comment</span>
             </label>
          </div>
        ) : (
          <div
            className="comment flex items-center gap-2 hover:bg-gray-100 duration-150 rounded-full cursor-pointer p-2"
          >
            <FaRegCommentDots size={22} />
            <span>Comment</span>
          </div>
        )}
        <div onClick={handleShare} className="Share flex items-center gap-2 hover:bg-gray-100 duration-150 rounded-full cursor-pointer p-2">
          <LuShare2 size={22} />
        <ShareAPI title={question.question} uri={`userdashboard/timeline/${question.slug}`} />
        </div>
      </div>
    </div>
  </div>
  )
}

export default LikeCommentShare
