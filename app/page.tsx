"use client";

import { useState } from "react";
import { ShoppingBag, Menu, X, Star, ArrowRight, Truck, Shield, Clock, Heart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Velvet Lounge Sofa",
    price: 1299,
    rating: 4.8,
    reviews: 124,
    category: "Living Room",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Oak Dining Table",
    price: 899,
    rating: 4.9,
    reviews: 89,
    category: "Dining",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&h=500&fit=crop",
    badge: "New"
  },
  {
    id: 3,
    name: "Minimalist Bed Frame",
    price: 749,
    rating: 4.7,
    reviews: 156,
    category: "Bedroom",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=500&fit=crop",
    badge: null
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: 449,
    rating: 4.6,
    reviews: 203,
    category: "Office",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&h=500&fit=crop",
    badge: "Sale"
  },
  {
    id: 5,
    name: "Ceramic Table Lamp",
    price: 129,
    rating: 4.5,
    reviews: 78,
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
    badge: null
  },
  {
    id: 6,
    name: "Bookshelf Unit",
    price: 349,
    rating: 4.8,
    reviews: 92,
    category: "Storage",
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&h=500&fit=crop",
    badge: "Popular"
  },
  {
    id: 7,
    name: "Accent Armchair",
    price: 599,
    rating: 4.7,
    reviews: 67,
    category: "Living Room",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=500&fit=crop",
    badge: null
  },
  {
    id: 8,
    name: "Coffee Table",
    price: 399,
    rating: 4.6,
    reviews: 145,
    category: "Living Room",
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=500&h=500&fit=crop",
    badge: null
  }
];

const categories = [
  { name: "Living Room", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop" },
  { name: "Bedroom", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=400&fit=crop" },
  { name: "Dining", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop" },
  { name: "Office", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop" }
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Interior Designer",
    content: "The quality of furniture from Luxe Living is exceptional. My clients are always impressed with the craftsmanship.",
    avatar: "SM"
  },
  {
    name: "James Chen",
    role: "Homeowner",
    content: "Outstanding service and beautiful pieces. The sofa I ordered transformed my living room completely.",
    avatar: "JC"
  },
  {
    name: "Emma Williams",
    role: "Architect",
    content: "I recommend Luxe Living to all my clients. Their attention to detail and modern designs are unmatched.",
    avatar: "EW"
  }
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-bold text-stone-900 tracking-tight">Luxe<span className="text-amber-600">Living</span></span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#products" className="text-stone-600 hover:text-stone-900 transition-colors">Products</a>
              <a href="#categories" className="text-stone-600 hover:text-stone-900 transition-colors">Categories</a>
              <a href="#about" className="text-stone-600 hover:text-stone-900 transition-colors">About</a>
              <a href="#contact" className="text-stone-600 hover:text-stone-900 transition-colors">Contact</a>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-stone-600 hover:text-stone-900 transition-colors">
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                className="md:hidden p-2 text-stone-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100">
            <div className="px-4 py-4 space-y-3">
              <a href="#products" className="block text-stone-600 hover:text-stone-900 py-2">Products</a>
              <a href="#categories" className="block text-stone-600 hover:text-stone-900 py-2">Categories</a>
              <a href="#about" className="block text-stone-600 hover:text-stone-900 py-2">About</a>
              <a href="#contact" className="block text-stone-600 hover:text-stone-900 py-2">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[600px]">
            <div className="px-4 sm:px-6 lg:px-8 py-16 lg:py-0">
              <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 text-sm font-medium rounded-full mb-6">
                New Collection 2025
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight mb-6">
                Transform Your Space With <span className="text-amber-600">Timeless</span> Design
              </h1>
              <p className="text-lg text-stone-600 mb-8 max-w-lg">
                Discover curated furniture pieces that blend comfort, style, and quality craftsmanship for your dream home.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#products" 
                  className="inline-flex items-center px-6 py-3 bg-stone-900 text-white font-medium rounded-lg hover:bg-stone-800 transition-colors"
                >
                  Shop Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a 
                  href="#categories" 
                  className="inline-flex items-center px-6 py-3 border-2 border-stone-900 text-stone-900 font-medium rounded-lg hover:bg-stone-900 hover:text-white transition-colors"
                >
                  Explore Categories
                </a>
              </div>
              <div className="flex items-center gap-8 mt-12 pt-8 border-t border-stone-200">
                <div>
                  <p className="text-3xl font-bold text-stone-900">15K+</p>
                  <p className="text-sm text-stone-600">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-stone-900">500+</p>
                  <p className="text-sm text-stone-600">Furniture Pieces</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-stone-900">4.9</p>
                  <p className="text-sm text-stone-600">Average Rating</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[600px]">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=1000&fit=crop" 
                alt="Modern living room"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-50/20 to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-lg">
                <Truck className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900">Free Shipping</h3>
                <p className="text-sm text-stone-600">On orders over $500</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-lg">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900">5-Year Warranty</h3>
                <p className="text-sm text-stone-600">Quality guaranteed</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-lg">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900">24/7 Support</h3>
                <p className="text-sm text-stone-600">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Shop by Category</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">Explore our curated collections designed for every room in your home</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <a 
                key={category.name}
                href="#products"
                className="group relative overflow-hidden rounded-2xl aspect-square"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                  <p className="text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Shop Now →</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-2">Featured Products</h2>
              <p className="text-stone-600">Handpicked favorites from our collection</p>
            </div>
            <a href="#products" className="mt-4 sm:mt-0 inline-flex items-center text-amber-600 font-medium hover:text-amber-700">
              View All Products
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${
                      product.badge === "Sale" ? "bg-red-500 text-white" :
                      product.badge === "New" ? "bg-green-500 text-white" :
                      "bg-amber-500 text-white"
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-stone-600"}`} />
                  </button>
                  <button 
                    onClick={addToCart}
                    className="absolute bottom-0 left-0 right-0 py-3 bg-stone-900 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-full group-hover:translate-y-0"
                  >
                    Add to Cart
                  </button>
                </div>
                <div>
                  <p className="text-sm text-stone-500 mb-1">{product.category}</p>
                  <h3 className="font-semibold text-stone-900 mb-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-stone-600 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-stone-400">({product.reviews} reviews)</span>
                  </div>
                  <p className="text-lg font-bold text-stone-900">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 font-medium">About Luxe Living</span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-6">Crafting Spaces That Inspire</h2>
              <p className="text-stone-300 text-lg mb-6">
                For over a decade, Luxe Living has been at the forefront of modern furniture design. We believe that every piece of furniture should tell a story and transform your house into a home.
              </p>
              <p className="text-stone-300 mb-8">
                Our commitment to sustainability means we source materials responsibly and craft each piece with care, ensuring beauty that lasts generations.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-3xl font-bold text-amber-400">10+</p>
                  <p className="text-sm text-stone-400 mt-1">Years Experience</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-amber-400">50+</p>
                  <p className="text-sm text-stone-400 mt-1">Expert Artisans</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-amber-400">100%</p>
                  <p className="text-sm text-stone-400 mt-1">Sustainable</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&h=500&fit=crop" 
                alt="Furniture craftsmanship"
                className="rounded-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-amber-600 p-6 rounded-xl">
                <p className="text-3xl font-bold">10K+</p>
                <p className="text-sm">Homes Furnished</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">What Our Customers Say</h2>
            <p className="text-stone-600">Trusted by homeowners and designers alike</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-stone-600 mb-6">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-stone-900 text-white rounded-full flex items-center justify-center font-medium">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">{testimonial.name}</p>
                    <p className="text-sm text-stone-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Join Our Community</h2>
          <p className="text-stone-600 mb-8">Subscribe to receive exclusive offers, design tips, and new arrival updates.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-stone-900 text-white font-medium rounded-lg hover:bg-stone-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <span className="text-2xl font-bold tracking-tight">Luxe<span className="text-amber-600">Living</span></span>
              <p className="text-stone-400 mt-4">Transforming houses into homes with premium furniture since 2015.</p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-stone-400">
                <li><a href="#products" className="hover:text-white transition-colors">Products</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">Categories</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-stone-400">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-stone-400">
                <li>123 Design Street</li>
                <li>New York, NY 10001</li>
                <li>hello@luxeliving.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-stone-400 text-sm">© 2025 Luxe Living. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-stone-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
