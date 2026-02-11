'use client';

interface ConfiguratorControlsProps {
  options: {
    materials?: string[];
    finishes?: string[];
    frameTypes?: string[];
    legTypes?: string[];
    tabletopTypes?: string[];
  } | null;
  configuration: {
    length?: number;
    width?: number;
    height?: number;
    frameType?: string;
    legType?: string;
    tabletopType?: string;
    finish?: string;
    material?: string;
  };
  onConfigurationChange: (config: any) => void;
}

export function ConfiguratorControls({
  options,
  configuration,
  onConfigurationChange,
}: ConfiguratorControlsProps) {
  const updateConfig = (key: string, value: any) => {
    onConfigurationChange({
      ...configuration,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-stone-900 mb-4">Customize</h2>

      {/* Size Controls */}
      <div>
        <h3 className="text-sm font-semibold text-stone-700 mb-3">Dimensions (cm)</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-stone-600 mb-1">Length</label>
            <input
              type="number"
              min="50"
              max="300"
              value={configuration.length || 100}
              onChange={(e) => updateConfig('length', parseInt(e.target.value) || 100)}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm text-stone-600 mb-1">Width</label>
            <input
              type="number"
              min="50"
              max="300"
              value={configuration.width || 100}
              onChange={(e) => updateConfig('width', parseInt(e.target.value) || 100)}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm text-stone-600 mb-1">Height</label>
            <input
              type="number"
              min="30"
              max="200"
              value={configuration.height || 80}
              onChange={(e) => updateConfig('height', parseInt(e.target.value) || 80)}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Material Selection */}
      {options?.materials && options.materials.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-stone-700 mb-3">Material</h3>
          <select
            value={configuration.material || ''}
            onChange={(e) => updateConfig('material', e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Select Material</option>
            {options.materials.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Finish Selection */}
      {options?.finishes && options.finishes.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-stone-700 mb-3">Finish</h3>
          <select
            value={configuration.finish || ''}
            onChange={(e) => updateConfig('finish', e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Select Finish</option>
            {options.finishes.map((finish) => (
              <option key={finish} value={finish}>
                {finish}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Frame Type */}
      {options?.frameTypes && options.frameTypes.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-stone-700 mb-3">Frame Type</h3>
          <select
            value={configuration.frameType || ''}
            onChange={(e) => updateConfig('frameType', e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Select Frame</option>
            {options.frameTypes.map((frame) => (
              <option key={frame} value={frame}>
                {frame}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Leg Type */}
      {options?.legTypes && options.legTypes.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-stone-700 mb-3">Leg Type</h3>
          <select
            value={configuration.legType || ''}
            onChange={(e) => updateConfig('legType', e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Select Legs</option>
            {options.legTypes.map((leg) => (
              <option key={leg} value={leg}>
                {leg}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Tabletop Type */}
      {options?.tabletopTypes && options.tabletopTypes.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-stone-700 mb-3">Tabletop Type</h3>
          <select
            value={configuration.tabletopType || ''}
            onChange={(e) => updateConfig('tabletopType', e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Select Tabletop</option>
            {options.tabletopTypes.map((tabletop) => (
              <option key={tabletop} value={tabletop}>
                {tabletop}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
