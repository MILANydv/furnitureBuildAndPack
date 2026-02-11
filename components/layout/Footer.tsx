import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, CreditCard, Truck, Shield, Clock } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-white">
      {/* Features Bar */}
      <div className="border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-amber-600" />
              <div>
                <p className="font-semibold">Free Delivery</p>
                <p className="text-sm text-stone-400">On orders over NPR 10,000</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-amber-600" />
              <div>
                <p className="font-semibold">5-Year Warranty</p>
                <p className="text-sm text-stone-400">On all furniture</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-amber-600" />
              <div>
                <p className="font-semibold">Easy Assembly</p>
                <p className="text-sm text-stone-400">With clear instructions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-amber-600" />
              <div>
                <p className="font-semibold">Secure Payment</p>
                <p className="text-sm text-stone-400">100% secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold">
                Modu<span className="text-amber-600">Living</span>
              </span>
            </Link>
            <p className="text-stone-400 mt-4 mb-6">
              IKEA-style modular furniture for Nepal. Easy assembly,
              online customization, and affordable prices.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/modulivingnepal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/modulivingnepal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/modulivingnepal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-stone-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop/products" className="text-stone-400 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop/build-your-own" className="text-stone-400 hover:text-white transition-colors">
                  Build Your Own
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-stone-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-stone-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-stone-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-stone-400 hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-stone-400 hover:text-white transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/assembly" className="text-stone-400 hover:text-white transition-colors">
                  Assembly Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-stone-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span className="text-stone-400">
                  123 Furniture Street<br />
                  Kathmandu, Nepal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <a href="tel:+977-1-XXXXXXX" className="text-stone-400 hover:text-white transition-colors">
                  +977-1-XXXXXXX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <a href="mailto:hello@moduliving.np" className="text-stone-400 hover:text-white transition-colors">
                  hello@moduliving.np
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-medium mb-2">Newsletter</h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone-400 text-sm">
              © {currentYear} ModuLiving Nepal. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-stone-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-stone-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-stone-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
