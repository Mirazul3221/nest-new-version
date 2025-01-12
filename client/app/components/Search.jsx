import React, { useContext, useState } from "react";
import storeContext from "../global/createContex";
import { usePathname ,useRouter} from "next/navigation";
import { FiSearch } from "react-icons/fi";
const Search = ({py=2,px=4,r='lg',icone=24}) => {
    const [search,setSearch] = useState('')
    const {dispatch} = useContext(storeContext)
    const router = useRouter()
    const path = usePathname()
    const handleNavigate = ()=>{
      // if (path !== "/") {
      //   getSearchValue(search)
      // }
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
        className={`px-${px} rounded-l-${r} py-${py} w-full outline-none border-l-2 border-y-2`}
        type="text"
        placeholder="Search Questions"
      />
      <div
        onClick={handleSearch}
        className={`px-${px} py-${py} w-fit rounded-r-${r} bg-gray-800 border-2 text-white cursor-pointer duration-00 hover:bg-gray-900`}
      >
        <FiSearch size={icone}/>
      </div>
    </div>
  );
};

export default Search;

