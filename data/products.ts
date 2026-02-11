import { Product, Category, Review } from '@/types';

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Living Room',
    slug: 'living-room',
    description: 'Sofas, coffee tables, and living room essentials',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    parentId: null,
    seoTitle: 'Living Room Furniture | Modular & Customizable',
    seoDescription: 'Discover modern living room furniture including sofas, coffee tables, and TV units. Custom sizes available for Nepal homes.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cat-2',
    name: 'Bedroom',
    slug: 'bedroom',
    description: 'Beds, wardrobes, and bedroom furniture',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=400&fit=crop',
    parentId: null,
    seoTitle: 'Bedroom Furniture Nepal | Custom Bed Frames & Wardrobes',
    seoDescription: 'Shop bedroom furniture online in Nepal. Custom bed frames, wardrobes, and nightstands. Flatpack delivery & easy assembly.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cat-3',
    name: 'Dining',
    slug: 'dining',
    description: 'Dining tables, chairs, and storage',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop',
    parentId: null,
    seoTitle: 'Dining Room Furniture | Custom Tables & Chairs',
    seoDescription: 'Find dining tables and chairs for every space. Custom sizes available. Perfect for apartments and homes in Nepal.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cat-4',
    name: 'Office',
    slug: 'office',
    description: 'Desks, chairs, and workspace furniture',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop',
    parentId: null,
    seoTitle: 'Office Furniture Nepal | Work From Home Essentials',
    seoDescription: 'Ergonomic office chairs, desks, and storage. Work from home furniture with Nepal delivery. Custom sizes available.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cat-5',
    name: 'Storage',
    slug: 'storage',
    description: 'Bookshelves, cabinets, and organizers',
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&h=400&fit=crop',
    parentId: null,
    seoTitle: 'Storage Solutions | Bookshelves & Cabinets',
    seoDescription: 'Modular storage solutions for every room. Custom bookshelves and cabinets. Flatpack for easy transport in Nepal.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const reviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    userId: 'user-1',
    user: {
      id: 'user-1',
      name: 'Sarah Mitchell',
      email: 'sarah@example.com',
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    rating: 5,
    title: 'Perfect for my apartment!',
    content: 'The custom size option was exactly what I needed. Assembly was straightforward and the quality exceeded my expectations.',
    images: [],
    isVerified: true,
    helpful: 12,
    createdAt: new Date(),
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    userId: 'user-2',
    user: {
      id: 'user-2',
      name: 'James Chen',
      email: 'james@example.com',
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    rating: 4,
    title: 'Great quality, shipping took a while',
    content: 'Love the furniture but shipping to Pokhara took longer than expected. Worth the wait though!',
    images: [],
    isVerified: true,
    helpful: 8,
    createdAt: new Date(),
  },
];

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Modular Velvet Sofa',
    slug: 'modular-velvet-sofa',
    description: 'A luxurious modular velvet sofa that adapts to your space. Available in multiple configurations with customizable dimensions. Features high-density foam cushions and a sturdy hardwood frame. Perfect for modern Nepali homes with flexible seating needs.',
    shortDescription: 'Customizable modular sofa with premium velvet upholstery',
    basePrice: 45000,
    categoryId: 'cat-1',
    category: categories[0],
    images: [
      {
        id: 'img-1',
        productId: 'prod-1',
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop',
        alt: 'Modular Velvet Sofa - Main View',
        order: 0,
        isPrimary: true,
      },
      {
        id: 'img-2',
        productId: 'prod-1',
        url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&h=800&fit=crop',
        alt: 'Modular Velvet Sofa - Side View',
        order: 1,
        isPrimary: false,
      },
    ],
    variants: [
      {
        id: 'var-1',
        productId: 'prod-1',
        size: '2-Seater',
        color: 'Forest Green',
        colorHex: '#228B22',
        material: 'Velvet',
        price: 45000,
        sku: 'SOF-VLV-2ST-GRN',
        stock: 15,
        isActive: true,
      },
      {
        id: 'var-2',
        productId: 'prod-1',
        size: '3-Seater',
        color: 'Forest Green',
        colorHex: '#228B22',
        material: 'Velvet',
        price: 65000,
        sku: 'SOF-VLV-3ST-GRN',
        stock: 10,
        isActive: true,
      },
      {
        id: 'var-3',
        productId: 'prod-1',
        size: '2-Seater',
        color: 'Navy Blue',
        colorHex: '#000080',
        material: 'Velvet',
        price: 45000,
        sku: 'SOF-VLV-2ST-NVY',
        stock: 12,
        isActive: true,
      },
      {
        id: 'var-4',
        productId: 'prod-1',
        size: '3-Seater',
        color: 'Navy Blue',
        colorHex: '#000080',
        material: 'Velvet',
        price: 65000,
        sku: 'SOF-VLV-3ST-NVY',
        stock: 8,
        isActive: true,
      },
    ],
    configurable: true,
    configurableParts: {
      frame: [
        { id: 'frame-1', name: 'Standard Wood', priceModifier: 0, image: null },
        { id: 'frame-2', name: 'Reinforced Hardwood', priceModifier: 5000, image: null },
      ],
      legType: [
        { id: 'leg-1', name: 'Tapered Wood', priceModifier: 0, image: null },
        { id: 'leg-2', name: 'Brass Metal', priceModifier: 3000, image: null },
        { id: 'leg-3', name: 'Black Steel', priceModifier: 2500, image: null },
      ],
      tabletopType: [],
      finish: [
        { id: 'finish-1', name: 'Standard', priceModifier: 0, image: null },
        { id: 'finish-2', name: 'Stain Resistant', priceModifier: 4000, image: null },
      ],
    },
    dimensions: {
      length: 180,
      width: 90,
      height: 85,
      unit: 'cm',
    },
    weight: 45,
    material: 'Velvet, Hardwood Frame',
    rating: 4.8,
    reviewCount: 124,
    reviews: reviews.filter(r => r.productId === 'prod-1'),
    tags: ['bestseller', 'modular', 'customizable', 'living-room'],
    isActive: true,
    seoTitle: 'Modular Velvet Sofa Nepal | Custom Size Sofa | Flatpack Furniture',
    seoDescription: 'Buy modular velvet sofa online in Nepal. Custom sizes available. Flatpack delivery with easy assembly. Premium quality at affordable prices.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-2',
    name: 'Custom Oak Dining Table',
    slug: 'custom-oak-dining-table',
    description: 'A beautifully crafted solid oak dining table with customizable dimensions. Built to last with traditional joinery techniques. Perfect for family gatherings and adaptable to your dining space requirements. Available with various leg styles and finishes.',
    shortDescription: 'Solid oak dining table with customizable dimensions',
    basePrice: 35000,
    categoryId: 'cat-3',
    category: categories[2],
    images: [
      {
        id: 'img-3',
        productId: 'prod-2',
        url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=800&fit=crop',
        alt: 'Custom Oak Dining Table - Main View',
        order: 0,
        isPrimary: true,
      },
    ],
    variants: [
      {
        id: 'var-5',
        productId: 'prod-2',
        size: '4-Seater (120cm)',
        color: 'Natural Oak',
        colorHex: '#D4A574',
        material: 'Solid Oak',
        price: 35000,
        sku: 'TBL-OAK-4ST-NAT',
        stock: 8,
        isActive: true,
      },
      {
        id: 'var-6',
        productId: 'prod-2',
        size: '6-Seater (160cm)',
        color: 'Natural Oak',
        colorHex: '#D4A574',
        material: 'Solid Oak',
        price: 48000,
        sku: 'TBL-OAK-6ST-NAT',
        stock: 6,
        isActive: true,
      },
    ],
    configurable: true,
    configurableParts: {
      frame: [
        { id: 'frame-3', name: 'Standard Oak', priceModifier: 0, image: null },
        { id: 'frame-4', name: 'Premium Select Oak', priceModifier: 8000, image: null },
      ],
      legType: [
        { id: 'leg-4', name: 'Tapered Legs', priceModifier: 0, image: null },
        { id: 'leg-5', name: 'Hairpin Legs', priceModifier: 5000, image: null },
        { id: 'leg-6', name: 'Pedestal Base', priceModifier: 12000, image: null },
      ],
      tabletopType: [
        { id: 'top-1', name: 'Standard Thickness (25mm)', priceModifier: 0, image: null },
        { id: 'top-2', name: 'Thick Top (40mm)', priceModifier: 6000, image: null },
      ],
      finish: [
        { id: 'finish-3', name: 'Natural Oil', priceModifier: 0, image: null },
        { id: 'finish-4', name: 'Walnut Stain', priceModifier: 2000, image: null },
        { id: 'finish-5', name: 'White Wash', priceModifier: 2000, image: null },
      ],
    },
    dimensions: {
      length: 160,
      width: 90,
      height: 75,
      unit: 'cm',
    },
    weight: 35,
    material: 'Solid Oak',
    rating: 4.9,
    reviewCount: 89,
    reviews: [],
    tags: ['new', 'customizable', 'dining', 'solid-wood'],
    isActive: true,
    seoTitle: 'Custom Oak Dining Table Nepal | Solid Wood Dining Table',
    seoDescription: 'Order custom oak dining table online. Choose your size, finish, and leg style. Solid wood construction with flatpack delivery across Nepal.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-3',
    name: 'Minimalist Platform Bed',
    slug: 'minimalist-platform-bed',
    description: 'A sleek, low-profile platform bed that brings modern elegance to your bedroom. No box spring needed. Features a sturdy slat system and optional under-bed storage drawers. Custom sizes available to fit your mattress and room perfectly.',
    shortDescription: 'Modern platform bed with optional storage drawers',
    basePrice: 28000,
    categoryId: 'cat-2',
    category: categories[1],
    images: [
      {
        id: 'img-4',
        productId: 'prod-3',
        url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=800&fit=crop',
        alt: 'Minimalist Platform Bed',
        order: 0,
        isPrimary: true,
      },
    ],
    variants: [
      {
        id: 'var-7',
        productId: 'prod-3',
        size: 'Queen (150x200cm)',
        color: 'Walnut',
        colorHex: '#5D4E37',
        material: 'Engineered Wood',
        price: 28000,
        sku: 'BED-PLT-QUE-WAL',
        stock: 20,
        isActive: true,
      },
      {
        id: 'var-8',
        productId: 'prod-3',
        size: 'King (180x200cm)',
        color: 'Walnut',
        colorHex: '#5D4E37',
        material: 'Engineered Wood',
        price: 35000,
        sku: 'BED-PLT-KNG-WAL',
        stock: 15,
        isActive: true,
      },
    ],
    configurable: true,
    configurableParts: {
      frame: [
        { id: 'frame-5', name: 'Standard Frame', priceModifier: 0, image: null },
        { id: 'frame-6', name: 'Frame with Storage Drawers', priceModifier: 8000, image: null },
      ],
      legType: [
        { id: 'leg-7', name: 'Low Profile (10cm)', priceModifier: 0, image: null },
        { id: 'leg-8', name: 'Standard (20cm)', priceModifier: 1000, image: null },
      ],
      tabletopType: [],
      finish: [
        { id: 'finish-6', name: 'Walnut', priceModifier: 0, image: null },
        { id: 'finish-7', name: 'White', priceModifier: 0, image: null },
        { id: 'finish-8', name: 'Black', priceModifier: 0, image: null },
      ],
    },
    dimensions: {
      length: 200,
      width: 180,
      height: 30,
      unit: 'cm',
    },
    weight: 50,
    material: 'Engineered Wood',
    rating: 4.7,
    reviewCount: 156,
    reviews: [],
    tags: ['popular', 'bedroom', 'storage', 'minimalist'],
    isActive: true,
    seoTitle: 'Platform Bed Nepal | Modern Bed Frame with Storage | Custom Sizes',
    seoDescription: 'Buy minimalist platform bed online in Nepal. Custom sizes, optional storage drawers, easy assembly. Free delivery in Kathmandu Valley.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-4',
    name: 'Ergonomic Office Chair',
    slug: 'ergonomic-office-chair',
    description: 'Work in comfort with our fully adjustable ergonomic office chair. Features lumbar support, adjustable armrests, and breathable mesh back. Essential for work-from-home professionals in Nepal.',
    shortDescription: 'Fully adjustable ergonomic chair for home office',
    basePrice: 18000,
    categoryId: 'cat-4',
    category: categories[3],
    images: [
      {
        id: 'img-5',
        productId: 'prod-4',
        url: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&h=800&fit=crop',
        alt: 'Ergonomic Office Chair',
        order: 0,
        isPrimary: true,
      },
    ],
    variants: [
      {
        id: 'var-9',
        productId: 'prod-4',
        size: 'Standard',
        color: 'Black',
        colorHex: '#000000',
        material: 'Mesh & Fabric',
        price: 18000,
        sku: 'CHR-ERG-BLK',
        stock: 25,
        isActive: true,
      },
      {
        id: 'var-10',
        productId: 'prod-4',
        size: 'Standard',
        color: 'Grey',
        colorHex: '#808080',
        material: 'Mesh & Fabric',
        price: 18000,
        sku: 'CHR-ERG-GRY',
        stock: 20,
        isActive: true,
      },
    ],
    configurable: false,
    configurableParts: null,
    dimensions: {
      length: 65,
      width: 65,
      height: 110,
      unit: 'cm',
    },
    weight: 15,
    material: 'Mesh, Fabric, Nylon Base',
    rating: 4.6,
    reviewCount: 203,
    reviews: [],
    tags: ['sale', 'office', 'ergonomic', 'work-from-home'],
    isActive: true,
    seoTitle: 'Ergonomic Office Chair Nepal | Work From Home Chair',
    seoDescription: 'Buy ergonomic office chair in Nepal. Lumbar support, adjustable features. Perfect for work from home. Fast delivery in Kathmandu.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-5',
    name: 'Modular Bookshelf System',
    slug: 'modular-bookshelf-system',
    description: 'A versatile modular bookshelf system that grows with your needs. Configure cubes, shelves, and cabinets to create your perfect storage solution. Ideal for apartments and flexible living spaces.',
    shortDescription: 'Configurable modular bookshelf with multiple units',
    basePrice: 12000,
    categoryId: 'cat-5',
    category: categories[4],
    images: [
      {
        id: 'img-6',
        productId: 'prod-5',
        url: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&h=800&fit=crop',
        alt: 'Modular Bookshelf System',
        order: 0,
        isPrimary: true,
      },
    ],
    variants: [
      {
        id: 'var-11',
        productId: 'prod-5',
        size: '2x2 Cube',
        color: 'White',
        colorHex: '#FFFFFF',
        material: 'Particle Board',
        price: 12000,
        sku: 'SHF-MOD-22-WHT',
        stock: 30,
        isActive: true,
      },
      {
        id: 'var-12',
        productId: 'prod-5',
        size: '3x2 Cube',
        color: 'White',
        colorHex: '#FFFFFF',
        material: 'Particle Board',
        price: 18000,
        sku: 'SHF-MOD-32-WHT',
        stock: 25,
        isActive: true,
      },
    ],
    configurable: true,
    configurableParts: {
      frame: [
        { id: 'frame-7', name: 'Basic Unit', priceModifier: 0, image: null },
        { id: 'frame-8', name: 'With Cabinet Doors', priceModifier: 4000, image: null },
        { id: 'frame-9', name: 'With Drawers', priceModifier: 5000, image: null },
      ],
      legType: [],
      tabletopType: [],
      finish: [
        { id: 'finish-9', name: 'White', priceModifier: 0, image: null },
        { id: 'finish-10', name: 'Oak', priceModifier: 1000, image: null },
        { id: 'finish-11', name: 'Black', priceModifier: 0, image: null },
      ],
    },
    dimensions: {
      length: 80,
      width: 30,
      height: 80,
      unit: 'cm',
    },
    weight: 20,
    material: 'Particle Board with Melamine',
    rating: 4.8,
    reviewCount: 92,
    reviews: [],
    tags: ['bestseller', 'modular', 'storage', 'customizable'],
    isActive: true,
    seoTitle: 'Modular Bookshelf Nepal | Custom Storage System | Flatpack',
    seoDescription: 'Build your own bookshelf with our modular system. Custom configurations, easy assembly. Perfect for Nepal apartments. Shop online.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-6',
    name: 'Mid-Century Accent Chair',
    slug: 'mid-century-accent-chair',
    description: 'A stylish accent chair inspired by mid-century modern design. Features tapered wooden legs and comfortable upholstered seating. Perfect as a statement piece in your living room or bedroom.',
    shortDescription: 'Mid-century modern accent chair with wooden legs',
    basePrice: 22000,
    categoryId: 'cat-1',
    category: categories[0],
    images: [
      {
        id: 'img-7',
        productId: 'prod-6',
        url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=800&fit=crop',
        alt: 'Mid-Century Accent Chair',
        order: 0,
        isPrimary: true,
      },
    ],
    variants: [
      {
        id: 'var-13',
        productId: 'prod-6',
        size: 'One Size',
        color: 'Mustard Yellow',
        colorHex: '#FFDB58',
        material: 'Fabric',
        price: 22000,
        sku: 'CHR-ACC-MUS',
        stock: 12,
        isActive: true,
      },
      {
        id: 'var-14',
        productId: 'prod-6',
        size: 'One Size',
        color: 'Teal',
        colorHex: '#008080',
        material: 'Fabric',
        price: 22000,
        sku: 'CHR-ACC-TEA',
        stock: 10,
        isActive: true,
      },
    ],
    configurable: false,
    configurableParts: null,
    dimensions: {
      length: 70,
      width: 75,
      height: 80,
      unit: 'cm',
    },
    weight: 12,
    material: 'Fabric, Solid Wood Legs',
    rating: 4.7,
    reviewCount: 67,
    reviews: [],
    tags: ['living-room', 'accent', 'mid-century'],
    isActive: true,
    seoTitle: 'Mid-Century Accent Chair Nepal | Designer Lounge Chair',
    seoDescription: 'Shop mid-century modern accent chair in Nepal. Stylish design, comfortable seating. Add character to your living space.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-7',
    name: 'Glass Top Coffee Table',
    slug: 'glass-top-coffee-table',
    description: 'A modern coffee table with tempered glass top and sleek metal legs. The transparent design makes your space feel larger while providing a practical surface for everyday use.',
    shortDescription: 'Modern glass coffee table with metal legs',
    basePrice: 15000,
    categoryId: 'cat-1',
    category: categories[0],
    images: [
      {
        id: 'img-8',
        productId: 'prod-7',
        url: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&h=800&fit=crop',
        alt: 'Glass Top Coffee Table',
        order: 0,
        isPrimary: true,
      },
    ],
    variants: [
      {
        id: 'var-15',
        productId: 'prod-7',
        size: 'Standard (100x60cm)',
        color: 'Clear/Black',
        colorHex: '#000000',
        material: 'Tempered Glass & Metal',
        price: 15000,
        sku: 'TBL-COF-GLS-BLK',
        stock: 18,
        isActive: true,
      },
      {
        id: 'var-16',
        productId: 'prod-7',
        size: 'Large (120x70cm)',
        color: 'Clear/Gold',
        colorHex: '#FFD700',
        material: 'Tempered Glass & Metal',
        price: 18000,
        sku: 'TBL-COF-GLS-GLD',
        stock: 10,
        isActive: true,
      },
    ],
    configurable: false,
    configurableParts: null,
    dimensions: {
      length: 100,
      width: 60,
      height: 45,
      unit: 'cm',
    },
    weight: 15,
    material: 'Tempered Glass, Powder-coated Metal',
    rating: 4.6,
    reviewCount: 145,
    reviews: [],
    tags: ['living-room', 'modern', 'glass'],
    isActive: true,
    seoTitle: 'Glass Coffee Table Nepal | Modern Living Room Table',
    seoDescription: 'Buy glass top coffee table online in Nepal. Modern design, tempered glass. Perfect centerpiece for your living room.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-8',
    name: 'Ceramic Table Lamp',
    slug: 'ceramic-table-lamp',
    description: 'An elegant ceramic table lamp that adds warmth and style to any room. Features a textured ceramic base and linen shade. Perfect for bedside tables or living room side tables.',
    shortDescription: 'Elegant ceramic table lamp with linen shade',
    basePrice: 4500,
    categoryId: 'cat-1',
    category: categories[0],
    images: [
      {
        id: 'img-9',
        productId: 'prod-8',
        url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop',
        alt: 'Ceramic Table Lamp',
        order: 0,
        isPrimary: true,
      },
    ],
    variants: [
      {
        id: 'var-17',
        productId: 'prod-8',
        size: 'Standard',
        color: 'White',
        colorHex: '#FFFFFF',
        material: 'Ceramic & Linen',
        price: 4500,
        sku: 'LMP-CER-WHT',
        stock: 40,
        isActive: true,
      },
      {
        id: 'var-18',
        productId: 'prod-8',
        size: 'Standard',
        color: 'Sage Green',
        colorHex: '#9DC183',
        material: 'Ceramic & Linen',
        price: 4500,
        sku: 'LMP-CER-GRN',
        stock: 35,
        isActive: true,
      },
    ],
    configurable: false,
    configurableParts: null,
    dimensions: {
      length: 30,
      width: 30,
      height: 55,
      unit: 'cm',
    },
    weight: 3,
    material: 'Ceramic, Linen',
    rating: 4.5,
    reviewCount: 78,
    reviews: [],
    tags: ['lighting', 'decor', 'bedroom'],
    isActive: true,
    seoTitle: 'Ceramic Table Lamp Nepal | Decorative Lighting',
    seoDescription: 'Shop ceramic table lamps online in Nepal. Elegant designs for living room and bedroom. Affordable home decor.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.category.slug === categorySlug && p.isActive);
}

export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const product = products.find(p => p.id === productId);
  if (!product) return [];
  
  return products
    .filter(p => p.id !== productId && p.categoryId === product.categoryId && p.isActive)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.isActive && (
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      p.category.name.toLowerCase().includes(lowerQuery)
    )
  );
}

export function filterProducts(filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  materials?: string[];
  sortBy?: string;
}): Product[] {
  let result = products.filter(p => p.isActive);
  
  if (filters.category) {
    result = result.filter(p => p.category.slug === filters.category);
  }
  
  if (filters.minPrice !== undefined) {
    result = result.filter(p => p.basePrice >= filters.minPrice!);
  }
  
  if (filters.maxPrice !== undefined) {
    result = result.filter(p => p.basePrice <= filters.maxPrice!);
  }
  
  if (filters.materials && filters.materials.length > 0) {
    result = result.filter(p => filters.materials!.includes(p.material || ''));
  }
  
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price_desc':
        result.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
    }
  }
  
  return result;
}
