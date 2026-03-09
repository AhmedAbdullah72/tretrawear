import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import heroImage from "@/assets/hero-streetwear.jpg";

function Particles({ count = 50 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
      sizes[i] = Math.random() * 0.5 + 0.1;
    }
    
    return { positions, sizes };
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#a80f2d"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingOrb({ position, scale, speed }: { 
  position: [number, number, number]; 
  scale: number; 
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#a80f2d"
          roughness={0.3}
          metalness={0.7}
          distort={0.3}
          speed={1.5}
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#a80f2d" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ffffff" />
      
      <Particles count={80} />
      
      <FloatingOrb position={[-6, 3, -4]} scale={1.5} speed={1} />
      <FloatingOrb position={[7, -2, -6]} scale={2} speed={0.8} />
      <FloatingOrb position={[-4, -4, -3]} scale={0.8} speed={1.5} />
      <FloatingOrb position={[5, 4, -5]} scale={1.2} speed={1.2} />
    </>
  );
}

export const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.55, 0.85]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-foreground">
      <motion.img
        src={heroImage}
        alt="TRETRA Wear streetwear collection"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ y: imageY, scale: imageScale }}
      />
      <motion.div
        className="absolute inset-0 bg-foreground"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-foreground/10" />

      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <HeroScene />
        </Canvas>
      </div>

      <div className="relative container z-10">
        <motion.div className="max-w-2xl pt-20 md:pt-24" style={{ y: textY }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-primary/20 backdrop-blur-sm border border-primary/30 px-4 py-1.5 rounded-full mb-6"
          >
            <span className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground font-semibold">
              New Collection 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-6xl md:text-8xl lg:text-9xl text-primary-foreground leading-[0.85] mb-6"
          >
            WEAR<br />
            YOUR<br />
            <span className="text-primary">IDENTITY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-body text-base md:text-lg text-primary-foreground/70 max-w-md mb-8"
          >
            Bold streetwear engineered for those who refuse to blend in.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading text-lg tracking-wider uppercase px-8 py-4 rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25"
            >
              Shop Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground font-heading text-lg tracking-wider uppercase px-8 py-4 rounded-lg hover:border-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300 backdrop-blur-sm"
            >
              Our Story
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-primary-foreground/50 to-transparent"
        />
      </motion.div>
    </section>
  );
};
