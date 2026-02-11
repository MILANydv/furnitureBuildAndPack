'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface BoxProps {
  args: [number, number, number];
  material?: string;
  finish?: string;
}

export function Box({ args, material = 'wood', finish = 'natural' }: BoxProps) {
  const meshRef = useRef<Mesh>(null);

  // Create material based on configuration
  const getMaterial = () => {
    const colorMap: Record<string, string> = {
      wood: '#8B4513',
      metal: '#C0C0C0',
      plastic: '#FFFFFF',
      leather: '#654321',
    };

    const finishMap: Record<string, number> = {
      natural: 0.3,
      glossy: 0.9,
      matte: 0.1,
    };

    const color = colorMap[material] || '#8B4513';
    const roughness = finishMap[finish] || 0.3;

    return new THREE.MeshStandardMaterial({
      color: color,
      roughness: roughness,
      metalness: material === 'metal' ? 0.8 : 0.1,
    });
  };

  useFrame(() => {
    if (meshRef.current) {
      // Optional: Add subtle rotation
      // meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, args[1] / 2, 0]}>
      <boxGeometry args={args} />
      <primitive object={getMaterial()} attach="material" />
    </mesh>
  );
}
