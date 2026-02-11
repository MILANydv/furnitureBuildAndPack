'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Ruler, Palette, Box } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { formatPrice } from '@/lib/utils/currency';

export default function BuildYourOwnPage() {
  const customizableProducts = products.filter(p => p.configurable);
  
  const features = [
    {
      icon: Ruler,
      title: 'Custom Dimensions',
      description: 'Adjust length, width, and height to fit your exact space requirements.',
    },
    {
      icon: Palette,
      title: 'Choose Your Style',
      description: 'Select from various frames, legs, finishes, and materials.',
    },
    {
      icon: Box,
      title: 'See It Before You Buy',
      description: 'Real-time 3D preview of your custom configuration.',
    },
    {
      icon: Sparkles,
      title: 'Unique to You',
      description: 'Every piece is made to order according to your specifications.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-stone-900 to-stone-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Custom Furniture Builder
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Design Your Perfect{' '}
              <span className="text-amber-400">Furniture</span>
            </h1>
            <p className="text-xl text-stone-300 mb-8">
              Create furniture that fits your space perfectly. Choose dimensions, 
              materials, and finishes to build your dream piece.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#products" 
                className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
              >
                Start Building
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <Link 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Talk to a Designer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">How It Works</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Building your custom furniture is easy. Follow these simple steps to create 
              a piece that&apos;s uniquely yours.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-amber-600" />
                </div>
                <div className="w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-stone-900 mb-2">{feature.title}</h3>
                <p className="text-stone-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customizable Products */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Start With a Base Design
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Choose from our collection of customizable furniture pieces. 
              Each can be tailored to your exact specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {customizableProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Why Choose Custom Furniture?
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Ruler className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Perfect Fit Guarantee</h3>
                    <p className="text-stone-400">
                      No more compromising on size. Get furniture that fits your 
                      space exactly, whether it&apos;s a compact Kathmandu apartment 
                      or a spacious home.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Palette className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Match Your Style</h3>
                    <p className="text-stone-400">
                      Choose from various finishes and materials to match your 
                      existing decor or create a completely new look.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Box className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Quality Craftsmanship</h3>
                    <p className="text-stone-400">
                      Each piece is handcrafted by skilled artisans using 
                      premium materials, ensuring durability and beauty.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=500&fit=crop"
                alt="Custom furniture craftsmanship"
                className="rounded-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-amber-600 p-6 rounded-xl">
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm">Customizable</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Ready to Build Your Dream Furniture?
          </h2>
          <p className="text-stone-600 mb-8">
            Start customizing now or schedule a free consultation with our 
            design experts to help you create the perfect piece.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#products" 
              className="inline-flex items-center px-8 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              Browse Customizable Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <Link 
              href="/contact" 
              className="inline-flex items-center px-8 py-3 border-2 border-stone-900 text-stone-900 font-semibold rounded-lg hover:bg-stone-900 hover:text-white transition-colors"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
