import { PrismaClient, UserRole, OrderStatus, DiscountType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Wipe database first to ensure clean slate (order matters due to foreign keys)
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

  // Create Users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const customerPassword = await bcrypt.hash('customer123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@luxeliving.com',
      name: 'Admin User',
      password: adminPassword,
      role: UserRole.ADMIN,
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: 'customer@luxeliving.com',
      name: 'Test Customer',
      password: customerPassword,
      role: UserRole.CUSTOMER,
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      email: 'jane@example.com',
      name: 'Jane Doe',
      password: customerPassword,
      role: UserRole.CUSTOMER,
    },
  });

  // Create Categories
  const livingRoom = await prisma.category.create({
    data: {
      name: 'Living Room',
      slug: 'living-room',
      description: 'Comfortable and stylish living room furniture for your home.',
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
    },
  });

  const diningRoom = await prisma.category.create({
    data: {
      name: 'Dining Room',
      slug: 'dining-room',
      description: 'Elegant dining sets and furniture for memorable meals.',
      imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&h=500&fit=crop',
    },
  });

  const bedroom = await prisma.category.create({
    data: {
      name: 'Bedroom',
      slug: 'bedroom',
      description: 'Create your personal sanctuary with our bedroom collection.',
      imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=400&fit=crop',
    },
  });

  const office = await prisma.category.create({
    data: {
      name: 'Office',
      slug: 'office',
      description: 'Productivity meets style in our office furniture range.',
      imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&h=500&fit=crop',
    },
  });

  // Create Products
  const sofa = await prisma.product.create({
    data: {
      name: 'Modular Velvet Sofa',
      slug: 'modular-velvet-sofa',
      description: 'A luxurious modular velvet sofa that brings comfort and style to any living room. Customizable configuration.',
      basePrice: 1299.00,
      categoryId: livingRoom.id,
      isConfigurable: true,
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
        'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80'
      ].join(','),
      stock: 15,
      dimensions: JSON.stringify({ length: 240, width: 95, height: 85 }),
    },
  });

  const diningTable = await prisma.product.create({
    data: {
      name: 'Oak Extendable Dining Table',
      slug: 'oak-dining-table',
      description: 'Solid oak dining table that extends to seat up to 10 people. Perfect for family gatherings.',
      basePrice: 899.00,
      categoryId: diningRoom.id,
      imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
      stock: 8,
      dimensions: JSON.stringify({ length: 180, width: 90, height: 76 }),
    },
  });

  const ergonomicChair = await prisma.product.create({
    data: {
      name: 'ErgoPro Office Chair',
      slug: 'ergopro-office-chair',
      description: 'Top-tier ergonomic chair with lumbar support and adjustable height.',
      basePrice: 450.00,
      categoryId: office.id,
      imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80',
      stock: 20,
    }
  });

  const bedFrame = await prisma.product.create({
    data: {
      name: 'Minimalist Bed Frame',
      slug: 'minimalist-bed-frame',
      description: 'Sleek and sturdy bed frame with a modern minimalist design.',
      basePrice: 600.00,
      categoryId: bedroom.id,
      imageUrl: 'https://images.unsplash.com/photo-1505693416388-b034631ac0f3?w=800&q=80',
      stock: 12,
      dimensions: JSON.stringify({ length: 210, width: 160, height: 35 }),
    }
  });


  // Create Product Variants
  await prisma.productVariant.create({
    data: {
      productId: sofa.id,
      color: 'Emerald Green',
      material: 'Velvet',
      price: 1299.00,
      stock: 5,
    },
  });

  await prisma.productVariant.create({
    data: {
      productId: sofa.id,
      color: 'Navy Blue',
      material: 'Velvet',
      price: 1299.00,
      stock: 5,
    },
  });

  await prisma.productVariant.create({
    data: {
      productId: diningTable.id,
      material: 'Oak',
      price: 899.00,
      stock: 8,
    }
  });

  // Create Configurable Parts
  await prisma.configurablePart.createMany({
    data: [
      { productId: sofa.id, legType: 'Wooden', priceModifier: 0 },
      { productId: sofa.id, legType: 'Metal', priceModifier: 50 },
      { productId: sofa.id, finish: 'Matte', priceModifier: 0 },
      { productId: sofa.id, finish: 'Gloss', priceModifier: 100 },
    ],
  });

  // Create Orders
  const order1 = await prisma.order.create({
    data: {
      userId: customer.id,
      total: 1349.00,
      status: OrderStatus.DELIVERED,
      shippingAddress: JSON.stringify({
        street: '123 Main St',
        city: 'New York',
        postalCode: '10001',
        country: 'USA',
        phone: '123-456-7890',
      }),
      items: {
        create: [
          {
            productId: sofa.id,
            qty: 1,
            price: 1349.00, // + metal legs
            configuration: JSON.stringify({ legType: 'Metal' }),
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: customer.id,
      total: 899.00,
      status: OrderStatus.PROCESSING,
      shippingAddress: JSON.stringify({
        street: '123 Main St',
        city: 'New York',
        postalCode: '10001',
        country: 'USA',
        phone: '123-456-7890',
      }),
      items: {
        create: [
          {
            productId: diningTable.id,
            qty: 1,
            price: 899.00,
          }
        ]
      }
    }
  })

  // Create Reviews
  await prisma.review.create({
    data: {
      productId: sofa.id,
      userId: customer.id,
      rating: 5,
      comment: 'Absolutely love this sofa! The velvet is so soft and the color is stunning.',
    },
  });

  await prisma.review.create({
    data: {
      productId: diningTable.id,
      userId: customer2.id,
      rating: 4,
      comment: 'Great table, very sturdy. Assembly took a bit longer than expected.',
    }
  });

  // Create Wishlist
  await prisma.wishlist.create({
    data: {
      userId: customer.id,
      productId: diningTable.id,
    },
  });

  // Create Cart
  const cart = await prisma.cart.create({
    data: {
      userId: customer.id,
    },
  });

  await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId: ergonomicChair.id,
      qty: 2,
    },
  });

  // Create Coupon
  await prisma.coupon.create({
    data: {
      code: 'WELCOME10',
      discountType: DiscountType.PERCENTAGE,
      discountValue: 10,
      validFrom: new Date(),
      validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      maxUses: 100,
      isActive: true,
    },
  });

  // Create Campaign Banner
  await prisma.campaignBanner.create({
    data: {
      title: 'Spring Sale',
      imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&h=400&fit=crop',
      linkUrl: '/products',
      isActive: true,
      displayOrder: 1,
    },
  });

  await prisma.campaignBanner.create({
    data: {
      title: 'New Arrivals',
      imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?w=1200&h=400&fit=crop',
      linkUrl: '/new-arrivals',
      isActive: true,
      displayOrder: 2,
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
