import { ProductRepository } from '../products/product.repository';
import { ProductWithRelations } from '../products/product.repository';

export interface ConfigurationInput {
  productId: string;
  length?: number;
  width?: number;
  height?: number;
  frameType?: string;
  legType?: string;
  tabletopType?: string;
  finish?: string;
  material?: string;
}

export interface ConfigurationResult {
  configuration: ConfigurationInput;
  price: number;
  basePrice: number;
  modifiers: {
    size?: number;
    material?: number;
    finish?: number;
    frame?: number;
    leg?: number;
    tabletop?: number;
  };
}

export class ConfiguratorService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async calculatePrice(config: ConfigurationInput): Promise<ConfigurationResult> {
    const product = await this.productRepository.findById(config.productId);

    if (!product) {
      throw new Error('Product not found');
    }

    if (!product.isConfigurable) {
      throw new Error('Product is not configurable');
    }

    const basePrice = product.basePrice;
    const modifiers: ConfigurationResult['modifiers'] = {};
    let totalPrice = basePrice;

    // Size modifier (based on volume multiplier)
    if (config.length && config.width && config.height) {
      const baseVolume = 1000000; // Assume base volume (100cm x 100cm x 100cm)
      const currentVolume = config.length * config.width * config.height;
      const sizeMultiplier = currentVolume / baseVolume;
      const sizeModifier = (sizeMultiplier - 1) * basePrice * 0.5; // 50% of base price per unit volume change
      modifiers.size = sizeModifier;
      totalPrice += sizeModifier;
    }

    // Material modifier
    if (config.material && product.configurableParts) {
      const materialPart = product.configurableParts.find(
        (p) => p.material === config.material
      );
      if (materialPart) {
        modifiers.material = materialPart.priceModifier;
        totalPrice += materialPart.priceModifier;
      }
    }

    // Finish modifier
    if (config.finish && product.configurableParts) {
      const finishPart = product.configurableParts.find(
        (p) => p.finish === config.finish
      );
      if (finishPart) {
        modifiers.finish = finishPart.priceModifier;
        totalPrice += finishPart.priceModifier;
      }
    }

    // Frame type modifier
    if (config.frameType && product.configurableParts) {
      const framePart = product.configurableParts.find(
        (p) => p.frameType === config.frameType
      );
      if (framePart) {
        modifiers.frame = framePart.priceModifier;
        totalPrice += framePart.priceModifier;
      }
    }

    // Leg type modifier
    if (config.legType && product.configurableParts) {
      const legPart = product.configurableParts.find(
        (p) => p.legType === config.legType
      );
      if (legPart) {
        modifiers.leg = legPart.priceModifier;
        totalPrice += legPart.priceModifier;
      }
    }

    // Tabletop type modifier
    if (config.tabletopType && product.configurableParts) {
      const tabletopPart = product.configurableParts.find(
        (p) => p.tabletopType === config.tabletopType
      );
      if (tabletopPart) {
        modifiers.tabletop = tabletopPart.priceModifier;
        totalPrice += tabletopPart.priceModifier;
      }
    }

    return {
      configuration: config,
      price: Math.max(0, totalPrice), // Ensure non-negative
      basePrice,
      modifiers,
    };
  }

  async getAvailableOptions(productId: string): Promise<{
    materials: string[];
    finishes: string[];
    frameTypes: string[];
    legTypes: string[];
    tabletopTypes: string[];
  }> {
    const product = await this.productRepository.findById(productId);

    if (!product || !product.isConfigurable || !product.configurableParts) {
      return {
        materials: [],
        finishes: [],
        frameTypes: [],
        legTypes: [],
        tabletopTypes: [],
      };
    }

    const materials = new Set<string>();
    const finishes = new Set<string>();
    const frameTypes = new Set<string>();
    const legTypes = new Set<string>();
    const tabletopTypes = new Set<string>();

    product.configurableParts.forEach((part) => {
      if (part.material) materials.add(part.material);
      if (part.finish) finishes.add(part.finish);
      if (part.frameType) frameTypes.add(part.frameType);
      if (part.legType) legTypes.add(part.legType);
      if (part.tabletopType) tabletopTypes.add(part.tabletopType);
    });

    return {
      materials: Array.from(materials),
      finishes: Array.from(finishes),
      frameTypes: Array.from(frameTypes),
      legTypes: Array.from(legTypes),
      tabletopTypes: Array.from(tabletopTypes),
    };
  }
}
