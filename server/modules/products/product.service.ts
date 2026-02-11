import { ProductRepository, ProductWithRelations } from './product.repository';
import { Prisma } from '@prisma/client';

export class ProductService {
  private repository: ProductRepository;

  constructor() {
    this.repository = new ProductRepository();
  }

  async getProductById(id: string): Promise<ProductWithRelations | null> {
    return this.repository.findById(id);
  }

  async getProductBySlug(slug: string): Promise<ProductWithRelations | null> {
    return this.repository.findBySlug(slug);
  }

  async getProducts(filters?: {
    categoryId?: string;
    search?: string;
    isConfigurable?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ products: ProductWithRelations[]; total: number; page: number; limit: number }> {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.repository.findAll({
        ...filters,
        skip,
        take: limit,
      }),
      this.repository.count(filters),
    ]);

    return {
      products,
      total,
      page,
      limit,
    };
  }

  async createProduct(data: Prisma.ProductCreateInput): Promise<ProductWithRelations> {
    return this.repository.create(data);
  }

  async updateProduct(id: string, data: Prisma.ProductUpdateInput): Promise<ProductWithRelations> {
    return this.repository.update(id, data);
  }

  async deleteProduct(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
