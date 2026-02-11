import { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Award, Users, Globe } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About Us | ModuLiving Nepal',
    description: 'Learn about ModuLiving - our mission to bring quality, modular, and customizable furniture to every home in Nepal.',
};

export default function AboutPage() {
    const stats = [
        { label: 'Happy Customers', value: '5,000+', icon: Users },
        { label: 'Products Delivered', value: '12,000+', icon: Award },
        { label: 'Cities Covered', value: '15+', icon: Globe },
        { label: 'Quality Guarantee', value: '5 Years', icon: CheckCircle2 },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-20 bg-stone-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&h=800&fit=crop"
                        alt="About background"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-6xl font-bold mb-6">Revolutionizing How Nepal <span className="text-amber-500">Furnishes</span></h1>
                    <p className="text-xl text-stone-300 max-w-3xl mx-auto">
                        We started with a simple idea: quality furniture shouldn't be a luxury.
                        ModuLiving brings modular, IKEA-style design to Nepal with a focus on
                        customization and local craftsmanship.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&h=1000&fit=crop"
                                alt="Our workshop"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <span className="text-amber-600 font-semibold uppercase tracking-widest text-sm">Our Story</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-2 mb-6">Born from a passion for better living spaces</h2>
                            <div className="space-y-4 text-stone-600 leading-relaxed text-lg">
                                <p>
                                    Founded in 2023, ModuLiving was born out of the frustration of finding
                                    modern, well-designed furniture that fits perfectly into the unique
                                    apartments and homes of Kathmandu.
                                </p>
                                <p>
                                    We realized that "off-the-shelf" rarely meant "just right."
                                    By combining modular design principles with an easy-to-use
                                    online customization tool, we've enabled thousands of Nepalese
                                    families to become creators of their own comfort.
                                </p>
                                <p>
                                    Our workshop in Patan blends traditional woodworking skills with modern
                                    flat-pack engineering, ensuring every piece is durable, beautiful,
                                    and easy to assemble.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-stone-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-sm border border-stone-100">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-xl mb-4">
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className="text-3xl font-bold text-stone-900 mb-1">{stat.value}</div>
                                <div className="text-stone-500 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-stone-900 mb-12">Built on Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div>
                            <div className="w-16 h-16 bg-stone-900 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">01</div>
                            <h3 className="text-xl font-bold mb-4">Quality First</h3>
                            <p className="text-stone-600">We use only premium materials and rigorous testing to ensure your furniture lasts a lifetime.</p>
                        </div>
                        <div>
                            <div className="w-16 h-16 bg-stone-100 text-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">02</div>
                            <h3 className="text-xl font-bold mb-4">Radical Transparency</h3>
                            <p className="text-stone-600">No hidden costs. From material sources to pricing, we believe in being open with our customers.</p>
                        </div>
                        <div>
                            <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">03</div>
                            <h3 className="text-xl font-bold mb-4">Customer Empowerment</h3>
                            <p className="text-stone-600">You know your space best. We provide the tools for you to design it exactly how you want it.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-amber-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to create your dream home?</h2>
                    <p className="text-white/90 text-lg mb-8">
                        Join thousands of satisfied customers and start designing your custom furniture today.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/shop/products"
                            className="px-8 py-3 bg-white text-amber-600 font-bold rounded-lg hover:bg-stone-50 transition-colors shadow-lg"
                        >
                            Browse Catalog
                        </Link>
                        <Link
                            href="/shop/build-your-own"
                            className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-amber-600 transition-colors"
                        >
                            Custom Builder
                            <ArrowRight className="inline ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
