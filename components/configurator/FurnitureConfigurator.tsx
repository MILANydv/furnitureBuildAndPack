'use client';

import { useState, useMemo } from 'react';
import { Product, Configuration, Dimensions } from '@/types';
import { formatPrice } from '@/lib/utils/currency';

interface FurnitureConfiguratorProps {
  product: Product;
  onConfigurationChange: (config: Configuration, price: number) => void;
}

export function FurnitureConfigurator({ product, onConfigurationChange }: FurnitureConfiguratorProps) {
  const parts = product.configurableParts;
  if (!parts) return null;

  const [frame, setFrame] = useState(parts.frame[0]?.name || '');
  const [legType, setLegType] = useState(parts.legType[0]?.name || '');
  const [tabletopType, setTabletopType] = useState(parts.tabletopType?.[0]?.name || '');
  const [finish, setFinish] = useState(parts.finish[0]?.name || '');
  const [dimensions, setDimensions] = useState<Dimensions>({
    length: product.dimensions?.length || 100,
    width: product.dimensions?.width || 50,
    height: product.dimensions?.height || 75,
    unit: 'cm',
  });

  const calculatedPrice = useMemo(() => {
    let price = product.basePrice;

    const frameOption = parts.frame.find(f => f.name === frame);
    const legOption = parts.legType.find(l => l.name === legType);
    const topOption = parts.tabletopType?.find(t => t.name === tabletopType);
    const finishOption = parts.finish.find(f => f.name === finish);

    price += (frameOption?.priceModifier || 0);
    price += (legOption?.priceModifier || 0);
    price += (topOption?.priceModifier || 0);
    price += (finishOption?.priceModifier || 0);

    // Size multiplier (±10% per 20cm from base size)
    const baseLength = product.dimensions?.length || 100;
    const sizeDiff = (dimensions.length - baseLength) / 20;
    price = price * (1 + sizeDiff * 0.1);

    return Math.round(price);
  }, [frame, legType, tabletopType, finish, dimensions, product, parts]);

  const configuration = useMemo(() => ({
    frame,
    legType,
    tabletopType,
    finish,
    dimensions,
  }), [frame, legType, tabletopType, finish, dimensions]);

  useState(() => {
    onConfigurationChange(configuration, calculatedPrice);
  });

  const handleUpdate = () => {
    onConfigurationChange(configuration, calculatedPrice);
  };

  return (
    <div className="bg-stone-50 rounded-xl p-6 space-y-6">
      <h3 className="text-lg font-semibold text-stone-900">Customize Your {product.name}</h3>
      
      {/* Frame Selection */}
      {parts.frame.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Frame Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {parts.frame.map((option) => (
              <button
                key={option.id}
                onClick={() => { setFrame(option.name); handleUpdate(); }}
                className={`p-3 rounded-lg border-2 text-left transition-colors ${
                  frame === option.name
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <span className="block font-medium text-stone-900">{option.name}</span>
                {option.priceModifier > 0 && (
                  <span className="text-sm text-amber-600">+{formatPrice(option.priceModifier)}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Leg Type Selection */}
      {parts.legType.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Leg Style
          </label>
          <div className="grid grid-cols-3 gap-3">
            {parts.legType.map((option) => (
              <button
                key={option.id}
                onClick={() => { setLegType(option.name); handleUpdate(); }}
                className={`p-3 rounded-lg border-2 text-center transition-colors ${
                  legType === option.name
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <span className="block text-sm font-medium text-stone-900">{option.name}</span>
                {option.priceModifier > 0 && (
                  <span className="text-xs text-amber-600">+{formatPrice(option.priceModifier)}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tabletop Selection */}
      {parts.tabletopType && parts.tabletopType.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Tabletop Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {parts.tabletopType.map((option) => (
              <button
                key={option.id}
                onClick={() => { setTabletopType(option.name); handleUpdate(); }}
                className={`p-3 rounded-lg border-2 text-left transition-colors ${
                  tabletopType === option.name
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <span className="block font-medium text-stone-900">{option.name}</span>
                {option.priceModifier > 0 && (
                  <span className="text-sm text-amber-600">+{formatPrice(option.priceModifier)}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Finish Selection */}
      {parts.finish.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Finish
          </label>
          <div className="flex flex-wrap gap-2">
            {parts.finish.map((option) => (
              <button
                key={option.id}
                onClick={() => { setFinish(option.name); handleUpdate(); }}
                className={`px-4 py-2 rounded-full border-2 text-sm transition-colors ${
                  finish === option.name
                    ? 'border-amber-500 bg-amber-50 text-amber-900'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                {option.name}
                {option.priceModifier > 0 && (
                  <span className="ml-1 text-amber-600">+{formatPrice(option.priceModifier)}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dimensions */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-3">
          Custom Dimensions (cm)
        </label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-stone-500 mb-1">Length</label>
            <input
              type="number"
              value={dimensions.length}
              onChange={(e) => {
                setDimensions(prev => ({ ...prev, length: Number(e.target.value) }));
                handleUpdate();
              }}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              min={50}
              max={300}
              step={10}
            />
          </div>
          <div>
            <label className="block text-xs text-stone-500 mb-1">Width</label>
            <input
              type="number"
              value={dimensions.width}
              onChange={(e) => {
                setDimensions(prev => ({ ...prev, width: Number(e.target.value) }));
                handleUpdate();
              }}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              min={30}
              max={150}
              step={10}
            />
          </div>
          <div>
            <label className="block text-xs text-stone-500 mb-1">Height</label>
            <input
              type="number"
              value={dimensions.height}
              onChange={(e) => {
                setDimensions(prev => ({ ...prev, height: Number(e.target.value) }));
                handleUpdate();
              }}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              min={20}
              max={120}
              step={5}
            />
          </div>
        </div>
      </div>

      {/* Price Display */}
      <div className="pt-4 border-t border-stone-200">
        <div className="flex items-center justify-between">
          <span className="text-stone-600">Your Custom Price:</span>
          <span className="text-2xl font-bold text-stone-900">{formatPrice(calculatedPrice)}</span>
        </div>
        <p className="text-sm text-stone-500 mt-1">
          Includes all selected options and custom sizing
        </p>
      </div>
    </div>
  );
}
