'use client';

import { useState, useCallback, useEffect } from 'react';
import { CartItem, Configuration, Product, ProductVariant } from '@/types';

interface CartState {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  itemCount: number;
}

const STORAGE_KEY = 'moduliving-cart';

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function useCart() {
  const [cart, setCart] = useState<CartState>({
    items: [],
    subtotal: 0,
    discount: 0,
    total: 0,
    itemCount: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCart(parsed);
      } catch {
        // Invalid cart data, start fresh
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const calculateTotals = useCallback((items: CartItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const discount = 0; // Calculate based on coupons
    const total = subtotal - discount;
    const itemCount = items.reduce((sum, item) => sum + item.qty, 0);
    return { subtotal, discount, total, itemCount };
  }, []);

  const addToCart = useCallback((
    product: Product,
    variant: ProductVariant | null,
    configuration: Configuration | null,
    qty: number = 1
  ) => {
    const price = variant?.price || product.basePrice;
    
    // Add configuration price modifiers
    let configPrice = price;
    if (configuration && product.configurableParts) {
      const frameOption = product.configurableParts.frame.find(f => f.name === configuration.frame);
      const legOption = product.configurableParts.legType.find(l => l.name === configuration.legType);
      const topOption = product.configurableParts.tabletopType?.find(t => t.name === configuration.tabletopType);
      const finishOption = product.configurableParts.finish.find(f => f.name === configuration.finish);
      
      configPrice += (frameOption?.priceModifier || 0);
      configPrice += (legOption?.priceModifier || 0);
      configPrice += (topOption?.priceModifier || 0);
      configPrice += (finishOption?.priceModifier || 0);
    }

    setCart(prev => {
      // Check if item already exists
      const existingIndex = prev.items.findIndex(item => 
        item.productId === product.id &&
        item.variantId === (variant?.id || null) &&
        JSON.stringify(item.configuration) === JSON.stringify(configuration)
      );

      let newItems;
      if (existingIndex >= 0) {
        newItems = [...prev.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          qty: newItems[existingIndex].qty + qty,
        };
      } else {
        const newItem: CartItem = {
          id: generateId(),
          productId: product.id,
          product,
          variantId: variant?.id || null,
          variant,
          configuration,
          qty,
          price: configPrice,
        };
        newItems = [...prev.items, newItem];
      }

      const totals = calculateTotals(newItems);
      return { ...prev, items: newItems, ...totals };
    });
  }, [calculateTotals]);

  const updateQty = useCallback((itemId: string, qty: number) => {
    if (qty < 1) return;
    
    setCart(prev => {
      const newItems = prev.items.map(item =>
        item.id === itemId ? { ...item, qty } : item
      );
      const totals = calculateTotals(newItems);
      return { ...prev, items: newItems, ...totals };
    });
  }, [calculateTotals]);

  const removeItem = useCallback((itemId: string) => {
    setCart(prev => {
      const newItems = prev.items.filter(item => item.id !== itemId);
      const totals = calculateTotals(newItems);
      return { ...prev, items: newItems, ...totals };
    });
  }, [calculateTotals]);

  const clearCart = useCallback(() => {
    setCart({
      items: [],
      subtotal: 0,
      discount: 0,
      total: 0,
      itemCount: 0,
    });
  }, []);

  const applyCoupon = useCallback((code: string) => {
    // TODO: Implement coupon validation
    setCart(prev => ({
      ...prev,
      discount: prev.subtotal * 0.1, // 10% discount for demo
      total: prev.subtotal - (prev.subtotal * 0.1),
    }));
  }, []);

  return {
    cart,
    isLoaded,
    addToCart,
    updateQty,
    removeItem,
    clearCart,
    applyCoupon,
  };
}
