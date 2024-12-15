"use client";
import ProtectRoute from "@/app/global/ProtectRoute";
import React, { useRef, useState } from "react";
import SuperHeader from "../../components/SuperHeader";
import Footer from "@/app/components/Footer";
import { useParams } from "next/navigation";
import axios from "axios";
import { baseurl } from "@/app/config";
import { useEffect } from "react";
import OnlyCard from "../components/OnlyCard";
import { useStore } from "@/app/global/DataProvider";
import { RiSendPlaneLine } from "react-icons/ri";
import moment from "moment";

const Page = () => {
  const [question, setQuestion] = useState();
  const [totalComments, setTotalComments] = useState(0);
  const pram = useParams();
  const fetchMyData = async () => {
    try {
      const { data } = await axios.get(
        `${baseurl}/userquestions/single-questions?slug=${pram.singlequestion}`
      );
      setQuestion(data[0]);
      fetchComments(data[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyData();
  }, []);
  //////////////////////////////////////////////////////////////////////////////////////////////
  const { store } = useStore();
  const messangerRef = useRef(null);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const commentRef = useRef();
  const scrollToBottom = () => {
    if (commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    // messangerRef.current.addEventListener("keyUp",()=>alert("helo"))
    if (messangerRef.current) {
      messangerRef.current.style.height = "auto";
      messangerRef.current.style.height = `${messangerRef.current.scrollHeight}px`;
    }
  }, [message]);
  const fetchComments = async (id) => {
    // if(totalComments == comments.length) return
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${baseurl}/userquestions/get-all-comments?id=${id}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );

      console.log(data);
      setTotalComments(data.total)
      setComments((prev) => [...prev, ...data.comments]);
      setPage((prev) => prev + 1);
      setLoading(false);
      scrollToBottom();
    } catch (error) {
      console.log(error);
    }
  };

  const newObject = {
    userId: store.userInfo.id,
    name: store.userInfo.name,
    profile: store.userInfo.profile,
    comment: message,
    createdAt: new Date().toISOString(),
  };
  const handleSendComment = async () => {
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
      scrollToBottom();
      setComments((prev) => [...prev, newObject]);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(totalComments);
  console.log(comments.length);
  return (
    <div>
      <ProtectRoute>
        <div className="md:px-20 px-4 pt-2">
          <SuperHeader />
        </div>
        <div className="min-h-[80vh] md:w-1/2 mx-auto">
          <OnlyCard question={question} />
          <div className="px-4">
            {comments?.map((item, i) => {
              return (
                <div ref={commentRef} key={i}>
                  <UserComment item={item} />
                </div>
              );
            })}
            {comments?.length > 0 ? (
              <div>
                {loading ? (
                  "Loading..."
                ) : (
                  <div className="mb-12">
                    {totalComments == comments.length ? (
                      "end"
                    ) : (
                      <div>
                          <p
                            onClick={() => fetchComments(question._id)}
                            className="mt-2 hover:underline cursor-pointer"
                          >
                            View more comments...
                          </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              "No comment found!"
            )}
          </div>
          <div className="textarea py-2 px-4">
            <div className={`flex items-end gap-2`}>
              <textarea
                className=" max-h-[20vh] duration-[2s] hidden_scroll overflow-auto"
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
              <div className="flex h-full items-start mb-2 text-gray-500">
                {message ? (
                  <RiSendPlaneLine
                    className="cursor-pointer"
                    color="black"
                    onClick={handleSendComment}
                    size={20}
                  />
                ) : (
                  <RiSendPlaneLine size={20} />
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </ProtectRoute>
    </div>
  );
};

export default Page;

const UserComment = ({ item }) => {
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
      <div className="flex py-2 gap-2 text-gray-900">
        <div>
          <img className="w-6" src={item.profile} alt={item.name} />
        </div>
        <div className="w-fit max-w-11/12">
          <div className="px-3 py-1 rounded-[20px] bg-gray-100">
            <p className="text-lg">{item.name}</p>
            <p className="text-sm">{item.comment}</p>
          </div>
          <p className={"text-[10px] ml-2"}>
            {formatRelativeTime(item.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};
