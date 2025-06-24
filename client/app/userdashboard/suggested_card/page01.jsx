'use client'
// import { useState, useRef, useEffect } from "react";
// import InputForm from "@/app/components/Login";
// import { fetchAllFriendsByMessage } from "../messanger/components/fetchdata";
// import { useStore } from "@/app/global/DataProvider";
// import { useMessage } from "../global/messageProvider";
// import { baseurl } from "@/app/config";
// import axios from "axios";

// export default function Home() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [l,setL] = useState(false);
//   const boxRef = useRef(null);
// const {store} = useStore()
// const {dispatch,messanger} = useMessage()
//   const toggleBox = () => setIsOpen(!isOpen);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (boxRef.current && !boxRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     }

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

  
//   const loadmessage = async (token) => {
//     try {
//       const {data} = await axios.get(
//         `${baseurl}/messanger/get/${'6731d7f1a9b25d829ccbe9ee'}/${1}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setL(true)
      
//       dispatch({type:'fetch-message',payload:data})
//     } catch (error) {
//       console.error("Error loading messages:", error);
//     }
//   };
  
  
//     useEffect(() => {
//       setTimeout(() => {
//         loadmessage(store.token);
//       }, 500);

//     }, []);  // Add store.token as a dependency
    
    
// console.log(messanger.message)
//   return (
//     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f3f4f6" }}>
//       {/* Toggle Button */}
//       <button onClick={()=> {toggleBox(),loadmessage()}} style={{ padding: "10px 20px", background: "blue", color: "white", borderRadius: "5px", cursor: "pointer" }}>
//         Toggle Box
//       </button>

//       {/* Box Container */}
//       {isOpen && (
//         <div
//           ref={boxRef}
//           style={{
//             position: "absolute",
//             top: "40%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             padding: "20px",
//             background: "white",
//             borderRadius: "10px",
//             boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//             width: "300px",
//             textAlign: "center"
//           }}
//         >
//           <h2>This is the Box</h2>
//           <p>Click outside to close.</p>
//            <InputForm/>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState } from 'react';

const suggestionsArray = [
  'Apple',
  'Banana',
  'Blueberry',
  'Cherry',
  'Grapes',
  'Orange',
  'Pineapple',
  'Strawberry',
  'Watermelon',
];

export default function AutocompleteInput() {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === '') {
      setFilteredSuggestions([]);
    } else {
      const lowerValue = value.toLowerCase();
      const filtered = suggestionsArray.filter((item) =>
        item.toLowerCase().includes(lowerValue)
      );
      setFilteredSuggestions(filtered);
    }
  };

  const handleSelect = (suggestion) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
  };

  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <strong key={index}>{part}</strong>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div style={{ width: '300px', margin: '20px auto', position: 'relative' }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        style={{ width: '100%', padding: '8px' }}
        placeholder="Type something..."
      />

      {filteredSuggestions.length > 0 && (
        <ul
          style={{
            listStyle: 'none',
            padding: '0',
            margin: '4px 0 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            position: 'absolute',
            width: '100%',
            backgroundColor: 'white',
            zIndex: 1,
          }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
              style={{
                padding: '8px',
                cursor: 'pointer',
              }}
            >
              {getHighlightedText(suggestion, inputValue)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
