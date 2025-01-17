import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
const ReactThree = () => {
  return (
    <div>
       <Canvas>
  <mesh>
  <boxGeometry args={[2, 2, 2]} />
  <ambientLight intensity={0.1} />
  <directionalLight color="red" position={[0, 0, 5]} />
    <meshStandardMaterial />
    <OrbitControls/>
  </mesh>
</Canvas>

    </div>
  );
};

export default ReactThree;
