import React, { useContext, useState } from "react";
import { FiSearch } from "react-icons/fi";
import storeContext from "@/app/global/createContex";
const Search = () => {
  const [search, setSearch] = useState("");
  const {dispatch} = useContext(storeContext);
  const handleSearch = ()=>{
    dispatch({ type: "authenticUserSearch", paylod: { searchReasultFromAuthenticUser: search } });
  }
  return (
    <div className="bg-white">
      <div className="flex items-center w-full">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="px-4 rounded-l-lg py-[5px] focus:border-fuchsia-500 w-full outline-none border-l-2 border-y-2 border-fuchsia-300"
          type="text"
          placeholder="Search Questions"
        />
        {search.length > 0 ? (
            <div onClick={handleSearch} className="px-2 py-[6px] w-fit rounded-r-lg bg-fuchsia-500 border-2 text-white cursor-pointer duration-00 border-fuchsia-500 hover:border-fuchsia-600 hover:bg-fuchsia-600">
              <a href={`/userdashboard/${search}`}>
                <FiSearch size={22} />
              </a>
            </div>

        ) : (
          <div className="px-2 py-[6px] w-fit rounded-r-lg bg-fuchsia-500 border-2 text-white duration-00 border-fuchsia-500">
            <FiSearch size={22} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
