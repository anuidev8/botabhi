import {
  ContactShadows,
  Environment,
  OrbitControls,
  Sky,
  Stage,
  useGLTF
} from "@react-three/drei";
import { useControls } from "leva";
/* import { Avatar } from "./Avatar"; */
import * as THREE from "three";
import { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export const Experience = () => {
   const gltf = useLoader(
    DRACOLoader,
    '/models/room.glb'
  )
  const { animation } = useControls({
    animation: {
      value: "Standing",
      options: [ "Greeting", "Standing"],
    },
  });
  const backgroundTexture = new THREE.TextureLoader().load('/enviroment.gif');
  return (
    /* [-0.5, 1, 2]  */
    <Canvas camera={{ position: [-0.5, 1, 2] }}
  /*   style={{
       backgroundImage: 'url(/sunsetbg.gif)',
       width: '100vw',
       height: '100vh',
    }} */

      >
     {/* position-y={-1.4} position-x={-.5} */}
      <group position-y={-1.4} position-x={-.5}>
      
        {/*  <ambientLight intensity={.5} />
         <ambientLight intensity={0.1} />
         <directionalLight intensity={0.1} /> */}
    
         {/* <ContactShadows
         position={-.5}
          opacity={0.42}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
        /> */}
       {/*  <Environment   files="/envbg.hdr" background  size={0.5}  />   */}
     {/*  <Environment   files="/envbg.hdr" background    />    */}
{/* <Environment  preset="forest"   />   */}
{/* <Environment   files="/envbg.hdr" background    />  */}

{/* <Environment   files="/envbg.hdr" background    />  */}
        {/* We can hidden this */}
      {/*  <directionalLight position={[7.3, 10, 20]} />  
         <Avatar  animation={animation} />
       <primitive object={gltf.scene} position={[0, 1, 0]} />   
         <OrbitControls /> */}
        
      
        {/* {animation === "Typing" && (
          <mesh scale={[0.8, 0.5, 0.8]} position-y={0.25}>
            <boxGeometry />
            <meshStandardMaterial color="white" />
          </mesh>
        )} */}

      {/*   <mesh scale={9} rotation-x={-Math.PI * 0.5} >
          <planeGeometry />
          <meshStandardMaterial map={backgroundTexture} />
        </mesh> */}
       
      </group>
      <group>
      <directionalLight position={[7.3, 10, 20]} />
       <primitive object={gltf.scene} position={[0, 1, 0]} />   
         <OrbitControls />
      </group>
    </Canvas>
  );
};
