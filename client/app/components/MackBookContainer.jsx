import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { MacBook } from "./Macbook";
import { OrbitControls, PerspectiveCamera, Stage } from "@react-three/drei";

const MackBookContainer = () => {
  return (
    <div className="w-full h-full">
           <Suspense fallback={<div className="text-white text-lg text-center mt-60"><h2>Loading 3D object...</h2></div>}>
      <Canvas>
            <Stage environment={'night'} intensity={0.5}>
            <MacBook />
            </Stage>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={-1}/>
          <PerspectiveCamera position={[-1,0,1.8]} zoom={0.7} makeDefault/>
      </Canvas>
      </Suspense>
    </div>
  );
};

export default MackBookContainer;
