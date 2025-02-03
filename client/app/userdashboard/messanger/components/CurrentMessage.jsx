'use client'
import { baseurl } from '@/app/config'
import storeContext from '@/app/global/createContex'
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useMessage } from '../../global/messageProvider'
import { useSocket } from '../../global/SocketProvider'

const CurrentMessage = ({ allMsg, msg, setSendCurrentMsg, replyMsgContent, setReplyContent, replyMsgStatus, toReplyerId, setToReplyerId }) => {
    const { store } = useContext(storeContext);
    const { socket } = useSocket();
    const element = useRef(null);
    const { dispatch } = useMessage();
    const [isSend, setIsSend] = useState(false);
    const validataStatusRef = useRef('init'); // Set default value

    // Move socket event listener inside useEffect
    useEffect(() => {
        if (!socket) return;

        const handleValidationStatus = (data) => {
            console.log(data)
            if (data.status === true) {
                validataStatusRef.current = 'yes'; 
            } else {
                validataStatusRef.current = 'no';   
            }
          
            console.log("Validation status updated:", validataStatusRef.current);
        };

        socket.on('validation-status', handleValidationStatus);

        return () => {
            socket.off('validation-status', handleValidationStatus);
        };
    }, [socket]); // Runs once when socket is available

    const sendMessage = async () => {
        console.log(validataStatusRef.current); // This should now log "yes" if event has triggered before.

        try {
            setIsSend(true);
            setSendCurrentMsg(true);
            const { data } = await axios.post(
                `${baseurl}/messanger/message-create`,
                {
                    receiverId: msg.receiverId,
                    message: msg.message.content ? msg.message.content : "Love",
                    reply: [replyMsgContent.innerText, toReplyerId],
                    seenMessage:validataStatusRef.current == 'yes' ? true :false
                },
                {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                }
            );

            setReplyContent('');
            setToReplyerId(null);
            socket && socket.emit('message-to', data);
            dispatch({ type: 'send-message', payload: data });
            setIsSend(false);
            setSendCurrentMsg(false);
            allMsg = allMsg.filter(m => m.content !== msg);
            element.current?.remove();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        sendMessage();
    }, [msg, socket]);

    return (
        <div ref={element} className="flex justify-end">
            <div className="">
                <h2 className='px-6 py-2 bg-violet-400 text-gray-600 rounded-full'>{msg.message.content}</h2>
                {isSend && <p>Sending...</p>}
            </div>
        </div>
    );
};

export default CurrentMessage;
