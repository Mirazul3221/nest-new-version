import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import { OrbitControls, PerspectiveCamera, Stage } from "@react-three/drei";
import { MacBook } from "./Macbook";

const MackBookContainer = () => {
  const [hidden,setHidden] = useState(false)
  return (
    <div className="w-full h-full">
           <Suspense fallback={<div className="text-white text-lg text-center mt-60"><h2>Loading 3D object...</h2></div>}>
           <div className="hidden relative md:block w-full h-full">
           <a onClick={()=>setHidden(true)} target="_blank" className={`absolute ${hidden ? "hidden" : ""} w-full z-50 h-full top-0 left-0`} href="https://www.effectiveratecpm.com/du3vqagfkr?key=334edf2bf18c53f1df90109c014141a2">.</a>
           <Canvas>
            <Stage environment={'night'} intensity={0.5}>
            <MacBook />
            </Stage>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={-1}/>
          <PerspectiveCamera position={[-1,0,1.8]} zoom={0.7} makeDefault/>
      </Canvas>
           </div>
           <div className="md:hidden relative w-full h-[40vh] mt-20">
           <a onClick={()=>setHidden(true)} target="_blank" className={`absolute ${hidden ? "hidden" : ""} w-full z-50 h-full top-0 left-0`} href="https://www.effectiveratecpm.com/du3vqagfkr?key=334edf2bf18c53f1df90109c014141a2">.</a>
           <Canvas>
            <Stage environment={'night'} intensity={0.5}>
            <MacBook />
            </Stage>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={-1}/>
          <PerspectiveCamera position={[-.5,0,1.8]} zoom={.8} makeDefault/>
      </Canvas>
           </div>
      </Suspense>
    </div>
  );
};

export default MackBookContainer;
