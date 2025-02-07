import React, { useEffect } from "react";
import { useSocket } from "./SocketProvider";
import { useStore } from "@/app/global/DataProvider";

const CurrentWindowChecker = () => {
    const { socket } = useSocket();
    const { store } = useStore();
    useEffect(() => {
        function updateWindowStatus() {
            if (document.hidden) {
                socket && socket.emit('userActivity', { userId: store.userInfo.id, status: false });
            } else {
                socket && socket.emit('userActivity', { userId: store.userInfo.id, status: true });
            }
        }
    
        function handleBeforeUnload(event) {
            const data = JSON.stringify({ userId: store.userInfo.id, status: false });
            navigator.sendBeacon('/api/userActivity', data); // Send data to your backend API
        }    
    
        // Run once when component mounts (after page reload)
        if (socket) {
            socket.emit('userActivity', { userId: store.userInfo.id, status: true });
        }
    
        document.addEventListener("visibilitychange", updateWindowStatus);
        window.addEventListener("beforeunload", handleBeforeUnload);
    
        return () => {
            document.removeEventListener("visibilitychange", updateWindowStatus);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [socket, store.userInfo.id]);

    return null; // Component doesn't render anything, it just handles the activity status
};

export default CurrentWindowChecker;