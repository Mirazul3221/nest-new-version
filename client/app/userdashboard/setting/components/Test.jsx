import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function Home() {
  const [imgSrc, setImgSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [openMOdel, setOpenModel] = useState(false);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files?.length > 0) {
      const reader = new FileReader();
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(e.target.files[0]);
      setOpenModel(true)
    }
  };

  const onImageLoad = useCallback((img) => {
    imageRef.current = img;
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
  }, [completedCrop]);

  //   function bytesToKB(bytes) {
  //   if (typeof bytes !== "number" || isNaN(bytes) || bytes < 0) {
  //     throw new Error("Invalid value: Must be a non-negative number");
  //   }
  //   return bytes / 1024;
  // }
  // const fileLength = Math.floor(bytesToKB(preview.length || 1) + 3);

    //=======================================================
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
  return (
    <div className="w-1/2" style={{ padding: "2rem" }}>
      <h2>React Image Crop (Working Example)</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {/* //======================================MODEL====================================// */}
      <div
        className={`w-screen h-screen top-0 left-0 overflow-hidden bg-black/30 backdrop-blur-sm duration-100 ${
          openMOdel ? "scale-1" : "scale-0"
        } fixed top-0 left-0 z-50 flex justify-center items-center`}
      >
        <div className="max-h-[90vh] h-auto w-screen flex justify-center">
          <div
            style={{ width: resize + 90 }}
            className="hidden_scroll bg-white overflow-auto shadow-lg p-10"
          >
            <div className=" w-full flex justify-center items-center">
              <div>
                {/* ================================================= */}
                {imgSrc && (
                  <div>
                    <ReactCrop
                      crop={crop}
                      onChange={(newCrop) => setCrop(newCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={1}
                    >
                      <img src={imgSrc} onLoad={(e) => onImageLoad(e.target)} />
                    </ReactCrop>

                    <div style={{ marginTop: "20px" }}>
                      <h4>Cropped Preview:</h4>
                      <canvas
                        ref={canvasRef}
                        style={{
                          border: "1px solid black",
                          maxWidth: "100%",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center gap-4 mt-4">
              <div
                onClick={() => setOpenModel(false)}
                className="updateTitle w-1/2 cursor-pointer py-1 px-6 bg-gray-200 text-center rounded-md"
              >
                Cancel
              </div>
              {/* <div
                      onClick={() => {
                        if (fileLength > 30 && fileLength < 200) {
                          updateProfile();
                        }
                      }}
                      className={`updateTitle w-1/2 py-1 px-6 ${
                        loader
                          ? "bg-white text-gray-700 hover:bg-slate-100"
                          : "bg-violet-700 text-white cursor-pointer"
                      } hover:bg-violet-600 duration-200 text-center rounded-md`}
                    >
                      <div className="flex justify-center items-center gap-2">
                        <p>Update</p>{" "}
                        {loader ? (
                          <Image className="w-5" src={loaderImage} alt="loader" />
                        ) : null}
                      </div>
                    </div> */}
            </div>
            {/* <div
                    className={`mt-4 ${
                      fileLength > 30 && fileLength < 200
                        ? "text-green-800"
                        : fileLength == 3
                        ? "text-gray-600"
                        : "text-rose-600"
                    }`}
                  >
                    <h2>File size must be between 30.00kb to 200.00kb</h2>
                    {fileLength > 10 && (
                      <h3>
                        You resize your profile that contains {fileLength}
                        .00kb
                      </h3>
                    )}
                  </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
