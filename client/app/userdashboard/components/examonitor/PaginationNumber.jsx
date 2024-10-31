import React, { useState } from 'react';

const PaginationNumber = ({ totalPost, postPerPage, getPageNumber,scrollToTop }) => {
  const [activePage, setActivePage] = useState(1);
  const pageIndex = [];
  for (let i = 1; i <= Math.ceil(totalPost/postPerPage); i++) {
    pageIndex.push(i);
  }
  const handleClick = item => {
    getPageNumber(item);
    setActivePage(item);
  };//

  console.log(postPerPage)
  return (
    <div>
      <ul className="flex flex-wrap gap-2 justify-center items-center">
        {pageIndex.map((item,i) => {
          return (
            <li key={i}
              onClick={() => {
                handleClick(item);
                scrollToTop();
              }}
              className={`md:w-10 md:h-10 ${postPerPage == '10' ? "w-5 h-5 -ml-1" : postPerPage == '15' ? "w-6 h-6 -ml-1" : "w-8 h-8"} rounded-full border border-fuchsia-400 ${
                activePage === item ? 'text-white bg-violet-600/70' : 'bg-white/70'
              }  flex cursor-pointer justify-center items-center border-[1px]`}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PaginationNumber;
