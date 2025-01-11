import React from "react";
import { RxCross1 } from "react-icons/rx";
import { FaCloudUploadAlt } from "react-icons/fa";
import loderImage from "@/public/loader.gif"
import Image from "next/image";
const Gallery = ({ setShow, images,imageLoader }) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black/30 fixed z-50 top-0 left-0">
      <div className="w-10/12 h-11/12 bg-white rounded-md shadow-md p-5">
        <div className="flex justify-between items-center">
          <h2>Image Gallery</h2>{" "}
          <span
            className="hover:bg-rose-500 p-2 duration-100 hover:text-white"
            onClick={() => setShow(false)}
          >
            <RxCross1 />
          </span>
        </div>
        <label htmlFor="images">
          <div className="p-4 border-2 border-violet-700 flex justify-center items-center cursor-pointer border-dotted my-2">
            {imageLoader ? <Image className="w-10" src={loderImage} alt="Loader"/> : <FaCloudUploadAlt className="text-violet-700" size={40} />}
          </div>
        </label>
        <div className="overflow-auto max-h-[65vh] grid grid-cols-4 items-center gap-4">
           {images?.map((img,i)=>{
               return <img key={i} className="96" src={img.url} alt={img.url} />
           })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;///hi
