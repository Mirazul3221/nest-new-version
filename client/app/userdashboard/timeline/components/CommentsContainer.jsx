'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import OnlyCard from './OnlyCard';
import { RxCross2 } from 'react-icons/rx';
import { RiSendPlaneLine } from 'react-icons/ri';
import axios from 'axios';
import { baseurl } from '@/app/config';
import storeContext from '@/app/global/createContex';
import moment from 'moment';

const CommentsContainer = ({setOpenCommentsBox,question}) => {
    const { store } = useContext(storeContext);
    const messangerRef = useRef(null);
    const [message, setMessage] = useState("");
    const [page,setPage] = useState(1)
    const [loading,setLoading] = useState(false)
    const [comments,setComments] = useState([])

    useEffect(() => {
        // messangerRef.current.addEventListener("keyUp",()=>alert("helo"))
        if (messangerRef.current) {
          messangerRef.current.style.height = "auto";
          messangerRef.current.style.height = `${messangerRef.current.scrollHeight}px`;
        }
      }, [message]);
    const fetchData =async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(
              `${baseurl}/userquestions/get-all-comments?id=${question._id}&page=${page}`,
              {
                headers: {
                  Authorization: `Bearer ${store.token}`,
                },
              }
            );
            setComments(prev=>[...prev,...data]);
            setPage(prev=>prev + 1)
            setLoading(false)
            console.log(data)
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const fullName = question.userName.split(" ");
    const firstname = fullName[0];
  return (
<div className="bg-gray-500/20 w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
   <div className="md:w-1/2 md:max-h-8/12 min-h-1/2 rounded-lg shadow-lg relative bg-white overflow-y-auto">
   <span onClick={()=>setOpenCommentsBox(false)} className='absolute flex justify-center rounded-full cursor-pointer items-center p-2 bg-gray-100 top-1 right-1'><RxCross2 size={20}/></span>
   <div className="py-3 border-b text-center font-bold">{`${firstname}'s question`}</div>
    <div className="flex flex-col justify-center">
    <div className="overflow-y-scroll h-[60vh]">
        <OnlyCard question={question}/>
        <div className='px-4'>
            {
                comments?.map((item,i)=>{
                   return <UserComment key={i} item={item}/>
                })
            }
            {
                loading ? 'Loading...' : <p onClick={fetchData} className='underline mt-2'>View more comments...</p>
            }
        </div>
      </div>
      
   <div className="textarea py-2 px-4">
   <div
          className={`flex items-end gap-2`}
        >
          <textarea
          className=' max-h-[20vh] duration-[2s] hidden_scroll overflow-auto'
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
            className="flex h-full items-start cursor-pointer mb-2 text-gray-500"
          >
            <RiSendPlaneLine size={20} />
          </div>
        </div>
   </div>
    </div>
   </div>
  </div>
  )
}

export default CommentsContainer

const UserComment = ({item})=>{
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
    <div className="">
                    <div key={item._id} className="flex py-2 gap-2 text-gray-900">
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
   )
}
