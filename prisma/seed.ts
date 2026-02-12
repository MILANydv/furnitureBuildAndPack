import { PrismaClient, UserRole, OrderStatus, DiscountType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Delete all data in correct order (respecting foreign key constraints)
  console.log('🗑️  Cleaning existing data...');
  
  await prisma.review.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.configurablePart.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.campaignBanner.deleteMany();

  console.log('✅ Database cleaned');

  // Hash passwords
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Users (at least 5)
  console.log('👥 Creating users...');
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@luxeliving.com',
        name: 'Admin User',
        password: hashedPassword,
        role: UserRole.ADMIN,
      },
    }),
    prisma.user.create({
      data: {
        email: 'customer1@example.com',
        name: 'John Doe',
        password: hashedPassword,
        role: UserRole.CUSTOMER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'customer2@example.com',
        name: 'Jane Smith',
        password: hashedPassword,
        role: UserRole.CUSTOMER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'customer3@example.com',
        name: 'Mike Johnson',
        password: hashedPassword,
        role: UserRole.CUSTOMER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'customer4@example.com',
        name: 'Sarah Williams',
        password: hashedPassword,
        role: UserRole.CUSTOMER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'customer5@example.com',
        name: 'David Brown',
        password: hashedPassword,
        role: UserRole.CUSTOMER,
        isBlocked: true, // One blocked user for testing
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create Categories (at least 5)
  console.log('📁 Creating categories...');
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Living Room',
        slug: 'living-room',
        description: 'Comfortable and stylish living room furniture for your home.',
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Dining Room',
        slug: 'dining-room',
        description: 'Elegant dining sets and furniture for memorable meals.',
        imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&h=500&fit=crop',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Bedroom',
        slug: 'bedroom',
        description: 'Create your personal sanctuary with our bedroom collection.',
        imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=400&fit=crop',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Office',
        slug: 'office',
        description: 'Productivity meets style in our office furniture range.',
        imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&h=500&fit=crop',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Outdoor',
        slug: 'outdoor',
        description: 'Durable and weather-resistant outdoor furniture for your patio and garden.',
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Storage',
        slug: 'storage',
        description: 'Smart storage solutions to keep your space organized.',
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Create Products (at least 5, with proper category relationships)
  console.log('🛋️  Creating products...');
  const products = await Promise.all([
    // Living Room Products
    prisma.product.create({
      data: {
        name: 'Modular Velvet Sofa',
        slug: 'modular-velvet-sofa',
        description: 'A luxurious modular velvet sofa that brings comfort and style to any living room. Customizable configuration with multiple seating options.',
        basePrice: 1299.00,
        categoryId: categories[0].id,
        isConfigurable: true,
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
          'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80'
        ]),
        stock: 15,
        dimensions: JSON.stringify({ length: 240, width: 95, height: 85, unit: 'cm' }),
      },
    }),
    prisma.product.create({
      data: {
        name: 'Modern Coffee Table',
        slug: 'modern-coffee-table',
        description: 'Sleek and functional coffee table with hidden storage compartment.',
        basePrice: 299.00,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&q=80',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&q=80',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
        ]),
        stock: 25,
        dimensions: JSON.stringify({ length: 120, width: 60, height: 45, unit: 'cm' }),
      },
    }),
    prisma.product.create({
      data: {
        name: 'Leather Recliner Chair',
        slug: 'leather-recliner-chair',
        description: 'Premium leather recliner with built-in footrest and adjustable backrest.',
        basePrice: 799.00,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80'
        ]),
        stock: 12,
        dimensions: JSON.stringify({ length: 95, width: 90, height: 105, unit: 'cm' }),
      },
    }),
    // Dining Room Products
    prisma.product.create({
      data: {
        name: 'Oak Extendable Dining Table',
        slug: 'oak-dining-table',
        description: 'Solid oak dining table that extends to seat up to 10 people. Perfect for family gatherings.',
        basePrice: 899.00,
        categoryId: categories[1].id,
        imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
        ]),
        stock: 8,
        dimensions: JSON.stringify({ length: 180, width: 90, height: 76, unit: 'cm' }),
      },
    }),
    prisma.product.create({
      data: {
        name: 'Modern Dining Chairs Set',
        slug: 'modern-dining-chairs-set',
        description: 'Set of 4 contemporary dining chairs with comfortable upholstered seats.',
        basePrice: 449.00,
        categoryId: categories[1].id,
        imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80'
        ]),
        stock: 20,
        dimensions: JSON.stringify({ length: 45, width: 50, height: 95, unit: 'cm' }),
      },
    }),
    // Bedroom Products
    prisma.product.create({
      data: {
        name: 'Minimalist Bed Frame',
        slug: 'minimalist-bed-frame',
        description: 'Sleek and sturdy bed frame with a modern minimalist design.',
        basePrice: 600.00,
        categoryId: categories[2].id,
        imageUrl: 'https://images.unsplash.com/photo-1505693416388-b034631ac0f3?w=800&q=80',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1505693416388-b034631ac0f3?w=800&q=80',
          'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80'
        ]),
        stock: 12,
        dimensions: JSON.stringify({ length: 210, width: 160, height: 35, unit: 'cm' }),
      },
    }),
    prisma.product.create({
      data: {
        name: 'Wardrobe with Mirror',
        slug: 'wardrobe-with-mirror',
        description: 'Spacious wardrobe with full-length mirror and multiple storage compartments.',
        basePrice: 799.00,
        categoryId: categories[2].id,
        imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80'
        ]),
        stock: 10,
        dimensions: JSON.stringify({ length: 180, width: 60, height: 200, unit: 'cm' }),
      },
    }),
    // Office Products
    prisma.product.create({
      data: {
        name: 'ErgoPro Office Chair',
        slug: 'ergopro-office-chair',
        description: 'Top-tier ergonomic chair with lumbar support and adjustable height.',
        basePrice: 450.00,
        categoryId: categories[3].id,
        imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80'
        ]),
        stock: 20,
        dimensions: JSON.stringify({ length: 65, width: 65, height: 120, unit: 'cm' }),
      },
    }),
    prisma.product.create({
      data: {
        name: 'Standing Desk',
        slug: 'standing-desk',
        description: 'Electric height-adjustable standing desk for a healthier work environment.',
        basePrice: 599.00,
        categoryId: categories[3].id,
        isConfigurable: true,
        imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80'
        ]),
        stock: 15,
        dimensions: JSON.stringify({ length: 140, width: 70, height: 75, unit: 'cm' }),
      },
    }),
    // Outdoor Products
    prisma.product.create({
      data: {
        name: 'Patio Dining Set',
        slug: 'patio-dining-set',
        description: 'Weather-resistant outdoor dining set with table and 4 chairs.',
        basePrice: 699.00,
        categoryId: categories[4].id,
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
        ]),
        stock: 8,
        dimensions: JSON.stringify({ length: 160, width: 90, height: 75, unit: 'cm' }),
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products`);

  // Create Product Variants (for products that need variants)
  console.log('🎨 Creating product variants...');
  const variants = await Promise.all([
    // Sofa variants
    prisma.productVariant.create({
      data: {
        productId: products[0].id,
        color: 'Emerald Green',
        material: 'Velvet',
        price: 1299.00,
        stock: 5,
      },
    }),
    prisma.productVariant.create({
      data: {
        productId: products[0].id,
        color: 'Navy Blue',
        material: 'Velvet',
        price: 1299.00,
        stock: 5,
      },
    }),
    prisma.productVariant.create({
      data: {
        productId: products[0].id,
        color: 'Charcoal Gray',
        material: 'Velvet',
        price: 1299.00,
        stock: 5,
      },
    }),
    // Dining table variants
    prisma.productVariant.create({
      data: {
        productId: products[3].id,
        material: 'Oak',
        price: 899.00,
        stock: 8,
      },
    }),
    prisma.productVariant.create({
      data: {
        productId: products[3].id,
        material: 'Walnut',
        price: 999.00,
        stock: 6,
      },
    }),
    // Dining chairs variants
    prisma.productVariant.create({
      data: {
        productId: products[4].id,
        color: 'Black',
        price: 449.00,
        stock: 20,
      },
    }),
    prisma.productVariant.create({
      data: {
        productId: products[4].id,
        color: 'White',
        price: 449.00,
        stock: 15,
      },
    }),
    // Bed frame variants
    prisma.productVariant.create({
      data: {
        productId: products[5].id,
        size: 'Queen',
        price: 600.00,
        stock: 8,
      },
    }),
    prisma.productVariant.create({
      data: {
        productId: products[5].id,
        size: 'King',
        price: 750.00,
        stock: 4,
      },
    }),
    // Office chair variants
    prisma.productVariant.create({
      data: {
        productId: products[7].id,
        color: 'Black',
        price: 450.00,
        stock: 10,
      },
    }),
    prisma.productVariant.create({
      data: {
        productId: products[7].id,
        color: 'Gray',
        price: 450.00,
        stock: 10,
      },
    }),
  ]);

  console.log(`✅ Created ${variants.length} product variants`);

  // Create Configurable Parts (for configurable products)
  console.log('⚙️  Creating configurable parts...');
  await prisma.configurablePart.createMany({
    data: [
      { productId: products[0].id, legType: 'Wooden', priceModifier: 0 },
      { productId: products[0].id, legType: 'Metal', priceModifier: 50 },
      { productId: products[0].id, finish: 'Matte', priceModifier: 0 },
      { productId: products[0].id, finish: 'Gloss', priceModifier: 100 },
      { productId: products[8].id, frameType: 'Standard', priceModifier: 0 },
      { productId: products[8].id, frameType: 'Premium', priceModifier: 150 },
      { productId: products[8].id, tabletopType: 'Laminate', priceModifier: 0 },
      { productId: products[8].id, tabletopType: 'Solid Wood', priceModifier: 200 },
    ],
  });

  console.log('✅ Created configurable parts');

  // Create Orders (at least 5, with proper user relationships)
  console.log('📦 Creating orders...');
  const orders = await Promise.all([
    prisma.order.create({
      data: {
        userId: users[1].id, // John Doe
        total: 1349.00,
        status: OrderStatus.DELIVERED,
        shippingAddress: JSON.stringify({
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'USA',
          phone: '123-456-7890',
        }),
        items: {
          create: [
            {
              productId: products[0].id,
              variantId: variants[0].id,
              qty: 1,
              price: 1349.00,
              configuration: JSON.stringify({ legType: 'Metal' }),
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        userId: users[1].id, // John Doe
        total: 899.00,
        status: OrderStatus.PROCESSING,
        shippingAddress: JSON.stringify({
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'USA',
          phone: '123-456-7890',
        }),
        items: {
          create: [
            {
              productId: products[3].id,
              variantId: variants[3].id,
              qty: 1,
              price: 899.00,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        userId: users[2].id, // Jane Smith
        total: 1048.00,
        status: OrderStatus.SHIPPED,
        shippingAddress: JSON.stringify({
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          postalCode: '90001',
          country: 'USA',
          phone: '234-567-8901',
        }),
        items: {
          create: [
            {
              productId: products[4].id,
              variantId: variants[5].id,
              qty: 1,
              price: 449.00,
            },
            {
              productId: products[5].id,
              variantId: variants[7].id,
              qty: 1,
              price: 600.00,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        userId: users[3].id, // Mike Johnson
        total: 450.00,
        status: OrderStatus.PENDING,
        shippingAddress: JSON.stringify({
          street: '789 Pine Rd',
          city: 'Chicago',
          state: 'IL',
          postalCode: '60601',
          country: 'USA',
          phone: '345-678-9012',
        }),
        items: {
          create: [
            {
              productId: products[7].id,
              variantId: variants[9].id,
              qty: 1,
              price: 450.00,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        userId: users[4].id, // Sarah Williams
        total: 1299.00,
        status: OrderStatus.DELIVERED,
        shippingAddress: JSON.stringify({
          street: '321 Elm St',
          city: 'Houston',
          state: 'TX',
          postalCode: '77001',
          country: 'USA',
          phone: '456-789-0123',
        }),
        items: {
          create: [
            {
              productId: products[0].id,
              variantId: variants[1].id,
              qty: 1,
              price: 1299.00,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        userId: users[2].id, // Jane Smith
        total: 299.00,
        status: OrderStatus.CANCELLED,
        shippingAddress: JSON.stringify({
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          postalCode: '90001',
          country: 'USA',
          phone: '234-567-8901',
        }),
        items: {
          create: [
            {
              productId: products[1].id,
              qty: 1,
              price: 299.00,
            },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ Created ${orders.length} orders`);

  // Create Reviews (at least 5, with proper product and user relationships)
  console.log('⭐ Creating reviews...');
  await prisma.review.createMany({
    data: [
      {
        productId: products[0].id,
        userId: users[1].id,
        rating: 5,
        comment: 'Absolutely love this sofa! The velvet is so soft and the color is stunning. Very comfortable.',
      },
      {
        productId: products[3].id,
        userId: users[1].id,
        rating: 4,
        comment: 'Great table, very sturdy. Assembly took a bit longer than expected but worth it.',
      },
      {
        productId: products[5].id,
        userId: users[2].id,
        rating: 5,
        comment: 'Perfect bed frame! Sleek design and very sturdy. Highly recommend.',
      },
      {
        productId: products[7].id,
        userId: users[3].id,
        rating: 4,
        comment: 'Comfortable office chair with good lumbar support. Great value for money.',
      },
      {
        productId: products[0].id,
        userId: users[4].id,
        rating: 5,
        comment: 'Best purchase ever! The modular design is perfect for our living room.',
      },
      {
        productId: products[4].id,
        userId: users[2].id,
        rating: 3,
        comment: 'Decent chairs but could be more comfortable. Good for the price though.',
      },
    ],
  });

  console.log('✅ Created reviews');

  // Create Wishlist items (at least 5)
  console.log('❤️  Creating wishlist items...');
  await prisma.wishlist.createMany({
    data: [
      { userId: users[1].id, productId: products[3].id },
      { userId: users[1].id, productId: products[5].id },
      { userId: users[2].id, productId: products[0].id },
      { userId: users[2].id, productId: products[7].id },
      { userId: users[3].id, productId: products[1].id },
      { userId: users[4].id, productId: products[8].id },
    ],
  });

  console.log('✅ Created wishlist items');

  // Create Carts (at least 5)
  console.log('🛒 Creating carts...');
  const carts = await Promise.all([
    prisma.cart.create({
      data: {
        userId: users[1].id,
        items: {
          create: [
            {
              productId: products[7].id,
              variantId: variants[9].id,
              qty: 2,
            },
          ],
        },
      },
    }),
    prisma.cart.create({
      data: {
        userId: users[2].id,
        items: {
          create: [
            {
              productId: products[1].id,
              qty: 1,
            },
            {
              productId: products[2].id,
              qty: 1,
            },
          ],
        },
      },
    }),
    prisma.cart.create({
      data: {
        userId: users[3].id,
        items: {
          create: [
            {
              productId: products[4].id,
              variantId: variants[5].id,
              qty: 4,
            },
          ],
        },
      },
    }),
    prisma.cart.create({
      data: {
        userId: users[4].id,
        items: {
          create: [
            {
              productId: products[8].id,
              qty: 1,
            },
          ],
        },
      },
    }),
    prisma.cart.create({
      data: {
        userId: users[5].id,
        items: {
          create: [
            {
              productId: products[6].id,
              qty: 1,
            },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ Created ${carts.length} carts`);

  // Create Coupons (at least 5)
  console.log('🎫 Creating coupons...');
  const now = new Date();
  const coupons = await Promise.all([
    prisma.coupon.create({
      data: {
        code: 'WELCOME10',
        discountType: DiscountType.PERCENTAGE,
        discountValue: 10,
        validFrom: now,
        validUntil: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
        maxUses: 100,
        minOrderAmount: 0,
        isActive: true,
      },
    }),
    prisma.coupon.create({
      data: {
        code: 'SAVE50',
        discountType: DiscountType.FIXED,
        discountValue: 50,
        validFrom: now,
        validUntil: new Date(now.getFullYear(), now.getMonth() + 3, now.getDate()),
        maxUses: 50,
        minOrderAmount: 200,
        isActive: true,
      },
    }),
    prisma.coupon.create({
      data: {
        code: 'SPRING25',
        discountType: DiscountType.PERCENTAGE,
        discountValue: 25,
        validFrom: now,
        validUntil: new Date(now.getFullYear(), now.getMonth() + 2, now.getDate()),
        maxUses: 200,
        minOrderAmount: 100,
        isActive: true,
      },
    }),
    prisma.coupon.create({
      data: {
        code: 'VIP100',
        discountType: DiscountType.FIXED,
        discountValue: 100,
        validFrom: now,
        validUntil: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
        maxUses: 20,
        minOrderAmount: 500,
        isActive: true,
      },
    }),
    prisma.coupon.create({
      data: {
        code: 'FLASH30',
        discountType: DiscountType.PERCENTAGE,
        discountValue: 30,
        validFrom: now,
        validUntil: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
        maxUses: 100,
        minOrderAmount: 150,
        isActive: true,
      },
    }),
    prisma.coupon.create({
      data: {
        code: 'EXPIRED',
        discountType: DiscountType.PERCENTAGE,
        discountValue: 20,
        validFrom: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        validUntil: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // Yesterday
        maxUses: 50,
        minOrderAmount: 0,
        isActive: false,
      },
    }),
  ]);

  console.log(`✅ Created ${coupons.length} coupons`);

  // Create Campaign Banners (at least 5)
  console.log('🎨 Creating campaign banners...');
  await prisma.campaignBanner.createMany({
    data: [
      {
        title: 'Spring Sale',
        subtitle: 'Up to 50% off on selected items',
        imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&h=400&fit=crop',
        linkUrl: '/products?category=spring-sale',
        isActive: true,
        displayOrder: 0,
      },
      {
        title: 'New Arrivals',
        subtitle: 'Discover our latest furniture collection',
        imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?w=1200&h=400&fit=crop',
        linkUrl: '/products?sort=newest',
        isActive: true,
        displayOrder: 1,
      },
      {
        title: 'Living Room Essentials',
        subtitle: 'Transform your space with our curated collection',
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=400&fit=crop',
        linkUrl: '/categories/living-room',
        isActive: true,
        displayOrder: 2,
      },
      {
        title: 'Office Setup Sale',
        subtitle: 'Everything you need for your home office',
        imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1200&h=400&fit=crop',
        linkUrl: '/categories/office',
        isActive: true,
        displayOrder: 3,
      },
      {
        title: 'Bedroom Makeover',
        subtitle: 'Create your perfect sanctuary',
        imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=400&fit=crop',
        linkUrl: '/categories/bedroom',
        isActive: true,
        displayOrder: 4,
      },
      {
        title: 'Coming Soon',
        subtitle: 'New outdoor collection launching next month',
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=400&fit=crop',
        linkUrl: '/categories/outdoor',
        isActive: false,
        displayOrder: 5,
      },
    ],
  });

  console.log('✅ Created campaign banners');

  console.log('\n✨ Seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   👥 Users: ${users.length}`);
  console.log(`   📁 Categories: ${categories.length}`);
  console.log(`   🛋️  Products: ${products.length}`);
  console.log(`   🎨 Variants: ${variants.length}`);
  console.log(`   📦 Orders: ${orders.length}`);
  console.log(`   🛒 Carts: ${carts.length}`);
  console.log(`   🎫 Coupons: ${coupons.length}`);
  console.log(`   🎨 Banners: 6`);
  console.log('\n🔑 Default credentials:');
  console.log('   Admin: admin@luxeliving.com / password123');
  console.log('   Customer: customer1@example.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
