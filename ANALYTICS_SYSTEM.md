# Analytics & Dashboard System

## Overview

A comprehensive analytics system with server-side statistics calculation and real-time dashboard visualization.

## Architecture

### Server-Side (Repository Pattern)

```
server/modules/analytics/
├── analytics.repository.ts  # Data access layer
└── analytics.service.ts      # Business logic layer
```

### API Routes

```
app/api/admin/
├── stats/route.ts                    # Main dashboard stats
└── analytics/
    ├── revenue/route.ts              # Revenue analytics
    ├── orders/route.ts               # Order analytics
    ├── products/route.ts            # Product analytics
    ├── customers/route.ts           # Customer analytics
    ├── categories/route.ts          # Category analytics
    └── trends/route.ts              # Sales trends over time
```

### Frontend Pages

```
app/admin/
├── dashboard/page.tsx    # Main dashboard (uses stats API)
└── analytics/page.tsx    # Detailed analytics with charts
```

## Features

### 1. Revenue Analytics
- Total revenue (all-time)
- Today's revenue
- This week's revenue
- This month's revenue
- This year's revenue
- Growth percentage vs previous period
- Time-range filtering support

### 2. Order Analytics
- Total orders
- Orders by status (Pending, Processing, Shipped, Delivered, Cancelled)
- Today/This week/This month counts
- Average order value
- Time-range filtering support

### 3. Product Analytics
- Total products
- Stock status breakdown (In Stock, Low Stock, Out of Stock)
- Top selling products (by quantity sold)
- Product revenue per item
- Order count per product

### 4. Customer Analytics
- Total customers
- Active vs Blocked customers
- New customers (this week/month)
- Top customers by spending
- Customer order counts

### 5. Category Analytics
- Products per category
- Revenue per category
- Orders per category
- Category distribution percentage

### 6. Sales Trends
- Daily revenue trends
- Daily order counts
- Daily customer counts
- Configurable time range (7, 30, 90, 365 days)

### 7. Growth Metrics
- Revenue growth percentage
- Order growth percentage
- Customer growth percentage
- Product growth percentage

## API Endpoints

### GET `/api/admin/stats`
Main dashboard statistics endpoint.

**Response:**
```json
{
  "revenue": {
    "total": 10000,
    "today": 500,
    "thisWeek": 2000,
    "thisMonth": 5000,
    "thisYear": 10000,
    "previousPeriod": 4500,
    "growth": 11.11
  },
  "orders": {
    "total": 100,
    "pending": 5,
    "processing": 10,
    "shipped": 15,
    "delivered": 60,
    "cancelled": 10,
    "today": 3,
    "thisWeek": 15,
    "thisMonth": 40,
    "averageOrderValue": 100.00
  },
  "products": {
    "total": 50,
    "inStock": 30,
    "lowStock": 15,
    "outOfStock": 5,
    "topSelling": [...]
  },
  "customers": {
    "total": 200,
    "active": 190,
    "blocked": 10,
    "newThisMonth": 20,
    "newThisWeek": 5,
    "topCustomers": [...]
  },
  "categories": [...],
  "recentOrders": [...],
  "growth": {
    "revenueGrowth": 12.5,
    "orderGrowth": 8.2,
    "customerGrowth": 15.3,
    "productGrowth": 4.1
  },
  // Legacy format for backward compatibility
  "totalRevenue": 10000,
  "totalOrders": 100,
  "totalCustomers": 200,
  "totalProducts": 50,
  "revenueGrowth": "+12.5%",
  "orderGrowth": "+8.2%",
  "customerGrowth": "+15.3%",
  "productGrowth": "+4.1%",
  "topProducts": [...]
}
```

### GET `/api/admin/analytics/revenue?start=2024-01-01&end=2024-01-31`
Revenue statistics with optional date range.

### GET `/api/admin/analytics/orders?start=2024-01-01&end=2024-01-31`
Order statistics with optional date range.

### GET `/api/admin/analytics/products`
Product statistics.

### GET `/api/admin/analytics/customers`
Customer statistics.

### GET `/api/admin/analytics/categories`
Category statistics with revenue breakdown.

### GET `/api/admin/analytics/trends?days=30`
Sales trends over specified number of days (default: 30).

**Response:**
```json
[
  {
    "date": "2024-01-01",
    "revenue": 500.00,
    "orders": 5,
    "customers": 3
  },
  ...
]
```

## Usage Examples

### Fetching Dashboard Stats

```typescript
const response = await fetch('/api/admin/stats');
const stats = await response.json();

console.log(stats.revenue.total);
console.log(stats.orders.averageOrderValue);
console.log(stats.products.topSelling);
```

### Fetching Trends

```typescript
// Last 7 days
const trends = await fetch('/api/admin/analytics/trends?days=7');

// Last 30 days (default)
const trends30 = await fetch('/api/admin/analytics/trends');
```

### Time-Range Filtering

```typescript
const start = '2024-01-01';
const end = '2024-01-31';
const revenue = await fetch(
  `/api/admin/analytics/revenue?start=${start}&end=${end}`
);
```

## Dashboard Features

### Main Dashboard (`/admin/dashboard`)
- Key metrics cards (Revenue, Orders, Products, Customers)
- Recent orders list
- Growth indicators
- Quick action buttons

### Analytics Page (`/admin/analytics`)
- Interactive revenue/orders trend chart (Line chart)
- Order status breakdown (Bar chart)
- Top selling products list
- Category distribution visualization
- Top customers list
- Real-time metrics
- Time range selector (7, 30, 90, 365 days)

## Charts & Visualizations

### Line Chart (Revenue Trends)
- Revenue over time
- Orders over time
- Dual-axis visualization
- Interactive tooltips

### Bar Chart (Order Status)
- Visual breakdown of order statuses
- Color-coded by status
- Responsive design

### Category Distribution
- Visual percentage bars
- Revenue and order counts per category
- Top 5 categories displayed

## Performance Considerations

- All queries use `Promise.all()` for parallel execution
- Efficient database aggregations
- Indexed queries on date fields
- Cached React Query results
- Optimized Prisma queries

## Security

- All endpoints require admin authentication
- Session validation via NextAuth
- Role-based access control (ADMIN only)

## Future Enhancements

- [ ] Export to CSV/PDF
- [ ] Custom date range picker
- [ ] Real-time WebSocket updates
- [ ] Advanced filtering options
- [ ] Comparison with previous periods
- [ ] Predictive analytics
- [ ] Email reports
- [ ] Custom dashboard widgets

## Testing

Test the analytics system:

```bash
# Start the dev server
npm run dev

# Navigate to:
# - Dashboard: http://localhost:3000/admin/dashboard
# - Analytics: http://localhost:3000/admin/analytics

# Test API endpoints:
curl http://localhost:3000/api/admin/stats \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN"
```

## Dependencies

- `recharts` - Chart library (already installed)
- `@tanstack/react-query` - Data fetching and caching
- `prisma` - Database ORM
- `next-auth` - Authentication

## Notes

- All monetary values are stored as floats (use `formatPrice` for display)
- Dates are handled in UTC
- Growth percentages are calculated month-over-month
- Cancelled orders are excluded from revenue calculations
- Stock thresholds: In Stock (>10), Low Stock (1-10), Out of Stock (0)
