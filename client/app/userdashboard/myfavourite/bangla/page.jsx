"use client"
import { baseurl } from '@/app/config';
import storeContext from '@/app/global/createContex';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Monitor from '../../components/examonitor/Monitor';
const Page = () => {
    const { store,dispatch } = useContext(storeContext);
    const [allQuestionId,setAllQuestionId] = useState()
    const [allQuestion,setAllQuestion] = useState([])
    const [loader,setLoader] = useState(false)
    useEffect(() => {
        const fetchFevourite =async () => {
            const manageAllid = []
            const myFav = {
              questionId: manageAllid,
              subject: "Bangla"
            }
              allQuestionId?.map((id)=>manageAllid.push(id?.question_id))
              console.log(allQuestionId)
           try {
               // setSaveQueLoader(true);
               setLoader(true)
               const { data } = await axios.get(
                 `${baseurl}/savequestions/all`,
                 {
                   headers: {
                     Authorization: `Bearer ${store.token}`,
                   },
                 }
               );
               // setSaveQueLoader(false);
               setAllQuestionId(data);
               const all = await axios.post(
                `${baseurl}/allquestionscollection/myallfavouritequestions`,myFav,
                {
                  headers: {
                    Authorization: `Bearer ${store.token}`,
                  },
                }
              );
              setAllQuestion(all.data)
              setLoader(false)
             } catch (error) {
               // setSaveQueLoader(false);
               setLoader(false)
               console.log(error);
               commonLogout(dispatch,error)
             }
        }
        fetchFevourite()
       }, [loader]);
    // const handleMyfavourite =async () =>{
    //     const manageAllid = []
    //     const myFav = {
    //       questionId: manageAllid,
    //       subject: "English"
    //     }
    //       allQuestionId?.map((id)=>manageAllid.push(id?.question_id))
    //       console.log(allQuestionId)
    //       try { 
    //           const all = await axios.post(
    //               `${baseurl}/allquestionscollection/myallfavouritequestions`,myFav,
    //               {
    //                 headers: {
    //                   Authorization: `Bearer ${store.token}`,
    //                 },
    //               }
    //             );
    //             setAllQuestion(all.data)
    //       } catch (error) {
              
    //       }
    //   }
    //  useEffect(() => {
    //     handleMyfavourite()
    //  }, []);
    console.log(allQuestion)
  return (
    <div>
        <Monitor questions={allQuestion} megaQuestions={allQuestion} isMegaPagination='on'/> 
    </div>
  )
}

export default Page

