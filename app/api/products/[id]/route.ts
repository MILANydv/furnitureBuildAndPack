import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { ProductService } from '@/server/modules/products/product.service';
import { z } from 'zod';

const productService = new ProductService();

const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().optional(),
  basePrice: z.number().positive().optional(),
  categoryId: z.string().optional(),
  isConfigurable: z.boolean().optional(),
  imageUrl: z.string().url().optional(),
  images: z.array(z.string().url()).optional(),
  dimensions: z.object({
    length: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  }).optional(),
  stock: z.number().int().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await productService.getProductById(id);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const validated = updateProductSchema.parse(body);

    const updateData: any = {};
    if (validated.name) updateData.name = validated.name;
    if (validated.slug) updateData.slug = validated.slug;
    if (validated.description !== undefined) updateData.description = validated.description;
    if (validated.basePrice) updateData.basePrice = validated.basePrice;
    if (validated.isConfigurable !== undefined) updateData.isConfigurable = validated.isConfigurable;
    if (validated.imageUrl) updateData.imageUrl = validated.imageUrl;
    if (validated.images) updateData.images = validated.images;
    if (validated.dimensions) updateData.dimensions = validated.dimensions;
    if (validated.stock !== undefined) updateData.stock = validated.stock;
    if (validated.categoryId) {
      updateData.category = { connect: { id: validated.categoryId } };
    }

    const product = await productService.updateProduct(id, updateData);
    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    await productService.deleteProduct(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
