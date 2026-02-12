import {
    Product as PrismaProduct,
    Category as PrismaCategory,
    ProductVariant as PrismaProductVariant,
    ConfigurablePart as PrismaConfigurablePart,
    Review as PrismaReview,
    User as PrismaUser
} from '@prisma/client';
import {
    Product,
    Category,
    ProductImage,
    ProductVariant,
    ConfigurablePartOptions,
    Dimensions,
    Review,
    User,
    ConfigurableOption
} from '@/types';

export function mapPrismaCategory(category: PrismaCategory): Category {
    return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        imageUrl: category.imageUrl,
        parentId: null,
        seoTitle: null,
        seoDescription: null,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
    };
}

export function mapPrismaUser(user: PrismaUser): User {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.toLowerCase() as any,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}

export function mapPrismaReview(review: PrismaReview & { user: PrismaUser }): Review {
    return {
        id: review.id,
        productId: review.productId,
        userId: review.userId,
        user: mapPrismaUser(review.user),
        rating: review.rating,
        title: review.comment?.split('.')[0] || 'Review',
        content: review.comment || '',
        images: [],
        isVerified: true,
        helpful: 0,
        createdAt: review.createdAt,
    };
}

export function mapPrismaProduct(
    product: PrismaProduct & {
        category: PrismaCategory,
        variants: PrismaProductVariant[],
        configurableParts: PrismaConfigurablePart[],
        reviews: (PrismaReview & { user: PrismaUser })[]
    }
): Product {
    const images: ProductImage[] = [];
    if (product.imageUrl) {
        images.push({
            id: 'primary',
            productId: product.id,
            url: product.imageUrl,
            alt: product.name,
            order: 0,
            isPrimary: true,
        });
    }

    if (product.images) {
        const additionalImages = Array.isArray(product.images) 
            ? product.images 
            : typeof product.images === 'string' 
                ? JSON.parse(product.images) 
                : [];
        additionalImages.forEach((url: string, index: number) => {
            if (url) {
                images.push({
                    id: `img-${index}`,
                    productId: product.id,
                    url: typeof url === 'string' ? url.trim() : String(url),
                    alt: product.name,
                    order: index + 1,
                    isPrimary: false,
                });
            }
        });
    }

    const dimensions: Dimensions | null = product.dimensions
        ? (typeof product.dimensions === 'string' 
            ? JSON.parse(product.dimensions) 
            : product.dimensions as unknown as Dimensions)
        : null;

    const variants: ProductVariant[] = product.variants.map(v => ({
        id: v.id,
        productId: v.productId,
        size: v.size,
        color: v.color,
        colorHex: null,
        material: v.material,
        price: v.price,
        sku: `${product.slug}-${v.size || 'default'}`,
        stock: v.stock,
        isActive: true,
    }));

    const configurableParts: ConfigurablePartOptions = {
        frame: [],
        legType: [],
        tabletopType: [],
        finish: [],
    };

    product.configurableParts.forEach(p => {
        if (p.frameType) {
            configurableParts.frame.push({
                id: p.id,
                name: p.frameType,
                priceModifier: p.priceModifier,
                image: null,
            });
        }
        if (p.legType) {
            configurableParts.legType.push({
                id: p.id,
                name: p.legType,
                priceModifier: p.priceModifier,
                image: null,
            });
        }
        if (p.tabletopType) {
            configurableParts.tabletopType.push({
                id: p.id,
                name: p.tabletopType,
                priceModifier: p.priceModifier,
                image: null,
            });
        }
        if (p.finish) {
            configurableParts.finish.push({
                id: p.id,
                name: p.finish,
                priceModifier: p.priceModifier,
                image: null,
            });
        }
    });

    const rating = product.reviews.length > 0
        ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
        : 0;

    return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description || '',
        shortDescription: (product.description || '').slice(0, 100),
        basePrice: product.basePrice,
        imageUrl: product.imageUrl,
        categoryId: product.categoryId,
        category: mapPrismaCategory(product.category),
        images,
        variants,
        configurable: product.isConfigurable,
        configurableParts: product.isConfigurable ? configurableParts : null,
        dimensions,
        weight: null,
        material: null,
        rating,
        reviewCount: product.reviews.length,
        reviews: product.reviews.map(mapPrismaReview),
        tags: [],
        isActive: true,
        seoTitle: product.name,
        seoDescription: product.description,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
    };
}
