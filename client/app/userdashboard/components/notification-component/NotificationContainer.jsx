import moment from 'moment';
import React from 'react'
import { IoNotificationsOffOutline } from "react-icons/io5";
import InvitationCard from './InvitationCard';
import { RxCross2 } from "react-icons/rx";
import FriendRequest from './FriendRequest';
const NotificationContainer = ({notificationList,sayThanks,setOpenNotif}) => {
  return (
    <div className="bg-gray-50 shadow-md fixed z-50 top-6 md:top-[90px] w-full md:w-4/12 right-0 md:right-12">
    <div className="text-center relative rounded-t-lg py-2 md:py-3 bg-gray-200 flex justify-center items-center">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
      <div  onClick={()=>setOpenNotif(false)} className="left-0 px-2 bg-white w-full -top-[110%] absolute flex justify-end"> <span className='text-gray-700'><RxCross2 size={30}/></span> </div>
    </div>
    <div className="overflow-y-scroll h-[92vh] md:h-[70vh]">
      {notificationList?.length > 0 ? (
        <div className="rounded-md px-6 w-full">
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
    <div className="py-3 bg-gray-200"></div>
  </div>
  )
}

export default NotificationContainer
