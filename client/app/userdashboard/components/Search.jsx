"use client";
import React, { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { baseurl, viewurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { getHighlightedText } from "../resume/components/data";
import { BiSearch } from "react-icons/bi";
const Search = () => {
  const { store } = useStore();
  const searchParams = useSearchParams();
  const queryVal = searchParams.get("q");
  const searchPinVal = searchParams.get("pin");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [pinVal, setPinVal] = useState("");

  useEffect(() => {
    setPinVal(searchPinVal);
  }, []);

  useEffect(() => {
    if (queryVal) {
      setQuery(queryVal);
    }
  }, [queryVal]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length === 0) {
        setSuggestions([]);
        return;
      }

      try {
        const { data } = await axios.get(
          `${baseurl}/userquestions/suggestions?q=${encodeURIComponent(query)}`,
          {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          }
        );
        console.log(data);
        setSuggestions(data); // Expecting an array
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300); // debounce to avoid rapid API calls
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSearch = (value) => {
    const url = `${viewurl}/userdashboard/search?q=${value}&pin=${pinVal}`;
    window.location.href = url; // 👈 Opens in same tab
  };
  // const handleSearch = ()=>{
  //   dispatch({ type: "authenticUserSearch", paylod: { searchReasultFromAuthenticUser: search } });
  // }
  return (
    <div>
      <div className="flex relative items-center w-full">
        <input
          style={{
            boxShadow: `
      0 -2px 4px -4px rgba(0,0,0,0.15), /* top stronger */
      0 2px 4px rgba(0,0,0,0.05),        /* bottom light */
      2px 0 4px rgba(0,0,0,0.05),        /* right */
      -2px 0 4px rgba(0,0,0,0.05)        /* left */
    `,
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)} // delay ensures click can register
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="px-4 rounded-l-lg shadow-lg py-[7px] focus:py-[5px] focus:border-violet-700 w-full outline-none focus:border-l-2 focus:border-y-2"
          type="text"
          placeholder="Search Questions"
        />
        {query.length > 0 ? (
          <div
            onClick={() => handleSearch(query)}
            className="px-2 py-[6px] w-fit rounded-r-lg bg-violet-700 border-2 text-white cursor-pointer duration-00 border-violet-700 hover:border-fuchsia-600 hover:bg-violet-600"
          >
            <FiSearch size={22} />
          </div>
        ) : (
          <div className="px-2 py-[6px] w-fit rounded-r-lg bg-violet-700 border-2 text-white duration-00 border-violet-700">
            <FiSearch size={22} />
          </div>
        )}
        {isFocused && (
          <div className="absolute z-10 w-full top-10 py-2 overflow-x-hidden overflow-y-auto amx-h-[50vh] bg-white border border-t-0 rounded-b-md shadow">
            <div>
              <label>
                <input
                  type="radio"
                  name="choice"
                  value="option1"
                  checked={pinVal === "questions"}
                  onChange={() => setPinVal("questions")}
                />
                Option 1
              </label>

              <label style={{ marginLeft: "1rem" }}>
                <input
                  type="radio"
                  name="choice"
                  value="option2"
                  checked={pinVal === "users"}
                  onChange={() => setPinVal("users")}
                />
                Option 2
              </label>

              <p>Selected: {pinVal}</p>
            </div>

            {suggestions.length > 0 && (
              <ul>
                {suggestions.map((item, index) => (
                  <div className="flex items-center gap-1 hover:bg-gray-100 cursor-pointer px-4">
                    <BiSearch />
                    <li
                      key={index}
                      onClick={() => {
                        setIsFocused(false);
                        setQuery(item);
                        handleSearch(item);
                      }}
                    >
                      {getHighlightedText(item, query)}
                    </li>
                  </div>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
