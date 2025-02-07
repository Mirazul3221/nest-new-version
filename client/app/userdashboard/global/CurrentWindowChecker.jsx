import React, { useEffect } from "react";
import { useSocket } from "./SocketProvider";
import { useStore } from "@/app/global/DataProvider";

const CurrentWindowChecker = () => {
    const { socket } = useSocket();
    const { store } = useStore();

    useEffect(() => {
        function updateWindowStatus() {
            if(document.hidden){
                socket && socket.emit('userActivity',{userId:store.userInfo.id,status:false})
            } else {
                socket && socket.emit('userActivity',{userId:store.userInfo.id,status:true})
            }
        }

        document.addEventListener("visibilitychange", updateWindowStatus);

        // Cleanup on unmount or socket change
        return () => {
            document.removeEventListener("visibilitychange", updateWindowStatus);
        };
    }, [socket, store.userInfo.id]); // Add store.userInfo.id as a dependency to ensure it updates

    return null; // Component doesn't render anything, it just handles the activity status
};

export default CurrentWindowChecker;