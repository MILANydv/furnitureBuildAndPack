import { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us | ModuLiving Nepal',
    description: 'Get in touch with ModuLiving. We are here to help you with your custom furniture needs, orders, and assembly support.',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-stone-50">
            {/* Page Header */}
            <div className="bg-stone-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">Let&apos;s Start a Conversation</h1>
                    <p className="text-stone-400 text-lg max-w-2xl mx-auto">
                        Have questions about our modular furniture? Need help with a custom design?
                        Our team is ready to assist you.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-20">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-200">
                    <div className="grid lg:grid-cols-5">
                        {/* Contact Information Sidebar */}
                        <div className="lg:col-span-2 bg-stone-900 p-8 sm:p-12 text-white">
                            <h2 className="text-2xl font-bold mb-8">Contact Information</h2>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-stone-800 rounded-xl flex items-center justify-center flex-shrink-0 text-amber-500">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1 text-amber-500 uppercase tracking-wider text-xs">Our Showroom</h3>
                                        <p className="text-stone-300">
                                            123 Furniture Street, Ward 6<br />
                                            Patan, Lalitpur, Nepal
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-stone-800 rounded-xl flex items-center justify-center flex-shrink-0 text-amber-500">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1 text-amber-500 uppercase tracking-wider text-xs">Call Us</h3>
                                        <p className="text-stone-300">+977-1-44XXXXX</p>
                                        <p className="text-stone-300">+977-98XXXXXXXX (Mobile)</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-stone-800 rounded-xl flex items-center justify-center flex-shrink-0 text-amber-500">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1 text-amber-500 uppercase tracking-wider text-xs">Email Us</h3>
                                        <p className="text-stone-300">hello@moduliving.np</p>
                                        <p className="text-stone-300">support@moduliving.np</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-stone-800 rounded-xl flex items-center justify-center flex-shrink-0 text-amber-500">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1 text-amber-500 uppercase tracking-wider text-xs">Opening Hours</h3>
                                        <p className="text-stone-300">Sun - Fri: 10:00 AM - 7:00 PM</p>
                                        <p className="text-stone-300">Sat: Closed</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Link Placeholder/Call to action */}
                            <div className="mt-16 pt-8 border-t border-stone-800">
                                <p className="text-sm text-stone-500 mb-4">Want a quick response?</p>
                                <a
                                    href="https://wa.me/97798XXXXXXXX"
                                    className="flex items-center justify-center gap-2 w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl transition-colors"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-3 p-8 sm:p-12 bg-white">
                            <h2 className="text-3xl font-bold text-stone-900 mb-2">Send us a Message</h2>
                            <p className="text-stone-600 mb-10">We usually respond within 24 hours during business days.</p>

                            <form className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm font-semibold text-stone-700 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            id="first-name"
                                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium"
                                            placeholder="Jane"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="last-name" className="block text-sm font-semibold text-stone-700 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            id="last-name"
                                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium"
                                        placeholder="jane@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold text-stone-700 mb-2">Subject</label>
                                    <select
                                        id="subject"
                                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium"
                                    >
                                        <option value="">Select a reason</option>
                                        <option value="custom">Custom Furniture Inquiry</option>
                                        <option value="order">Order Status</option>
                                        <option value="delivery">Delivery & Assembly</option>
                                        <option value="partnership">B2B / Partnership</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-stone-700 mb-2">How can we help?</label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium resize-none"
                                        placeholder="Tell us about your project or any questions you have..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                                >
                                    Send Message
                                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Directions / Map Placeholder */}
                <div className="mt-20">
                    <div className="bg-white p-4 rounded-3xl shadow-lg border border-stone-100 overflow-hidden">
                        <div className="relative h-[400px] w-full rounded-2xl bg-stone-200 flex items-center justify-center">
                            <div className="text-center p-8">
                                <MapPin className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-stone-700 mb-2">Interactive Map</h3>
                                <p className="text-stone-500">Visit our showroom to experience the quality in person.</p>
                                <p className="text-stone-400 mt-4 italic">Showroom location: Patan, Lalitpur (Opposite XYZ Bank)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
