# Luxe Living - E-commerce Furniture Platform

A complete Next.js e-commerce platform for modular furniture with 3D configurator, built for the Nepal market.

## Features

- **Customer Storefront**
  - SEO-optimized homepage with server-side rendering
  - Product listing and detail pages with dynamic metadata
  - Category pages
  - Shopping cart and checkout
  - Wishlist management
  - Product reviews

- **3D Configurator (Build Your Own Furniture)**
  - Real-time 3D preview using React Three Fiber
  - Size customization (Length/Width/Height)
  - Material and finish selection
  - Frame and leg type selection
  - Live price calculation
  - Save configurations to cart

- **Admin Panel**
  - Dashboard with analytics
  - Product CRUD operations
  - Order management
  - Customer management
  - Coupon management
  - Campaign banner management

- **SEO Optimization**
  - Dynamic metadata generation
  - Structured data (JSON-LD)
  - Automatic sitemap generation
  - SEO-friendly URLs

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **3D Graphics**: React Three Fiber (Three.js)
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **State Management**: Zustand (for client state)

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd furnitureBuildAndPack
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your database URL and NextAuth secret:
```
DATABASE_URL="postgresql://user:password@localhost:5432/furniture_db?schema=public"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database:
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate

# Seed the database
npm run db:seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Default Credentials

After seeding:
- **Admin**: admin@luxeliving.com / admin123
- **Customer**: customer@example.com / customer123

## Project Structure

```
app/
├── (customer)/          # Customer-facing routes
│   ├── page.tsx        # Homepage
│   ├── products/       # Product pages
│   ├── categories/     # Category pages
│   ├── cart/           # Shopping cart
│   ├── checkout/       # Checkout flow
│   ├── wishlist/       # Wishlist
│   └── build-your-own/ # 3D Configurator
├── (admin)/            # Admin panel routes
│   ├── dashboard/      # Admin dashboard
│   ├── products/       # Product management
│   ├── orders/         # Order management
│   ├── customers/      # Customer management
│   ├── coupons/        # Coupon management
│   └── banners/        # Banner management
├── api/                # API routes
├── components/         # React components
└── lib/                # Utilities

server/
└── modules/            # Backend modules (repository pattern)
    ├── products/
    ├── orders/
    ├── cart/
    ├── users/
    └── configurator/

prisma/
├── schema.prisma       # Database schema
└── seed.ts             # Seed script
```

## Database Schema

The application uses the following core tables:
- `users` - User accounts (customers and admins)
- `products` - Product catalog
- `product_variants` - Product variants (size, color, material)
- `configurable_parts` - Configurable options for products
- `orders` - Customer orders
- `order_items` - Order line items
- `cart` / `cart_items` - Shopping cart
- `reviews` - Product reviews
- `wishlist` - User wishlists
- `coupons` - Discount coupons
- `campaign_banners` - Marketing banners

## Key Features Implementation

### 3D Configurator
The configurator uses React Three Fiber for 3D rendering. Products marked as `isConfigurable: true` can be customized with:
- Dimensions (length, width, height)
- Materials (wood, metal, plastic, etc.)
- Finishes (natural, glossy, matte)
- Frame types and leg styles

### SEO Optimization
- Dynamic `generateMetadata()` for product and category pages
- Product schema JSON-LD for rich snippets
- Automatic sitemap generation
- Server-side rendering for all pages

### Authentication
NextAuth.js handles authentication with:
- Credentials provider (email/password)
- JWT sessions
- Role-based access control (customer/admin)

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Deployment

### Deploying to Vercel

This app is optimized for Vercel deployment. See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

**Quick Start:**

1. **Set up a PostgreSQL database:**
   - Recommended: [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (integrated)
   - Alternative: [Supabase](https://supabase.com) or [Neon](https://neon.tech)

2. **Deploy to Vercel:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

3. **Configure Environment Variables in Vercel Dashboard:**
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `NEXTAUTH_URL` - Your production URL (e.g., `https://your-app.vercel.app`)
   - `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`

4. **Run database migrations:**
   ```bash
   npx prisma migrate deploy
   ```

The app includes:
- ✅ Automatic Prisma Client generation on build (`postinstall` script)
- ✅ Optimized Next.js config for Vercel
- ✅ Serverless-friendly Prisma Client setup
- ✅ Proper environment variable handling

### Other Platforms

For other platforms, ensure:
- PostgreSQL database is accessible
- Environment variables are configured
- Prisma Client is generated during build
- Node.js 18+ is available

## License

MIT
