// utils/cropImage.js
export const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
      image.src = url;
    });

  const image = await createImage(imageSrc);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const safeArea = Math.max(image.width, image.height) * 2;

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(
    image,
    (safeArea - image.width) / 2,
    (safeArea - image.height) / 2
  );

  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // Resize canvas to match crop area
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(
    data,
    Math.round(-pixelCrop.x),
    Math.round(-pixelCrop.y)
  );

  return canvas;
};
