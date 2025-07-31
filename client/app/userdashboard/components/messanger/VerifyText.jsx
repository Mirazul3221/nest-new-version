// components/SmartText.js
import React from "react";

const urlRegex = /\bhttps?:\/\/[^\s<>"']+/gi;

const SmartText = ({userType, message, handleImageZoom }) => {
  const parts = message.message.content.split(urlRegex);
  const urls = message.message.content.match(urlRegex) || [];
  function getBaseUrl(rawUrl) {
    try {
      const fullUrl = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
      const res = new URL(fullUrl);
      return res.origin;
    } catch (e) {
      console.error("Invalid URL:", rawUrl);
      return null;
    }
  }
  const modifyUrl = getBaseUrl(urls[0]);
  if (urls.length === 0) {
    return  <div className={`${userType=="me" ? "bg-gradient-to-b from-violet-500 via-violet-500 to-pink-400 text-white" : "bg-gradient-to-b from-gray-200 to-gray-100 text-gray-700"} rounded-2xl px-4 py-2 break-words`}>
      {
        message.others && <img onClick={() => handleImageZoom(message.others)} className="w-full rounded-xl" src={ message.others} alt="image" />
      }
      <p>{message.message.content}</p>
    </div>;
  }

  const mixed = [];
  for (let i = 0; i < parts.length; i++) {
    mixed.push(<span key={`text-${i}`}>{parts[i]}</span>);
    if (urls[i]) {
      mixed.push(
        <a
          key={`url-${i}`}
          href={urls[i]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {urls[0].length > 100 ? urls[i].slice(0,100) + "..." : urls[i]}
        </a>
      );
    }
  }
  return (
    <div className="mb-1">
      <a  href={`${urls[0]}`} target="_blank">
        <p className={`${userType=="me" ? "bg-gradient-to-b from-violet-500 to-pink-200 text-white" : "bg-gradient-to-b from-gray-200 to-gray-100 text-black"} rounded-t-2xl px-4 pt-2`}>{mixed}</p>
        <div className="bg-gray-100 rounded-b-2xl text-gray-700 w-full font-semibold">
          {message?.others?.status == true && (
            <div className="full">
              {message.others.image && (
                <img className="w-full" src={message?.others.image} />
              )}
              {message?.others.ogTitle && (
                <h3 className="px-4 text-[10px] font-semibold">{message?.others.ogTitle}</h3>
              )}
              {message?.others.ogDescription && (
                <h3 className="px-4 pb-2 text-[10px]">
                  {message?.others.ogDescription}
                </h3>
              )}
              <p></p>
            </div>
          )}

          {message?.others?.status !== true && (
            <p className={`px-4 py-2${userType=="me" ? "" : "text-gray-700" }`}>
              <a target="_blank" href={`${urls[0]}`}>
                {modifyUrl}
              </a>
            </p>
          )}
        </div>
      </a>
    </div>
  );
};

export default SmartText;
