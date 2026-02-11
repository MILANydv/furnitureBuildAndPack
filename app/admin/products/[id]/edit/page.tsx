import { prisma } from '@/lib/prisma/client';
import { ProductForm } from '@/app/admin/components/ProductForm';
import { notFound } from 'next/navigation';

interface EditProductPageProps {
    params: {
        id: string;
    };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const { id } = params;

    const [product, categories] = await Promise.all([
        prisma.product.findUnique({
            where: { id },
        }),
        prisma.category.findMany()
    ]);

    if (!product) {
        notFound();
    }

    return (
        <div className="p-6">
            <ProductForm initialData={product} categories={categories} />
        </div>
    );
}
