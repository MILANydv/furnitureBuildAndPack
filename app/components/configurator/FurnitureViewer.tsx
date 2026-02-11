'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Box } from './Box';

interface FurnitureViewerProps {
  configuration: {
    length?: number;
    width?: number;
    height?: number;
    material?: string;
    finish?: string;
  };
}

export function FurnitureViewer({ configuration }: FurnitureViewerProps) {
  const length = configuration.length || 100;
  const width = configuration.width || 100;
  const height = configuration.height || 80;

  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[200, 200, 200]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Box
          args={[length, height, width]}
          material={configuration.material || 'wood'}
          finish={configuration.finish || 'natural'}
        />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>
    </div>
  );
}
