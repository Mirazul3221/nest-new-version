"use client";
import { baseurl, viewurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import "@/app/userdashboard/components/cssfiles/scrolling_bar.css";
import axios from "axios";
import "../components/likeButtonAnimation.css";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaComments, FaRegCommentDots, FaThumbsUp } from "react-icons/fa";
import { LuShare2 } from "react-icons/lu";
import { RiSendPlaneLine } from "react-icons/ri";
import CommentsContainer from "./CommentsContainer";
import { useSocket } from "../../global/SocketProvider";
import { HiOutlineFaceFrown } from "react-icons/hi2";
import { imojis } from "../../components/imoji";
import { BiCross } from "react-icons/bi";
import { formatRelativeTime } from "./common";
import { commonLogout } from "../../components/common";
import ProfileCard from "../../components/ProfileCard";
import ShareComponent from "./ShareComponent";
import CommentProfile01 from "./CommentsProfile01";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineThumbDownAlt, MdOutlineThumbUp } from "react-icons/md";
const CommentBox = ({ question, Handler = null }) => {
  if (!question) return;
  const { store, dispatch } = useContext(storeContext);
  const { socket } = useSocket();
  // const sortComments = question?.comments.sort(
  //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  // );
  const extractQuestion =
    question?.comments.length == 1
      ? [question?.comments[0]]
      : question?.comments.length == 2
      ? [question?.comments[1], question?.comments[0]]
      : [];
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openCommentsBox, setOpenCommentsBox] = useState(false);
  const messangerRef = useRef(null);
  const [message, setMessage] = useState("");
  const [putLike, setPutLike] = useState(false);
  const [putDislike, setPutDislike] = useState(false);
  const [anim,setAnim] = useState(false);
  const [comments, setComments] = useState(extractQuestion);
  const [hideImoji, setHideImoji] = useState(false);
  const [share, setShare] = useState(false);
  const insertANewComment = (newComment) => {
    const newObject = {
      userId: store.userInfo.id,
      name: store.userInfo.name,
      profile: store.userInfo.profile,
      comment: newComment,
      createdAt: new Date().toISOString(),
    }; //
  };

  useEffect(() => {
    const checkReactionStatus = async () => {
      try {
        const { data } = await axios.post(
          `${baseurl}/userquestions/check-reaction-status`,
          { questionId: question._id },
          {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          }
        );

        if (data == "like-stored") {
          setPutLike(true);
        }
        if (data == "dislike-stored") {
          setPutDislike(true);
        }
      } catch (error) {}
    };
    checkReactionStatus();
  }, []);
  const handleShare = () => {
    setShare(true);
  };

  console.log(question.totalReaction)
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
  useEffect(() => {
    // messangerRef.current.addEventListener("keyUp",()=>alert("helo"))
    if (messangerRef.current) {
      messangerRef.current.style.height = "auto";
      messangerRef.current.style.height = `${messangerRef.current.scrollHeight}px`;
    }
  }, [message]);
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
    } catch (error) {
      commonLogout(dispatch, error);
    }
  };

  const handleSendReaction = useCallback(async (react) => {
    if(react== 'like')new Audio("/like-justify-sound/pick-92276.mp3").play();
    try {
      const { data } = await axios.post(
        `${baseurl}/userquestions/add-reaction`,
        { type: react, questionId: question._id },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setOpen(false);
      store.userInfo.id !== question.userId &&
        handleNotification("like-question");
    } catch (error) {
      console.log(error);
      commonLogout(dispatch, error);
    }
  }, []);
  const handleSendComment = useCallback(async () => {
    setLoading(true);
    if (!message) {
      setLoading(false);
      return;
    }
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
      store.userInfo.id !== question.userId &&
        handleNotification("comment-question");
      // insertANewComment(message);
      setMessage("");
      if (comments[0] == undefined) {
        setComments([data]);
        // setOpen(true);
      } else {
        setComments((prev) => [data, prev[0]]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      commonLogout(dispatch, error);
    }
  }, [message, comments]);

  if (question.comments.length > 0) {
    setTimeout(() => {
      setOpen(true);
    }, 100);
  }
  /////////////////////////////////////////////////////////////////////////////////
  if (share || openCommentsBox) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return (
    <div className="relative">
      <div
        className={`border-b flex ${
          question.totalReaction === 0 ? "justify-end" : "justify-between"
        } items-center py-2`}
      >
        {anim ? (
          <div className="w-full">
            {question.totalReaction == 0 ? (
              <h4>You like the question</h4>
            ) : (
              <h4>{`You and ${question.totalReaction} people like the question`}</h4>
            )}
          </div>
        ) : (
          <div>
            {question.totalReaction > 0 && (
              <div className="countcomments gap-2 flex items-center">
                <h4>{question.totalReaction}</h4>
                <FaThumbsUp size={18} />
              </div>
            )}
          </div>
        )}
        {question.comments.length > 0 && (
          <div className="countcomments gap-2 flex items-center">
            <h4>{question.totalComments}</h4>
            <FaComments size={18} />
          </div>
        )}
      </div>
      <div>
        {/* <div onClick={()=>setPutLike(!putLike)} className="">gdsg</div> */}
        <div className="footer flex justify-between items-center text-gray-500 mt-2">
          <div className="flex items-center">
            {putLike ? (
              <div
                onClick={() => {
                  setPutLike(false);
                  setAnim(false)
                  handleSendReaction("restoreLiked");
                }}
                className="like cursor-pointer bg-gray-50 hover:bg-gray-100 duration-150 rounded-l-full flex items-center gap-2 p-2"
              >
                <div className={`${anim ? "likeButtonAnimation" : ""}`}>
                  <MdOutlineThumbUp color="#292929" size={22} />
                </div>
                <span>Liked</span>
              </div>
            ) : (
              <div
                onClick={() => {
                  setPutDislike(false);
                  setPutLike(true);
                  setAnim(true)
                  handleSendReaction("liked");
                }}
                className="like flex items-center gap-2 bg-gray-50 hover:bg-gray-100 duration-150 rounded-l-full cursor-pointer p-2"
              >
                <MdOutlineThumbUp size={24} />
              </div>
            )}
            {putDislike ? (
              <div
                onClick={() => {
                  setPutDislike(false);
                  setAnim(false)
                  handleSendReaction("restoreDisliked");
                }}
                className="like cursor-pointer bg-gray-50 hover:bg-gray-100 duration-150 rounded-r-full flex items-center gap-2 p-2"
              >
                <span>Disliked</span>{" "}
                <div>
                  <MdOutlineThumbDownAlt color="#292929" size={22} />
                </div>
              </div>
            ) : (
              <div
                onClick={() => {
                  setPutLike(false);
                   setAnim(false)
                  setPutDislike(true);
                  handleSendReaction("disliked");
                }}
                className="like flex items-center gap-2 bg-gray-50 hover:bg-gray-100 duration-150 rounded-r-full cursor-pointer p-2"
              >
                <MdOutlineThumbDownAlt size={22} />
              </div>
            )}
          </div>

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
          <div
            onClick={handleShare}
            className="Share flex items-center gap-2 hover:bg-gray-100 duration-150 rounded-full cursor-pointer p-2"
          >
            <LuShare2 size={22} />
            <span>Share</span>
          </div>
        </div>

        <div className="display_comments p-2">
          {comments?.length > 0 && comments[0] !== undefined && (
            <div>
              {question?.totalComments > 2 && (
                <button
                  onClick={() => setOpenCommentsBox(true)}
                  className="underline"
                >
                  View more comments
                </button>
              )}
              {openCommentsBox && (
                <div className="bg-gray-500/20 w-screen z-50 h-screen fixed top-0 left-0 flex justify-center items-center">
                  <CommentsContainer
                    Handler={Handler}
                    setOpenCommentsBox={setOpenCommentsBox}
                    question={question}
                    share={share}
                    handleShare={handleShare}
                  />
                </div>
              )}
              {comments.length > 0 &&
                comments?.map((c, i) => {
                  return (
                    <div key={i} className="flex py-2 gap-2 text-gray-900">
                      <div>
                        <CommentProfile01
                          id={c?.userId}
                          name={c?.name}
                          pfl={c?.profile}
                          Handler={Handler}
                        />
                      </div>
                      <div className="w-fit max-w-11/12">
                        <div className="px-3 py-1 rounded-[20px] bg-gray-100">
                          <ProfileCard id={c?.userId} Handler={Handler}>
                            <p className="text-lg hover:underline cursor-pointer">
                              {c?.name}
                            </p>
                          </ProfileCard>
                          <p className="text-sm">{c?.comment}</p>
                        </div>
                        <p className={"text-[10px] ml-2"}>
                          {formatRelativeTime(c?.createdAt)}
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
          <img
            className="w-[35px] rounded-full cursor-pointer duration-100 border hover:border-none border-gray-300"
            src={store?.userInfo?.profile}
            alt={question?.userName}
          />
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
          <div className="flex h-full gap-2 items-start mb-2 text-gray-500">
            <span
              onClick={() => setHideImoji(!hideImoji)}
              className="text-gray-300 cursor-pointer"
            >
              <HiOutlineFaceFrown color="gray" size={22} />
            </span>
            {!loading ? (
              <RiSendPlaneLine
                className="cursor-pointer"
                color="gray"
                onClick={() => {
                  handleSendComment(), setHideImoji(false);
                }}
                size={20}
              />
            ) : (
              <AiOutlineLoading3Quarters
                className="animate-spin text-gray-700 text-center"
                size={20}
              />
            )}
          </div>
          {hideImoji && (
            <div className="bg-white px-4 rounded-lg pb-4 border absolute bottom-12 shadow-lg right-0">
              <span
                onClick={() => setHideImoji(false)}
                className="absolute top-2 bg-slate-50 cursor-pointer right-3 rotate-45 p-1 rounded-full border"
              >
                <BiCross />
              </span>
              <h2 className="text-center font-bold py-2">Imoji corner</h2>
              <div className="h-[25vh] overflow-y-auto">
                {imojis.map((imj, i) => {
                  return (
                    <div key={i} className="">
                      <h3 className="text-gray-400 font-bold pb-[2px] mb-3 border-b">
                        {imj.type}
                      </h3>
                      <div className="grid grid-cols-6 gap-1">
                        {imj.obj.map((mg, i) => {
                          return (
                            <h2
                              key={i}
                              onClick={(e) => setMessage(message + mg)}
                              className="p-1 duration-300 hover:bg-slate-200 hover:scale-110 hover:rotate-12 cursor-pointer rounded-full border"
                            >
                              {mg}
                            </h2>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <ShareComponent share={share} slug={question?.slug} id={question._id} />
    </div>
  );
};

export default CommentBox;
