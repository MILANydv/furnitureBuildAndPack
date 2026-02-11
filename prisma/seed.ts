import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@luxeliving.com' },
    update: {},
    create: {
      email: 'admin@luxeliving.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create test customer
  const customerPassword = await bcrypt.hash('customer123', 10);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      name: 'Test Customer',
      password: customerPassword,
      role: 'CUSTOMER',
    },
  });

  // Create categories
  const livingRoom = await prisma.category.upsert({
    where: { slug: 'living-room' },
    update: {},
    create: {
      name: 'Living Room',
      slug: 'living-room',
      description: 'Comfortable and stylish living room furniture',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    },
  });

  const bedroom = await prisma.category.upsert({
    where: { slug: 'bedroom' },
    update: {},
    create: {
      name: 'Bedroom',
      slug: 'bedroom',
      description: 'Elegant bedroom furniture',
      imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=400&fit=crop',
    },
  });

  const dining = await prisma.category.upsert({
    where: { slug: 'dining' },
    update: {},
    create: {
      name: 'Dining',
      slug: 'dining',
      description: 'Beautiful dining room sets',
      imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop',
    },
  });

  // Create products
  const sofa = await prisma.product.create({
    data: {
      name: 'Velvet Lounge Sofa',
      slug: 'velvet-lounge-sofa',
      description: 'A luxurious velvet sofa perfect for your living room',
      basePrice: 1299,
      categoryId: livingRoom.id,
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
      stock: 10,
    },
  });

  const table = await prisma.product.create({
    data: {
      name: 'Oak Dining Table',
      slug: 'oak-dining-table',
      description: 'Handcrafted oak dining table',
      basePrice: 899,
      categoryId: dining.id,
      imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&h=500&fit=crop',
      stock: 5,
      isConfigurable: true,
      dimensions: {
        length: 200,
        width: 100,
        height: 75,
      },
    },
  });

  // Create configurable parts for the table
  await prisma.configurablePart.createMany({
    data: [
      {
        productId: table.id,
        material: 'Oak',
        priceModifier: 0,
      },
      {
        productId: table.id,
        material: 'Walnut',
        priceModifier: 200,
      },
      {
        productId: table.id,
        finish: 'Natural',
        priceModifier: 0,
      },
      {
        productId: table.id,
        finish: 'Glossy',
        priceModifier: 150,
      },
    ],
  });

  // Create a campaign banner
  await prisma.campaignBanner.create({
    data: {
      title: 'New Collection 2025',
      imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=1000&fit=crop',
      linkUrl: '/products',
      isActive: true,
      displayOrder: 1,
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
