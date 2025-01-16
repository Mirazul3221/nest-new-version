import React from "react";
import { Canvas } from "@react-three/fiber";
const ReactThree = () => {
  return (
    <div>
       <Canvas>
      {/* Add your 3D scene here */}
      <ambientLight />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </Canvas>
    </div>
  );
};

export default ReactThree;
