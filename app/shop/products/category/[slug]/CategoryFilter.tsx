'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

interface CategoryFilterProps {
  materials: string[];
}

export function CategoryFilter({ materials }: CategoryFilterProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['price', 'material']);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev => 
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 100000]);
    setSelectedMaterials([]);
  };

  const FilterSection = ({ 
    title, 
    id, 
    children 
  }: { 
    title: string; 
    id: string; 
    children: React.ReactNode 
  }) => (
    <div className="border-b border-stone-200 last:border-0">
      <button
        onClick={() => toggleSection(id)}
        className="flex items-center justify-between w-full py-4 text-left"
      >
        <span className="font-medium text-stone-900">{title}</span>
        {expandedSections.includes(id) ? (
          <ChevronUp className="w-5 h-5 text-stone-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-stone-500" />
        )}
      </button>
      {expandedSections.includes(id) && (
        <div className="pb-4">{children}</div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-stone-600" />
          <h2 className="font-semibold text-stone-900">Filters</h2>
        </div>
        <button 
          onClick={clearFilters}
          className="text-sm text-amber-600 hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <FilterSection title="Price Range" id="price">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm"
              placeholder="Min"
            />
            <span className="text-stone-400">-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm"
              placeholder="Max"
            />
          </div>
          <input
            type="range"
            min="0"
            max="100000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-amber-600"
          />
          <div className="flex justify-between text-sm text-stone-600">
            <span>NPR {priceRange[0].toLocaleString()}</span>
            <span>NPR {priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </FilterSection>

      {/* Materials */}
      {materials.length > 0 && (
        <FilterSection title="Materials" id="material">
          <div className="space-y-2">
            {materials.map((material) => (
              <label key={material} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedMaterials.includes(material)}
                  onChange={() => toggleMaterial(material)}
                  className="w-4 h-4 accent-amber-600 rounded"
                />
                <span className="text-stone-700">{material}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Availability */}
      <FilterSection title="Availability" id="availability">
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-amber-600 rounded" />
            <span className="text-stone-700">In Stock</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-amber-600 rounded" />
            <span className="text-stone-700">Customizable</span>
          </label>
        </div>
      </FilterSection>
    </div>
  );
}
