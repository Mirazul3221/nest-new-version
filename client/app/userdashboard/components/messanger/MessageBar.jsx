import React from 'react'
import { formatetime } from './components/time'
import { useSocket } from '../../global/SocketProvider';
import { useStore } from '@/app/global/DataProvider';

const MessageBar = ({friend,hiddenNumber}) => {
      const { myActiveFriends,socket } = useSocket();
        const { store } = useStore();
  return (
    <div className="px-6 relative flex gap-4 items-center rounded-2xl py-2 border-b hover:bg-gray-200 duration-100">
    <div className="relative">
      <img
        className="w-12 rounded-full"
        src={friend.userProfile}
        alt={friend.userName}
      />
      {myActiveFriends?.includes(friend.userId) ? (
        <div className="w-3 h-3 border-2 border-white bg-green-500 absolute rounded-full -right-[2px] bottom-1"></div>
      ) : (
        <div className="w-3 h-3 border-2 border-white bg-gray-400 absolute rounded-full -right-[2px] bottom-1"></div>
      )}
    </div>
    <div>
      <div className="flex gap-4 items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-700">
          {friend.userName.split(" ")[0]}
        </h2>

        <p className="text-[12px] text-slate-500">
          {formatetime(friend.lastMessageTime)}
        </p>
      </div>
      <h4 className="text-sm text-slate-500">
        <span className="font-semibold text-slate-700">
          {friend.senderId === store.userInfo.id
            ? "You :"
            : ""}
          {friend.lastMessage.length > 20
            ? friend.lastMessage.content.slice(0, 20) +
              "......"
            : friend.lastMessage.content}
        </span>
      </h4>
    </div>
    {friend?.unseenMessageCount > 0 && !hiddenNumber && (
      <div className="absolute top-[50%] -translate-y-[50%] right-5 bg-rose-100 text-gray-700 p-1 w-4 h-4 flex justify-center items-center rounded-full shadow-md text-[10px]">
        {friend?.unseenMessageCount}
      </div>
    )}
  </div>
  )
}

export default MessageBar