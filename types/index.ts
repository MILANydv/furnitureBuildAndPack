export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  basePrice: number;
  categoryId: string;
  category: Category;
  images: ProductImage[];
  variants: ProductVariant[];
  configurable: boolean;
  configurableParts: ConfigurablePartOptions | null;
  dimensions: Dimensions | null;
  weight: number | null;
  material: string | null;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  tags: string[];
  isActive: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt: string;
  order: number;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size: string | null;
  color: string | null;
  colorHex: string | null;
  material: string | null;
  price: number;
  sku: string;
  stock: number;
  isActive: boolean;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'inch';
}

export interface ConfigurablePartOptions {
  frame: ConfigurableOption[];
  legType: ConfigurableOption[];
  tabletopType: ConfigurableOption[];
  finish: ConfigurableOption[];
}

export interface ConfigurableOption {
  id: string;
  name: string;
  priceModifier: number;
  image: string | null;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  user: User;
  rating: number;
  title: string;
  content: string;
  images: string[];
  isVerified: boolean;
  helpful: number;
  createdAt: Date;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface Order {
  id: string;
  userId: string;
  user: User;
  items: OrderItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  trackingNumber: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  variantId: string | null;
  variant: ProductVariant | null;
  configuration: Configuration | null;
  qty: number;
  price: number;
  total: number;
}

export interface Configuration {
  frame: string;
  legType: string;
  tabletopType: string;
  finish: string;
  dimensions: Dimensions;
}

export interface Address {
  id: string;
  userId: string;
  type: 'shipping' | 'billing';
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variantId: string | null;
  variant: ProductVariant | null;
  configuration: Configuration | null;
  qty: number;
  price: number;
}

export interface Cart {
  id: string;
  userId: string | null;
  sessionId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  couponCode: string | null;
  updatedAt: Date;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number | null;
  maxDiscount: number | null;
  usageLimit: number | null;
  usageCount: number;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
}

export interface CampaignBanner {
  id: string;
  name: string;
  image: string;
  link: string;
  position: 'homepage' | 'category' | 'product';
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
  order: number;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  createdAt: Date;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  topProducts: Product[];
  recentOrders: Order[];
  salesByDay: { date: string; revenue: number; orders: number }[];
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  materials?: string[];
  colors?: string[];
  sizes?: string[];
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular' | 'rating';
  search?: string;
}
