'use client'
import { useState, useRef, useEffect } from "react";
import InputForm from "@/app/components/Login";
import { fetchAllFriendsByMessage } from "../messanger/components/fetchdata";
import { useStore } from "@/app/global/DataProvider";
import { useMessage } from "../global/messageProvider";
import { baseurl } from "@/app/config";
import axios from "axios";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [l,setL] = useState(false);
  const boxRef = useRef(null);
const {store} = useStore()
const {dispatch,messanger} = useMessage()
  const toggleBox = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  
  const loadmessage = async (token) => {
    try {
      const {data} = await axios.get(
        `${baseurl}/messanger/get/${'6731d7f1a9b25d829ccbe9ee'}/${1}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setL(true)
      
      dispatch({type:'fetch-message',payload:data})
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };
  
  
    useEffect(() => {
      setTimeout(() => {
        loadmessage(store.token);
      }, 500);

    }, []);  // Add store.token as a dependency
    
    
console.log(messanger.message)
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f3f4f6" }}>
      {/* Toggle Button */}
      <button onClick={()=> {toggleBox(),loadmessage()}} style={{ padding: "10px 20px", background: "blue", color: "white", borderRadius: "5px", cursor: "pointer" }}>
        Toggle Box
      </button>

      {/* Box Container */}
      {isOpen && (
        <div
          ref={boxRef}
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            width: "300px",
            textAlign: "center"
          }}
        >
          <h2>This is the Box</h2>
          <p>Click outside to close.</p>
           <InputForm/>
        </div>
      )}
    </div>
  );
}
