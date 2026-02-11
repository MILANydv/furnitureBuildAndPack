import { prisma } from '@/lib/prisma/client';
import { ProductForm } from '../components/ProductForm';

export default async function NewProductPage() {
    const categories = await prisma.category.findMany();

    return (
        <div className="max-w-7xl mx-auto">
            <ProductForm categories={categories} />
        </div>
    );
}
