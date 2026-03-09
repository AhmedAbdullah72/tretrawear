import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center, Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

function FloatingShape({ position, scale, speed, distort }: { 
  position: [number, number, number]; 
  scale: number; 
  speed: number;
  distort: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#a80f2d"
          roughness={0.2}
          metalness={0.8}
          distort={distort}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function AnimatedText() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={1.2}
          height={0.3}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          TRETRA
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.3}
            metalness={0.7}
          />
        </Text3D>
      </Center>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#a80f2d" />
      
      <FloatingShape position={[-4, 2, -2]} scale={0.8} speed={1.5} distort={0.4} />
      <FloatingShape position={[4, -1.5, -3]} scale={1.2} speed={1} distort={0.3} />
      <FloatingShape position={[-3, -2, -1]} scale={0.5} speed={2} distort={0.5} />
      <FloatingShape position={[3.5, 2.5, -2]} scale={0.6} speed={1.8} distort={0.35} />
      <FloatingShape position={[0, 3, -4]} scale={0.9} speed={1.2} distort={0.45} />
      
      <AnimatedText />
      
      <Environment preset="city" />
    </>
  );
}

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [isExiting, setIsExiting] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isExiting) {
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(exitTimer);
    }
  }, [isExiting, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] bg-foreground"
        >
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            className="w-full h-full"
          >
            <Scene />
          </Canvas>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/60">
              Wear Your Identity
            </p>
            <motion.div
              animate={{ scaleX: [0, 1] }}
              transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
              className="mt-4 h-px w-32 bg-primary origin-left"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
