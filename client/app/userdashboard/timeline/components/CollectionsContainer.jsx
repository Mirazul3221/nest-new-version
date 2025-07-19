import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const CollectionsContainer = ({questionId, setOpenCollection }) => {
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const [collectionList, setCollectionList] = useState([]);
  const [val, setVal] = useState("");
  const { store } = useStore();
  const saveCollection = async () => {
    try {
      setInitLoading(true);
      const { data } = await axios.get(
        `${baseurl}/saveuserquestionincollections/get`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setCollectionList(data);
      setInitLoading(false);
    } catch (error) {
      setInitLoading(false);
    }
  };

  useEffect(() => {
    saveCollection();
  }, []);

  const handleCreate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${baseurl}/saveuserquestionincollections/create`,
        { collectionName: val },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setVal("");
setCollectionList((p) => (
  [data, ...p]
));

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

const [saveEle,setSaveEle] = useState(null)


  const handleSaveQuestion = async()=> {
       setLoading(true);
    try {
         const { data } = await axios.post(
        `${baseurl}/saveuserquestionincollections/update`,
        { collectionId: saveEle,questionId},
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );

      if(data.status == 500){
        toast.error(data.msg)
      } else {
        toast.success(data.msg)
      }
      setSaveEle(null)
         setLoading(false);
    } catch (error) {
        setLoading(false);
    }
    
  }


  const redirectToNewWindow = ({name,id})=> {
    window.open(
  `/collection?collection=${name}&&id=${id}`,
  '_blank', // must be '_blank' to allow sizing
  'width=600,height=800,left=200,top=100'
);
  }

  return (
    <div className="w-[100dvw] h-[100dvh] bg-black/50 fixed flex justify-center items-center top-0 left-0 z-50">
      <ToastContainer/>
      <div
        className="w-fit absolute top-3 right-5 bg-white cursor-pointer"
        onClick={() => setOpenCollection(false)}
      >
        Close
      </div>
      <div className="bg-white p-4 rounded-2xl border">
        <div className="">
          <p className="font-semibold">➕ Add a new collection</p>
          <div className="my-2">
            <input
              className="py-1 px-4 border"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              type="text"
              placeholder="Start Typing.."
            />
          </div>
          {val && (
            <>
              {
                <div className="px-2 text-sm text-white w-fit mt-2 ml-auto bg-violet-600 cursor-pointer">
                  {!loading ? (
                    <div className="w-full h-full" onClick={handleCreate}>
                      Create
                    </div>
                  ) : (
                    <div className="">Loading...</div>
                  )}
                </div>
              }
            </>
          )}
        </div>

        {
          initLoading && <div className='mt-2 ml-auto'>Loading...</div>
}
        <div className="max-h-[20vh] max-w-full pr-2 overflow-auto">
        {collectionList &&
          collectionList.map((Cl, i) => {
            return (
              <div key={i} className="flex items-center justify-between gap-5">
                <p onClick={()=>redirectToNewWindow({name:Cl.collectionName,id:Cl._id})} className="cursor-pointer">📁 {Cl.collectionName}</p>
                <label>
                  <input
                    type="radio"
                    name="choice"
                    value="Option 1"
                    onClick={()=>setSaveEle(Cl._id)}
                  />
                </label>
              </div>
            );
          })}
        </div>

<div className="pt-2"></div>
          {saveEle && (
            <>
              {
                <div className="px-2 mt-2 text-sm text-white w-fit ml-auto bg-violet-600 cursor-pointer rounded-md">
                  {!loading ? (
                    <div className="w-full h-full" onClick={handleSaveQuestion}>
                      Save
                    </div>
                  ) : (
                    <div className="">Loading...</div>
                  )}
                </div>
              }
            </>
          )}
      </div>
    </div>
  );
};

export default CollectionsContainer;
