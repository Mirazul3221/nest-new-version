import React, { useRef, useState } from "react";

const Card = ({children,id}) => {
  const profileRef = useRef(null);
  const windowHeight = window.innerHeight;
  const [position, setPosition] = useState("");
  const knowPosition = () => {
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      console.log(windowHeight / 2);
      console.log(rect.top);
      if (windowHeight / 2 > rect.top) {
        setPosition("bottom");
      } else setPosition("top");
    }
  };
  return (
 <div ref={profileRef} onMouseEnter={knowPosition} className="relative w-fit group">
    {children}
<div
  className={`absolute hidden group-hover:block z-10 p-6 bg-white -translate-x-[30%] rounded-md border 
    max-w-[50vw] w-max 
    ${position === "bottom" ? "top-full" : "bottom-full"}`}
>
  Lorem ipsum sdgdf hsghgfg dsgs hfhdfhf
</div>
</div>
  );
};

export default Card;
