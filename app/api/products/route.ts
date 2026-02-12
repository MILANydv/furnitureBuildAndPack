import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { ProductService } from '@/server/modules/products/product.service';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

const productService = new ProductService();

const createProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  basePrice: z.number().positive(),
  categoryId: z.string(),
  isConfigurable: z.boolean().default(false),
  imageUrl: z.string().url().optional(),
  images: z.array(z.string().url()).default([]),
  dimensions: z.object({
    length: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  }).optional(),
  stock: z.number().int().default(0),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId') || undefined;
    const search = searchParams.get('search') || undefined;
    const isConfigurable = searchParams.get('isConfigurable') === 'true' ? true : 
                          searchParams.get('isConfigurable') === 'false' ? false : undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const result = await productService.getProducts({
      categoryId,
      search,
      isConfigurable,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validated = createProductSchema.parse(body);

    const productData: Prisma.ProductCreateInput = {
      name: validated.name,
      slug: validated.slug,
      description: validated.description,
      basePrice: validated.basePrice,
      categoryId: validated.categoryId,
      isConfigurable: validated.isConfigurable,
      imageUrl: validated.imageUrl,
      images: validated.images.length > 0 ? validated.images : null,
      dimensions: validated.dimensions,
      stock: validated.stock,
      category: {
        connect: { id: validated.categoryId },
      },
    } as Prisma.ProductCreateInput;

    const product = await productService.createProduct(productData);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
