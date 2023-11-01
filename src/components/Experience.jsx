import {
  OrbitControls,
  useGLTF
} from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Avatar } from "./Avatar";
export const Experience = () => {
  const { scene } = useGLTF('/models/room-2.glb');
  const { animation } = useControls({
    animation: {
      value: "Standing",
      options: ["Greeting", "Standing"],
    },
  });
  const backgroundTexture = new THREE.TextureLoader().load('/enviroment.gif');

  return (
    <Canvas camera={{ position: [-0.5, 1, 2] }}>
      <group position-y={-1.4} position-x={-.5}>
        {/* Your other code */}
      </group>
      <group position-y={-2} position-x={-3}>
        <directionalLight position={[7.3, 10, 20]} />
        <Avatar  position-y={1}  position-x={2}  animation={animation} />
        <primitive object={scene} position={[0, 1, 0]} /> 
        <OrbitControls />
      </group>
    </Canvas>
  );
};
