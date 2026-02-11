import { prisma } from '@/lib/prisma/client';
import { ProductForm } from '@/app/admin/components/ProductForm';

export default async function NewProductPage() {
    const categories = await prisma.category.findMany();

    return (
        <div className="p-6">
            <ProductForm categories={categories} />
        </div>
    );
}
