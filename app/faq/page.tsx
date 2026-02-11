import { Metadata } from 'next';
import { HelpCircle, ChevronRight, MessageCircle, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Frequently Asked Questions | ModuLiving Nepal',
    description: 'Find answers to common questions about our modular furniture, customization, delivery, and assembly.',
};

export default function FAQPage() {
    const categories = [
        {
            title: 'Our Furniture',
            questions: [
                { q: 'What materials do you use?', a: 'We primarily use high-grade HDF and premium laminates, combined with quality hardware and solid wood accents where specified.' },
                { q: 'Is the furniture durable?', a: 'Yes, all our pieces are designed for longevity and come with a 5-year warranty against manufacturing defects.' },
                { q: 'Can I customize any product?', a: 'Any product marked as "Configurable" can be customized in terms of size, materials, and finishes using our online tool.' },
            ]
        },
        {
            title: 'Shipping & Delivery',
            questions: [
                { q: 'Where do you deliver?', a: 'We currently deliver throughout Kathmandu Valley and major cities across Nepal including Pokhara, Butwal, and Narayangadh.' },
                { q: 'How much does shipping cost?', a: 'Standard delivery in Kathmandu is free for orders above NPR 10,000. Outside Kathmandu, rates depend on weight and distance.' },
                { q: 'How long does delivery take?', a: 'Standard items take 3-5 business days. Custom-built pieces typically require 10-14 days for manufacturing and delivery.' },
            ]
        },
        {
            title: 'Assembly',
            questions: [
                { q: 'Is assembly difficult?', a: 'Not at all! Our furniture uses a modular "flat-pack" design similar to IKEA. We provide clear, visual instruction manuals with every piece.' },
                { q: 'Do you offer assembly services?', a: 'Yes, for a small additional fee, our expert technicians can assemble the furniture for you upon delivery.' },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-stone-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-3xl mb-6">
                        <HelpCircle className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-black text-stone-900 mb-4 tracking-tight">How can we help?</h1>
                    <p className="text-stone-600 text-lg font-medium">Search our frequent questions or choose a category below.</p>
                </div>

                {/* FAQ Grid */}
                <div className="space-y-12">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="space-y-6">
                            <h2 className="text-xl font-bold text-stone-900 border-l-4 border-amber-500 pl-4">{cat.title}</h2>
                            <div className="grid gap-4">
                                {cat.questions.map((item, i) => (
                                    <details key={i} className="group bg-white rounded-2xl border border-stone-200 shadow-sm transition-all overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                                        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                            <h3 className="text-lg font-bold text-stone-800 pr-4">{item.q}</h3>
                                            <ChevronRight className="w-5 h-5 text-stone-300 transition-transform group-open:rotate-90 group-open:text-amber-500" />
                                        </summary>
                                        <div className="px-6 pb-6 text-stone-600 leading-relaxed font-medium">
                                            {item.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-20 p-10 bg-stone-900 rounded-[2.5rem] text-center text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <h2 className="text-2xl font-bold mb-4 relative z-10">Still have questions?</h2>
                    <p className="text-stone-400 mb-8 max-w-sm mx-auto font-medium">If you can&apos;t find an answer in our FAQ, you can always contact us directly.</p>
                    <div className="flex flex-wrap justify-center gap-4 relative z-10">
                        <Link href="/contact" className="px-8 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-all flex items-center gap-2 shadow-xl shadow-amber-600/20 active:scale-95">
                            <Mail className="w-4 h-4" />
                            Email Support
                        </Link>
                        <a href="tel:+977144XXXXX" className="px-8 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center gap-2 active:scale-95">
                            <Phone className="w-4 h-4" />
                            Call Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
