import moment from 'moment';
import React from 'react'
import { IoNotificationsOffOutline } from "react-icons/io5";
import InvitationCard from './InvitationCard';
import { RxCross2 } from "react-icons/rx";
import FriendRequest from './FriendRequest';
import QuestionLikeCard from './QuestionLikeCard';
import QuestionCommentCard from './QuestionCommentCard';
const NotificationContainer = ({notificationList,sayThanks,notifContainerRef,handleNotificationToggle}) => {
  return (
    <div ref={notifContainerRef} className="text-sm px-2 absolute top-0 md:top-20 shadow-2xl py-4 right-0 md:right-28 w-full md:w-3/12 bg-white h-screen md:h-[80vh] border rounded-2xl z-50">
      <div className="flex justify-between items-center">
         <h2 className="text-2xl ml-4">Notifications</h2>
        <span onClick={()=>handleNotificationToggle()} className='text-gray-700 md:hidden'><RxCross2 size={20}/></span>
      </div>
    <div className="overflow-y-scroll w-full h-[92vh] md:h-[70vh]">
      {notificationList?.length > 0 ? (
        <div className="md:rounded-md md:px-6 w-full">
          {notificationList?.map((item, i) => {
            // -------------------------------------------------------------------------------------------------
            if (item.type === "friend-request") {
              return (
                <div key={i} className="mb-4 border-b py-2">
                  <FriendRequest item={item}/>
                </div>
              );
            }
            //---------------------------------------------------------------------------------------------------------------
            if (item.type === "accept-request") {
              return (
                <div key={i} className="mb-4 border-b py-2">
                  <p>{moment(item.createdAt).fromNow()}</p>
                  <div className="flex gap-2">
                    <img
                      className="w-20 h-20 rounded-full border-2 border-gray-500"
                      src={item.message[0].requesterProfie}
                      alt={item.message[0].requesterName}
                    />
                    <div className="">
                      <h2 className="font-semibold md:text-lg">
                        {item.message[0].requesterName}
                      </h2>
                      <p>
                        <span className="text-violet-700">
                          {item.message[0].requesterName}
                        </span>{" "}
                        Accept your request
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
            //-------------------------------------------------------------------------------------------------------------------
            if (item.type === "invite-friend") {
              return (
                <div className="bg-gray-100 w-full " key={i}>
                  <InvitationCard
                    item={item}
                    sayThanks={sayThanks}
                  />
                </div>
              );
            }

            if (item.type === "respond-from-invitation") {
              return (
                <div key={i} className="mb-4 border-b py-2">
                  <p>{moment(item.createdAt).fromNow()}</p>
                  <div className=" gap-2 flex">
                    <div className="w-1/2">
                      <div className="relative w-fit">
                        <img
                          className="w-20 h-20 rounded-full border-2 border-gray-500"
                          src={item.message[0].requesterProfie}
                          alt={item.message[0].requesterName}
                        />
                        <h2 className="bg-violet-500 w-10 h-10 rounded-full absolute text-white text-[10px] p-1 border-2 border-white flex justify-center items-center -bottom-2 -right-3">
                          {item?.message[0]?.requesterStatus}
                        </h2>
                      </div>
                    </div>
                    <div className="">
                      <h2 className="font-semibold md:text-lg ml-2 text-gray-700">
                        {item?.message[0]?.requesterName}
                      </h2>
                      <p className="ml-2 text-gray-600">
                        Thank you{" "}
                        {item?.message[0]?.responderName} for
                        the invitation. I am happy as you
                        remember me and inform of reading
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            if (item.type === "reading-notification") {
              return (
                <div key={i} className="mb-4 border-b py-2">
                  <p>{moment(item.createdAt).fromNow()}</p>
                  <div className=" gap-2 flex">
                    <div className="w-1/2">
                      <div className="relative w-fit">
                        <img
                          className="w-20 h-20 rounded-full border-2 border-gray-500"
                          src={item.message[0].requesterProfie}
                          alt={item.message[0].requesterName}
                        />
                        <h2 className="bg-violet-500 w-10 h-10 rounded-full absolute text-white text-[10px] p-1 border-2 border-white flex justify-center items-center -bottom-2 -right-3">
                          {item?.message[0]?.requesterStatus}
                        </h2>
                      </div>
                    </div>
                    <div className="">
                      <h2 className="font-semibold md:text-lg ml-2 text-gray-700">
                        {item?.message[0]?.requesterName}
                      </h2>
                      <p className="ml-2 text-gray-600">
                        {`${item.message[0].requesterName} has already completed 50+ question from "${item.message[0].topic}"`}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
            //-------------------------------------------------------------------------------------------------------------------------
            if(item.type === 'like-question'){
               return (
                <div className="w-full" key={i}>
                <QuestionLikeCard
                  item={item}
                />
              </div>
               )
            }
            //-------------------------------------------------------------------------------------------------------------------------
            if(item.type === 'comment-question'){
               return (
                <div className="w-full " key={i}>
                <QuestionCommentCard
                  item={item}
                />
              </div>
               )
            }
            //-------------------------------------------------------------------------------------------------------------------------
          })}
        </div>
      ) : (
        <div className="h-full w-full text-gray-300 flex justify-center items-center">
          <div>
            <IoNotificationsOffOutline
              className="w-fit mx-auto"
              size={40}
            />
            <p className="mt-2">Notification Not Found</p>
          </div>
        </div>
      )}
    </div>
  </div>
  )
}

export default NotificationContainer
