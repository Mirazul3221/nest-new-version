import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactCrop from "react-image-crop";
import axios from "axios";
import "react-image-crop/dist/ReactCrop.css";
import { commonLogout } from "./common";
import { useStore } from "@/app/global/DataProvider";
import { baseurl } from "@/app/config";
import { ImCamera } from "react-icons/im";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ProfileCropper({
  name = "unknown",
  profile,
  wm = 100,
  wl = 150
}) {
  const { store, dispatch } = useStore();
  const [loader, setLoader] = useState(false);
  const [imgSrc, setImgSrc] = useState([]);
  const [cropedImgURL, setCropedImgURL] = useState(null)
  const [crop, setCrop] = useState({
    unit: "%",
    x: 10,
    y: 10,
    width: 80,
    height: 80,
  });

  const [completedCrop, setCompletedCrop] = useState(null);
  const [cropedImageSize, setCropedImageSize] = useState(0);
  const [openMOdel, setOpenModel] = useState(false);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files?.length > 0) {
      const reader = new FileReader();
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(e.target.files[0]);
      setOpenModel(true);
    }
  };

  const onImageLoad = useCallback((img) => {
    imageRef.current = img;

    // Center crop in % units (for aspect ratio = 1)
    const width = 60; // 80% of the image width
    const height = 45; // 80% of the image height (same for 1:1 aspect)
    const x = (100 - width) / 2;
    const y = (100 - height) / 2;

    setCrop({
      unit: "%",
      x,
      y,
      width,
      height,
    });

    setCompletedCrop({
      unit: "%",
      x,
      y,
      width,
      height,
    });
  }, []);

  useEffect(() => {
    if (!completedCrop || !canvasRef.current || !imageRef.current) return;

    const image = imageRef.current;
    const canvas = canvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // 🔄 Get size every time crop updates
    canvas.toBlob((blob) => {
      if (blob) {
        const kbSize = Math.floor(blob.size / 1024);
        setCropedImageSize(kbSize);
      }
    });
  }, [completedCrop]);

  const uploadImageFromCanvas = async () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob(
      async (blob) => {
        if (!blob) {
          console.error("Canvas is empty or not ready");
          return;
        }

        if (cropedImageSize < 30 || cropedImageSize > 200) {
          return;
        }
        const formData = new FormData();
        formData.append("file", blob);
        try {
          setLoader(true);
         const {data} = await axios.patch(`${baseurl}/auth/updateProfile`, formData, {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          });
          setLoader(false);
          setOpenModel(false);
          setCropedImgURL(data)
        } catch (error) {
          console.log(error);
          setLoader(false);
          setOpenModel(false);
          commonLogout(dispatch, error);
        }
      },
      "image/jpeg",
      0.9
    );
  };

  const [resize, setResize] = useState(0);
  useEffect(() => {
    const r = window.innerWidth;
    if ((r >= 320 || r >= 375) && r < 425) {
      setResize(240);
    }
    if (r >= 425 && r < 768) {
      setResize(350);
    }
    if (r >= 768 && r < 1024) {
      setResize(350);
    }
    if (r >= 1024 && r < 1440) {
      setResize(350);
    }
    if (r >= 1440 && r < 2560) {
      setResize(350);
    }
    if (r >= 2560) {
      setResize(400);
    }
  }, []);

  const handleCancel = () => {
    setOpenModel(false);
    setImgSrc(null);
    setCompletedCrop(null);
    setCrop({ x: 0, y: 0, width: 100, height: 100 });

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear input
    }
  };

  const handleChechCropedSize = async () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) {
        console.error("Canvas is empty or not ready");
        return;
      }
      setCropedImageSize(Math.floor(blob.size / 1024));
      alert(Math.floor(blob.size / 1024));
    });
  };

  return (
    <div className="w-fit">
      <img src="" alt="" />
      <div className="md:w-[200px] w-[120px] md:mx-auto relative">
        {profile?.length > 0 ? (
            <label className="relative flex justify-center" htmlFor="Upload_image">
              <div className="relative group">
                <div className={`absolute w-[${wm}px] md:w-[${wl}px] h-full md:h-[${wl}px] p-0 left-0 rounded-full bg-black/50 duration-100 cursor-pointer flex justify-center items-center scale-0 group-hover:scale-100`}>
                  <ImCamera color="white" size={30} />
                </div>
                {cropedImgURL ? (
                    <img
                     className={`w-[${wm}px] shadow-md md:w-[${wl}px] h-[${wm}px] md:h-[${wl}px] border-4 border-white rounded-full`}
                      width={200}
                      height={200}
                      src={cropedImgURL}
                      alt={name}
                    />
                ) : (
                  <img
                   className={`w-[${wm}px] shadow-md md:w-[${wl}px] h-[${wm}px] md:h-[${wl}px] border-4 border-white rounded-full`}
                    src={profile}
                    alt={name}
                  />
                )}
              </div>
            </label>
        ) : (
          <div className={`absolute md:-translate-y-[45%] w-[${wm}px] h-[${wm}px] bg-white left-0 border-4 border-white rounded-full flex justify-center items-center overflow-hidden`}>

            Loading...
          </div>
        )}
      </div>
      <input className="hidden" id="Upload_image"
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Modal */}
      <div
        className={`w-screen h-screen top-0 left-0 overflow-hidden bg-black/30 backdrop-blur-sm duration-100 ${
          openMOdel ? "scale-1" : "scale-0"
        } fixed top-0 left-0 z-50 flex justify-center items-center`}
      >
        <div className="max-h-[90vh] h-auto w-screen flex justify-center">
          <div
            style={{ width: resize + 90 }}
            className="bg-white overflow-auto shadow-lg p-5 rounded-xl"
          >
            <div className="w-full flex justify-center items-center">
              <div>
                {imgSrc && (
                  <div className="relative">
                    <ReactCrop
                      crop={crop}
                      onChange={(newCrop) => setCrop(newCrop)}
                      onComplete={(c) => {
                        setCompletedCrop(c);
                      }}
                      aspect={1}
                    >
                      <img src={imgSrc} onLoad={(e) => onImageLoad(e.target)} />
                    </ReactCrop>
                    <canvas
                      className="absolute top-0 right-0 z-20"
                      ref={canvasRef}
                      style={{
                        maxWidth: "50px",
                        maxHeight: "50px",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center gap-4 mt-4">
              <div
                onClick={handleCancel}
                className="updateTitle w-1/2 cursor-pointer py-1 px-6 bg-gray-200 text-center rounded-md"
              >
                Cancel
              </div>
              <div
                onClick={() => {
                  if (cropedImageSize > 0 && cropedImageSize < 200) {
                   !loader && uploadImageFromCanvas();
                  }
                }}
                className={`updateTitle w-1/2 py-1 px-6 ${
                  loader
                    ? "bg-gray-200 text-gray-700 hover:bg-slate-100"
                    : "bg-violet-700 text-white cursor-pointer"
                } duration-200 text-center rounded-md`}
              >
                <div className="flex justify-center items-center gap-2">
                  {
                    loader ? <h2 className="mx-auto flex items-center gap-2"><AiOutlineLoading3Quarters className="animate-spin text-gray-700 text-center" size={20} /> Processing...</h2> :   <p>Update</p>
                  }
                 
                </div>
              </div>
            </div>
            <div
              className={`mt-4 ${
                cropedImageSize > 30 && cropedImageSize < 200
                  ? "text-green-800"
                  : cropedImageSize == 3
                  ? "text-gray-600"
                  : "text-rose-600"
              }`}
            >
              <h2>File size must be between 30.00kb to 200.00kb</h2>
              <h3>
                You resize your profile that contains{" "}
                {cropedImageSize > 10 ? cropedImageSize : "less than 10.00kb"}
                .00kb
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
