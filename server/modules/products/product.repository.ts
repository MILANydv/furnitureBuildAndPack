import { prisma } from '@/lib/prisma/client';
import { Product, ProductVariant, Category, Prisma } from '@prisma/client';

export type ProductWithRelations = Product & {
  category: Category;
  variants: ProductVariant[];
  configurableParts?: any[];
};

export class ProductRepository {
  async findById(id: string): Promise<ProductWithRelations | null> {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        variants: true,
        configurableParts: true,
      },
    });
  }

  async findBySlug(slug: string): Promise<ProductWithRelations | null> {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        variants: true,
        configurableParts: true,
      },
    });
  }

  async findAll(filters?: {
    categoryId?: string;
    search?: string;
    isConfigurable?: boolean;
    skip?: number;
    take?: number;
  }): Promise<ProductWithRelations[]> {
    const where: Prisma.ProductWhereInput = {};

    if (filters?.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters?.isConfigurable !== undefined) {
      where.isConfigurable = filters.isConfigurable;
    }

    return prisma.product.findMany({
      where,
      include: {
        category: true,
        variants: true,
        configurableParts: true,
      },
      skip: filters?.skip,
      take: filters?.take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async count(filters?: {
    categoryId?: string;
    search?: string;
    isConfigurable?: boolean;
  }): Promise<number> {
    const where: Prisma.ProductWhereInput = {};

    if (filters?.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters?.isConfigurable !== undefined) {
      where.isConfigurable = filters.isConfigurable;
    }

    return prisma.product.count({ where });
  }

  async create(data: Prisma.ProductCreateInput): Promise<ProductWithRelations> {
    return prisma.product.create({
      data,
      include: {
        category: true,
        variants: true,
        configurableParts: true,
      },
    });
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<ProductWithRelations> {
    return prisma.product.update({
      where: { id },
      data,
      include: {
        category: true,
        variants: true,
        configurableParts: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({
      where: { id },
    });
  }

  async createVariant(data: Prisma.ProductVariantCreateInput): Promise<ProductVariant> {
    return prisma.productVariant.create({
      data,
    });
  }

  async updateVariant(id: string, data: Prisma.ProductVariantUpdateInput): Promise<ProductVariant> {
    return prisma.productVariant.update({
      where: { id },
      data,
    });
  }

  async deleteVariant(id: string): Promise<void> {
    await prisma.productVariant.delete({
      where: { id },
    });
  }
}
