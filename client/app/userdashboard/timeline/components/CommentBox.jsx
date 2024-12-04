"use client";
import { baseurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import "@/app/userdashboard/components/cssfiles/scrolling_bar.css";
import axios from "axios";
import moment from "moment";
import "../components/likeButtonAnimation.css";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FaComments,
  FaRegCommentDots,
  FaRegThumbsUp,
  FaThumbsUp,
} from "react-icons/fa";
import { LuShare2 } from "react-icons/lu";
import { RiSendPlaneLine } from "react-icons/ri";
import CommentsContainer from "./CommentsContainer";
const CommentBox = ({ question }) => {
  const { store } = useContext(storeContext);
  const [open, setOpen] = useState(false);
  const [openCommentsBox,setOpenCommentsBox] = useState(false)
  const messangerRef = useRef(null);
  const [message, setMessage] = useState("");
  const [putLike, setPutLike] = useState(false);

  useEffect(() => {
    // messangerRef.current.addEventListener("keyUp",()=>alert("helo"))
    if (messangerRef.current) {
      messangerRef.current.style.height = "auto";
      messangerRef.current.style.height = `${messangerRef.current.scrollHeight}px`;
    }
  }, [message]);

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
      setOpen(false);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleSendComment = useCallback(async () => {
    try {
      const { data } = await axios.post(
        `${baseurl}/userquestions/create-comment`,
        { questionId: question._id, comment: message },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setOpen(false);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  }, [message]);

  if (question.comments.length > 0) {
    setTimeout(() => {
      setOpen(true);
    }, 100);
  }

  function formatRelativeTime(timestamp) {
    const now = moment(); // Current time
    const createdAt = moment(timestamp); // Parse the createdAt timestamp
    const duration = moment.duration(now.diff(createdAt)); // Calculate duration

    if (duration.asMinutes() < 1) {
      return `${Math.floor(duration.asSeconds())}s`; // Less than a minute, show in seconds
    } else if (duration.asHours() < 1) {
      return `${Math.floor(duration.asMinutes())}m`; // Less than an hour, show in minutes
    } else if (duration.asDays() < 1) {
      return `${Math.floor(duration.asHours())}h`; // Less than a day, show in hours
    } else {
      return `${Math.floor(duration.asDays())}d`; // More than a day, show in days
    }
  }
  return (
    <div>
      <div
        className={`border-b flex ${
          question.likes?.length === 0 ? "justify-end" : "justify-between"
        } items-center py-2 text-gray-400`}
      >
        {
          putLike ? <div className="w-full">{
            question?.likes?.length == 0 ? <h4>You like the question</h4> : <h4>{`You and ${question?.likes?.length} people like the question`}</h4>
            }</div> :  <div>
            {question?.likes?.length > 0 && (
            <div className="countcomments gap-2 flex items-center">
              <h4>{question.likes.length}</h4>
              <FaThumbsUp size={18} />
            </div>
          )}
          </div>
        }
        {question.comments.length > 0 && (
          <div className="countcomments gap-2 flex items-center">
            <h4>{question.comments.length}</h4>
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
                  {" "}
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
                  <FaRegThumbsUp size={22} /> <span>Like</span>{" "}
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

          {question.comments.length > 0 ? (
            <div className="comment flex items-center gap-2 hover:bg-gray-100 duration-150 rounded-full cursor-pointer p-2">
              <FaRegCommentDots size={22} />
              <span>Comment</span>
            </div>
          ) : (
            <div
              onClick={() => setOpen(!open)}
              className="comment flex items-center gap-2 hover:bg-gray-100 duration-150 rounded-full cursor-pointer p-2"
            >
              <FaRegCommentDots size={22} />
              <span>Comment</span>
            </div>
          )}
          <div className="Share flex items-center gap-2 hover:bg-gray-100 duration-150 rounded-full cursor-pointer p-2">
            <LuShare2 size={22} />
            <span>Share</span>
          </div>
        </div>

        <div className="display_comments p-2">
          {question.comments.length > 0 && (
            <div>
              <button onClick={()=>setOpenCommentsBox(true)} className="underline">View more comments</button>
              {
                openCommentsBox &&  <CommentsContainer setOpenCommentsBox={setOpenCommentsBox} question={question}/>
              }
              {question.comments.map((c) => {
                return (
                  <div key={c._id} className="flex py-2 gap-2 text-gray-900">
                    <div>
                      <img className="w-6" src={c.profile} alt={c.name} />
                    </div>
                    <div className="w-fit max-w-11/12">
                      <div className="px-3 py-1 rounded-[20px] bg-gray-100">
                        <p className="text-lg">{c.name}</p>
                        <p className="text-sm">{c.comment}</p>
                      </div>
                      <p className={"text-[10px] ml-2"}>
                        {formatRelativeTime(c.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div
          className={`flex items-end gap-2 ${
            open ? "max-h-[100vh] duration-[2s]" : "max-h-0 duration-1000"
          } hidden_scroll overflow-y-scroll`}
        >
          <textarea
            ref={messangerRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={1}
            placeholder="Leave your comment..."
            style={{
              width: "100%",
              resize: "none",
              overflow: "hidden",
              padding: "6px 14px",
              paddingBottom: "10 px",
              boxSizing: "border-box",
              outline: "none",
              border: "none",
              borderRadius: "20px",
              background: "#f5f5f5",
            }}
          />
          <div
            onClick={handleSendComment}
            className="flex h-full items-start cursor-pointer mb-2 text-gray-500"
          >
            <RiSendPlaneLine size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
