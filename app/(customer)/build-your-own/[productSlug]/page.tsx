'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FurnitureViewer } from '@/app/components/configurator/FurnitureViewer';
import { ConfiguratorControls } from '@/app/components/configurator/ConfiguratorControls';
import { ShoppingCart } from 'lucide-react';

interface Configuration {
  length?: number;
  width?: number;
  height?: number;
  frameType?: string;
  legType?: string;
  tabletopType?: string;
  finish?: string;
  material?: string;
}

export default function ConfiguratorPage() {
  const params = useParams();
  const productSlug = params.productSlug as string;
  const [product, setProduct] = useState<any>(null);
  const [options, setOptions] = useState<any>(null);
  const [configuration, setConfiguration] = useState<Configuration>({});
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
    fetchOptions();
  }, [productSlug]);

  useEffect(() => {
    if (product && Object.keys(configuration).length > 0) {
      calculatePrice();
    }
  }, [configuration, product]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/slug/${productSlug}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        setPrice(data.basePrice);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOptions = async () => {
    if (!product) return;
    try {
      const response = await fetch(`/api/configurator/options/${product.id}`);
      if (response.ok) {
        const data = await response.json();
        setOptions(data);
      }
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const calculatePrice = async () => {
    if (!product) return;
    try {
      const response = await fetch('/api/configurator/calculate-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          ...configuration,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setPrice(data.price);
      }
    } catch (error) {
      console.error('Error calculating price:', error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          qty: 1,
          configuration,
        }),
      });
      if (response.ok) {
        alert('Added to cart!');
      }
    } catch (error) {
      alert('Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-stone-600">Loading configurator...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-stone-600">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href={`/products/${productSlug}`} className="text-amber-600 hover:text-amber-700">
            ← Back to Product
          </Link>
          <h1 className="text-4xl font-bold text-stone-900 mt-4">Build Your Own {product.name}</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 h-[600px]">
              <FurnitureViewer configuration={configuration} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <ConfiguratorControls
                options={options}
                configuration={configuration}
                onConfigurationChange={setConfiguration}
              />

              <div className="mt-8 pt-8 border-t border-stone-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-stone-900">Total Price</span>
                  <span className="text-3xl font-bold text-stone-900">${price.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
