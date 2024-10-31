import React, { useContext, useState } from "react";
import storeContext from "../global/createContex";
import { usePathname ,useRouter} from "next/navigation";
import { FiSearch } from "react-icons/fi";
const Search = ({getSearchValue}) => {
    const [search,setSearch] = useState('')
    const {dispatch} = useContext(storeContext)
    const router = useRouter()
    const path = usePathname()
    const handleNavigate = ()=>{
      if (path !== "/") {
        getSearchValue(search)
      }
      router.push("/localuser/questions")  
    }
   const handleSearch = ()=>{
     if (search) {
      dispatch({
        type:'userSearch',
        payload : search
      })
      handleNavigate()
     }
   }
  return (
    <div className="flex items-center w-full">
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="px-4 rounded-l-lg py-[5px] focus:border-violet-700 w-full outline-none border-l-2 border-y-2 border-violet-500"
        type="text"
        placeholder="Search Questions"
      />
      <div
        onClick={handleSearch}
        className="px-2 py-[6px] w-fit rounded-r-lg bg-violet-700 border-2 text-white cursor-pointer duration-00 border-violet-700 hover:border-fuchsia-600 hover:bg-violet-600"
      >
        <FiSearch size={22}/>
      </div>
    </div>
  );
};

export default Search;

