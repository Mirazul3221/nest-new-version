import storeContext from "@/app/global/createContex";
import React, { useContext, useEffect, useState } from "react";
import loader from "@/public/wating.gif";
import Image from "next/image";
import { baseurl } from "@/app/config";
import axios from "axios";
import { RiEditBoxLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import EditEnglish from "./update/English";
import { toast, ToastContainer } from "react-toastify";
import { commonLogout } from "@/app/userdashboard/components/common";

const English = () => {
  const { store,dispatch } = useContext(storeContext);
  const [data, setData] = useState(null);
  const [singleData, setSingleData] = useState(null);
  const [switcher, setSwitcher] = useState(true);
  const [id, setId] = useState(null);
  console.log(id);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${baseurl}/allquestionscollection/english`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });

        setData(data);
      } catch (error) {
        console.log(error);
        commonLogout(dispatch)
      }
    }
    fetchData();
  }, [store.token]);
  useEffect(() => {
    async function fetchData() {
      try {
        setSwitcher(true)
        const { data } = await axios.get(`${baseurl}/allquestionscollection/english/find/${id}`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });//
        setSingleData(data)
        setSwitcher(false)
      } catch (error) {
        // setSwitcher(true)
        console.log(error);
        commonLogout(dispatch)
      }
    }
    if (id !== null) {
        fetchData();
    }
  }, [store.token,id]);
   
 const deleteQuestion =async (id)=>{
  const hasDelete = confirm("Do you want to delete this question ?")
  if (hasDelete) {
    try {
    setSwitcher(true)
    const { data } = await axios.get(`${baseurl}/allquestionscollection/english/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    });//
    setSingleData(data)
    setSwitcher(false)
    toast(data)
  } catch (error) {
    // setSwitcher(true)
    console.log(error);
    commonLogout(dispatch)
  }
  } 
 }

  return (
    <div>
        <ToastContainer />
      {data?.length > 0 ? (
        <div className="">
          {switcher && (
            <div>
              {data?.map((question,i) => {
                return (
                  <div key={i} className="px-8 py-2 my-2 border-t-2 flex gap-2">
                    <h2 className="w-2/12">{question.topic}</h2>
                    <h2 className="w-7/12">{question.question}</h2>
                    <div className="w-3/12 flex justify-center">
                      <span
                        onClick={() => {
                          setId(question._id);
                        }}
                        className="px-4 cursor-pointer py-1 bg-violet-700 h-fit rounded-l-md text-white"
                      >
                        <RiEditBoxLine size={20} />
                      </span>
                      <span onClick={()=>deleteQuestion(question._id)} className="px-4 cursor-pointer py-1 bg-rose-500 h-fit rounded-r-md text-white">
                        <MdDeleteOutline size={20} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {switcher === false && <div><EditEnglish setSwitcher={setSwitcher}  editQuestion={singleData}/></div>}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <Image className="w-96 h-96" src={loader} alt="loader" />
        </div>
      )}
    </div>
  );
};

export default English;
