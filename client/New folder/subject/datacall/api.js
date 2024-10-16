// import storeContext from "@/app/global/createContex";
// import axios from "axios";
// import { useContext, useEffect, useState } from "react";

// const Bangla = ()=> {
    
// }

 
const filterValue = (val) => {
    const returnFilterValue = store.questionData?.filter((question) => {
      return question.subject === val;
    });
    return returnFilterValue;
  };