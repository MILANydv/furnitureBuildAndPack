'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FurnitureViewer } from '@/app/components/configurator/FurnitureViewer';
import { ConfiguratorControls } from '@/app/components/configurator/ConfiguratorControls';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { formatPrice } from '@/lib/utils/currency';

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

export function ConfiguratorClient() {
    const params = useParams();
    const productSlug = params.slug as string;
    const [product, setProduct] = useState<any>(null);
    const [options, setOptions] = useState<any>(null);
    const [configuration, setConfiguration] = useState<Configuration>({});
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (productSlug) {
            fetchProduct();
        }
    }, [productSlug]);

    useEffect(() => {
        if (product && Object.keys(configuration).length > 0) {
            calculatePrice();
        }
    }, [configuration, product]);

    useEffect(() => {
        if (product) {
            fetchOptions();
        }
    }, [product]);

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
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900 mx-auto mb-4"></div>
                    <p className="text-stone-600">Loading configurator...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg font-medium text-stone-900 mb-4">Product not found</p>
                    <Link href="/shop/build-your-own" className="text-amber-600 hover:underline">
                        Return to Collection
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link href={`/shop/products/${productSlug}`} className="inline-flex items-center text-stone-600 hover:text-stone-900 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Product Detail
                    </Link>
                    <h1 className="text-4xl font-bold text-stone-900 mt-4">Customize Your {product.name}</h1>
                    <p className="text-stone-500 mt-2">Personalize the dimensions and materials to fit your space perfectly.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl p-6 h-[600px] shadow-sm border border-stone-100 overflow-hidden relative">
                            <div className="absolute top-4 left-4 z-10">
                                <span className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                                    Live Preview
                                </span>
                            </div>
                            <FurnitureViewer configuration={configuration} />
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 sticky top-24 shadow-sm border border-stone-100">
                            <ConfiguratorControls
                                options={options}
                                configuration={configuration}
                                onConfigurationChange={setConfiguration}
                            />

                            <div className="mt-8 pt-8 border-t border-stone-200">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-lg font-semibold text-stone-900">Configured Price</span>
                                    <span className="text-3xl font-bold text-stone-900">{formatPrice(price)}</span>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-all active:scale-95 font-semibold"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Add Custom Piece to Cart
                                </button>
                                <p className="text-xs text-stone-400 text-center mt-4">
                                    *Manufacturing time: 10-14 days for custom pieces
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
