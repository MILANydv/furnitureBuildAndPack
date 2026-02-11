'use client';

import { useState } from 'react';
import { Box, RotateCw, ZoomIn, ZoomOut, Move3d } from 'lucide-react';
import { Configuration } from '@/types';

interface Product3DPreviewProps {
  productName: string;
  configuration: Configuration | null;
  dimensions?: { length: number; width: number; height: number } | null;
}

export function Product3DPreview({ 
  productName, 
  configuration,
  dimensions 
}: Product3DPreviewProps) {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isAutoRotating, setIsAutoRotating] = useState(false);

  // Placeholder for actual 3D rendering
  // In production, this would use Three.js, React Three Fiber, or similar
  
  return (
    <div className="bg-gradient-to-br from-stone-100 to-stone-200 rounded-xl overflow-hidden">
      {/* 3D Viewport */}
      <div className="relative aspect-square flex items-center justify-center">
        {/* Placeholder 3D Representation */}
        <div 
          className="relative transition-transform duration-300"
          style={{ 
            transform: `rotateY(${rotation}deg) scale(${zoom})`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Simplified 3D Box Representation */}
          <div 
            className="relative bg-amber-200 border-2 border-amber-300 shadow-2xl"
            style={{
              width: `${Math.min(dimensions?.width || 100, 200)}px`,
              height: `${Math.min(dimensions?.height || 100, 200)}px`,
            }}
          >
            {/* Front face */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-amber-400 flex items-center justify-center">
              <div className="text-center">
                <Box className="w-12 h-12 text-amber-700 mx-auto mb-2" />
                <p className="text-xs text-amber-800 font-medium">3D Preview</p>
              </div>
            </div>
            
            {/* Configuration display */}
            {configuration && (
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-sm font-medium text-stone-800">{productName}</p>
                  <div className="text-xs text-stone-600 mt-1 space-x-2">
                    {configuration.frame && <span>{configuration.frame}</span>}
                    {configuration.legType && <span>• {configuration.legType}</span>}
                    {configuration.finish && <span>• {configuration.finish}</span>}
                  </div>
                  {dimensions && (
                    <p className="text-xs text-stone-500 mt-1">
                      {dimensions.length} × {dimensions.width} × {dimensions.height} cm
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3D Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full">
          <Move3d className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-medium text-stone-700">3D View</span>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white border-t border-stone-200 p-4">
        <div className="flex items-center justify-between">
          {/* Rotation Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRotation(prev => prev - 45)}
              className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <RotateCw className="w-5 h-5 text-stone-600 -scale-x-100" />
            </button>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-24 accent-amber-600"
            />
            <button
              onClick={() => setRotation(prev => prev + 45)}
              className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <RotateCw className="w-5 h-5 text-stone-600" />
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
              className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <ZoomOut className="w-5 h-5 text-stone-600" />
            </button>
            <span className="text-sm text-stone-600 w-12 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}
              className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <ZoomIn className="w-5 h-5 text-stone-600" />
            </button>
          </div>

          {/* Auto Rotate */}
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isAutoRotating 
                ? 'bg-amber-100 text-amber-800' 
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {isAutoRotating ? 'Stop' : 'Auto Rotate'}
          </button>
        </div>
      </div>

      {/* Note for actual 3D integration */}
      <div className="bg-blue-50 border-t border-blue-100 p-3">
        <p className="text-xs text-blue-700 text-center">
          💡 For production: Integrate with Three.js, React Three Fiber, or Model-viewer for real 3D models
        </p>
      </div>
    </div>
  );
}
