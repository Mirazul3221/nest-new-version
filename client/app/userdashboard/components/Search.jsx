"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { baseurl, viewurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { getHighlightedText } from "../resume/components/data";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import { commonLogout } from "./common";
const Search = () => {
  const { store ,dispatch} = useStore();
  const searchParams = useSearchParams();
  const queryVal = searchParams.get("q");
  const searchPinVal = searchParams.get("pin");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [pinVal, setPinVal] = useState("question");
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    if (searchPinVal) setPinVal(searchPinVal);
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
      setFetchLoading(true);
      try {
        const qUrl = `${baseurl}/userquestions/suggestions?q=${encodeURIComponent(
          query
        )}`;
        const uUrl = `${baseurl}/auth/publicuser/find/${decodeURIComponent(
          query
        )}`;
        const { data } = await axios.get(pinVal == "question" ? qUrl : uUrl, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });
        setFetchLoading(false);
        setSuggestions(data); // Expecting an array
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setFetchLoading(false);
        commonLogout(dispatch,error)
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300); // debounce to avoid rapid API calls
    return () => clearTimeout(debounce);
  }, [query, pinVal]);

  const handleSearch = (value) => {
    const url = `${viewurl}/userdashboard/search?q=${value}&pin=${pinVal}`;
    window.location.href = url; // 👈 Opens in same tab
  };
  // const handleSearch = ()=>{
  //   dispatch({ type: "authenticUserSearch", paylod: { searchReasultFromAuthenticUser: search } });
  // }

  const [isOpenSearchBox, setIsOpenSearchBox] = useState();
  const searchBoxContainerRef = useRef(null);
  const toggleSearch = () => setIsOpenSearchBox(!isOpenSearchBox);
  useEffect(() => {
    const handleSearchBox = (e) => {
      if (
        searchBoxContainerRef.current &&
        !searchBoxContainerRef.current.contains(e.target)
      ) {
        setIsOpenSearchBox(false);
      }
    };

    if (isOpenSearchBox) {
      document.addEventListener("click", handleSearchBox);
    } else {
      document.removeEventListener("click", handleSearchBox);
    }
    return () => {
      document.removeEventListener("click", handleSearchBox);
    };
  }, [isOpenSearchBox]);

  return (
      <div
        ref={searchBoxContainerRef}
        className="flex relative items-center w-full"
      >
        <input
          style={{
            boxShadow: `
      0 -2px 4px -4px rgba(0,0,0,0.15), /* top stronger */
      0 2px 4px rgba(0,0,0,0.05),        /* bottom light */
      2px 0 4px rgba(0,0,0,0.05),        /* right */
      -2px 0 4px rgba(0,0,0,0.05)        /* left */
    `,
          }}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpenSearchBox(true)}
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
        {isOpenSearchBox && (
          <div className="absolute z-10 w-full top-10 py-2 bg-white border border-t-0 rounded-b-md shadow">
            <div className="pl-2 py-1 border-b">
              <label>
                <input
                  type="radio"
                  name="choice"
                  value="option1"
                  checked={pinVal === "question"}
                  onChange={() => setPinVal("question")}
                />
                <span className="ml-1">Question</span>
              </label>

              <label style={{ marginLeft: "1rem" }}>
                <input
                  type="radio"
                  name="choice"
                  value="option2"
                  checked={pinVal === "user"}
                  onChange={() => setPinVal("user")}
                />
                <span className="ml-1"> User</span>
              </label>
            </div>

            {suggestions.length > 0 && (
              <div className="overflow-x-hidden overflow-y-auto max-h-[40vh]">
                <ul>
                  {suggestions.map((item, index) => {
                    if (pinVal == "question") {
                      return (
                        <div className="flex gap-1 hover:bg-gray-100 cursor-pointer px-4 bg-rose-50/50">
                          <BiSearch />
                          <li
                            key={index}
                            onClick={() => {
                              setIsOpenSearchBox(false);
                              setQuery(item);
                              handleSearch(item);
                            }}
                          >
                            {getHighlightedText(item, query)}
                          </li>
                        </div>
                      );
                    }
                    if (pinVal == "user") {
                      return (
                        <div className="md:flex gap-4">
                          <div className="px-4 py-2 bg-white md:w-1/2">
                            <Link
                              href={`/userdashboard/searchusers/${item?._id}`}
                            >
                              <div className="flex w-fit items-center gap-2">
                                <img
                                  className="w-10 h-10  rounded-full border"
                                  src={`${item.profile}`}
                                />
                                <h2 className="text-[16px] text-gray-700">
                                  {getHighlightedText(item.name, query)}
                                </h2>
                              </div>
                            </Link>
                          </div>
                          <div className="w-1/2 hidden md:block"></div>
                        </div>
                      );
                    }
                  })}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
  );
};

export default Search;
